"use client";
import { gradientLightVariants, ColorVariant } from "@/components/variants";
import { motion } from "framer-motion";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { SurveyQuestionTemplate } from "./survey-question-template";
import { MaxLengthArray } from "@/lib/types";

export type SurveyQuestionSliderProps = {
  variant: ColorVariant; //? Style variant
  title: string; //? Question title
  rangeLabels: MaxLengthArray<string, 3>; //? Labels for the slider will be at [0%, 50%, 100%]
  //! If you want to change the number of labels, make edits to layout on line 80
  currentAnswer: string | null; //? Current answer
  onSkipQuestion: () => void; //? Function to skip the question, should activate logic to switch to the next question
  goBack?: () => void; //? Function to go back to the previous question
  onAnswerQuestion: (answer: string) => void; //? Function to answer the question, should be some setState function
  isLastQuestion?: boolean; //? If this is the last question, show the submit button instead of the "Next Question" button
};

export function SurveyQuestionSlider({
  title,
  rangeLabels,
  currentAnswer,
  variant,
  onSkipQuestion,
  onAnswerQuestion,
  goBack,
  isLastQuestion = false,
}: SurveyQuestionSliderProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer"
      key={title + "-slider-question-container"}
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
        <div className="flex flex-col w-full">
          <motion.div
            className={gradientLightVariants({
              variant: variant,
              className:
                "col-span-1 w-full  border border-input rounded-md p-2",
            })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.75, ease: "easeOut" }}
          >
            <SliderPrimitive.Root
              className="relative flex w-full touch-none select-none items-center"
              defaultValue={[parseInt(currentAnswer || "0")]}
              max={100}
              step={1}
              onValueChange={(e) => onAnswerQuestion(e[0].toString())}
            >
              <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                <SliderPrimitive.Range className="absolute h-full bg-blue-500" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-blue-500 bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
            </SliderPrimitive.Root>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.75, ease: "easeOut" }}
            className="flex py-2"
          >
            {rangeLabels.map((label, i) => (
              <span
                key={i}
                className={cn(
                  "text-xs flex-1 text-center text-gray-600 select-none pointer-events-none",
                  i === 0 && "text-left",
                  i === rangeLabels.length - 1 && "text-right"
                )}
              >
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </SurveyQuestionTemplate>
    </motion.div>
  );
}
