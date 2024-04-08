import { OpenAI } from "openai";
import { createAI, getMutableAIState, render } from "ai/rsc";
import { z } from "zod";
import { PersonaMessage } from "@/components/chat";
import axios from "axios";
import React from "react";
import { PersonaCard } from "@/components/generative-ui/persona";
import { Loading } from "@/components/generative-ui/loading";
import { PersonaChat } from "./api/models/personachat.model";
import { initMongoDB } from "@/database/mongodb";
import { ChatCompletionAssistantMessageParam } from "openai/resources/index.mjs";

const { ApifyClient } = require("apify-client");

const apifyToken: string = process.env.APIFY_TOKEN || "";
if (!apifyToken) throw new Error("Missing Apify API Token.");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const apify = new ApifyClient({
  token: apifyToken,
});

initMongoDB();

async function getContentConsumption(keyword: string): Promise<string[]> {
  try {
    // Prepare Actor input
    const input = {
      keyword: keyword,
      limit: 5,
      publishTime: "ALL_TIME",
      proxyConfiguration: {
        useApifyProxy: true,
      },
    };

    const run = await apify.actor("jQfZ1h9FrcWcliKZX").call(input);

    // Fetch and print Actor results from the run's dataset (if any)
    console.log("Results from dataset");
    const { items } = await apify.dataset(run.defaultDatasetId).listItems();
    items.forEach((item: any) => {
      console.dir(
        item["aweme_info"]["video"]["bit_rate"][0]["play_addr"][
          "url_list"
        ][0] as string
      );
    });

    return items.map(
      (item: any) =>
        item["aweme_info"]["video"]["bit_rate"][0]["play_addr"][
          "url_list"
        ][0] as string
    );
  } catch (error) {
    console.error("Error getting TikTok videos: ", error);
    throw error;
  }
}

// An example of a function that fetches flight information from an external API.
async function createPersona(productOrService: string) {
  const systemMessage = `You are an AI language model. Generate a User Persona in JSON format based on the following company description and Q & A::
  Description: ${productOrService}
  
  Please structure your response in a clear and easily parsable JSON format. The beginning of the response should be "{" and it should end with "}".
  
  interface UserPersona {
    name: string;
    productDescription: string;
    gender: string;
    sections: [{label: string, description: string}];
    shortDescriptors: [{label: string, description: string, emoji: string}];
  }
  
  For example:
  {
    "name": "John Doe",
    "productDescription" : "Skiing App ⛷️"
    "gender" : "details",
    "sections": [{
        {
        "label": "Bio",
        "description": "details"
        },
        {
        "label": "Goals",
        "description": "details"
        },
        {
        "label": "Motivations",
        "description": "details"
        },
        {
        "label": "Pains",
        "description": "details"
        },
        {
        "label": "Devices",
        "description": "details"
        },
        {
        "label": "Brand Affiliations",
        "description": "details"
        }
      ],
      "shortDescriptors": [ 
        "label": "Age",
        "description": "details",
        "emoji": "🧔"
        },
        {
        "label": "Location",
        "description": "details",
        "emoji": "📍"
        },
        {
        "label": "Occupation",
        "description": "details",
        "emoji": "💼"
        },
        {
        "label": "Family Status",
        "description": "details",
        "emoji": "🏠"
        }
    ]
  }
  `;

  const chatResponse = await GPT4(systemMessage);
  let responseText = chatResponse.text.trim();
  let userPersona: any;
  //TODO:
  try {
    if (!responseText.startsWith("{")) {
      responseText = responseText.substring(responseText.indexOf("{"));
    }
    userPersona = JSON.parse(responseText);
    if ((userPersona as any)["UserPersona"]) {
      userPersona = (userPersona as any)["UserPersona"];
      console.log("Had to fix USER PERSONA");
    }
  } catch (error) {
    throw new Error(
      "Failed to parse the generated userPersona JSON. Please try again. Here was the response: " +
        responseText
    );
  }

  userPersona.pictureURL = getRandomHeadshot(userPersona.gender);
  return userPersona;
}

function getRandomHeadshot(gender: string) {
  return `https://instantpersonas.com/profiles/${gender.toLowerCase()}/${Math.ceil(
    Math.random() * 78
  )}.jpg`;
}

