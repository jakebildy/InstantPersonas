import "server-only";

import { OpenAI } from "openai";
import { getMutableAIState, render } from "ai/rsc";
import { z } from "zod";
import React from "react";
import { Loading } from "@/components/page-specific/generative-ui/loading";
import { initMongoDB } from "@/app/(server)/mongodb";
import { createArchetypes } from "./tools/create_archetypes";
import { IS_TEST_DEV_ENV, nanoid } from "@/lib/utils";
import { fixJson } from "@/lib/fix-json";
import { getMessageSuggestions } from "./tools/suggested_messages";
import { PERSONA_CHAT_AI_COMPONENT_MAP } from "@/components/page-specific/generative-ui/messages";
import {
  AIState,
  AIStateValidator,
  PersonaArchetype,
} from "../../models/persona-ai.model";
import { ASSISTANT_PROMPT } from "./utils/prompts";
import { InstantPersonasSystemPrompt } from "./utils/instant-personas-system-prompt";
import { validateOrCreatePersonaChatID } from "../../api/(persona-crud)/validate-or-create-persona-chat-id/action";
import { onSetPersonaChatState } from ".";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

initMongoDB();

export const maxDuration = 300;

//@ts-ignore
export async function submitPersonaChatUserMessage(
  userInput: string,
  userID: string,
  personaChatID: string | undefined | null,
) {
  "use server";

  //@ts-ignore
  const aiState = getMutableAIState<typeof AI>();
  const validatedChatID = await validateOrCreatePersonaChatID({
    chatId: personaChatID,
    userId: userID,
  });
  const aiStateData: AIState = {
    ...aiState.get(),
    chatId: validatedChatID,
    userId: userID,
  };

  const validatedAIState = AIStateValidator.safeParse(aiStateData);

  if (!validatedAIState.success) {
    console.error("AI state is invalid", validatedAIState.error, aiState.get());
    return {
      id: nanoid(),
      role: "assistant",
      display: (
        <PERSONA_CHAT_AI_COMPONENT_MAP.system.error
          message={"AI state is invalid"}
        />
      ),
    };
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

  !IS_TEST_DEV_ENV
    ? console.log("AI state validated from `render.tsx`:", aiState.get())
    : null;
  try {
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
        { role: "system", content: InstantPersonasSystemPrompt() },
        ...aiState.get().messages.map((message: any) => ({
          role: message.role,
          content: message.content,
          name: message.name,
        })),
      ],
      // `text` is called when an AI returns a text response (as opposed to a tool call).
      // Its content is streamed from the LLM, so this function will be called
      // multiple times with `content` being incremental.
      text: async ({ content, done }: { content: string; done: boolean }) => {
        // When it's the final content, mark the state as done and ready for the client to access.
        if (done) {
          const suggestedMessages = await getMessageSuggestions(
            [
              ...aiState.get().messages,
              { role: "user", content: userInput },
              { role: "assistant", content },
            ].slice(-4) as any[],
          );

          const updatedState = {
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                role: "assistant",
                id: nanoid(),
                content,
              },
            ],
            suggestedMessages: suggestedMessages,
          };
          aiState.done(updatedState);

          await onSetPersonaChatState({
            state: updatedState,
            done: true,
          });
        }

        return (
          <PERSONA_CHAT_AI_COMPONENT_MAP.assistant.message message={content} />
        );
      },
      initial: <PERSONA_CHAT_AI_COMPONENT_MAP.assistant.loading />,
      tools: {
        confirm_business_knowledge: {
          description:
            "Confirm Business knowledge to verify your understanding of the business, its target problems, and its customers. Initiate this confirmation only after achieving a comprehensive understanding that allows you to describe these elements in detail, with a minimum of one paragraph. This verification should be completed once before generating personas.",
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
          render: async function* ({
            business,
            targetProblem,
          }: {
            business: string;
            targetProblem: string;
          }) {
            // Update the final AI state.
            const updatedState = {
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
                  tool_calls: [
                    {
                      name: "confirm_business_knowledge",
                      arguments: JSON.stringify({ business, targetProblem }),
                    },
                  ],
                },
              ],
            };
            aiState.done(updatedState);

            await onSetPersonaChatState({
              state: updatedState,
              done: true,
            });

            return (
              <PERSONA_CHAT_AI_COMPONENT_MAP.tool.confirm_business_knowledge
                knowledge={{ business, targetProblem }}
                message="Does this cover the business and target problem or is something
              missing?"
              />
            );
          },
        },

        create_persona: {
          description:
            "Create 4 persona archetypes once you deeply understand the business, target problem, and customers, and the user has confirmed the business and target problem.",
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
          render: async function* ({
            business,
            targetProblem,
          }: {
            business: string;
            targetProblem: string;
          }) {
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
            const updatedState = {
              ...aiState.get(),
              personas: archetypes,
              suggestedMessages: [
                "⭐️ Show me what content they all would consume",
                "Who would spend the most money?",
              ],
              messages: [
                ...aiState.get().messages,
                {
                  role: "assistant",
                  id: nanoid(),
                  content: ``,
                  tool_calls: [
                    {
                      name: "create_persona",
                      arguments: JSON.stringify(archetypes),
                    },
                  ],
                },
              ],
            };
            aiState.done(updatedState);

            await onSetPersonaChatState({
              state: updatedState,
              done: true,
            });

            return (
              <PERSONA_CHAT_AI_COMPONENT_MAP.tool.create_persona
                archetypes={archetypes}
              />
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
                  "the index of the persona to update. don't ask the user for this, just ask them for the persona's name.",
                ),
              updatedArchetype: z
                .string()
                .describe(
                  "the COMPLETE updated archetype model in ECMA-404 JSON format, for example: {archetype_name: 'example', persona_components: {...}, ...}",
                ),
            })
            .required(),
          render: async function* ({
            personaIndex,
            updatedArchetype,
          }: {
            personaIndex: number;
            updatedArchetype: string;
          }) {
            const personaDiffContent = {
              index: personaIndex,
              origin_archetype: aiState.get().personas[personaIndex],
              updated_archetype: JSON.parse(
                fixJson(updatedArchetype),
              ) as PersonaArchetype,
            };

            try {
              const updatedState = {
                ...aiState.get(),
                messages: [
                  ...aiState.get().messages,
                  {
                    role: "assistant",
                    id: nanoid(),
                    content: ``,
                    tool_calls: [
                      {
                        name: "update_persona",
                        arguments: JSON.stringify(personaDiffContent),
                      },
                    ],
                  },
                ],
              };
              aiState.done(updatedState);

              await onSetPersonaChatState({
                state: updatedState,
                done: true,
              });

              return (
                <PERSONA_CHAT_AI_COMPONENT_MAP.tool.update_persona
                  origin_archetype={personaDiffContent.origin_archetype}
                  updated_archetype={personaDiffContent.updated_archetype}
                  personaIndex={personaDiffContent.index}
                />
              );
            } catch (error) {
              return (
                <PERSONA_CHAT_AI_COMPONENT_MAP.system.error
                  message={<div>Error updating persona: {error as string}</div>}
                />
              );
            }
          },
        },

        // persona_content_consumption: {
        //   description:
        //     "When a persona has been created and the user wants to know how to target them, provide a display of what their content consumption might look like.",
        //   parameters: z
        //     .object({
        //       keyword: z
        //         .string()
        //         .describe(
        //           "a keyword that the persona might search for (ex. 'coffee')"
        //         ),
        //     })
        //     .required(),
        //   render: async function* ({ keyword }) {
        //     yield (
        //       <Loading
        //         loadingMessage={"Analyzing persona content consumption ..."}
        //       />
        //     );

        //     const contentConsumption = await getContentConsumption(keyword);

        //     // Update the final AI state.
        //     aiState.done({
        //       ...aiState.get(),
        //       messages: [
        //         ...aiState.get().messages,

        //         {
        //           role: "function",
        //           name: "persona_content_consumption",
        //           id: nanoid(),
        //           // Content can be any string to provide context to the LLM in the rest of the conversation.
        //           content: JSON.stringify(contentConsumption),
        //         },
        //       ],
        //     });

        //     if (personaChatID) {
        //       const personaChat = await PersonaChat.findOne({
        //         _id: personaChatID,
        //       });

        //       if (personaChat) {
        //         personaChat.aiState = aiState.get();
        //         await personaChat.save();
        //       }
        //     }

        //     return (
        //       <div className="flex flex-row flex-wrap">
        //         {contentConsumption.map((url: string) => {
        //           return (
        //             <div key={url} className="border rounded-sm overflow-hidden">
        //               <iframe
        //                 width="200"
        //                 height="344"
        //                 className="p-2"
        //                 src={url}
        //                 frameBorder="0"
        //                 allow="accelerometer; autoplay: false; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        //                 allowFullScreen
        //               ></iframe>
        //             </div>
        //           );
        //         })}
        //       </div>
        //     );
        //   },
        // },
      },
    });

    return {
      id: nanoid(),
      display: IS_TEST_DEV_ENV ? (
        <>
          {ui}{" "}
          <PERSONA_CHAT_AI_COMPONENT_MAP.system.dev_info
            message={aiState
              .get()
              .messages.map((m: any) => m.content)
              .join("\n")}
            state={JSON.stringify(aiState.get())}
          />
        </>
      ) : (
        ui
      ),
    };
  } catch (error: any) {
    console.error("Error in submitPersonaChatUserMessage", error);
    return {
      id: nanoid(),
      role: "assistant",
      display: (
        <PERSONA_CHAT_AI_COMPONENT_MAP.system.error
          message={`Error in submitting user message: \n${error}`}
        />
      ),
    };
  }
}
