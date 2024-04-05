import { OpenAI } from "openai";
import { createAI, getMutableAIState, render } from "ai/rsc";
import { z } from "zod";
import { PersonaMessage } from "@/components/chat";
import UserPersona, { EXAMPLE_PERSONA } from "@/components/persona";
import axios from "axios";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// An example of a spinner component. You can also import your own components,
// or 3rd party component libraries.
function Spinner() {
  return <div>Loading...</div>;
}

// An example of a flight card component.
//@ts-ignore
function PersonaCard({ persona }) {
  return (
    <div>
      <h2 style={{ fontWeight: "bold" }}>{persona.productOrService}</h2>
      <UserPersona
        name={persona.name}
        gender={persona.gender}
        pictureURL={persona.pictureURL}
        personalAttributes={persona.shortDescriptors}
        sections={persona.sections}
      />
    </div>
  );
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
async function submitUserMessage(userInput: string) {
  "use server";

  //@ts-ignore
  const aiState = getMutableAIState<typeof AI>();

  // Update the AI state with the new user message.
  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content: userInput,
    },
  ]);

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
      ...aiState.get(),
    ],
    // `text` is called when an AI returns a text response (as opposed to a tool call).
    // Its content is streamed from the LLM, so this function will be called
    // multiple times with `content` being incremental.
    text: ({ content, done }) => {
      // When it's the final content, mark the state as done and ready for the client to access.
      if (done) {
        aiState.done([
          ...aiState.get(),
          {
            role: "assistant",
            content,
          },
        ]);
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
          // Show a spinner on the client while we wait for the response.
          yield <Spinner />;

          // Fetch the flight information from an external API.
          const persona = await createPersona(productOrService);

          // Update the final AI state.
          aiState.done([
            ...aiState.get(),
            {
              role: "function",
              name: "create_persona",
              // Content can be any string to provide context to the LLM in the rest of the conversation.
              content: JSON.stringify(persona),
            },
          ]);

          // Return the flight card to the client.
          return <PersonaCard persona={persona} />;
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
  role: "user" | "assistant" | "system" | "function";
  content: string;
  id?: string;
  name?: string;
}[] = [];

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
