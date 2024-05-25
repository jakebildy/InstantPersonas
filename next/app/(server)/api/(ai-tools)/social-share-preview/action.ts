"use server";

import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";
import { GENERATE_OPEN_GRAPH_COPYWRITING_PROMPT } from "./prompt";

export async function generateSocialShareCopywriting({
  personas,
  title,
  description,
  paid,
}: {
  personas: string;
  title: string;
  description: string;
  paid: boolean;
}) {
  "use server";

  const stream = createStreamableValue("");
  const allowFullAccess = paid === true;

  (async () => {
    const { textStream, warnings, finishReason, usage } = await streamText({
      model: openai(allowFullAccess ? "gpt-4o" : "gpt-3.5-turbo"),
      prompt: GENERATE_OPEN_GRAPH_COPYWRITING_PROMPT({
        personas,
        title,
        description,
      }),
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
