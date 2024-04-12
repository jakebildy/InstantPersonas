import { OpenAI } from "openai";
import { createAI, getMutableAIState, render } from "ai/rsc";
import { z } from "zod";
import { PersonaMessage } from "@/components/chat";
import axios from "axios";
import React from "react";
import { Loading } from "@/components/generative-ui/loading";
import { initMongoDB } from "@/database/mongodb";
import { getRandomHeadshot } from "./ai/persona_picture";
import { GPT4 } from "./ai/gpt4";
import { ASSISTANT_PROMPT, CREATE_PERSONA_PROMPT } from "./ai/prompts";
import { PersonaAvatarPopover } from "@/components/generative-ui/persona-avatar-popover";
import { getContentConsumption } from "./ai/content_consumption";
import { createArchetypes } from "./ai/create_archetypes";
import ConfirmKnowledgeCard from "@/components/generative-ui/confirm-knowledge-card";

function estimateGPTTurboCost({
  promptTokens,
  completionTokens,
}: {
  promptTokens: number;
  completionTokens: number;
}) {
  const inputPricePerMillion = 10.0; // $10 per million input tokens
  const outputPricePerMillion = 30.0; // $30 per million output tokens

  // Calculate costs
  const inputCost = (promptTokens / 1000000) * inputPricePerMillion;
  const outputCost = (completionTokens / 1000000) * outputPricePerMillion;

  // Total cost
  const totalCost = inputCost + outputCost;

  return totalCost;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

initMongoDB();

async function setInitialAIState(newAIState: any) {
  const aiState = getMutableAIState<typeof AI>();
  aiState.done(newAIState);
}

async function getCurrentAIState() {
  const aiState = getMutableAIState<typeof AI>();
  return aiState.get();
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
        content: ASSISTANT_PROMPT,
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
      confirm_business_knowledge: {
        description:
          "Once you deeply understand the business, target problem, and customers, verify it before creating a persona. If the user doesn't confirm, ask for more information.",
        parameters: z
          .object({
            business: z
              .string()
              .describe("a detailed description of the business"),

            targetProblem: z
              .string()
              .describe("the target problem the business is encountering"),
          })
          .required(),
        render: async function* ({ business, targetProblem }) {
          // Update the final AI state.
          aiState.done({
            ...aiState.get(),
            business: business,
            targetProblem: targetProblem,
            messages: [
              ...aiState.get().messages,
              {
                role: "assistant",
                content: `Does this cover the business and target problem or is something
                missing?`,
              },
              {
                role: "function",
                name: "confirm_business_knowledge",
                // Content can be any string to provide context to the LLM in the rest of the conversation.
                content: JSON.stringify({ business, targetProblem }),
              },
            ],
          });

          return (
            <div className="">
              Does this cover the business and target problem or is something
              missing?
              <br></br>
              <ConfirmKnowledgeCard {...{ business, targetProblem }} />
            </div>
          );
        },
      },

      create_persona: {
        description:
          "As soon as the user has confirmed the business and target problem, immediately create a persona.",
        parameters: z
          .object({
            business: z
              .string()
              .describe("a detailed description of the business"),

            targetProblem: z
              .string()
              .describe("the target problem the business is encountering"),
          })
          .required(),
        render: async function* ({ business, targetProblem }) {
          yield <Loading loadingMessage={"Generating personas..."} />;

          const archetypes = await createArchetypes(business, targetProblem);

          // Update the final AI state.
          aiState.done({
            ...aiState.get(),
            personas: archetypes,
            messages: [
              ...aiState.get().messages,
              {
                role: "function",
                name: "create_persona",
                // Content can be any string to provide context to the LLM in the rest of the conversation.
                content: JSON.stringify(archetypes),
              },
            ],
          });

          // if (userID) {
          //   const personaChat: any = await PersonaChat.create({
          //     aiState: aiState.get(),
          //     user: userID,
          //     aiSuggestedChats: [],
          //     personas: persona,
          //   });
          // }

          return (
            <div className="flex flex-row">
              {...archetypes.map((archetype: any, i: number) => {
                return <PersonaAvatarPopover key={i} {...{ archetype }} />;
              })}
            </div>
          );
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
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,

              {
                role: "function",
                name: "persona_content_consumption",
                // Content can be any string to provide context to the LLM in the rest of the conversation.
                content: JSON.stringify(contentConsumption),
              },
            ],
          });

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
  personas: any[];
  messages: {
    role: "user" | "assistant" | "system" | "function";
    content: string;
    id?: string;
    name?: string;
  }[];
} = {
  messages: [],
  business: "",
  personas: [],
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
    setInitialAIState,
    getCurrentAIState,
  },
  // Each state can be any shape of object, but for chat applications
  // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
  initialUIState,
  initialAIState,
});
