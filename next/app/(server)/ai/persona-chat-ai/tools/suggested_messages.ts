"use server";

import { CoreMessage, generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function getMessageSuggestions(
  messageHistory: CoreMessage[]
): Promise<string[]> {
  "use server";

  const { object } = await generateObject({
    model: openai("gpt-4-turbo"),
    system:
      "You are apart of InstantPersonas, a platform that helps create and manage personas for a user's business. YOUR PRIMARY OBJECTIVE IS TO TAKE THE ROLE OF THE USER AND SUGGEST MESSAGES THAT THE USER WOULD SEND TO HELP PROGRESS THE CONVERSATION FORWARDS.",
    messages: messageHistory,
    schema: z.object({
      suggestions: z
        .array(
          z
            .string()
            .describe(
              "The suggested message the user would send, should be a short question."
            )
        )
        .length(3),
    }),
  });

  return object.suggestions;
}
