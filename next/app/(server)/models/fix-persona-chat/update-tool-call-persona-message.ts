import {
  PERSONA_CHAT_AI_TOOL_ARG_VALIDATORS,
  PERSONA_CHAT_AI_TOOL_ARGS_UNIQUE_DESTRUCTURED,
} from "@/components/page-specific/generative-ui/messages";
import {
  AssistantToolCallMessage,
  PersonaArchetype,
  PersonaArchetypeValidator,
} from "../persona-ai.model";
import assert from "node:assert";
import { difference, has } from "lodash";
import { extractKeysFromZodSchema } from "@/lib/utils";

export function updateToolCallPersonaMessage({
  message,
  updatedPersonas,
}: {
  message: AssistantToolCallMessage;
  updatedPersonas: PersonaArchetype[];
}): AssistantToolCallMessage {
  //? Guard clause against invalid messages
  if (
    (message.role !== "assistant" && !message.tool_calls) ||
    message.tool_calls.length === 0
  ) {
    return message;
  }

  const IMPLEMENTED_STRATEGIES_FOR_TOOLS_WITH_PERSONAS: Readonly<
    Partial<keyof typeof PERSONA_CHAT_AI_TOOL_ARG_VALIDATORS>[]
  > = ["create_persona", "update_persona"] as const;

  // Filter for active tools that use personas - requires knowledge of config object
  Object.entries(PERSONA_CHAT_AI_TOOL_ARGS_UNIQUE_DESTRUCTURED).filter(
    ([toolName, props]) => {
      // Extract keys from PersonaArchetypeValidator
      const personaProps = [
        ...new Set(
          extractKeysFromZodSchema(PersonaArchetypeValidator).flatMap((prop) =>
            prop.split("."),
          ),
        ),
      ];

      // Determine the conflicting props
      const toolPropsContainsAllPersonaProps = Array.from(personaProps).every(
        (requiredProp) => props.includes(requiredProp),
      );
      const toolhasImplementedFallbackStrategy =
        IMPLEMENTED_STRATEGIES_FOR_TOOLS_WITH_PERSONAS.includes(
          toolName as Partial<keyof typeof PERSONA_CHAT_AI_TOOL_ARG_VALIDATORS>, // Casting to narrow TS behavior
        );

      // Assert there are no tools, not found in our current strategies, that use props from PersonaArchetypeValidator
      assert(
        toolhasImplementedFallbackStrategy === toolPropsContainsAllPersonaProps,
        `Tool ${toolName} uses props from PersonaArchetypeValidator but does not have an implementation to update personas during validation.\n` +
          JSON.stringify(
            {
              toolName,
              implemented: toolhasImplementedFallbackStrategy,
              hasPersonaProps: toolPropsContainsAllPersonaProps,
              props,
            },
            null,
            2,
          ),
      );
    },
  );

  const fixedToolCalls = message.tool_calls.map((toolCall) => {
    const toolName = toolCall.name;
    const toolArgs = toolCall.arguments;

    switch (toolName) {
      case "create_persona":
        return {
          name: toolName,
          arguments: JSON.stringify(updatedPersonas),
        };
      case "update_persona":
        const { personaIndex, origin_archetype, updated_archetype } = toolArgs;
        // Validate origin_archetype
        const isOriginValid =
          PersonaArchetypeValidator.safeParse(origin_archetype).success;
        const validOriginArchetype = isOriginValid
          ? origin_archetype
          : updatedPersonas[personaIndex];

        // Validate updated_archetype
        const isUpdatedValid =
          PersonaArchetypeValidator.safeParse(updated_archetype).success;
        const validUpdatedArchetype = isUpdatedValid
          ? updated_archetype
          : updatedPersonas[personaIndex];

        return {
          name: toolName,
          arguments: JSON.stringify({
            ...toolArgs,
            origin_archetype: validOriginArchetype,
            updated_archetype: validUpdatedArchetype,
          }),
        };
      default:
        return toolCall;
    }
  });

  return {
    ...message,
    tool_calls: fixedToolCalls,
  };
}
