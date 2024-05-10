"use client";
import { gradientLightVariants, ColorVariant } from "@/components/variants";
import { motion } from "framer-motion";
import { SurveyQuestionTemplate } from "./survey-question-template";
import { Input } from "@/components/ui/input";

export type SurveyQuestionTextInputProps = {
  variant: ColorVariant;
  title: string;
  currentAnswer: string;
  inputPlaceholder: string;
  onSkipQuestion: () => void;
  goBack?: () => void;
  onAnswerQuestion: (answer: string) => void;
  isLastQuestion?: boolean;
};

export function SurveyQuestionTextInput({
  title,
  currentAnswer,
  inputPlaceholder,
  variant,
  onSkipQuestion,
  onAnswerQuestion,
  goBack,
  isLastQuestion = false,
}: SurveyQuestionTextInputProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer"
      key={title + "-text-input-question-container"}
    >
      <SurveyQuestionTemplate
        variant={variant}
        onSkipQuestion={onSkipQuestion}
        goBack={goBack}
        initialAnimation={true}
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
        <motion.div
          className={gradientLightVariants({
            variant: variant,
            className: "col-span-1 w-full  border border-input rounded-md p-2",
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.75, ease: "easeOut" }}
        >
          <Input
            placeholder={inputPlaceholder}
            value={currentAnswer}
            onChange={(e) => onAnswerQuestion(e.target.value)}
          />
        </motion.div>
      </SurveyQuestionTemplate>
    </motion.div>
  );
}
