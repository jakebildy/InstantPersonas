"use client";
import QuizBuilder, { QuizBuilderSchema } from "@/components/quiz/quiz-builder";

const MEDIA_BUYING_PROFESSIONAL_TEST: QuizBuilderSchema = {
  title: "Media Buying Professional Practice Exam",
  description:
    "Test your knowledge of digital marketing with this practice exam for Meta Blueprint's Media Buying Professional certification.",
  questions: [
    {
      title:
        "Which of the following is a key reason for ad rejection according to Meta Advertising Standards?",
      choices: [
        { answer: "High-quality images." },
        { answer: "Targeting a broad audience." },
        {
          answer: "Non-functional landing page.",
          correct: true,
        },
        { answer: "Including a call-to-action." },
      ],
    },
    {
      title: "What does Meta's Advantage+ shopping campaigns aim to improve?",
      choices: [
        { answer: "Creative management only." },
        {
          answer: "Campaign performance and efficiency.",
          correct: true,
        },
        { answer: "Audience interaction alone." },
        { answer: "Ad quality." },
      ],
    },
    {
      title: "What is the main benefit of using Meta's custom audiences?",
      choices: [
        { answer: "Broad audience reach." },
        { answer: "Increased ad spend." },
        {
          answer: "Targeting people who already interacted with your business.",
          correct: true,
        },
        { answer: "Automated ad creation." },
      ],
    },
    {
      title:
        "Which buying type is recommended for campaigns aiming for specific direct responses?",
      choices: [
        { answer: "Reservation buying." },
        {
          answer: "Auction buying.",
          correct: true,
        },
        { answer: "Manual bidding." },
        { answer: "Ad-hoc buying." },
      ],
    },
    {
      title: "What metric does the Awareness campaign objective focus on?",
      choices: [
        { answer: "App installs." },
        { answer: "Purchase conversions." },
        {
          answer: "Ad recall lift.",
          correct: true,
        },
        { answer: "Lead generation." },
      ],
    },
    {
      title:
        "How can businesses control where their ads appear across Facebook and Instagram?",
      choices: [
        { answer: "Using ad budgets." },
        { answer: "Optimizing ad creative." },
        {
          answer: "Using brand safety controls.",
          correct: true,
        },
        { answer: "Increasing ad spend." },
      ],
    },
    {
      title:
        "What is a common reason for an ad to be flagged during the review process?",
      choices: [
        { answer: "Including a detailed description of products." },
        {
          answer: "Misleading landing page content.",
          correct: true,
        },
        { answer: "Using non-offensive language." },
        { answer: "Targeting international audiences." },
      ],
    },
    {
      title:
        "Which bid strategy is best for achieving the most conversions within a specific budget?",
      choices: [
        { answer: "Highest volume." },
        {
          answer: "Cost per result goal.",
          correct: true,
        },
        { answer: "Bid cap." },
        { answer: "ROAS goal." },
      ],
    },
    {
      title: "What is the primary function of Meta's Business Manager?",
      choices: [
        { answer: "Creating ad creatives." },
        {
          answer:
            "Managing ad accounts, apps, Pages, and employee permissions.",
          correct: true,
        },
        { answer: "Editing ad text." },
        { answer: "Designing ad images." },
      ],
    },
    {
      title:
        "Which type of custom audience can be created using the Meta Pixel?",
      choices: [
        { answer: "Customer file custom audience." },
        {
          answer: "Website custom audience.",
          correct: true,
        },
        { answer: "App activity custom audience." },
        { answer: "Engagement custom audience." },
      ],
    },
    {
      title:
        "What does the 'Cost per result goal' bid strategy aim to achieve?",
      choices: [
        { answer: "Maximize volume with highest value." },
        {
          answer: "Keep cost per result below a specific threshold.",
          correct: true,
        },
        { answer: "Spend the entire budget without focusing on cost." },
        { answer: "Manually cap bids in each auction." },
      ],
    },
    {
      title:
        "Which bid strategy should be used if you want to maximize the value of conversions?",
      choices: [
        { answer: "Highest volume." },
        { answer: "Bid cap." },
        { answer: "Cost per result goal." },
        { answer: "Highest value.", correct: true },
      ],
    },
    {
      title: "What is the primary advantage of using reservation buying?",
      choices: [
        { answer: "Flexible ad delivery times." },
        { answer: "Predictable ad delivery and fixed CPM.", correct: true },
        { answer: "Maximize the number of conversions." },
        { answer: "Adjust campaign settings in real time." },
      ],
    },
    {
      title:
        "Which campaign objective is suitable for promoting an app install?",
      choices: [
        { answer: "Awareness." },
        { answer: "Engagement." },
        { answer: "App promotion.", correct: true },
        { answer: "Sales." },
      ],
    },
    {
      title: "What does 'Advantage+ catalog ads' aim to optimize?",
      choices: [
        { answer: "Reach and frequency." },
        {
          answer: "Personalized, user-level recommendations from a catalog.",
          correct: true,
        },
        { answer: "General ad exposure." },
        { answer: "Ad creative diversity." },
      ],
    },
    {
      title:
        "Which feature allows for automated distribution of ad spend across all ad sets in a campaign?",
      choices: [
        { answer: "Advantage+ placements." },
        { answer: "Advantage campaign budget.", correct: true },
        { answer: "Standard delivery." },
        { answer: "Dayparting." },
      ],
    },
    {
      title: "What is a key benefit of using machine learning in ad campaigns?",
      choices: [
        { answer: "Static ad targeting." },
        { answer: "Manual budget allocation." },
        {
          answer: "Achieving liquidity by maximizing dollar efficiency.",
          correct: true,
        },
        { answer: "Limited ad personalization." },
      ],
    },
    {
      title:
        "Which type of audience should you use if you want to reengage people who interacted with your business before?",
      choices: [
        { answer: "Lookalike audience." },
        { answer: "Broad audience." },
        { answer: "Custom audience.", correct: true },
        { answer: "Dynamic audience." },
      ],
    },
    {
      title:
        "Which ad delivery option helps in pacing a defined budget over the lifetime of a campaign?",
      choices: [
        { answer: "Daily budget." },
        { answer: "Lifetime budget.", correct: true },
        { answer: "Accelerated delivery." },
        { answer: "Standard delivery." },
      ],
    },
    {
      title: "What is 'Advantage+ detailed targeting' designed to improve?",
      choices: [
        { answer: "Ad creative variety." },
        { answer: "Audience targeting efficiency.", correct: true },
        { answer: "Campaign budget allocation." },
        { answer: "Ad placement diversity." },
      ],
    },
    {
      title:
        "Which tool helps you measure the incremental effect your ads had on brand awareness, perception, or recall?",
      choices: [
        { answer: "A/B testing" },
        { answer: "Conversion Lift" },
        { answer: "Brand Lift", correct: true },
        { answer: "GeoLift" },
      ],
    },
    {
      title: "What does 'CPM' stand for in digital marketing metrics?",
      choices: [
        { answer: "Cost Per Million" },
        { answer: "Cost Per Metric" },
        { answer: "Cost Per Thousand Impressions", correct: true },
        { answer: "Cost Per Member" },
      ],
    },
    {
      title:
        "Which measurement solution can help determine the value of your ads by comparing different strategies?",
      choices: [
        { answer: "GeoLift" },
        { answer: "Conversion Lift", correct: true },
        { answer: "Brand Lift" },
        { answer: "A/B testing" },
      ],
    },
    {
      title:
        "Which metric is used to measure the number of times a link on a webpage is clicked compared to the number of times it’s displayed?",
      choices: [
        { answer: "Cost Per Click (CPC)" },
        { answer: "Clickthrough Rate (CTR)", correct: true },
        { answer: "Impressions" },
        { answer: "Reach" },
      ],
    },
    {
      title: "What does 'Advantage campaign budget' in Ads Manager do?",
      choices: [
        { answer: "Creates ads automatically" },
        {
          answer: "Distributes spend across ad sets for best performance",
          correct: true,
        },
        { answer: "Limits ad exposure to a small audience" },
        { answer: "Automatically designs creative assets" },
      ],
    },
    {
      title: "What is the purpose of using automated rules in Ads Manager?",
      choices: [
        { answer: "To manually manage ad performance" },
        { answer: "To receive notifications for all changes" },
        {
          answer: "To automatically apply actions based on set criteria",
          correct: true,
        },
        { answer: "To design new ad creatives" },
      ],
    },
    {
      title: "What is the main goal of A/B testing in ad campaigns?",
      choices: [
        { answer: "To reach the largest audience possible" },
        {
          answer:
            "To compare different versions of ads to see which performs best",
          correct: true,
        },
        { answer: "To create the most visually appealing ads" },
        { answer: "To reduce ad spend" },
      ],
    },
    {
      title:
        "What are the two main aspects of conversion windows in ad delivery?",
      choices: [
        { answer: "Impression count and view duration" },
        { answer: "Click type and view type" },
        { answer: "Length of time and type of action", correct: true },
        { answer: "Ad quality and engagement rate" },
      ],
    },
    {
      title: "Which of the following is a benefit of using Meta Pixel?",
      choices: [
        { answer: "Automates ad creative design" },
        { answer: "Measures website events and conversions", correct: true },
        { answer: "Limits ad delivery to specific times" },
        { answer: "Increases ad spend efficiency" },
      ],
    },
    {
      title: "What is a key function of the 'Breakdown' menu in Ads Manager?",
      choices: [
        { answer: "Creating new ad creatives" },
        {
          answer: "Segmenting data by time, delivery, or action",
          correct: true,
        },
        { answer: "Automating ad spend" },
        { answer: "Adjusting bid strategies" },
      ],
    },
  ],
};

export default function MediaBuyingProfessionalPage() {
  return (
    <section className="bg-white ">
      <title>
        Free Practice Exam - Meta Blueprint Media Buying Professional
      </title>
      <meta
        name="description"
        content="Free practice exam for Meta Blueprint Media Buying Professional certification."
      />
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-4xl lg:text-5xl tracking-tight font-extrabold text-gray-900 ">
            Practice Test - Media Buying Professional
          </h2>
          <p className="font-light text-gray-500 sm:text-xl ">
            Build your marketing knowledge with these practice exams for Meta
            Blueprint certifications.
          </p>
        </div>

        <QuizBuilder schema={MEDIA_BUYING_PROFESSIONAL_TEST} variant={"blue"} />
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