export async function GPT4(
  prompt: string,
  systemMessages?: string[],
  model: any = "gpt-4"
): Promise<any> {
  const endpoint = "https://api.openai.com/v1/chat/completions";
  const headers = {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  };

  const _systemMessages =
    systemMessages?.map((message) => {
      return {
        role: "system",
        content: message,
      };
    }) || [];

  const requestBody = {
    model: model,
    messages: [..._systemMessages, { role: "user", content: prompt }],
  };

  try {
    const response = await axios.post(endpoint, requestBody, { headers });
    const text = response.data.choices[0].message.content.trim();
    return { response: response.data, text };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get OpenAI chat completion.");
  }
}

//@ts-ignore
async function submitUserMessage(userInput: string, userID: string) {
  "use server";

  //@ts-ignore
  const aiState = getMutableAIState<typeof AI>();

  // Update the AI state with the new user message.
  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        role: "user",
        content: userInput,
      },
    ],
  });

  // The `render()` creates a generated, streamable UI.
  //@ts-ignore
  const ui = render({
    model: "gpt-4-0125-preview",
    provider: openai,
    messages: [
      {
        role: "system",
        content:
          "You help the user create personas. Before creating a persona, ask the user about the customer motivations, goals, and pain points.",
      },
      ...aiState.get().messages,
    ],
    // `text` is called when an AI returns a text response (as opposed to a tool call).
    // Its content is streamed from the LLM, so this function will be called
    // multiple times with `content` being incremental.
    text: ({ content, done }) => {
      // When it's the final content, mark the state as done and ready for the client to access.
      if (done) {
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              role: "assistant",
              content,
            },
          ],
        });

        // TODO: add to the database
      }

      return <PersonaMessage message={content} />;
    },
    tools: {
      create_persona: {
        description:
          "When the user has provided a product or service, create a persona.",
        parameters: z
          .object({
            productOrService: z
              .string()
              .describe(
                "the product or service being offered (with an emoji to follow it, ex. Coffee Shop ☕️)"
              ),
          })
          .required(),
        render: async function* ({ productOrService }) {
          yield <Loading loadingMessage={"Generating persona..."} />;

          const persona = await createPersona(productOrService);

          // Update the final AI state.
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                role: "function",
                name: "create_persona",
                // Content can be any string to provide context to the LLM in the rest of the conversation.
                content: JSON.stringify(persona),
              },
            ],
          });

          if (userID) {
            const personaChat: any = await PersonaChat.create({
              aiState: aiState.get(),
              user: userID,
              aiSuggestedChats: [],
              personas: persona,
            });
          }

          return <PersonaCard persona={persona} />;
        },
      },
      persona_content_consumption: {
        description:
          "When a persona has been created and the user wants to know how to target them, provide a display of what their content consumption might look like.",
        parameters: z
          .object({
            keyword: z
              .string()
              .describe(
                "a keyword that the persona might search for (ex. 'coffee')"
              ),
          })
          .required(),
        render: async function* ({ keyword }) {
          yield (
            <Loading loadingMessage={"Doing content consumption analysis..."} />
          );

          const contentConsumption = await getContentConsumption(keyword);

          // Update the final AI state.
          aiState.done([
            ...aiState.get(),
            {
              role: "function",
              name: "persona_content_consumption",
              // Content can be any string to provide context to the LLM in the rest of the conversation.
              content: JSON.stringify(contentConsumption),
            },
          ]);

          return (
            <div className="flex flex-row flex-wrap">
              {contentConsumption.map((url: string) => {
                return (
                  <iframe
                    key={url}
                    width="200"
                    height="344"
                    className="p-2"
                    src={url}
                    frameBorder="0"
                    allow="accelerometer; autoplay: false; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                );
              })}
            </div>
          );
        },
      },
    },
  });

  return {
    id: Date.now(),
    display: ui,
  };
}

// Define the initial state of the AI. It can be any JSON object.
const initialAIState: {
  business: string;
  targetProblem: string;
  threadKnowledge: {
    context: string;
    personaCharacteristics: string[];
    thresholdRating: number; // 0-10
  };
  messages: {
    role: "user" | "assistant" | "system" | "function";
    content: string;
    id?: string;
    name?: string;
  }[];
} = {
  messages: [],
  business: "",
  targetProblem: "",
  threadKnowledge: {
    context: "",
    personaCharacteristics: [],
    thresholdRating: 0,
  },
};

// The initial UI state that the client will keep track of, which contains the message IDs and their UI nodes.
const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

// AI is a provider you wrap your application with so you can access AI and UI state in your components.
//@ts-ignore
export const AI = createAI({
  actions: {
    submitUserMessage,
  },
  // Each state can be any shape of object, but for chat applications
  // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
  initialUIState,
  initialAIState,
});
