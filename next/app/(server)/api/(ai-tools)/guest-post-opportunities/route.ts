import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import axios from "axios";
import { NextResponse } from "next/server";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const SEARCH_KEY = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY;
const SEARCH_CX = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CX;


export async function POST(req: Request) {

  //TODO: get gpt to figure out key word for this persona


 const response = await  axios
  .get(
    "https://www.googleapis.com/customsearch/v1?key=" + SEARCH_KEY + "&cx=" + SEARCH_CX + "&q=" +
      'swimming + intitle:"write for us"'
  );

  return  NextResponse.json({items: response.data.items});
  
}
