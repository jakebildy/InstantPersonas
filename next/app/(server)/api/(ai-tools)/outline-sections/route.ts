import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import axios from "axios";
import { NextResponse } from "next/server";
import { ChatGPT, GPT4 } from "@/app/(server)/ai/gpt";


export async function POST(req: Request) {
  if (req.body) {
    // Parse the JSON body of the request
    const body = await req.json();

    if (body.title !== undefined) {
      const personas = body.personas;

      const systemMessage =
      "Outline the sections for a blog post with the following title - make them SEO optimized (ex. questions or common search queries) - separate each section with •: " + body.title; 

      const chatResponse = await ChatGPT(systemMessage);

      console.log("response: " + chatResponse.text.trim());

     
      return NextResponse.json({
        response: chatResponse.text.trim(),
      });
    } 
  }
}
