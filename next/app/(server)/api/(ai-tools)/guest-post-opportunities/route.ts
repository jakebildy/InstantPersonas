import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import axios from "axios";
import { NextResponse } from "next/server";
import { GPT4 } from "@/app/(server)/ai/persona-chat-ai/utils/gpt";

//@ts-ignore
import Outscraper from 'outscraper';


// Outscraper
let outscraper = new Outscraper(process.env.OUTSCRAPER_KEY);

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

    if (body.paid === undefined || body.paid === false) {
      const persona = body.personas;

      const systemMessage =
        "Given a persona, " +
        persona +
        ", find a keyword (two words) that would find a blog the persona would be interested in and other people wouldn't be. It shouldnt have another meaning in a different field. just return the keyword.";

      const chatResponse = await GPT4(systemMessage);

      console.log("response: " + chatResponse.text.trim());

      // replace ALL spaces with %20
      const keywordEncoded = encodeURIComponent(chatResponse.text.trim());
      const easyUrl = `https://www.googleapis.com/customsearch/v1?key=${SEARCH_KEY}&cx=${SEARCH_CX}&q=${keywordEncoded}+intitle:"write+for+us"`;
      const hardUrl = `https://www.googleapis.com/customsearch/v1?key=${SEARCH_KEY}&cx=${SEARCH_CX}&q=${keywordEncoded}+intitle:"guide"+inurl:blog`;

      let response = await axios.get(easyUrl);

      const response2 = await axios.get(hardUrl);
    
      response.data.items = response.data.items.filter((item: any) => {
        return !item.formattedUrl.includes("linkedin.com") && ! item.formattedUrl
        .includes
        ("twitter.com") && !item.formattedUrl.includes("medium.com");
      });

      if (response.data.items.length === 0) {
        return NextResponse.error();
      }

      // for the response.data.items, grab formattedUrl and use outscraper to get the contact information, then insert it into the response.data.items as a new field
      const responseOutscraper = await outscraper.emailsAndContacts(
        response.data.items.map((item: any) => item.formattedUrl)
      );

      for (let i = 0; i < responseOutscraper.length; i++) {
        
        response.data.items[i].emails = responseOutscraper[i].emails;
        // console.log(responseOutscraper[i].emails);
      }

      return NextResponse.json({
        easyToSubmit: response.data.items ?? [],
        hardToSubmit: response2.data.items ?? [],
      });

    } else {
      const personas = body.personas;

      const systemMessage =
        "Given these personas, " +
        personas +
        ", find five keyword (two words max) that would find a blog at least one of the personas would be interested in and other people wouldn't be. It shouldnt have another meaning in a different field. just return the keywords, separated by commas. ex. 'swimming techniques, swimming gear'";

      const chatResponse = await GPT4(systemMessage);

      console.log("response: " + chatResponse.text.trim());

      const keywords = chatResponse.text.trim().split(",");

      let easyToSubmit: any = [];
      let hardToSubmit: any = [];

      for (let i = 0; i < keywords.length; i++) {
        const keywordEncoded = encodeURIComponent(keywords[i]);
        const easyUrl = `https://www.googleapis.com/customsearch/v1?key=${SEARCH_KEY}&cx=${SEARCH_CX}&q=${keywordEncoded}+intitle:"write+for+us"`;
        const hardUrl = `https://www.googleapis.com/customsearch/v1?key=${SEARCH_KEY}&cx=${SEARCH_CX}&q=${keywordEncoded}+intitle:"guide"+inurl:blog`;

        const response = await axios.get(easyUrl);

        const response2 = await axios.get(hardUrl);

        easyToSubmit = easyToSubmit.concat(response.data.items ?? []);
        hardToSubmit = hardToSubmit.concat(response2.data.items ?? []);
      }

      // remove www.linkedin.com, linkedin.com, twitter.com, medium.com from the results
      easyToSubmit = easyToSubmit.filter((item: any) => {
        return !item.formattedUrl.includes("linkedin.com") && ! item.formattedUrl.includes("twitter.com") && !item.formattedUrl.includes("medium.com");
      });

      hardToSubmit = hardToSubmit.filter((item: any) => {
        return !item.formattedUrl.includes("linkedin.com") && ! item.formattedUrl
        .includes
        ("twitter.com") && !item.formattedUrl.includes("medium.com");
      });

      if (easyToSubmit.length === 0 || hardToSubmit.length === 0) {
        return NextResponse.error();
      }

      const responseEasyOutscraper = await outscraper.emailsAndContacts(
        easyToSubmit.map((item: any) => item.formattedUrl)
      );

      for (let i = 0; i < responseEasyOutscraper.length; i++) {
        
        easyToSubmit[i].emails = responseEasyOutscraper[i].emails;
        // console.log(responseOutscraper[i].emails);
      }

      const responseHardOutscraper = await outscraper.emailsAndContacts(
        hardToSubmit.map((item: any) => item.formattedUrl)
      );

      for (let i = 0; i < responseHardOutscraper.length; i++) {
        
        hardToSubmit[i].emails = responseHardOutscraper[i].emails;
        // console.log(responseOutscraper[i].emails);
      }

      return NextResponse.json({
        easyToSubmit: easyToSubmit,
        hardToSubmit: hardToSubmit,
      });
    }
  }
}
