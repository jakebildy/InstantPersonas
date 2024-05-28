"use client";

import QuizBuilder from "@/components/quiz/quiz-builder";
import { StartQuiz } from "@/components/quiz/quiz-steps/start-quiz";
import { TEST_QUIZ } from "@/components/quiz/test-quiz";
import { shadowVariants, gradientLightVariants } from "@/components/variants";
import { AnimatePresence } from "framer-motion";
import { MessageSquareHeartIcon } from "lucide-react";

type Props = {};

export default function PageTest({}: Props) {
  const variant = "blue";
  return (
    <div className="flex flex-col gap-4 items-center justify-center relative px-4 pb-10">
      <div className="flex-1 flex flex-col gap-4 items-center justify-center relative bg-gray-100 p-10 rounded-2xl overflow-hidden shadow-inner">
        <section
          className={shadowVariants({
            variant: variant,
            className:
              "bg-white rounded-2xl shadow-2xl  w-[90vw] p-6 focus:outline-none",
          })}
        >
          <QuizBuilder schema={TEST_QUIZ} variant={variant} />
        </section>
      </div>
    </div>
  );
}
