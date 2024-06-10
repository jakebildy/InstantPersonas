import { nanoid } from "ai";
import {
  AIState,
  AIStateValidator,
  Message,
} from "../../../models/persona-ai.model";
import { PERSONA_CHAT_AI_COMPONENT_MAP } from "@/components/page-specific/generative-ui/messages";

export const getUIStateFromAIState = (aiState: AIState) => {
  const result = AIStateValidator.safeParse(aiState);

  if (result.success) {
    return aiState.messages
      .filter((message) => message.role !== "system")
      .map((message, index) => ({
        id: `${aiState.chatId}-${index}`,
        display: convertAIMessageToUI(message),
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

function convertAIMessageToUI(message: Message): React.ReactNode {
  switch (message.role) {
    case "user":
      return (
        <PERSONA_CHAT_AI_COMPONENT_MAP.user.message message={message.content} />
      );
    case "assistant":
      return convertAssistantMessageToUI(message);
    case "system":
      return (
        <PERSONA_CHAT_AI_COMPONENT_MAP.system.error message={message.content} />
      );
    case "function":
      return (
        <PERSONA_CHAT_AI_COMPONENT_MAP.system.error
          message={
            <div className="flex flex-col gap-1">
              This Message has been depreciated due to changes in our system:
              <span className="text-xs">
                {JSON.stringify(message.content, null, 2)}
              </span>
            </div>
          }
        />
      );
    case "data":
      return (
        <PERSONA_CHAT_AI_COMPONENT_MAP.system.error
          message={
            <div className="flex flex-col gap-1">
              This Message has been depreciated due to changes in our system:
              <span className="text-xs">
                {JSON.stringify(message.content, null, 2)}
              </span>
            </div>
          }
        />
      );
    case "tool":
      return (
        <PERSONA_CHAT_AI_COMPONENT_MAP.system.error
          message={
            <div className="flex flex-col gap-1">
              This Message has been depreciated due to changes in our system:
              <span className="text-xs">
                {JSON.stringify(message.content, null, 2)}
              </span>
            </div>
          }
        />
      );
    default:
      console.error("DEV: Message role is not handled", message);
      return;
  }
}

function convertAssistantMessageToUI(message: Message): React.ReactNode {
  if (!message.tool_calls || message.tool_calls.length === 0) {
    return (
      <PERSONA_CHAT_AI_COMPONENT_MAP.assistant.message
        message={message.content}
      />
    );
  }

  const toolUINodes = message.tool_calls.map((toolCall) => {
    switch (toolCall.name) {
      case "create_persona":
        return (
          <PERSONA_CHAT_AI_COMPONENT_MAP.tool.create_persona
            key={message.id}
            archetypes={JSON.parse(toolCall.arguments)}
          />
        );
      case "update_persona":
        const { origin_archetype, updated_archetype, personaIndex, index } =
          JSON.parse(toolCall.arguments);
        return (
          <PERSONA_CHAT_AI_COMPONENT_MAP.tool.update_persona
            key={message.id}
            personaIndex={personaIndex || index || 0}
            origin_archetype={origin_archetype}
            updated_archetype={updated_archetype}
          />
        );
      case "confirm_business_knowledge":
        return (
          <PERSONA_CHAT_AI_COMPONENT_MAP.tool.confirm_business_knowledge
            key={message.id}
            knowledge={JSON.parse(toolCall.arguments)}
          />
        );
      case "persona_content_consumption":
        return (
          <PERSONA_CHAT_AI_COMPONENT_MAP.tool.persona_content_consumption
            key={message.id}
            videos={JSON.parse(toolCall.arguments)}
          />
        );
      default:
        return (
          <PERSONA_CHAT_AI_COMPONENT_MAP.system.error
            key={message.id}
            message={
              <div>
                Error: Tool call not found
                <br />
                {JSON.stringify(toolCall, null, 2)}
              </div>
            }
          />
        );
    }
  });

  return (
    <>
      {message.content !== "" ? (
        <PERSONA_CHAT_AI_COMPONENT_MAP.assistant.message
          message={message.content}
        />
      ) : null}
      {toolUINodes}
    </>
  );
}
