import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import axios from "axios";
import { NextResponse } from "next/server";
import { GPT4 } from "@/app/(server)/ai/gpt";


export async function POST(req: Request) {
  if (req.body) {
    // Parse the JSON body of the request
    const body = await req.json();

    if (body.paid === undefined || body.paid === false) {
      const personas = body.personas;

      const systemMessage =
        "Given these personas, " +
        personas +
        ", find 20 Google search keywords at least one of the personas would be interested in and other people wouldn't be. ONLY return the keywords, separated by commas. this is an example response: 'swimming techniques, swimming gear'";

      const chatResponse = await GPT4(systemMessage);

      console.log("response: " + chatResponse.text.trim());


      // const keywordValues = await axios.post(
      //   'https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live',
      //   [{
      //     location_name: 'United States',
      //     language_name: 'English',
      //     keywords: chatResponse.text.trim().split(/,\s*/)
      //   }],
      //   {
      //     auth: {
      //       username: process.env.DATA_FOR_SEO_USERNAME!,
      //       password: process.env.DATA_FOR_SEO_PASSWORD!
      //     },
      //     headers: {
      //       'content-type': 'application/json'
      //     }
      //   }
      // )
      let keywordResults: any = [];
      // keywordResults = keywordValues.data.tasks[0].result;
       
      // map them to objects where each object contains keyword, 
      // search_volume, cpc, competition are null
      keywordResults = chatResponse.text.trim().split(/,\s*/).map((keyword: string) => {
        return {
          keyword: keyword,
          search_volume: null,
          cpc: null,
          competition: null
        }
      })

      console.log( "keywordResults: ", keywordResults)

      return NextResponse.json({
        keywords: keywordResults,
      });
    } else {
      const personas = body.personas;

      const systemMessage =
        "Given these personas, " +
        personas +
        ", find 50 Google search keywords at least one of the personas would be searching and other people wouldn't be. At least half should be three words or less. ONLY return the keywords, separated by commas. this is an example response: 'swimming techniques, swimming gear'";

      const chatResponse = await GPT4(systemMessage);

      console.log("response: " + chatResponse.text.trim());



      const keywordValues = await axios.post(
        'https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live',
        [{
          location_name: 'United States',
          language_name: 'English',
          keywords: chatResponse.text.trim().split(/,\s*/)
        }],
        {
          auth: {
            username: process.env.DATA_FOR_SEO_USERNAME!,
            password: process.env.DATA_FOR_SEO_PASSWORD!
          },
          headers: {
            'content-type': 'application/json'
          }
        }
      )
      let keywordResults: any = [];
      keywordResults = keywordValues.data.tasks[0].result;

      console.log( "keywordResults: ", keywordResults)

      

      return NextResponse.json({
        keywords: keywordResults,
      });
    }
  }
}
