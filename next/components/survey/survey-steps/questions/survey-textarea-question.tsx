"use client";
import { ColorVariant, gradientLightVariants } from "@/components/variants";
import { motion } from "framer-motion";
import { SurveyQuestionTemplate } from "./survey-question-template";
import { Textarea } from "@/components/ui/textarea";

export type SurveyQuestionTextAreaProps = {
  variant: ColorVariant; //? Style variant
  title: string; //? Question title
  currentAnswer: string; //? Current answer
  inputPlaceholder: string; //? Placeholder for the input
  onSkipQuestion: () => void; //? Function to skip the question, should activate logic to switch to the next question
  goBack?: () => void; //? Function to go back to the previous question
  onAnswerQuestion: (answer: string) => void; //? Function to answer the question, should be some setState function
  isLastQuestion?: boolean; //? If this is the last question, show the submit button instead of the "Next Question" button
};

export function SurveyQuestionTextArea({
  title,
  currentAnswer,
  inputPlaceholder,
  variant,
  onSkipQuestion,
  onAnswerQuestion,
  goBack,
  isLastQuestion,
}: SurveyQuestionTextAreaProps) {
  return (
    <motion.div
      className="flex cursor-pointer flex-col items-center gap-2"
      key={title + "-text-area-question-container"}
    >
      <SurveyQuestionTemplate
        variant={variant}
        onSkipQuestion={onSkipQuestion}
        goBack={goBack}
        isLastQuestion={isLastQuestion}
      >
        <motion.h3
          className="p-2 text-center text-lg font-semibold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          {title}
        </motion.h3>
        <motion.div
          className={gradientLightVariants({
            variant: variant,
            className: "col-span-1 w-full rounded-md border border-input p-2",
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.75, ease: "easeOut" }}
        >
          <Textarea
            placeholder={inputPlaceholder}
            value={currentAnswer || ""}
            onChange={(e) => onAnswerQuestion(e.target.value)}
            className="h-[150px] max-h-[150px] resize-none"
          />
        </motion.div>
      </SurveyQuestionTemplate>
    </motion.div>
  );
}
