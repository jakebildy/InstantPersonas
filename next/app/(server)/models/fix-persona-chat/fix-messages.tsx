import { IS_TEST_DEV_ENV } from "@/lib/utils";
import { assert } from "console";
import { fixFunctionMessage } from "./fix-function-message";

export function fixPersonaChatMessageHistoryModel(messages: any[]): {
  messages: any[];
} {
  const fixedMessages = messages
    .map((message, i) => {
      if (typeof message !== "object") return;
      const keys = Object.keys(message);

      if (!keys.includes("content") || !keys.includes("role")) {
        IS_TEST_DEV_ENV
          ? console.error("DEV: Message is missing content or role", message)
          : null;
        return;
      }

      assert(typeof message.content === "string", "Content is not a string");
      assert(typeof message.role === "string", "Role is not a string");

      switch (message.role) {
        case "user":
          return {
            role: "user",
            content: message.content,
          };
        case "assistant":
          return {
            role: "assistant",
            content: message.content,
          };
        case "system":
          return {
            role: "system",
            content: message.content,
          };
        case "function":
          return fixFunctionMessage(message);
        case "data":
          console.error("DEV: Message role is not handled", message);
          return;
        case "tool":
          console.error("DEV: Message role is not handled", message);
          return;
        default:
          IS_TEST_DEV_ENV
            ? console.error("DEV: Message role is not valid", message)
            : null;
          return;
      }
    })
    .filter((message) => message);

  return {
    messages: fixedMessages,
  };
}
