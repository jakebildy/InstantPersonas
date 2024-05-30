import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import axios from "axios";
import { NextResponse } from "next/server";
import { ChatGPT } from "@/app/(server)/ai/gpt";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const POWER_WORDS = [
  "Exclusive", "Revealed", "Secrets",
  "Ultimate", "Proven", "Essential",
  "Unleashed", "Discover", "Breakthrough",
  "Shocking", "Insider", "Elite",
  "Uncovered", "Powerful", "Guaranteed",
  "Transformative", "Instant", "Revolutionary",
  "Unbelievable", "Top", "Best",
  "Must-have", "Limited", "Special",
  "Rare", "Unique", "Unprecedented",
  "Premium", "Urgent", "Exclusive",
  "Today", "Now", "Latest",
  "New", "Free", "Bonus",
  "Offer", "Sensational", "Astonishing",
  "Incredible", "Jaw-dropping", "Unmissable",
  "Essential", "Critical", "Vital",
  "Pivotal", "Game-changer", "Spotlight",
  "Trending", "Hot", "Popular",
  "Featured", "Special", "Limited-time",
  "Hurry", "Last chance", "Countdown",
  "Zen", "Profound", "Awe-inspiring",
  "Extraordinary", "Thrive", "Victory",
  "Effortless", "Jubilant", "Brilliant",
  "Heartwarming", "Light", "Empower",
  "Healthy", "Cheer", "Legendary",
  "Astounding", "Blissful", "Inspiring",
  "Alive", "Wonderful", "Celebrate",
  "Bravery", "Amazing", "Playful",
  "Laugh", "Hilarious", "Fun",
  "Ridiculous", "Wild", "Absurd",
  "Ludicrous", "Farce", "Whimsical",
  "Funniest", "Hilarity", "Comical",
  "Amusement", "Silly", "Jokes",
  "Outlandish", "Luxurious", "Cultivated",
  "Expensive", "Glamorous", "Enchanting",
  "Crave", "Sophisticated", "Urbane",
  "Enthralling", "Members-only", "Desire",
  "Magnetic", "Hidden", "Private",
  "Refined", "Elite", "Thrilling",
  "Charismatic", "Allure", "Exclusive",
  "Suave", "Embrace", "Never-before-seen",
  "Worldly", "Captivating", "Undeniable",
  "Inexplicable", "Eventful", "Ageless",
  "Lasting", "Memorable", "Historic",
  "Unforgettable", "Forever", "Enduring",
  "Monumental", "Eternal", "Distinguished",
  "Timeless", "Illustrious", "Everlasting",
  "Significant", "Remarkable", "Miracle",
  "Introducing", "Wanted", "Magic",
  "Shocking", "Insider", "Revolutionary",
  "Suddenly", "Unusual", "Discover",
  "Life-changing", "Now", "Sensational",
  "Hurry", "Weird", "Latest",
  "Odd", "Announcing", "Spell-binding",
  "Gorgeous", "Heavenly", "Radiant",
  "Pleasing", "Swoon-worthy", "Beautiful",
  "Appealing", "Stunning", "Classy",
  "Dazzling", "Bewitching", "Graceful",
  "Handsome", "Breathtaking", "Tantalizing",
  "Marvelous", "Intoxicating", "Lovely",
  "Grand", "Sublime", "Results",
  "Endorsed", "Verified", "Privacy",
  "Legitimate", "Sample", "Fool-proof",
  "No-questions-asked", "Official", "Tested",
  "Risk-free", "Guaranteed", "Secure",
  "Ensured", "Authentic", "Unconditional",
  "Honesty", "Proven", "Trial",
  "Refund", "Expert", "Professional",
  "Certified", "Scientific", "Protected",
  "Worldwide", "Reliable", "Studies",
  "Recognized", "Best-selling", "Respected",
  "No-strings-attached", "Efficiency", "Cheat-sheet",
  "Minimal", "Tips", "Stress-free",
  "Hacks", "Step-by-step", "Accessible",
  "Cinch", "Easy", "Simple",
  "Painless", "No-hassle", "Tricks",
  "On-demand", "Straightforward", "Adventure",
  "Change", "Beyond", "Revive",
  "Win", "Master", "Tenacious",
  "Convert", "Defy", "After",
  "Renew", "Overcome", "Journey",
  "Fearless", "Complete", "Success",
  "Achieve", "Fix", "Confront",
  "Freedom", "Dominate", "Victory",
  "Fulfill", "Learn", "Triumph",
  "Courageous", "Validate", "Energetic",
  "Ignite", "Quick-start", "Blast",
  "Speed", "Contest", "Bolt",
  "Jumpstart", "Electrify", "Launch",
  "Kick-off", "Amp", "Supercharge",
  "Boost", "Dash"
];


const calculateDifficultyScore = (pageRanks: any) => {
  let total = 0;
  for (const page of pageRanks) {
    total += page.rank;
  }

  return Math.round(total / pageRanks.length / 10) + 10;
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

        { skimmability: boolean //is the keyword/topic found in the first or last three words of the headline
          engagingness: integer //an integer from 1-4 where 4 is EXTREMELY engaging headline/title, 3 is engaging, 2 is somewhat engaging, 1 is not engaging
          clarity: integer //an integer from 1-4 where 4 is EXTREMELY clear headline/title, 1 is not clear at all
        }
        `;


      const chatResponse = await ChatGPT(systemMessage);

      // convert from json to object
      try {
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
      const POWER_WORDS_INCLUDED =  headline.split(" ").map((word: string) => word.toLowerCase()).filter((word : string) => POWER_WORDS.includes(word));

      return NextResponse.json({
        skimmability: values["skimmability"],
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
