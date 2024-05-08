import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";
// const ASSISTANT = process.env.NEXT_PUBLIC_MUSOU_ASSISTANT_KEY as string;

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request

  //! We need to run middleware to make sure users cant spam this

  const { messages } = await req.json();

  // console.log("messages", messages);
  // Ask OpenAI for a streaming chat completion given the prompt

  const response = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    stream: true,
    messages,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
