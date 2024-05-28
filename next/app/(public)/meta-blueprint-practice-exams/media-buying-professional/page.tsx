"use client";
import QuizBuilder, { QuizBuilderSchema } from "@/components/quiz/quiz-builder";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const COMMUNITY_MANAGER_TEST: QuizBuilderSchema = {
  title: "Community Manager Practice Exam",
  description:
    "Test your knowledge of digital marketing with this practice exam for Meta Blueprint's Community Manager certification.",
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
  ],
};

export default function CommunityManagerPage() {
  return (
    <section className="bg-white ">
      <title>Free Practice Exam - Meta Blueprint Community Manager</title>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-4xl lg:text-5xl tracking-tight font-extrabold text-gray-900 ">
            Practice Test - Community Manager
          </h2>
          <p className="font-light text-gray-500 sm:text-xl ">
            Build your marketing knowledge with these practice exams for Meta
            Blueprint certifications.
          </p>
        </div>

        <QuizBuilder schema={COMMUNITY_MANAGER_TEST} variant={"blue"} />
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
          We're not associated with Meta. This is not an official exam but is
          designed to help you prepare for the real thing.
        </div>
      </div>
    </section>
  );
}
