"use server";

import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";
import { TOPICAL_AUTHORITY_PROMPT } from "./prompt";

export async function generateTopicalAuthority({
  input,
  paid,
}: {
  input: string;
  paid: boolean;
}) {
  "use server";

  const stream = createStreamableValue("");
  const allowFullAccess = paid === true;

  (async () => {
    const { textStream } = await streamText({
      model: openai(allowFullAccess ? "gpt-4o" : "gpt-3.5-turbo-16k-0613"),
      prompt: TOPICAL_AUTHORITY_PROMPT({ category: input }),
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
