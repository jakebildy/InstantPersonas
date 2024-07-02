import { ChatGPT, GPT4 } from "@/app/(server)/ai/persona-chat-ai/utils/gpt";
import { NextResponse } from "next/server";
const { ApifyClient } = require("apify-client");
const { htmlToText } = require('html-to-text');

const apifyToken: string = process.env.APIFY_TOKEN || "";
if (!apifyToken) throw new Error("Missing Apify API Token.");

const apify = new ApifyClient({
  token: apifyToken,
});

async function pageFunction(context: any) {
  return {
      body: context.body,
  };
}

export async function POST(req: Request) {
  if (req.body) {
    // Parse the JSON body of the request
    const body = await req.json();

    if (body.url !== undefined) {

      // Scrape the URL

      const input = {
        "startUrls": [
          {
              "url": body.url,
          }
      ],
      "keepUrlFragments": false,
      "globs": [
          {
              "glob": "https://crawlee.dev/*/*"
          }
      ],
      "pseudoUrls": [],
      "excludes": [
          {
              "glob": "/**/*.{png,jpg,jpeg,pdf}"
          }
      ],
      "linkSelector": "a[href]",
      "proxyConfiguration": {
          "useApifyProxy": true
      },
      "proxyRotation": "RECOMMENDED",
      "initialCookies": [],
      "additionalMimeTypes": [],
      "forceResponseEncoding": false,
      "ignoreSslErrors": false,
        "pageFunction": pageFunction,
        "maxRequestRetries": 3,
        "maxPagesPerCrawl": 0,
        "maxResultsPerCrawl": 0,
        "maxCrawlingDepth": 0,
        "maxConcurrency": 50,
        "pageLoadTimeoutSecs": 60,
        "pageFunctionTimeoutSecs": 60,
        "debugLog": false,
        "customData": {}
      };
    
    const run = await apify.actor("YrQuEkowkNCLdk4j2").call(input);
    
    // Fetch and print Actor results from the run's dataset (if any)
    console.log('Results from dataset');
    const { items } = await apify.dataset(run.defaultDatasetId).listItems();

    const text = htmlToText(items[0].body, {
          wordwrap: 130
      });

      const personas = body.personas;

      const systemMessage =
        "Based on this website and these personas, return a list of strings separated by • of what the personas would be thinking when reading this blog post. Only one sentence per persona (ex. If provided with two personas, return two sentences total). Make them specific to the persona. Example response: `Joe:How would this help me achieve my goals?•Sarah:Could I do this at home?`.  \n blog post:" +
        text +
        " \n\npersonas: " +
        personas;

      console.log("🚀 system message! ", systemMessage);
      const chatResponse = await GPT4(systemMessage);

      console.log("response: " + chatResponse.text.trim());

      return NextResponse.json({
        response: chatResponse.text.trim(),
      });
    }
  }
}
