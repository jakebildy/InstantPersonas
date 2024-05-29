"use client";
import QuizBuilder, { QuizBuilderSchema } from "@/components/quiz/quiz-builder";

const CREATIVE_STRATEGY_PROFESSIONAL_TEST: QuizBuilderSchema = {
  title: "Creative Strategy Professional Practice Exam",
  description:
    "Test your knowledge of digital marketing with this practice exam for Meta Blueprint's Creative Strategy Professional certification.",
  questions: [
    {
      title:
        "Which ad format is recommended for storytelling and showcasing multiple images or videos?",
      choices: [
        { answer: "Single image" },
        { answer: "Carousel", correct: true },
        { answer: "Slideshow" },
        { answer: "Instant Experience" },
      ],
    },
    {
      title:
        "What feature enables you to create a single campaign with multiple language options?",
      choices: [
        { answer: "Dynamic creative" },
        { answer: "Advantage+ placements" },
        { answer: "Dynamic language optimization", correct: true },
        { answer: "Instant Experience" },
      ],
    },
    {
      title:
        "When using Reels ads, what is a key best practice to ensure the ads are engaging?",
      choices: [
        { answer: "Use horizontal aspect ratio" },
        { answer: "Add music and voice-over", correct: true },
        { answer: "Include long-form text" },
        { answer: "Avoid using animations" },
      ],
    },
    {
      title:
        "What should you do if your ad performance declines due to creative fatigue?",
      choices: [
        { answer: "Increase the budget" },
        {
          answer: "Create variations of the ad using Advantage+ creative",
          correct: true,
        },
        { answer: "Reduce the number of placements" },
        { answer: "Extend the campaign duration" },
      ],
    },
    {
      title:
        "What type of ad format uses an interstitial landing page that loads instantly when tapped?",
      choices: [
        { answer: "Slideshow" },
        { answer: "Instant Experience", correct: true },
        { answer: "Carousel" },
        { answer: "Playable ad" },
      ],
    },
    {
      title:
        "Which tool can you use to measure the effectiveness of ad placements and make adjustments for improved performance?",
      choices: [
        { answer: "Meta Creative Hub" },
        { answer: "Ad relevance diagnostics", correct: true },
        { answer: "Audience Insights" },
        { answer: "Facebook Ads Guide" },
      ],
    },
    {
      title: "What is a recommended approach for optimizing videos for mobile?",
      choices: [
        { answer: "Use horizontal videos" },
        { answer: "Create videos longer than 15 seconds" },
        { answer: "Include moving images and animations", correct: true },
        { answer: "Avoid using text overlays" },
      ],
    },
    {
      title:
        "Which audience type is useful when expanding into a new market without existing customers?",
      choices: [
        { answer: "Custom audiences" },
        { answer: "Lookalike audiences", correct: true },
        { answer: "Age targeting" },
        { answer: "Narrow targeting" },
      ],
    },
    {
      title: "What is the benefit of using Advantage+ placements?",
      choices: [
        { answer: "Provides manual control over placements" },
        { answer: "Limits the number of ad placements" },
        {
          answer: "Increases ad exposure and saves time on optimization",
          correct: true,
        },
        { answer: "Requires higher budget allocation" },
      ],
    },
    {
      title:
        "Which feature allows you to run collaborative ads from a creator or partner handle?",
      choices: [
        { answer: "Dynamic creative" },
        { answer: "Advantage+ placements" },
        { answer: "Partnership ads", correct: true },
        { answer: "Instant Experience" },
      ],
    },
    {
      title:
        "Which ad placement strategy can help you extend the reach of an existing campaign?",
      choices: [
        { answer: "Manual placements" },
        { answer: "Advantage+ placements", correct: true },
        { answer: "Custom placements" },
        { answer: "Automated placements" },
      ],
    },
    {
      title: "What is the purpose of using dynamic creative in an ad campaign?",
      choices: [
        { answer: "To create a single static ad" },
        { answer: "To test different ad formats" },
        {
          answer: "To generate optimized ad combinations automatically",
          correct: true,
        },
        { answer: "To limit the number of ad impressions" },
      ],
    },
    {
      title:
        "Which metric measures the impact an ad had on a customer and if they remember seeing the ad during a designated period?",
      choices: [
        { answer: "Clickthrough rate" },
        { answer: "Ad recall", correct: true },
        { answer: "Conversion rate" },
        { answer: "Cost per thousand impressions (CPM)" },
      ],
    },
    {
      title: "What is a best practice for using text in mobile ads?",
      choices: [
        { answer: "Use long and detailed text" },
        { answer: "Place text overlays over important visuals" },
        { answer: "Keep copy short and concise", correct: true },
        { answer: "Avoid using call-to-action buttons" },
      ],
    },
    {
      title:
        "Which of the following is a benefit of using Advantage+ creative?",
      choices: [
        { answer: "Manually optimizes ad placements" },
        {
          answer: "Creates variations of an ad with automated enhancements",
          correct: true,
        },
        { answer: "Increases ad delivery time" },
        { answer: "Limits ad visibility" },
      ],
    },
    {
      title:
        "What should you do if your ad performance is declining due to creative fatigue?",
      choices: [
        { answer: "Increase ad budget" },
        { answer: "Reduce the number of placements" },
        {
          answer: "Refresh your creative and broaden your audience",
          correct: true,
        },
        { answer: "Extend the campaign duration" },
      ],
    },
    {
      title:
        "Which feature allows businesses to reach new people similar to their best existing customers?",
      choices: [
        { answer: "Custom audiences" },
        { answer: "Lookalike audiences", correct: true },
        { answer: "Interest targeting" },
        { answer: "Location targeting" },
      ],
    },
    {
      title:
        "What is the recommended aspect ratio for mobile video ads in Feed placements?",
      choices: [
        { answer: "1:1" },
        { answer: "16:9" },
        { answer: "4:5", correct: true },
        { answer: "9:16" },
      ],
    },
    {
      title:
        "Which tool can help you create and share mockups of ads on Facebook and Instagram?",
      choices: [
        { answer: "Audience Insights" },
        { answer: "Meta Creative Hub", correct: true },
        { answer: "Ad Manager" },
        { answer: "Facebook Ads Guide" },
      ],
    },
    {
      title:
        "What is one of the main benefits of using Reels ads in a campaign?",
      choices: [
        { answer: "They use horizontal aspect ratios" },
        { answer: "They are effective for long-form content" },
        {
          answer: "They can be highly entertaining and shareable",
          correct: true,
        },
        { answer: "They avoid using animations and music" },
      ],
    },
    {
      title:
        "Which metric measures the effectiveness of your ads in terms of brand awareness and perception?",
      choices: [
        { answer: "Clickthrough rate" },
        { answer: "Conversion rate" },
        { answer: "Brand lift", correct: true },
        { answer: "Cost per thousand impressions (CPM)" },
      ],
    },
    {
      title: "What is one of the benefits of using Advantage+ catalog ads?",
      choices: [
        { answer: "Manual ad creation for each product" },
        { answer: "Automatic promotion of your inventory", correct: true },
        { answer: "Higher budget requirements" },
        { answer: "Limited ad placements" },
      ],
    },
    {
      title:
        "What should you do if your ad performance declines due to creative fatigue?",
      choices: [
        { answer: "Keep the original ad active and do not change anything" },
        { answer: "Increase the budget" },
        {
          answer: "Broaden your audience and refresh your creative",
          correct: true,
        },
        { answer: "Reduce the ad frequency" },
      ],
    },
    {
      title:
        "Which type of ad allows users to interact with a demo of a mobile app before installing it?",
      choices: [
        { answer: "Single image ad" },
        { answer: "Carousel ad" },
        { answer: "Playable ad", correct: true },
        { answer: "Video ad" },
      ],
    },
    {
      title:
        "How can you optimize ad delivery to people most likely to engage with your ad?",
      choices: [
        { answer: "Use broad targeting" },
        { answer: "Apply Advantage+ placements" },
        { answer: "Create an Engagement custom audience", correct: true },
        { answer: "Increase the bid amount" },
      ],
    },
    {
      title:
        "Which feature allows you to measure the incremental impact your ad has on sales outcomes?",
      choices: [
        { answer: "Brand Lift" },
        { answer: "Conversion Lift", correct: true },
        { answer: "Meta Ads Reporting" },
        { answer: "Clickthrough rate" },
      ],
    },
    {
      title:
        "What is a recommended approach for using text overlays in mobile video ads?",
      choices: [
        { answer: "Use long and detailed text" },
        { answer: "Avoid using text overlays" },
        {
          answer: "Keep text short and ensure it does not obscure key visuals",
          correct: true,
        },
        { answer: "Place text at the top of the video" },
      ],
    },
    {
      title:
        "Which audience type is ideal for reaching new customers similar to your best existing ones?",
      choices: [
        { answer: "Custom audiences" },
        { answer: "Lookalike audiences", correct: true },
        { answer: "Broad targeting" },
        { answer: "Interest targeting" },
      ],
    },
    {
      title:
        "What tool helps you manage and optimize your ad campaigns by connecting customer actions, including offline and web activity?",
      choices: [
        { answer: "Meta Creative Hub" },
        { answer: "Conversion data partners", correct: true },
        { answer: "Facebook Ads Guide" },
        { answer: "Ad relevance diagnostics" },
      ],
    },
    {
      title:
        "Which ad format is recommended for creating a visually engaging experience using static images or videos that play like a video?",
      choices: [
        { answer: "Instant Experience" },
        { answer: "Carousel" },
        { answer: "Slideshow", correct: true },
        { answer: "Single image" },
      ],
    },
  ],
};

export default function CreativeStrategyProfessionalPage() {
  return (
    <section className="bg-white ">
      <title>
        Free Practice Exam - Meta Blueprint Creative Strategy Professional
      </title>
      <meta
        name="description"
        content="Free practice exam for Meta Blueprint Creative Strategy Professional certification."
      />
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-4xl lg:text-5xl tracking-tight font-extrabold text-gray-900 ">
            Practice Test - Creative Strategy Professional
          </h2>
          <p className="font-light text-gray-500 sm:text-xl ">
            Build your marketing knowledge with these practice exams for Meta
            Blueprint certifications.
          </p>
        </div>

        <QuizBuilder
          schema={CREATIVE_STRATEGY_PROFESSIONAL_TEST}
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
