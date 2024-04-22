import "server-only";

import { OpenAI } from "openai";
import { createAI, getAIState, getMutableAIState, render } from "ai/rsc";
import { z } from "zod";
import { PersonaInitial, PersonaMessage, UserMessage } from "@/components/chat";
import React from "react";
import { Loading } from "@/components/generative-ui/loading";
import { initMongoDB } from "@/database/mongodb";
import { ASSISTANT_PROMPT, CREATE_PERSONA_PROMPT } from "./ai/prompts";
import {
  mapUrlBackgroundColorParamToVariant,
  PersonaArchetype,
  PersonaAvatarPopover,
} from "@/components/generative-ui/persona-avatar-popover";
import { getContentConsumption } from "./ai/content_consumption";
import { createArchetypes } from "./ai/create_archetypes";
import ConfirmKnowledgeCard from "@/components/generative-ui/confirm-knowledge-card";
import { PersonaChangeDiffCard } from "@/components/generative-ui/persona-avatar-popover/persona-change-diff-card";
import { PersonaChat, UserPersona } from "./models/personachat.model";
import { nanoid } from "@/lib/utils";
import { AIState, AIStateValidator } from "./models/ai-state-type-validators";
import posthog from "posthog-js";
import { getUIStateFromAIState } from "./ai/get-ui-state-from-ai-state";
import { fixJson } from "@/lib/fix-json";
import { GPT4 } from "./ai/gpt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

initMongoDB();

