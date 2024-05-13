import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import axios from "axios";
import { NextResponse } from "next/server";
import { GPT4 } from "@/app/(server)/ai/gpt";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const SEARCH_KEY = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY;
const SEARCH_CX = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CX;


export async function POST(req: Request) {

  if (req.body) {
      // Parse the JSON body of the request
      const body = await req.json();

      // Access the 'persona' value from the body
      const persona = body.persona;

    const systemMessage =  "Given a persona, " + persona + ", find a keyword (one word) that the persona would be interested in. just return the keyword.";

    const chatResponse = await GPT4(systemMessage);

    console.log("response: " + chatResponse.text.trim());

    // replace ALL spaces with %20
    const keywordEncoded = encodeURIComponent(chatResponse.text.trim());
    const url = `https://www.googleapis.com/customsearch/v1?key=${SEARCH_KEY}&cx=${SEARCH_CX}&q=${keywordEncoded}+intitle:"write+for+us"`;

    const response = await  axios
      .get(
        url
      );

      return  NextResponse.json({items: response.data.items});
  }
  
}
