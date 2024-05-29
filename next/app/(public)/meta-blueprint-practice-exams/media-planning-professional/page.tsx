"use client";
import QuizBuilder, { QuizBuilderSchema } from "@/components/quiz/quiz-builder";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const MEDIA_PLANNING_PROFESSIONAL_TEST: QuizBuilderSchema = {
  title: "Media Planning Professional Practice Exam",
  description:
    "Test your knowledge of digital marketing with this practice exam for Meta Blueprint's Media Planning Professional certification.",
  questions: [
    {
      title:
        "What are the three levels of campaign structure in Meta Ads Manager?",
      choices: [
        { answer: "Campaign, ad set, ad", correct: true },
        { answer: "Campaign, group, ad" },
        { answer: "Plan, ad set, ad" },
        { answer: "Campaign, segment, ad" },
      ],
    },
    {
      title:
        "Which type of Meta Business Partner can help you create product catalogs for use in ads, Facebook Marketplace, and Instagram Shop?",
      choices: [
        { answer: "Creative platform partners" },
        { answer: "Campaign management partners" },
        { answer: "Feed platforms partners", correct: true },
        { answer: "Measurement partners" },
      ],
    },
    {
      title:
        "Which campaign objective should a business select if their goal is to collect leads?",
      choices: [
        { answer: "Awareness" },
        { answer: "Traffic" },
        { answer: "Leads", correct: true },
        { answer: "Engagement" },
      ],
    },
    {
      title:
        "What is a key characteristic of reservation buying compared to auction buying?",
      choices: [
        { answer: "Prices fluctuate depending on market conditions" },
        {
          answer: "You can schedule ads to run only during part of the day",
          correct: true,
        },
        { answer: "You need to compete with your bid" },
        { answer: "It is optimized for the selected campaign objective" },
      ],
    },
    {
      title:
        "Which type of ad delivery enables you to serve your ads in a series?",
      choices: [
        { answer: "Standard delivery" },
        { answer: "Accelerated delivery" },
        { answer: "Scheduled delivery" },
        { answer: "Sequenced delivery", correct: true },
      ],
    },
    {
      title: "What are the three main components of a report in Ads Manager?",
      choices: [
        { answer: "Columns, metrics, data" },
        { answer: "Columns, breakdowns, reports", correct: true },
        { answer: "Performance, engagement, conversions" },
        { answer: "Time, delivery, audience action" },
      ],
    },
    {
      title:
        "Which feature in Ads Manager helps to determine which assets are delivered at the moment of delivery?",
      choices: [
        { answer: "Dynamic creative" },
        { answer: "Asset customization", correct: true },
        { answer: "Ad quality" },
        { answer: "Estimated action rates" },
      ],
    },
    {
      title:
        "What is the goal of using Advantage+ placements in Meta Ads Manager?",
      choices: [
        { answer: "To manually select specific placements for ads" },
        {
          answer:
            "To increase delivery and control costs by showing ads on the widest range of available placements",
          correct: true,
        },
        { answer: "To narrow the audience targeting" },
        { answer: "To optimize the ad's quality score" },
      ],
    },
    {
      title:
        "Which metric gives you insight into people's attitudes toward your brand and brand awareness?",
      choices: [
        { answer: "Click-through rate (CTR)" },
        { answer: "Estimated action rates" },
        { answer: "Brand Lift", correct: true },
        { answer: "Conversion Lift" },
      ],
    },
    {
      title: "What is the main purpose of the Conversions API?",
      choices: [
        { answer: "To capture app events via the Facebook SDK" },
        {
          answer: "To send website event data to Meta directly from a server",
          correct: true,
        },
        { answer: "To measure the estimated action rates" },
        { answer: "To manage ad impressions" },
      ],
    },
    {
      title:
        "Which ad format is ideal for reaching people with slower internet connections or older devices?",
      choices: [
        { answer: "Single image" },
        { answer: "Single video" },
        { answer: "Slideshow", correct: true },
        { answer: "Instant Experience" },
      ],
    },
    {
      title:
        "Which type of ad should be used to show multiple clickable images or videos that scroll from left to right?",
      choices: [
        { answer: "Single image" },
        { answer: "Carousel", correct: true },
        { answer: "Slideshow" },
        { answer: "Collection" },
      ],
    },
    {
      title:
        "What is the main benefit of using the Meta Pixel on your website?",
      choices: [
        { answer: "To display ads on your website" },
        {
          answer:
            "To understand how people interact with your content after seeing your ads",
          correct: true,
        },
        { answer: "To improve your website's SEO" },
        { answer: "To send email campaigns" },
      ],
    },
    {
      title:
        "Which campaign objective should be selected to encourage people to take an action in a mobile app?",
      choices: [
        { answer: "Awareness" },
        { answer: "Engagement" },
        { answer: "Leads" },
        { answer: "App promotion", correct: true },
      ],
    },
    {
      title: "What is a characteristic of Advantage campaign budget?",
      choices: [
        { answer: "It is only available for the traffic objective" },
        { answer: "It requires manual distribution of the budget" },
        {
          answer: "It optimizes spend across ad sets in real time",
          correct: true,
        },
        { answer: "It is only suitable for campaigns with a single ad set" },
      ],
    },
    {
      title:
        "Which placement should be used to show video ads to people while they're watching videos on websites and apps outside of Facebook, Messenger, or Instagram?",
      choices: [
        { answer: "Facebook Stories" },
        { answer: "Audience Network in-stream video", correct: true },
        { answer: "Instagram Explore" },
        { answer: "Messenger Inbox" },
      ],
    },
    {
      title: "What is the goal of using the Conversions API?",
      choices: [
        { answer: "To create product catalogs" },
        { answer: "To measure offline conversions" },
        {
          answer: "To send website event data to Meta directly from a server",
          correct: true,
        },
        { answer: "To manage ad placements" },
      ],
    },
    {
      title:
        "What should an advertiser do if they suspect their ad performance is declining due to creative fatigue?",
      choices: [
        { answer: "Pause the ad indefinitely" },
        { answer: "Increase the budget" },
        {
          answer: "Refresh the creative by making changes to the ad",
          correct: true,
        },
        { answer: "Target a broader audience" },
      ],
    },
    {
      title:
        "Which of the following best practices should be considered for creative copy?",
      choices: [
        {
          answer: "Avoid incorporating branding within the first three seconds",
        },
        { answer: "Keep the ad copy short and lead with value", correct: true },
        { answer: "Use long, detailed descriptions" },
        { answer: "Avoid using actionable headlines" },
      ],
    },
    {
      title:
        "Which insights resource provides a hub for insights about audiences, industries, and advertising using anonymized, aggregated internal data and original commissioned research?",
      choices: [
        { answer: "Meta Business Suite" },
        { answer: "Audience overlap tool" },
        { answer: "Meta Foresight", correct: true },
        { answer: "Campaign Planner" },
      ],
    },
    {
      title:
        "Which feature allows you to use a single image or video and shows a personalized ad to each person based on what it appears they are most likely to respond to?",
      choices: [
        { answer: "Dynamic creative" },
        { answer: "Advantage+ creative", correct: true },
        { answer: "Automated rules" },
        { answer: "Custom audiences" },
      ],
    },
    {
      title: "What is the main benefit of using Advantage campaign budget?",
      choices: [
        { answer: "It allows manual distribution of budget" },
        {
          answer: "It optimizes spend across ad sets in real time",
          correct: true,
        },
        { answer: "It provides detailed analytics" },
        { answer: "It enables targeting of niche audiences" },
      ],
    },
    {
      title:
        "Which type of ad format pairs images and video together to increase discovery and sales?",
      choices: [
        { answer: "Slideshow" },
        { answer: "Instant Experience" },
        { answer: "Collection", correct: true },
        { answer: "Carousel" },
      ],
    },
    {
      title: "What is a benefit of using Meta Pixel on your website?",
      choices: [
        { answer: "It allows you to send email campaigns" },
        { answer: "It helps improve your website's SEO" },
        {
          answer:
            "It enables you to understand how people interact with your content after seeing your ads",
          correct: true,
        },
        { answer: "It helps create product catalogs" },
      ],
    },
    {
      title:
        "Which bidding strategy should a client use if they want the highest possible value per optimization event while also spending the entire budget by the end of the day?",
      choices: [
        { answer: "Bid cap" },
        { answer: "Target cost" },
        { answer: "Highest value", correct: true },
        { answer: "Daily budget" },
      ],
    },
    {
      title:
        "Which of the following can measure incremental purchases as a result of ads?",
      choices: [
        { answer: "Brand Lift" },
        { answer: "A/B testing" },
        { answer: "Conversion Lift", correct: true },
        { answer: "GeoLift" },
      ],
    },
    {
      title: "What is the main purpose of the Conversions API?",
      choices: [
        { answer: "To create product catalogs" },
        {
          answer: "To send website event data to Meta directly from a server",
          correct: true,
        },
        { answer: "To measure the estimated action rates" },
        { answer: "To manage ad impressions" },
      ],
    },
    {
      title:
        "What should an advertiser do if they suspect their ad performance is declining due to creative fatigue?",
      choices: [
        { answer: "Pause the ad indefinitely" },
        { answer: "Increase the budget" },
        {
          answer: "Refresh the creative by making changes to the ad",
          correct: true,
        },
        { answer: "Target a broader audience" },
      ],
    },
    {
      title:
        "Which placement should be used to show video ads to people while they're watching videos on websites and apps outside of Facebook, Messenger, or Instagram?",
      choices: [
        { answer: "Facebook Stories" },
        { answer: "Audience Network in-stream video", correct: true },
        { answer: "Instagram Explore" },
        { answer: "Messenger Inbox" },
      ],
    },
    {
      title:
        "Which insights resource provides a hub for insights about audiences, industries, and advertising using anonymized, aggregated internal data and original commissioned research?",
      choices: [
        { answer: "Meta Business Suite" },
        { answer: "Audience overlap tool" },
        { answer: "Meta Foresight", correct: true },
        { answer: "Campaign Planner" },
      ],
    },
  ],
};

