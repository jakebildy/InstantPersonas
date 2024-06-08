"use client";
import QuizBuilder, { QuizBuilderSchema } from "@/components/quiz/quiz-builder";

const DIGITAL_MARKETING_TEST: QuizBuilderSchema = {
  title: "Digital Marketing Associate Practice Exam",
  description:
    "Test your knowledge of digital marketing with this practice exam for Meta Blueprint's Digital Marketing Associate certification.",
  questions: [
    {
      title:
        "What is one tool that businesses can use to review their privacy and security settings to help keep their accounts secure?",
      choices: [
        { answer: "Data hashing" },
        { answer: "Privacy Checkup", correct: true },
        { answer: "User guides" },
        { answer: "Ad preferences" },
      ],
    },
    {
      title:
        "Which of the following is a reason why an ad might be flagged for rejection?",
      choices: [
        { answer: "The ad did not include a call-to-action." },
        {
          answer: "The ad's landing page was non-functional or disruptive.",
          correct: true,
        },
        { answer: "The ad targeted a broad audience." },
        { answer: "The ad contained high-quality images." },
      ],
    },
    {
      title:
        "In Ads Manager, at what level can you set the budget for your ads?",
      choices: [
        { answer: "Ad set level", correct: true },
        { answer: "Ad level" },
        { answer: "Campaign level" },
      ],
    },
    {
      title: "Which platform can be used to set up a Facebook ad campaign?",
      choices: [
        { answer: "Meta Foresight" },
        { answer: "Mobile Studio" },
        { answer: "Ads Manager", correct: true },
        { answer: "Events Manager" },
      ],
    },
    {
      title: "What can you define at the campaign level in Ads Manager?",
      choices: [
        { answer: "Ad creative" },
        { answer: "Ad placements" },
        { answer: "Campaign objective", correct: true },
        { answer: "Ad budget" },
      ],
    },
    {
      title: "What is a benefit of using Instagram Reels for advertising?",
      choices: [
        { answer: "Reels are limited to images only." },
        { answer: "Reels disappear after 24 hours." },
        {
          answer:
            "Reels can include music, audio clips, and special effects, making them engaging.",
          correct: true,
        },
        { answer: "Reels cannot be shared on Facebook." },
      ],
    },
    {
      title:
        "What action does an advertiser want customers to take if they select engagement as their campaign objective?",
      choices: [
        { answer: "Make a purchase" },
        { answer: "Remember an ad" },
        { answer: "Download an app" },
        { answer: "Like a post", correct: true },
      ],
    },
    {
      title:
        "A clothing advertiser wants to get more people to add items to their cart on their website. What should they do?",
      choices: [
        {
          answer: "Create a campaign with the sales objective.",
          correct: true,
        },
        {
          answer:
            "Create a campaign with the leads objective and contact its leads with relevant information.",
        },
        {
          answer:
            "Reach more people through the video views objective and retarget them with lead ads.",
        },
        {
          answer: "Use the engagement objective to interact with its audience.",
        },
      ],
    },
    {
      title: "What is an advantage of using Advantage+ placements?",
      choices: [
        { answer: "They limit ad delivery to specific platforms." },
        {
          answer:
            "They typically generate the most efficient use of budget and help control costs.",
          correct: true,
        },
        { answer: "They require manual adjustments for each platform." },
        {
          answer:
            "They ensure the campaign budget is spent evenly across each placement.",
        },
      ],
    },
    {
      title: "What kinds of people do lookalike audiences consist of?",
      choices: [
        { answer: "People who have shown interest in a business in the past" },
        { answer: "People who have indicated certain interests" },
        { answer: "People who have visited a business website" },
        {
          answer:
            "People who have similar characteristics to an existing audience",
          correct: true,
        },
      ],
    },
    {
      title:
        "What parameter can be used to reach potential customers and create a new audience in Ads Manager?",
      choices: [
        { answer: "Location", correct: true },
        { answer: "Ethnicity" },
        { answer: "Purchase history" },
        { answer: "Occupation" },
      ],
    },
    {
      title:
        "If a business wants to retarget customers who previously purchased an item from its website, what audience type should it use?",
      choices: [
        { answer: "Website" },
        { answer: "Custom", correct: true },
        { answer: "New" },
        { answer: "Lookalike" },
      ],
    },
    {
      title:
        "A shoe advertiser runs a campaign for a new product launch in September. The 30-day campaign only reaches ten people. What audience might explain the low reach number?",
      choices: [
        {
          answer: "Women ages 18–35 in London who like vegan shoes",
          correct: true,
        },
        { answer: "Women ages 18–35 in London who like shoes" },
        { answer: "Women ages 18–55" },
        { answer: "Adults ages 18–35" },
      ],
    },
    {
      title: "What is a benefit of selecting Advantage+ placements?",
      choices: [
        {
          answer:
            "They ensure the campaign budget will be spent evenly across each placement.",
        },
        {
          answer:
            "They provide the ad delivery systems with increased flexibility to find the best results.",
          correct: true,
        },
        { answer: "They reach more people across Meta technologies." },
        { answer: "They allow for manual adjustments to each ad placement." },
      ],
    },
    {
      title:
        "A business wants to forecast reach for a campaign with a specific audience and budget. Which tool should the advertiser use to perform this task?",
      choices: [
        { answer: "Estimated daily results", correct: true },
        { answer: "Analytics" },
        { answer: "Attribution" },
        { answer: "Audience definition" },
      ],
    },
    {
      title: "What is the purpose of the Conversions API?",
      choices: [
        { answer: "To increase the speed of ad delivery" },
        {
          answer: "To gather customer activity data for better targeting",
          correct: true,
        },
        { answer: "To decrease the cost of ads" },
        { answer: "To provide automatic ad placement" },
      ],
    },
    {
      title: "What is the role of the Meta Pixel?",
      choices: [
        { answer: "To increase ad reach" },
        {
          answer: "To measure ad performance and build audiences",
          correct: true,
        },
        { answer: "To create ad creatives" },
        { answer: "To manage budgets and placements" },
      ],
    },
    {
      title:
        "Which ad format allows multiple images or videos within a single ad, each with its own URL?",
      choices: [
        { answer: "Carousel", correct: true },
        { answer: "Slideshow" },
        { answer: "Collection" },
        { answer: "Instant Experience" },
      ],
    },
    {
      title: "What is a Custom Audience?",
      choices: [
        { answer: "An audience based on demographics and interests" },
        { answer: "An audience similar to an existing customer base" },
        {
          answer: "An audience created from existing customers or visitors",
          correct: true,
        },
        { answer: "An audience targeted by location only" },
      ],
    },
    {
      title: "How can businesses use the WhatsApp Business app?",
      choices: [
        { answer: "To create posts on Facebook" },
        {
          answer: "To connect with customers and create catalogs",
          correct: true,
        },
        { answer: "To run ads on Instagram" },
        { answer: "To schedule posts on Instagram" },
      ],
    },
    {
      title: "What are two types of budgets available in Ads Manager?",
      choices: [
        { answer: "Daily budget and Lifetime budget", correct: true },
        { answer: "Hourly budget and Weekly budget" },
        { answer: "Monthly budget and Annual budget" },
        { answer: "Fixed budget and Variable budget" },
      ],
    },
    {
      title:
        "Which tool can help businesses identify how close they are to reaching their advertising goals?",
      choices: [
        { answer: "Meta Business Suite" },
        { answer: "Ads Manager", correct: true },
        { answer: "Audience Network" },
        { answer: "Creator Studio" },
      ],
    },
    {
      title: "What is the first level of campaign creation in Ads Manager?",
      choices: [
        { answer: "Ad Level" },
        { answer: "Campaign Level", correct: true },
        { answer: "Ad Set Level" },
        { answer: "Budget Level" },
      ],
    },
    {
      title: "What is the primary goal of Awareness objectives in Ads Manager?",
      choices: [
        { answer: "To increase sales" },
        {
          answer: "To generate interest in products or services",
          correct: true,
        },
        { answer: "To collect leads" },
        { answer: "To drive website traffic" },
      ],
    },
    {
      title:
        "What type of budget enables you to maximize results and keep overall costs as low as possible?",
      choices: [
        { answer: "Daily budget" },
        { answer: "Lifetime budget", correct: true },
        { answer: "Weekly budget" },
        { answer: "Monthly budget" },
      ],
    },
    {
      title:
        "Which platform can businesses use to manage their presence on both Facebook and Instagram?",
      choices: [
        { answer: "Meta Creator Studio" },
        { answer: "Meta Business Suite", correct: true },
        { answer: "Meta Ads Manager" },
        { answer: "Meta Analytics" },
      ],
    },
    {
      title:
        "What is a key feature of the WhatsApp Business App that helps businesses interact with customers?",
      choices: [
        { answer: "Image sharing" },
        { answer: "Video calls" },
        { answer: "Catalog creation", correct: true },
        { answer: "Post scheduling" },
      ],
    },
    {
      title:
        "Which ad format is designed to create a fullscreen, post-click experience on mobile?",
      choices: [
        { answer: "Carousel" },
        { answer: "Slideshow" },
        { answer: "Instant Experience", correct: true },
        { answer: "Collection" },
      ],
    },
    {
      title: "What does the Conversions API help advertisers to achieve?",
      choices: [
        { answer: "Increase ad reach" },
        { answer: "Optimize ad targeting and measure results", correct: true },
        { answer: "Create ad creatives" },
        { answer: "Manage budgets and placements" },
      ],
    },
    {
      title: "What are standard events in the context of the Meta Pixel?",
      choices: [
        {
          answer:
            "Predefined actions such as Add to cart, Purchase, and Subscribe",
          correct: true,
        },
        { answer: "Custom actions defined by the advertiser" },
        { answer: "Website visits" },
        { answer: "Page views" },
      ],
    },
  ],
};

