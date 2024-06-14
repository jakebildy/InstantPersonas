"use server";
import { PersonaChatType } from "@/app/(server)/models/personachat.model";
import { CoreMessage, generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import {
  AIState,
  AIStateMetadata,
  AIStateMetadataValidator,
} from "@/app/(server)/models/persona-ai.model";

export async function generateThreadMetadata(
  state: AIState,
): Promise<AIStateMetadata> {
  "use server";

  const { object } = await generateObject({
    model: openai("gpt-4-turbo"),
    system:
      "Based on the following conversation, what would be a good very short title and description for this chat?",
    messages: state.messages as CoreMessage[],
    schema: AIStateMetadataValidator,
  });

  return object;
}
