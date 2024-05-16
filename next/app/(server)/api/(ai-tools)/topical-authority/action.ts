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
    const { textStream, warnings, finishReason, usage } = await streamText({
      model: openai(allowFullAccess ? "gpt-4o" : "gpt-3.5-turbo-16k-0613"),
      prompt: TOPICAL_AUTHORITY_PROMPT({ category: input }),
      maxTokens: 4096, // (max limit for completion tokens 3.5) https://platform.openai.com/docs/models/gpt-3-5-turbo
      maxRetries: 3,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
    // console.log("Topical Authority AI usage: ", await usage);
    // console.log("Topical Authority AI finish reason: ", await finishReason);
    // console.log("Topical Authority AI warnings: ", await warnings);
  })();

  return { output: stream.value };
}