export default function DigitalMarketingAssociatePage() {
  return (
    <section className="bg-white">
      <title>
        Free Practice Exam - Meta Blueprint Digital Marketing Associate
      </title>
      <meta
        name="description"
        content="Free practice exam for Meta Blueprint Digital Marketing Associate certification."
      />
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">
            Practice Test - Meta Blueprint Digital Marketing Associate
          </h2>
          <p className="font-light text-gray-500 sm:text-xl">
            Build your marketing knowledge with these practice exams for Meta
            Blueprint certifications.
          </p>
        </div>

        <QuizBuilder schema={DIGITAL_MARKETING_TEST} variant={"blue"} />
        <div className="grid gap-8 lg:grid-cols-2"></div>
        <p className="mt-4 text-center font-light text-gray-500 sm:text-xl">
          We help you understand your target audience and market more
          succesfully.
        </p>
        <p className="mt-4 text-center font-light text-gray-500 sm:text-xl">
          Learn how to supercharge your marketing by creating detailed personas{" "}
          <a className="text-blue-600" href="https://instantpersonas.com/">
            here
          </a>
          .
        </p>

        <div className="text-center text-xs font-light text-gray-500">
          We&apos;re not associated with Meta. This is not an official exam but
          is designed to help you prepare for the real thing.
        </div>
      </div>
    </section>
  );
}
