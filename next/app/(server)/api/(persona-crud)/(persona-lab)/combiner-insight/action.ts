"use server";

import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";
import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";

export async function getCombinationInsights(
  personas: PersonaArchetype[],
  business: string,
  targetProblem: string,
) {
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = await streamText({
      model: openai("gpt-3.5-turbo"),
      prompt: `
      based on the following two personas, what would a combined persona look like?
      Try to include the most important aspects of both personas.
      The new persona should be a combination of the two, providing new insights that could not be inferred from the original personas.
      Your response should just be the insights generated from combining

      ---
      Persona 1: ${personas[0]}\n
      Persona 2: ${personas[1]}\n
      ---\n
      Business that the personas represent the audience of: ${business}\n
      Target problem that the personas are trying to solve: ${targetProblem}
      `,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
