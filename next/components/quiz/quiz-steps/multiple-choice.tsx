"use client";
import { ColorVariant } from "@/components/variants";
import { AnimatePresence, motion } from "framer-motion";
import { SurveyQuestionTemplate } from "@/components/survey/survey-steps/questions/survey-question-template";
import { Button } from "@/components/ui/button";
import { MaxLengthArray } from "@/lib/types";
import { cn } from "@/lib/utils";

export type QuizQuestionMultipleChoiceInputProps = {
  title: string; //? Question title
  currentAnswer: string; //? Current answer
  choices: MaxLengthArray<string, 4> | Readonly<MaxLengthArray<string, 4>>; //? Choices for the question, should be an array of strings, max length of 4
  // Include "Other" as a choice if you want to allow users to input their own answer
  variant: ColorVariant; //? Style variant
  onSkipQuestion: () => void; //? Function to skip the question, should activate logic to switch to the next question
  goBack?: () => void; //? Function to go back to the previous question
  onAnswerQuestion: (answer: string) => void; //? Function to answer the question, should be some setState function
  isLastQuestion?: boolean; //? If this is the last question, show the submit button instead of the "Next Question" button
};

export function QuizQuestionMultipleChoiceInput({
  title,
  currentAnswer,
  choices,
  variant,
  onSkipQuestion,
  onAnswerQuestion,
  goBack,
  isLastQuestion,
}: QuizQuestionMultipleChoiceInputProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer"
      key={"select-input-question-container"}
    >
      <SurveyQuestionTemplate
        variant={variant}
        onSkipQuestion={onSkipQuestion}
        goBack={goBack}
        isLastQuestion={isLastQuestion}
        finishButtonText="Finish Quiz!"
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
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{ delay: 0.5 + (i + 1) * 0.25, ease: "easeOut" }}
                className="col-span-2 sm:col-span-1 w-full"
                layoutId={"choice" + i}
              >
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full",
                    currentAnswer === choice ||
                      (choice === "Other" &&
                        currentAnswer &&
                        !choices.includes(currentAnswer))
                      ? "bg-blue-600 text-white hover:bg-blue-500 hover:text-white text-[10px] sm:text-sm"
                      : " text-[10px] sm:text-sm"
                  )}
                  onClick={() => {
                    onAnswerQuestion(currentAnswer === choice ? "" : choice);
                  }}
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