//@ts-ignore
async function submitUserMessage(userInput: string, userID: string) {
  "use server";

  //@ts-ignore
  const aiState = getMutableAIState<typeof AI>();
  const validatedAIState = AIStateValidator.safeParse(aiState.get());

  if (!validatedAIState.success) {
    posthog.capture("error", {
      error: validatedAIState.error,
    });
    return;
  }

  aiState.update({
    ...validatedAIState.data,
    messages: [
      ...validatedAIState.data.messages,
      {
        id: nanoid(),
        role: "user",
        content: userInput,
      },
    ],
  });

  // The `render()` creates a generated, streamable UI.
  // @ts-ignore
  const ui = render({
    model: "gpt-4-0125-preview",
    provider: openai,
    messages: [
      {
        role: "system",
        content: ASSISTANT_PROMPT,
      },
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
      })),
    ],
    // `text` is called when an AI returns a text response (as opposed to a tool call).
    // Its content is streamed from the LLM, so this function will be called
    // multiple times with `content` being incremental.
    text: async ({ content, done }) => {
      // When it's the final content, mark the state as done and ready for the client to access.
      if (done) {
        // aiState.done({
        //   ...aiState.get(),
        //   messages: [
        //     ...aiState.get().messages,
        //     {
        //       role: "assistant",
        //       id: nanoid(),
        //       content,
        //     },
        //   ],
        // });

        // AI suggested messages

        const suggestedMessages = await GPT4(
          "come up with 3 suggested responses/answers for the user (no more than 10 words each) (separated by •, don't number them) based on the following message from the persona-creator AI:" +
            content
        );

        console.log("suggested messages: " + suggestedMessages.text);
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              role: "assistant",
              id: nanoid(),
              content,
            },
          ],
          suggestedMessages: suggestedMessages.text.split("•"),
        });

        // TODO: add to the database if archetypes made
      }

      return <PersonaMessage message={content} />;
    },
    initial: <PersonaInitial />,
    tools: {
      confirm_business_knowledge: {
        description:
          "Once you deeply understand the business, target problem, and customers. You need to be able to describe both in no less than one paragraph.",
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
            suggestedMessages: ["Yes", "No"],
            messages: [
              ...aiState.get().messages,
              {
                role: "assistant",
                id: nanoid(),
                content: `Does this cover the business and target problem or is something
                missing?`,
              },
              {
                role: "function",
                id: nanoid(),
                name: "confirm_business_knowledge",
                // Content can be any string to provide context to the LLM in the rest of the conversation.
                content: JSON.stringify({ business, targetProblem }),
              },
            ],
          });

          return (
            <div>
              Does this cover the business and target problem or is something
              missing?
              <br></br>
              <div className="w-[600px]">
                <ConfirmKnowledgeCard {...{ business, targetProblem }} />
              </div>
            </div>
          );
        },
      },

      create_persona: {
        description:
          "Once you deeply understand the business, target problem, and customers, and the user has confirmed the business and target problem.",
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
          yield (
            <Loading
              loadingMessage={
                "Generating personas - this could take up to a minute..."
              }
            />
          );

          const archetypes = await createArchetypes(business, targetProblem);
          console.log("archetypes", archetypes);

          // Update the final AI state.
          aiState.done({
            ...aiState.get(),
            personas: archetypes,
            suggestedMessages: [
              "⭐️ Show me what content they all would consume",
            ],
            messages: [
              ...aiState.get().messages,
              {
                role: "function",
                name: "create_persona",
                id: nanoid(),
                // Content can be any string to provide context to the LLM in the rest of the conversation.
                content: JSON.stringify(archetypes),
              },
            ],
          });

          if (userID) {
            const personaChat: any = await PersonaChat.create({
              aiState: aiState.get(),
              user: userID,
              aiSuggestedChats: [],
            });
          }

          return (
            <div className="flex flex-row">
              {...archetypes.map((archetype: any, i: number) => {
                const variant = mapUrlBackgroundColorParamToVariant({
                  url: archetype.pictureURL,
                });
                return (
                  <PersonaAvatarPopover
                    key={i}
                    {...{ archetype: archetype, variant: variant }}
                  />
                );
              })}
            </div>
          );
        },
      },

      update_persona: {
        description:
          "When the user wants to update a specific persona. Ensure you know which one to update.",
        parameters: z
          .object({
            personaIndex: z
              .number()
              .describe(
                "the index of the persona to update. don't ask the user for this, just ask them for the persona's name."
              ),
            updatedArchetype: z
              .string()
              .describe(
                "the updated archetype model in ECMA-404 JSON format, for example: {archetype_name: 'example', persona_components: {...}, ...}"
              ),
          })
          .required(),
        render: async function* ({ personaIndex, updatedArchetype }) {
          // Update the final AI state.

          const personaDiffContent = {
            index: personaIndex,
            origin_archetype: aiState.get().personas[personaIndex],
            updated_archetype: JSON.parse(updatedArchetype),
          };
          try {
            aiState.done({
              ...aiState.get(),
              messages: [
                ...aiState.get().messages,
                {
                  role: "function",
                  name: "update_persona",
                  id: nanoid(),
                  // Content can be any string to provide context to the LLM in the rest of the conversation.
                  content: JSON.stringify(personaDiffContent),
                },
              ],
            });
            console.log("!!!!! -> ->");
            console.log(updatedArchetype);

            return (
              <div className="w-[600px]">
                <PersonaChangeDiffCard
                  origin_archetype={personaDiffContent.origin_archetype}
                  updated_archetype={personaDiffContent.updated_archetype}
                  personaIndex={personaDiffContent.index}
                />
              </div>
            );
          } catch {
            try {
              const newUpdatedArchetype = JSON.parse(
                fixJson(updatedArchetype)
              ) as PersonaArchetype;

              const newPersonaDiffContent = {
                index: personaIndex,
                origin_archetype: aiState.get().personas[personaIndex],
                updated_archetype: newUpdatedArchetype,
              };

              aiState.done({
                ...aiState.get(),
                messages: [
                  ...aiState.get().messages,
                  {
                    role: "function",
                    name: "update_persona",
                    id: nanoid(),
                    // Content can be any string to provide context to the LLM in the rest of the conversation.
                    content: JSON.stringify(newPersonaDiffContent),
                  },
                ],
              });

              return (
                <div className="w-[600px]">
                  <PersonaChangeDiffCard
                    origin_archetype={personaDiffContent.origin_archetype}
                    updated_archetype={newPersonaDiffContent.updated_archetype}
                    personaIndex={personaDiffContent.index}
                  />
                </div>
              );
            } catch {
              return (
                <div className="w-[600px]">
                  Something went wrong. Please try again.
                </div>
              );
            }
          }
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
                id: nanoid(),
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

export const AI: any = createAI({
  actions: { submitUserMessage },
  initialUIState: [],
  initialAIState: {
    chatId: nanoid(),
    messages: [],
    suggestedMessages: [],
    business: "",
    personas: [],
    targetProblem: "",
    threadKnowledge: {
      context: "",
      personaCharacteristics: [],
      thresholdRating: 0,
    },
  },
  unstable_onGetUIState: async () => {
    ("use server");

    //!TODO - add auth accessible to the server with jwt
    //? See auth function example: https://github.com/vercel/ai-chatbot/blob/main/auth.ts
    //? See JWT example: https://github.com/vercel/ai-chatbot/blob/main/auth.config.ts
    // const session = await auth();
    const session = {
      user: {
        id: "123",
      },
    };

    if (session && session.user) {
      const aiState = getAIState();

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState);
        return uiState;
      }
    } else {
      return;
    }
  },
  // unstable_onSetAIState: async ({ state, done }) => {
  //   ("use server");

  //   //!TODO - add auth accessible to the server with jwt
  //   //? See auth function example: https://github.com/vercel/ai-chatbot/blob/main/auth.ts
  //   //? See JWT example: https://github.com/vercel/ai-chatbot/blob/main/auth.config.ts
  //   // const session = await auth();
  //   const session = {
  //     user: {
  //       id: "123",
  //     },
  //   };

  //   if (session && session.user) {
  //     const { chatId, messages } = state;

  //     const createdAt = new Date();
  //     const userId = session.user.id as string;
  //     const path = `/chat/${chatId}`;
  //     const title = messages[0].content.substring(0, 100);

  //     const chat: Chat = {
  //       id: chatId,
  //       title,
  //       userId,
  //       createdAt,
  //       messages,
  //       path,
  //     };

  //     //! TODO - save chat to the database with chatId and UserId
  //     // await saveChat(chat);
  //     console.log("chat", chat);
  //   } else {
  //     return;
  //   }
  // },
});
