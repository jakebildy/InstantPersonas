import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import axios from "axios";
import { NextResponse } from "next/server";
import { ChatGPT } from "@/app/(server)/ai/gpt";
import { POWER_WORDS } from "@/util/util";

const calculateDifficultyScore = (pageRanks: any) => {
  let total = 0;
  for (const page of pageRanks) {
    total += page.rank;
  }

  return Math.round(total / pageRanks.length / 10) + 10;
}

function checkSkimmability(headline: string, topic: string): boolean {
  // Split the headline into words
  const words = headline.split(' ');

  // Get the first three and last three words
  const firstThree = words.slice(0, 3);
  const lastThree = words.slice(-3);

  // Check if the topic is mentioned in the first or last three words
  const skimmable = firstThree.some(word => topic.includes(word)) || lastThree.some(word => topic.includes(word));

  return skimmable;
}


export async function POST(req: Request) {
  if (req.body) {
    // Parse the JSON body of the request
    const body = await req.json();

      const headline = body.headline;

      const systemMessage =
        `Given this exact headline/title (it may just be one word), ` +
        headline +
        `, respond in the following ECMA-404 JSON format: 

        {
          topic: string //find the topic, it must be a substring of the headline and match exactly. 
          engagingness: integer //an integer from 1-4 where 4 is EXTREMELY engaging headline/title, 3 is engaging, 2 is somewhat engaging, 1 is not engaging
          clarity: integer //an integer from 1-4 where 4 is EXTREMELY clear headline/title, 1 is not clear at all
        }

        example response:
        "{
          "topic": "Dog Toys",
          "engagingness": 4,
          "clarity": 3
        }"
        `;


      const chatResponse = await ChatGPT(systemMessage);

      // convert from json to object
      try {
        console.log ("response: " + chatResponse.text.trim());
        var values = JSON.parse(chatResponse.text.trim());
      

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
      
    // Get page ranks of 
    const pageRanks = await axios.post(
        'https://api.dataforseo.com/v3/backlinks/bulk_ranks/live',
        [{
          "targets": serpData.data.tasks[0].result[0].items.slice(6,10).map((item: any) => item.url)
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

      console.log("page ranks")
      console.log(pageRanks.data)

      console.log(pageRanks.data.tasks[0].result[0].items)
      
      const DIFFICULTY_SCORE = calculateDifficultyScore(pageRanks.data.tasks[0].result[0].items);

      // split the headline up into each word and compare the lower case word with the list of power words
      const POWER_WORDS_INCLUDED =  headline.split(" ").map((word: string) => word.toLowerCase()).filter((word : string) => POWER_WORDS.map((pw) => pw.toLowerCase()).includes(word));

      return NextResponse.json({
        skimmability: checkSkimmability(headline, values["topic"]),
        engagingness: values["engagingness"],
        clarity: values["clarity"],
        // check if the headline includes any of the above power words: 
        powerWordsIncluded:POWER_WORDS_INCLUDED,
        serpData: serpData.data.tasks[0].result[0].items.slice(0,10),
        difficultyScore: DIFFICULTY_SCORE
      });

    } catch (e) {
      console.log("error parsing chat response")
      console.log(e)

      return NextResponse.error();
    }    
  }
}
