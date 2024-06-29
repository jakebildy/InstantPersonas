import { AssistantToolCallMessage } from "@/app/(server)/models/persona-ai.model";
import {
  PERSONA_CHAT_AI_COMPONENT_MAP,
  PERSONA_CHAT_AI_TOOL_ARG_VALIDATORS,
  PERSONA_CHAT_AI_TOOL_ARGS_UNIQUE_DESTRUCTURED,
} from "@/components/page-specific/generative-ui/messages";
import { fixJson } from "@/lib/fix-json";
import { IS_TEST_DEV_ENV } from "@/lib/utils";

interface Message {
  [key: string]: any;
  content: string;
  role: "function";
}

/**
 * Processes a function message and returns a standardized format.
 *
 * @param message - The message object to be processed.
 * @returns A new formatted message object or undefined if the message is invalid.
 */
export function fixFunctionMessage(
  message: Message,
): AssistantToolCallMessage | undefined {
  // Retrieve all valid tool names from the configuration object
  const validToolNames = new Set(
    Object.keys(PERSONA_CHAT_AI_COMPONENT_MAP.tool),
  );

  // Check if the message contains the 'name' key indicating a structured tool call
  if (message.name) {
    return processNamedMessage(message, validToolNames);
  } else {
    return processLegacyMessage(message);
  }
}

/**
 * Processes a message with a 'name' key.
 *
 * @param message - The message object to be processed.
 * @param validToolNames - A set of valid tool names.
 * @returns A new formatted message object or undefined if the message is invalid.
 */
function processNamedMessage(
  message: Message,
  validToolNames: Set<string>,
): AssistantToolCallMessage | undefined {
  const toolName = message.name;

  if (!validToolNames.has(toolName)) {
    if (IS_TEST_DEV_ENV) {
      console.error("DEV: Invalid function message tool name", message);
    }
    return;
    // TODO: Implement fallback strategy for deprecated tools
  }

  return {
    role: "assistant",
    content: "",
    tool_calls: [
      {
        name: toolName,
        arguments: message.content,
      },
    ],
  };
}

/**
 * Processes a legacy format message.
 *
 * @param message - The legacy message object to be processed.
 * @returns A new formatted message object or undefined if the message is invalid.
 */
function processLegacyMessage(
  message: Message,
): AssistantToolCallMessage | undefined {
  // Parse the JSON content and ensure its validity
  const unvalidatedParams = JSON.parse(fixJson(message.content));
  // Attempt to validate the parameters against all tool argument validators
  const validationResults = getValidationResults(unvalidatedParams);

  //? Special case handling for 'confirm_business_knowledge' tool
  if (unvalidatedParams.business || unvalidatedParams.targetProblem) {
    // We assert that the tool call is `confirm_business_knowledge` as it is the only tool that uses these keys
    Object.entries(PERSONA_CHAT_AI_TOOL_ARGS_UNIQUE_DESTRUCTURED).map(
      ([toolName, props]) => {
        const hasUniqueKeysOfConfirmBusinessTool =
          props.includes("business") || props.includes("targetProblem");
        console.assert(
          !(
            toolName !== "confirm_business_knowledge" &&
            hasUniqueKeysOfConfirmBusinessTool
          ),
          `Code logic error: ${toolName} tool has unique keys of \`confirm_business_knowledge\`: \`business\` or \`targetProblem\`` +
            "\n" +
            "Please update the code logic to handle this case.",
        );
      },
    );

    const retriedParseResult =
      PERSONA_CHAT_AI_TOOL_ARG_VALIDATORS.confirm_business_knowledge.safeParse({
        knowledge: unvalidatedParams,
      });
    validationResults.push({
      toolName: "confirm_business_knowledge",
      result: retriedParseResult,
    });
  }

  // Filter out successful validation results and select the first successful match
  const matchedToolResult = validationResults.find(
    ({ result }) => result.success,
  );

  if (!matchedToolResult) {
    if (IS_TEST_DEV_ENV) {
      console.error(
        "DEV: ", // Indicate that this log only appears in development environment
        "Potential Breaking Change!: Invalid function message content", // The error message / warning
        "\nFile: fix-function-message.tsx", // The file where the error occurred
        "\nDiagnostic Info: Found deprecated tool call in message content that failed to safely validate into an active tool", // Diagnostic information
        "\nUser Impact: Message will be removed, should not immediately break, consider adding fallback state to display to user or adding the tool", // Effect on User
        message,
        validationResults,
      );
    }
    return;
    // TODO: Implement fallback strategy for deprecated tools
  }

  return {
    role: "assistant",
    content: "",
    tool_calls: [
      {
        name: matchedToolResult.toolName,
        arguments: JSON.stringify(matchedToolResult.result.data),
      },
    ],
  };
}

/**
 * Validates parameters against all tool argument validators.
 *
 * @param unvalidatedParams - The unvalidated parameters to be checked.
 * @returns An array of validation results.
 */
function getValidationResults(
  unvalidatedParams: any,
): { toolName: string; result: any }[] {
  return Object.entries(PERSONA_CHAT_AI_TOOL_ARG_VALIDATORS).map(
    ([toolName, validator]) => ({
      toolName,
      result: validator.safeParse(unvalidatedParams),
    }),
  );
}
