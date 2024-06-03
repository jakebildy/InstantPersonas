import { createAI, getAIState, getMutableAIState, streamUI } from "ai/rsc";
import { nanoid } from "nanoid";
import { z } from "zod";
import {
  AIState,
  AIStateValidator,
  ClientMessage,
  PersonaArchetype,
} from "../../models/persona-ai.model";
import { openai } from "@ai-sdk/openai";
import { CoreMessage, generateText } from "ai";
import { PERSONA_CHAT_AI_COMPONENT_MAP } from "@/components/page-specific/generative-ui/messages";
import { PersonaChat } from "../../models/personachat.model";
import { getUIStateFromAIState } from "./utils/get-ui-state-from-ai-state";
import { createArchetypes } from "./tools/create_archetypes";
import { Loading } from "@/components/page-specific/generative-ui/loading";
import { fixJson } from "@/lib/fix-json";
import { PERSONA_CHAT_INITIAL_AI_STATE } from "./initial-ai-state";
import { getMessageSuggestions } from "./tools/suggested_messages";
import { InstantPersonasSystemPrompt } from "./utils/instant-personas-system-prompt";

export async function submitPersonaChatUserMessage(
  userInput: string,
  userID: string,
  personaChatID: string | undefined
): Promise<ClientMessage> {
  "use server";

  const input = userInput;
  console.log("Submit called on server: input", input, userInput);

  const history = getMutableAIState();
  const validatedAIState = AIStateValidator.safeParse(history.get());
  if (!validatedAIState.success) {
    console.error("AI state is invalid", validatedAIState.error);
    console.log("AI state is invalid", history.get());
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

  const messages = history.get().messages;

  // const messages = validatedAIState.data.messages.map((message) => ({
  //   role: message.role === "function" ? "tool" : message.role,
  //   content: message.content.replace(/\\n/g, "\n"),
  // })) as CoreMessage[];

  console.log("Submit called on server: messages", [
    ...messages,
    { role: "user", content: input },
  ]);
  try {
    const result = await streamUI({
      model: openai("gpt-4-turbo"),
      messages: [...messages, { role: "user", content: input }],
      system: InstantPersonasSystemPrompt(),
      text: async ({ content, done }: { content: string; done: boolean }) => {
        if (done) {
          const suggestedMessages = await getMessageSuggestions(
            [
              ...messages,
              { role: "user", content: input },
              { role: "assistant", content },
            ].slice(-4) as CoreMessage[]
          );

          history.done({
            ...history.get(),
            messages: [
              ...messages,
              {
                role: "assistant",
                content,
              },
            ],
            suggestedMessages: suggestedMessages,
            userID: userID,
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
          generate: async function* ({ business, targetProblem }) {
            // Update the final AI state.
            history.done({
              ...history.get(),
              business: business,
              targetProblem: targetProblem,
              suggestedMessages: ["Yes", "No"],
              messages: [
                ...messages,
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
          generate: async function* ({ business, targetProblem }) {
            yield (
              <Loading
                loadingMessage={
                  "Generating personas - this could take up to a minute..."
                }
              />
            );

            const archetypes = await createArchetypes(business, targetProblem);
            // Update the final AI state.
            history.done({
              ...history.get(),
              personas: archetypes,
              suggestedMessages: [
                "⭐️ Show me what content they all would consume",
                "Who would spend the most money?",
              ],
              messages: [
                ...messages,
                {
                  role: "function",
                  name: "create_persona",
                  id: nanoid(),
                  // Content can be any string to provide context to the LLM in the rest of the conversation.
                  content: JSON.stringify(archetypes),
                },
              ],
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
                  "the index of the persona to update. don't ask the user for this, just ask them for the persona's name."
                ),
              updatedArchetype: z
                .string()
                .describe(
                  "the COMPLETE updated archetype model in ECMA-404 JSON format, for example: {archetype_name: 'example', persona_components: {...}, ...}"
                ),
            })
            .required(),

          generate: async function* ({ personaIndex, updatedArchetype }) {
            // Update the final AI state.

            const personaDiffContent = {
              index: personaIndex,
              origin_archetype: history.get().personas[personaIndex],
              updated_archetype: JSON.parse(
                fixJson(updatedArchetype)
              ) as PersonaArchetype,
            };

            console.log("persona diff content: " + personaDiffContent);

            try {
              history.done({
                ...history.get(),
                messages: [
                  ...messages,
                  {
                    role: "function",
                    name: "update_persona",
                    id: nanoid(),
                    // Content can be any string to provide context to the LLM in the rest of the conversation.
                    content: JSON.stringify(personaDiffContent),
                  },
                ],
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

        //       // persona_content_consumption: {
        //       //   description:
        //       //     "When a persona has been created and the user wants to know how to target them, provide a display of what their content consumption might look like.",
        //       //   parameters: z
        //       //     .object({
        //       //       keyword: z
        //       //         .string()
        //       //         .describe(
        //       //           "a keyword that the persona might search for (ex. 'coffee')"
        //       //         ),
        //       //     })
        //       //     .required(),
        //       //   render: async function* ({ keyword }) {
        //       //     yield (
        //       //       <Loading
        //       //         loadingMessage={"Analyzing persona content consumption ..."}
        //       //       />
        //       //     );

        //       //     const contentConsumption = await getContentConsumption(keyword);

        //       //     // Update the final AI state.
        //       //     aiState.done({
        //       //       ...aiState.get(),
        //       //       messages: [
        //       //         ...aiState.get().messages,

        //       //         {
        //       //           role: "function",
        //       //           name: "persona_content_consumption",
        //       //           id: nanoid(),
        //       //           // Content can be any string to provide context to the LLM in the rest of the conversation.
        //       //           content: JSON.stringify(contentConsumption),
        //       //         },
        //       //       ],
        //       //     });

        //       //     if (personaChatID) {
        //       //       const personaChat = await PersonaChat.findOne({
        //       //         _id: personaChatID,
        //       //       });

        //       //       if (personaChat) {
        //       //         personaChat.aiState = aiState.get();
        //       //         await personaChat.save();
        //       //       }
        //       //     }

        //       //     return (
        //       //       <div className="flex flex-row flex-wrap">
        //       //         {contentConsumption.map((url: string) => {
        //       //           return (
        //       //             <div key={url} className="border rounded-sm overflow-hidden">
        //       //               <iframe
        //       //                 width="200"
        //       //                 height="344"
        //       //                 className="p-2"
        //       //                 src={url}
        //       //                 frameBorder="0"
        //       //                 allow="accelerometer; autoplay: false; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        //       //                 allowFullScreen
        //       //               ></iframe>
        //       //             </div>
        //       //           );
        //       //         })}
        //       //       </div>
        //       //     );
        //       //   },
        //       // },
      },
    });

    return {
      id: nanoid(),
      role: "assistant",
      display: result.value,
    };
  } catch (error: any) {
    console.error("Error in submitPersonaChatUserMessage", error);

    // console.error(
    //   "Error in submitPersonaChatUserMessage: Messages:",
    //   error.requestBodyValues.messages.length,
    //   "Values: \n",
    //   error.requestBodyValues.messages
    // );
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

export async function onSetPersonaChatState({
  state,
  done,
}: {
  state: AIState;
  done: boolean;
}) {
  "use server";

  if (done) {
    console.log("Pretending to save...", state.chatId);
    //!TODO - save the AI state to the database
    // const personaChat = await PersonaChat.findOne({
    //   _id: state.chatId,
    // });

    // if (personaChat) {
    //   personaChat.aiState = state;
    //   await personaChat.save();
    // } else {
    //   const personaChat: any = await PersonaChat.create({
    //     aiState: state,
    //     user: state.userID,
    //     aiSuggestedChats: [],
    //   });
    // }
  }
}

export async function onGetPersonaChatState(): Promise<ClientMessage[]> {
  "use server";

  const aiState = getAIState();

  if (aiState) {
    console.log("AI state is valid", aiState);
    const uiState = getUIStateFromAIState(aiState);
    return uiState as ClientMessage[];
  } else {
    return [
      {
        id: nanoid(),
        role: "assistant",
        display: (
          <PERSONA_CHAT_AI_COMPONENT_MAP.system.error
            message={"AI state is invalid"}
          />
        ),
      },
    ];
  }
}

export const PERSONA_CHAT_AI = createAI<
  AIState,
  ClientMessage[],
  {
    submitPersonaChatUserMessage: typeof submitPersonaChatUserMessage;
  }
>({
  actions: { submitPersonaChatUserMessage },
  initialUIState: [],
  initialAIState: PERSONA_CHAT_INITIAL_AI_STATE,
  //@ts-ignore
  unstable_onGetUIState: onGetPersonaChatState,
  unstable_onSetAIState: onSetPersonaChatState,
});
