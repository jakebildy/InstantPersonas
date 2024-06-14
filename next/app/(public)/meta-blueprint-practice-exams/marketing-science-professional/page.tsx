"use client";
import QuizBuilder, { QuizBuilderSchema } from "@/components/quiz/quiz-builder";

const MARKETING_SCIENCE_PROFESSIONAL_TEST: QuizBuilderSchema = {
  title: "Marketing Science Professional Practice Exam",
  description:
    "Test your knowledge of digital marketing with this practice exam for Meta Blueprint's Marketing Science Professional certification.",
  questions: [
    {
      title:
        "What is the main purpose of defining business goals and KPIs in a marketing strategy?",
      choices: [
        { answer: "To create appealing advertisements" },
        { answer: "To guide strategic decisions", correct: true },
        { answer: "To increase website traffic" },
        { answer: "To boost social media likes" },
      ],
    },
    {
      title: "Which metric is considered a primary KPI for increasing sales?",
      choices: [
        { answer: "Number of mobile app installs" },
        { answer: "Ad recall lift" },
        { answer: "Number of sales units", correct: true },
        { answer: "Number of submitted forms" },
      ],
    },
    {
      title:
        "What is a key characteristic of a strong hypothesis in marketing experiments?",
      choices: [
        { answer: "It should be vague and flexible" },
        { answer: "It should be specific and testable", correct: true },
        { answer: "It should avoid mentioning the audience" },
        { answer: "It should be based on assumptions only" },
      ],
    },
    {
      title:
        "Which measurement approach can be used to test a hypothesis about the efficiency of TV and digital ads?",
      choices: [
        { answer: "A/B test" },
        { answer: "Cross-channel reach reporting", correct: true },
        { answer: "Conversion Lift test" },
        { answer: "Attribution model" },
      ],
    },
    {
      title:
        "What is the primary limitation of using observational methods in marketing research?",
      choices: [
        { answer: "They are experimental and costly" },
        { answer: "They do not allow for causal inferences", correct: true },
        { answer: "They require extensive user interaction" },
        { answer: "They always include control groups" },
      ],
    },
    {
      title:
        "Which type of data refers to information collected directly from Meta?",
      choices: [
        { answer: "Second-party data" },
        { answer: "Third-party data" },
        { answer: "First-party data", correct: true },
        { answer: "None of the above" },
      ],
    },
    {
      title:
        "What is a randomized control trial (RCT) designed to measure in marketing experiments?",
      choices: [
        { answer: "The overall business strategy" },
        { answer: "Incremental impact of ads", correct: true },
        { answer: "Audience demographics" },
        { answer: "Ad creative preferences" },
      ],
    },
    {
      title:
        "Which KPI is best suited to measure the success of a campaign aimed at increasing ad recall?",
      choices: [
        { answer: "Number of website visits" },
        { answer: "Lift in ad recall", correct: true },
        { answer: "Number of conversions" },
        { answer: "Total impressions" },
      ],
    },
    {
      title:
        "Which metric should be used to evaluate the incremental effect of an ad campaign?",
      choices: [
        { answer: "Click-through rate (CTR)" },
        { answer: "Impressions" },
        { answer: "Incremental reach", correct: true },
        { answer: "Likes and comments" },
      ],
    },
    {
      title: "What does an A/B test primarily measure in digital marketing?",
      choices: [
        { answer: "The combined effect of multiple variables" },
        { answer: "The performance of different ad versions", correct: true },
        { answer: "Audience preferences" },
        { answer: "Overall business growth" },
      ],
    },
    {
      title:
        "What is one limitation of the Marketing Mix Modeling (MMM) approach?",
      choices: [
        { answer: "It infers causality" },
        { answer: "It requires high-quality data", correct: true },
        { answer: "It is quick to implement" },
        { answer: "It focuses on in-channel optimization" },
      ],
    },
    {
      title:
        "Which type of data is collected from user actions on websites, mobile apps, or in stores?",
      choices: [
        { answer: "Marketing mix models" },
        { answer: "First-party data", correct: true },
        { answer: "Third-party data" },
        { answer: "Randomized control trial data" },
      ],
    },
    {
      title: "In the context of advertising metrics, what does GRP stand for?",
      choices: [
        { answer: "Gross Rating Point", correct: true },
        { answer: "General Reach Percentage" },
        { answer: "Growth Rate Performance" },
        { answer: "Gross Revenue Projection" },
      ],
    },
    {
      title:
        "Which methodology uses historical data and statistical modeling to assign credit to touchpoints?",
      choices: [
        { answer: "A/B testing" },
        { answer: "Marketing mix modeling" },
        { answer: "Data-driven attribution", correct: true },
        { answer: "Randomized control trial" },
      ],
    },
    {
      title: "What is the primary benefit of using a Conversion Lift test?",
      choices: [
        { answer: "It measures website traffic" },
        { answer: "It measures incremental outcomes", correct: true },
        { answer: "It improves ad creative" },
        { answer: "It analyzes audience demographics" },
      ],
    },
    {
      title:
        "Which bid strategy is best for spending your budget as efficiently as possible?",
      choices: [
        { answer: "Cost per result goal" },
        { answer: "Bid cap" },
        { answer: "Highest volume", correct: true },
        { answer: "ROAS goal" },
      ],
    },
    {
      title:
        "What does a Lift test with statistically significant results help infer?",
      choices: [
        { answer: "Customer satisfaction" },
        { answer: "Incremental impact of ads", correct: true },
        { answer: "Ad creative preferences" },
        { answer: "Overall market trends" },
      ],
    },
    {
      title:
        "Which of the following is a key component of the ad delivery system on Meta platforms?",
      choices: [
        { answer: "Audience demographics" },
        { answer: "Ad auction", correct: true },
        { answer: "Content quality" },
        { answer: "User-generated content" },
      ],
    },
    {
      title:
        "What does the performance optimization system use to predict the best ad auctions?",
      choices: [
        { answer: "Historical ad performance" },
        { answer: "User demographics" },
        { answer: "Machine learning", correct: true },
        { answer: "Manual bidding" },
      ],
    },
    {
      title:
        "Which type of test is used to measure the causal impact of your ads?",
      choices: [
        { answer: "A/B test" },
        { answer: "Randomized control trial (RCT)", correct: true },
        { answer: "Observational method" },
        { answer: "Marketing mix modeling" },
      ],
    },
    {
      title: "Which type of data does Meta Pixel collect?",
      choices: [
        { answer: "Offline sales data" },
        { answer: "Website event data", correct: true },
        { answer: "TV advertising data" },
        { answer: "Third-party data" },
      ],
    },
    {
      title:
        "What does the concept of 'liquidity' refer to in the context of Meta’s machine learning?",
      choices: [
        { answer: "Budget allocation flexibility" },
        { answer: "Ad creative adjustments" },
        { answer: "Optimal resource allocation by Meta", correct: true },
        { answer: "User engagement rates" },
      ],
    },
    {
      title: "What is the purpose of conducting an A/B test?",
      choices: [
        { answer: "To measure overall business growth" },
        { answer: "To compare different ad versions", correct: true },
        { answer: "To analyze website traffic" },
        { answer: "To determine user demographics" },
      ],
    },
    {
      title: "Which of the following describes a multi-cell test?",
      choices: [
        { answer: "A test that only includes one experimental group" },
        {
          answer:
            "A test that runs multiple experimental designs simultaneously",
          correct: true,
        },
        { answer: "A test that measures historical data" },
        { answer: "A test that excludes control groups" },
      ],
    },
    {
      title:
        "What is the main advantage of using a data-driven attribution model?",
      choices: [
        { answer: "It simplifies the ad creation process" },
        {
          answer: "It provides more accurate measurement of incremental value",
          correct: true,
        },
        { answer: "It reduces overall marketing costs" },
        { answer: "It uses a predefined set of rules" },
      ],
    },
    {
      title:
        "Which KPI would be most relevant for a campaign focused on lead generation?",
      choices: [
        { answer: "Ad recall lift" },
        { answer: "Number of conversions" },
        { answer: "Number of submitted forms", correct: true },
        { answer: "Website traffic" },
      ],
    },
    {
      title:
        "What is an example of a dependent variable in a marketing experiment?",
      choices: [
        { answer: "Budget allocated for ads" },
        { answer: "Number of ad impressions" },
        { answer: "Conversion rate", correct: true },
        { answer: "Creative type used in the ad" },
      ],
    },
    {
      title: "What does ROAS stand for in digital marketing metrics?",
      choices: [
        { answer: "Return on Ad Spend", correct: true },
        { answer: "Rate of Audience Segmentation" },
        { answer: "Reach on All Sites" },
        { answer: "Revenue on Ad Sales" },
      ],
    },
    {
      title:
        "Which type of attribution model assigns equal credit to each touchpoint in a conversion path?",
      choices: [
        { answer: "First-touch attribution" },
        { answer: "Last-touch attribution" },
        { answer: "Even credit attribution", correct: true },
        { answer: "Positional attribution" },
      ],
    },
    {
      title:
        "What is the purpose of the 'Ad auction' component in Meta's ad delivery system?",
      choices: [
        { answer: "To determine the overall marketing budget" },
        {
          answer: "To decide the best ad to show to a person at a given time",
          correct: true,
        },
        { answer: "To create new ad creatives" },
        { answer: "To measure ad engagement rates" },
      ],
    },
  ],
};

export default function MarketingScienceProfessionalPage() {
  return (
    <section className="bg-white">
      <title>
        Free Practice Exam - Meta Blueprint Marketing Science Professional
      </title>
      <meta
        name="description"
        content="Free practice exam for Meta Blueprint Marketing Science Professional certification."
      />
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">
            Practice Test - Marketing Science Professional
          </h2>
          <p className="font-light text-gray-500 sm:text-xl">
            Build your marketing knowledge with these practice exams for Meta
            Blueprint certifications.
          </p>
        </div>

        <QuizBuilder
          schema={MARKETING_SCIENCE_PROFESSIONAL_TEST}
          variant={"blue"}
        />
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
