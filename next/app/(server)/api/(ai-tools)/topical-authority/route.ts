import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";
import { TOPICAL_AUTHORITY_PROMPT } from "./prompt";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
  // Parse the JSON body of the request
  const { paid, personas } = await req.json();
  const allowFullAccess = paid === true;

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: TOPICAL_AUTHORITY_PROMPT({ personas: personas }),
    },
  ];

  const response = await openai.chat.completions.create({
    model: allowFullAccess ? "gpt-4o" : "gpt-3.5-turbo-16k-0613",
    stream: true,
    messages: messages,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
