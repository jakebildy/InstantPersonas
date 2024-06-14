"use server";

import { CoreMessage, generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function getMessageSuggestions(
  messageHistory: CoreMessage[],
): Promise<string[]> {
  "use server";

  const { object } = await generateObject({
    model: openai("gpt-4-turbo"),
    messages: messageHistory,
    schema: z.object({
      suggestions: z
        .array(
          z
            .string()
            .describe(
              "Answers the user might provide in response to the AI's last message.",
            ),
        )
        .length(3),
    }),
  });

  return object.suggestions;
}
