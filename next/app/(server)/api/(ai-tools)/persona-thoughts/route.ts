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
        "Based on this blog post and these personas, return a list of strings separated by • of what the personas would be thinking when reading this blog post. Only one sentence per persona (ex. If provided with two personas, return two sentences total). Make them specific to the persona. Example response: `Joe:How would this help me achieve my goals?•Sarah:Could I do this at home?`.  \n blog post:" + body.text + " \n\npersonas: " + personas; 
     
      console.log("🚀 system message", systemMessage)
        const chatResponse = await ChatGPT(systemMessage);

      console.log("response: " + chatResponse.text.trim());

     
      return NextResponse.json({
        response: chatResponse.text.trim(),
      });
    } 
  }
}
