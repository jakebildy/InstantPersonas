import { nanoid } from "ai";
import { AIState, AIStateValidator } from "../../../models/persona-ai.model";
import { PERSONA_CHAT_AI_COMPONENT_MAP } from "@/components/page-specific/generative-ui/messages";

export const getUIStateFromAIState = (aiState: AIState) => {
  const result = AIStateValidator.safeParse(aiState);

  if (result.success) {
    return aiState.messages
      .filter((message) => message.role !== "system")
      .map((message, index) => ({
        id: `${aiState.chatId}-${index}`,
        display:
          message.role === "function" ? (
            message.name === "confirm_business_knowledge" ? (
              <PERSONA_CHAT_AI_COMPONENT_MAP.tool.confirm_business_knowledge
                knowledge={JSON.parse(message.content)}
              />
            ) : message.name === "create_persona" ? (
              <PERSONA_CHAT_AI_COMPONENT_MAP.tool.create_persona
                archetypes={JSON.parse(message.content)}
              />
            ) : message.name === "update_persona" ? (
              <PERSONA_CHAT_AI_COMPONENT_MAP.tool.update_persona
                origin_archetype={JSON.parse(message.content).origin_archetype}
                updated_archetype={
                  JSON.parse(message.content).updated_archetype
                }
                personaIndex={JSON.parse(message.content).index}
              />
            ) : message.name === "persona_content_consumption" ? (
              <PERSONA_CHAT_AI_COMPONENT_MAP.tool.persona_content_consumption
                videos={JSON.parse(message.content)}
              />
            ) : null
          ) : message.role === "user" ? (
            <PERSONA_CHAT_AI_COMPONENT_MAP.user.message
              message={message.content}
            />
          ) : (
            <PERSONA_CHAT_AI_COMPONENT_MAP.assistant.message
              message={message.content}
            />
          ),
      }));
  } else {
    console.error("getUIStateFromAIState Parse Error:", result.error);
    return [
      {
        id: nanoid(),
        display: (
          <PERSONA_CHAT_AI_COMPONENT_MAP.system.error
            message={
              <div>
                Error parsing AI state to UI state.
                <br />
                {result.error.toString()}
              </div>
            }
          />
        ),
      },
    ];
  }
};
