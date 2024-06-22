import { NextResponse } from "next/server";
import { ChatGPT } from "@/app/(server)/ai/persona-chat-ai/utils/gpt";

export async function POST(req: Request) {
  if (req.body) {
    // Parse the JSON body of the request
    const body = await req.json();

    if (body.title !== undefined) {
      const personas = body.personas;

      const systemMessage =
        "Outline the sections for a blog post with the following title - make them SEO optimized (ex. questions or common search queries) - separate each section with •: " +
        body.title;

      const chatResponse = await ChatGPT(systemMessage);

      console.log("response: " + chatResponse.text.trim());

      return NextResponse.json({
        response: chatResponse.text.trim(),
      });
    }
  }
}
