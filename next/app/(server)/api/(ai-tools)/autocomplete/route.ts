import { ChatGPT } from "@/app/(server)/ai/persona-chat-ai/utils/gpt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.body) {
    // Parse the JSON body of the request
    const body = await req.json();

    if (body.text !== undefined) {
      const personas = body.personas;

      const systemMessage =
        "Keep writing this (at a grade 9 reading level, continue exactly from where the text ends. This is a blog post): " +
        body.text;
      const chatResponse = await ChatGPT(systemMessage);

      console.log("response: " + chatResponse.text.trim());

      return NextResponse.json({
        response: chatResponse.text.trim(),
      });
    }
  }
}
