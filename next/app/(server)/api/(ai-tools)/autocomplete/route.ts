import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import axios from "axios";
import { NextResponse } from "next/server";
import { ChatGPT, GPT4 } from "@/app/(server)/ai/gpt";


export async function POST(req: Request) {
  if (req.body) {
    // Parse the JSON body of the request
    const body = await req.json();

    if (body.text !== undefined) {
      const personas = body.personas;

      const systemMessage =
        "Write the next 10 words of this (at a grade 9 reading level, continue exactly from where the text ends): " + body.text; 
      const chatResponse = await ChatGPT(systemMessage);

      console.log("response: " + chatResponse.text.trim());

     
      return NextResponse.json({
        response: chatResponse.text.trim(),
      });
    } 
  }
}
