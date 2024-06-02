import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import axios from "axios";
import { NextResponse } from "next/server";
import { GPT4 } from "@/app/(server)/ai/gpt";

const { ApifyClient } = require("apify-client");

const apifyToken: string = process.env.APIFY_TOKEN || "";
if (!apifyToken) throw new Error("Missing Apify API Token.");

const apify = new ApifyClient({
  token: apifyToken,
});

export async function POST(req: Request) {
  if (req.body) {
    // Parse the JSON body of the request
    const body = await req.json();

    if (body) {
      const personas = body.personas;

      const systemMessage =
        "Given these personas, " +
        personas +
        ", find 20 Instagram hashtags at least one of the personas would be searching and other people wouldn't be. ONLY return the hashtags, separated by commas. this is an example response: '#swim,#swimmingtips'";

      const chatResponse = await GPT4(systemMessage);

      console.log("response: " + chatResponse.text.trim());

      // Prepare Actor input
      const input = {
        "hashtags": chatResponse.text.trim().split(/,\s*/)
      };

      const run = await apify.actor("cHedUknx10dsaavpI").call(input);

      // Fetch and print Actor results from the run's dataset (if any)
      console.log("Results from dataset");
      const { items } = await apify.dataset(run.defaultDatasetId).listItems();



      let relevantAccounts: any = [];

      if (!items) {
        console.log("No items found in the dataset");
        return NextResponse.json({
          accounts: relevantAccounts,
        });
      }
      items.forEach((item: any) => {
          // console.dir(item);

          // Calculate average like count for the top posts in a hashtag
          let totalLikes = 0;
          let totalPosts = 0;
          let averageLikes = null;
          if (item.topPosts) {
        
            item.topPosts.forEach((post: any) => {
              totalLikes += post.likesCount;
              totalPosts++;
            });
          
            averageLikes = totalLikes / totalPosts;
          }

          // hashtagResults.push({"hashtag": item.name, "volume": item.postsCount, "averageLikesOfTopPosts": averageLikes});
      });


      // console.log( "hashtagResults: ", hashtagResults)

      

      return NextResponse.json({
        accounts: relevantAccounts,
      });
    }
  }
}
