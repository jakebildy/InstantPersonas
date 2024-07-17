import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 100;

export async function POST(req: Request) {
  const { personas } = await req.json();

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    system:
      "based on the following two personas, what insights might we get from combining them? Try to include the most important aspects of both personas, providing new insights that could not be inferred from the original personas. Your response should be a single paragraph.",
    prompt: `Persona 1: ${personas[0]}\nPersona 2: ${personas[1]}`,
  });

  return result.toAIStreamResponse();
}
