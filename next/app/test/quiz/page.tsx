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
    <div className="relative flex flex-col items-center justify-center gap-4 px-4 pb-10">
      <div className="relative flex flex-1 flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl bg-gray-100 p-10 shadow-inner">
        <section
          className={shadowVariants({
            variant: variant,
            className:
              "w-[90vw] rounded-2xl bg-white p-6 shadow-2xl focus:outline-none",
          })}
        >
          <QuizBuilder schema={TEST_QUIZ} variant={variant} />
        </section>
      </div>
    </div>
  );
}
