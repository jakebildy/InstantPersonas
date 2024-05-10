"use client";
import { ColorVariant } from "@/components/variants";
import { AnimatePresence, motion } from "framer-motion";
import { SurveyQuestionTemplate } from "./survey-question-template";
import { Button } from "@/components/ui/button";
import { MaxLengthArray } from "@/lib/types";
import { cn } from "@/lib/utils";

export type SurveyQuestionSelectInputProps = {
  title: string;
  currentAnswer: string;
  choices: MaxLengthArray<string, 4> | Readonly<MaxLengthArray<string, 4>>; // Include "Other" as a choice and
  variant: ColorVariant;
  onSkipQuestion: () => void;
  goBack?: () => void;
  onAnswerQuestion: (answer: string) => void;
  isLastQuestion?: boolean;
};

export function SurveyQuestionSelectInput({
  title,
  currentAnswer,
  choices,
  variant,
  onSkipQuestion,
  onAnswerQuestion,
  goBack,
  isLastQuestion,
}: SurveyQuestionSelectInputProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer"
      key={title + "-select-input-question-container"}
    >
      <SurveyQuestionTemplate
        variant={variant}
        onSkipQuestion={onSkipQuestion}
        goBack={goBack}
        isLastQuestion={isLastQuestion}
      >
        <motion.h3
          className="text-lg font-semibold text-gray-800 text-center p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          {title}
        </motion.h3>
        <motion.div className="grid grid-cols-2 gap-4">
          <AnimatePresence>
            {choices.map((choice, i) => (
              <motion.div
                key={choice}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{ delay: 0.5 + (i + 1) * 0.25, ease: "easeOut" }}
                className="col-span-1 w-full"
                layoutId={"job-" + choice}
              >
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full",
                    currentAnswer === choice ||
                      (choice === "Other" &&
                        currentAnswer &&
                        !choices.includes(currentAnswer))
                      ? "bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
                      : ""
                  )}
                  onClick={() =>
                    onAnswerQuestion(currentAnswer === choice ? "" : choice)
                  }
                >
                  {choice}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </SurveyQuestionTemplate>
    </motion.div>
  );
}
