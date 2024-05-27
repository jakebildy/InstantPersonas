import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import axios from "axios";
import { NextResponse } from "next/server";
import { GPT4 } from "@/app/(server)/ai/gpt";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
  if (req.body) {
    // Parse the JSON body of the request
    const body = await req.json();

      const headline = body.headline;

      const systemMessage =
        "Given this headline, " +
        headline +
        ", respond with the following information separated by commas: number of syllables, a boolean - is the keyword or topic found in the first or last three words of the headline, engagingness (an integer from 1-4 where 4 is EXTREMELY engaging, 3 is engaging, 2 is somewhat engaging, 1 is not engaging), clarity (an integer from 1-4 where 4 is EXTREMELY clear, 1 is not clear at all), power words contained in the headline (if none say 'none'), power words that could be included into this headline to make it more engaging separated by dashes. example output: 5,true,2,3,easy,free-proven,";

      const chatResponse = await GPT4(systemMessage);

      // convert from json to object
      const values = chatResponse.text.trim().split(",");

      console.log("response: " + chatResponse.text.trim());


      // Get the SERP data

      const serpData = await axios.post(
        'https://api.dataforseo.com/v3/serp/google/organic/live/regular',
        [{
          "keyword": encodeURI(headline),
          "language_code": "en",
          "location_code": 2840
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

    // Get page ranks
    // const pageRanks = await axios.post(
    //     'https://api.dataforseo.com/v3/backlinks/bulk_ranks/live',
    //     [{
    //       "targets":[
    //         "forbes.com",
    //         "cnn.com",
    //         "bbc.com",
    //         "yelp.com",
    //         "https://www.apple.com/iphone/",
    //         "https://ahrefs.com/blog/",
    //         "ibm.com",
    //         "https://variety.com/",
    //         "https://stackoverflow.com/",
    //         "www.trustpilot.com"
    //       ],
    //   }],
    //     {
    //       auth: {
    //         username: process.env.DATA_FOR_SEO_USERNAME!,
    //         password: process.env.DATA_FOR_SEO_PASSWORD!
    //       },
    //       headers: {
    //         'content-type': 'application/json'
    //       }
    //     }
    //   )

      // console.log(pageRanks.data)

      // console.log(pageRanks.data.tasks[0].result[0].items)

      return NextResponse.json({
        syllables: values[0],
        skimmability: values[1],
        engagingness: values[2],
        clarity: values[3],
        powerWordsIncluded: values[4].split("-"),
        powerWords: values[5].split("-"),
        serpData: serpData.data.tasks[0].result[0].items.slice(0,10),
        // difficultyScore: pageRanks.data.tasks[0].result[0].items
      });
    
  }
}