export default function MediaPlanningProfessionalPage() {
  return (
    <section className="bg-white ">
      <title>
        Free Practice Exam - Meta Blueprint Media Planning Professional
      </title>
      <meta
        name="description"
        content="Free practice exam for Meta Blueprint Media Planning Professional certification."
      />
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-4xl lg:text-5xl tracking-tight font-extrabold text-gray-900 ">
            Practice Test - Media Planning Professional
          </h2>
          <p className="font-light text-gray-500 sm:text-xl ">
            Build your marketing knowledge with these practice exams for Meta
            Blueprint certifications.
          </p>
        </div>

        <QuizBuilder
          schema={MEDIA_PLANNING_PROFESSIONAL_TEST}
          variant={"blue"}
        />
        <div className="grid gap-8 lg:grid-cols-2"></div>
        <p className="font-light text-gray-500 sm:text-xl mt-4 text-center">
          We help you understand your target audience and market more
          succesfully.
        </p>
        <p className="font-light text-gray-500 sm:text-xl mt-4 text-center">
          Learn how to supercharge your marketing by creating detailed personas{" "}
          <a className="text-blue-600" href="https://instantpersonas.com/">
            here
          </a>
          .
        </p>

        <div className="text-xs text-center text-gray-500 font-light">
          We&apos;re not associated with Meta. This is not an official exam but
          is designed to help you prepare for the real thing.
        </div>
      </div>
    </section>
  );
}
