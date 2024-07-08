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

function extractTitleAndDescription(htmlString: string): { title: string | null, description: string | null } {
  // Regular expression to match the <title> tag
  const titleMatch = htmlString.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : null;

  // Regular expression to match the <meta name="description" content="..."> tag
  const descriptionMatch = htmlString.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']\s*\/?>/i);
  const description = descriptionMatch ? descriptionMatch[1] : null;

  return { title, description };
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
   
    const { items } = await apify.dataset(run.defaultDatasetId).listItems();

    const text = htmlToText(items[0].body, {
          wordwrap: 130
      });

    const { title, description } = extractTitleAndDescription(items[0].body);
    const personas = body.personas;

    // Step 1: Check if Personas are Interested in the Content
    const interestedPrompt =
    "Based on this Google search result title and description and the provided personas, return a list of strings separated by • of if the personas would be interested in clicking on this (`YES` or the reason not, one of those responses exactly). Example response: `Joe:doesn't solve my problem•Sarah:YES`.  \n title:" +
    title +
    "\n\ndescription: " + description + 
    " \n\nThe provided personas: " +
    personas;
    const personasInterested = await GPT4(interestedPrompt);
    console.log ("personasInterested: " + personasInterested.text.trim());

    


      // const searchIntentMessage =
      //   "Based on this Google search result title and description and the provided personas, return a list of strings separated by • of what the personas search intent would be if clicking on this (what pain point do they have, assume they don't have any knowledge of the site beforehand, keep it brief). Example response: `Joe:Searched for gift ideas•Sarah:Searched Christmas deals`.  \n title:" +
      //   title +
      //   "\n\ndescription: " + description + 
      //   " \n\nThe provided personas: " +
      //   personas;


      //   // //Step 3: Find objections if this a landing page
      //   // const landingPageObjectionsPrompt =
      //   // "Based on this website, identify any general objections/missing info, a high-converting landing page has social proof, a clear call to action, a defined value prop, and grabs attention. Return either the objections, or if it has all sections of a high converting landing page, return just the string `No objections`. Otherwise, just mention what could be improved in no more than two paragraphs. \n\n the website:" +
      //   // text;

      //   // const landingPageObjections = await GPT4(landingPageObjectionsPrompt);
      //   // console.log ("landingPageObjections: " + landingPageObjections.text.trim());

     
      // const chatResponseSearchIntent = await GPT4(searchIntentMessage);
      // console.log ("chatResponseSearchIntent: " + chatResponseSearchIntent.text.trim());

      const systemMessage =
        "Based on this website and these personas, return a list of strings separated by • of what the personas would be thinking when reading this website + their next action. First try to think of objections they might have, if they've all been handled then think of what they are excited about. Only one sentence per persona (ex. If provided with two personas, return two sentences total). Make them specific to the persona. Also add an emoji conveying their mood from these (😡🙁🫤😐🙂😃). Lastly add their next action. Example response: `Joe:🫤~How would this help me achieve my goals?|clicks away•Sarah:🙂~Could I do this at home?|goes to Landing Page`.  \n website:" +
        text +
        " \n\npersonas: " +
        personas;


      const thoughtsAndActions = await GPT4(systemMessage);

      console.log("response: " + thoughtsAndActions.text.trim());


      return NextResponse.json({
        response: {
          personasInterested: personasInterested.text.trim(),

          // searchIntents: chatResponseSearchIntent.text.trim(),
          thoughtsAndActions: thoughtsAndActions.text.trim()},
      });
    }
  }
}
