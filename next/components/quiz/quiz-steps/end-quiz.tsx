import {
  badgeVariants,
  ColorVariant,
  gradientLightVariants,
} from "@/components/variants";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpenCheckIcon,
  BookOpenTextIcon,
  LaughIcon,
  MehIcon,
  SmileIcon,
  SparkleIcon,
} from "lucide-react";
import { MultipleChoiceQuestionReview } from "../quiz-builder";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function EndQuiz({
  variant,
  reviewSchema,
}: {
  variant?: ColorVariant;
  reviewSchema: MultipleChoiceQuestionReview[];
}) {
  const gradingThreshold = {
    perfect: 1,
    great: 0.9,
    almostThere: 0.8,
    needsReview: 0.7,
    studyTime: 0.6,
    uhOh: 0.5,
  } as const;

  const totalQuestions = reviewSchema.length;
  const correctAnswers = reviewSchema.filter((answer) => answer.correct).length;
  const score = ((correctAnswers / totalQuestions) * 100).toFixed(
    2,
  ) as unknown as number;
  const grading = (Object.entries(gradingThreshold).find(
    ([_, threshold]) => score >= threshold * 100,
  )?.[0] || "uhOh") as keyof typeof gradingThreshold;

  const endQuizTextVariants = {
    perfect: {
      title: `Perfect score! ${score}%`,
      description: `You got all ${totalQuestions} questions correct! You're a master!`,
      icon: <SparkleIcon className="text-purple-500" />,
    },
    great: {
      title: `Great job! ${correctAnswers}/${totalQuestions} correct!`,
      description: `You're on your way to perfection! ${score}% is so close to perfect!`,
      icon: <LaughIcon className="text-green-500" />,
    },
    almostThere: {
      title: `Almost there! ${correctAnswers}/${totalQuestions} correct!`,
      description: `You're almost there! Keep going! ${score}% is a great score!`,
      icon: <SmileIcon className="text-green-500" />,
    },
    needsReview: {
      title: `Needs review! ${correctAnswers}/${totalQuestions} correct.`,
      description: `We just need a little review! ${score}% is so close to 80%!`,
      icon: <BookOpenCheckIcon className="text-yellow-500" />,
    },
    studyTime: {
      title: `Study time! ${correctAnswers}/${totalQuestions} correct.`,
      description: `You're almost there! Study a bit more ${score}% is so close to 70%! Keep going!`,
      icon: <BookOpenTextIcon className="text-yellow-500" />,
    },
    uhOh: {
      title: `Uh oh! ${correctAnswers}/${totalQuestions} correct.`,
      description: `Good try, ${score}% is close to 60%! Let's try review a bit more and try again!`,
      icon: <MehIcon className="text-red-500" />,
    },
  };

  const ColorVariants = {
    perfect: "purple",
    great: "green",
    almostThere: "green",
    needsReview: "yellow",
    studyTime: "yellow",
    uhOh: "red",
  } as const;

  const { title, description, icon } = endQuizTextVariants[grading];
  const variantColor = ColorVariants[grading];
  const [isReviewing, setIsReviewing] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="flex flex-col items-center gap-2 py-10"
        layoutId={"quiz-end-text"}
        key={"quiz-end-text"}
      >
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-lg font-bold text-gray-700">{title}</h2>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="my-2 w-fit">
          <Button
            variant={"outline"}
            className="h-full w-full rounded-full p-1 hover:scale-100 group-hover:text-primary"
            onClick={() => setIsReviewing((prev) => !prev)}
          >
            <motion.span
              className={gradientLightVariants({
                variant: variantColor,
                className:
                  "h-10 whitespace-nowrap rounded-full border border-input p-2 px-4 font-semibold text-muted-foreground transition-colors duration-150 ease-out group-hover:bg-green-500 group-hover:text-white",
              })}
            >
              {isReviewing ? "Hide Review" : "Review Quiz"}
            </motion.span>
          </Button>
        </div>
      </motion.div>
      <AnimatePresence mode="popLayout">
        {isReviewing && (
          <motion.div
            className="mb-10 grid grid-cols-1 gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {reviewSchema.map((question, questionIndex) => (
              <motion.div
                key={question.title + questionIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{
                  delay: 0.5 + (questionIndex + 1) * 0.25,
                  ease: "easeOut",
                }}
                className="col-span-1 w-full"
                layoutId={question.title + questionIndex}
              >
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-gray-800">
                    {question.title}
                  </p>
                  <p
                    className={badgeVariants({
                      variant: question.correct ? "green" : "red",
                      className: "",
                    })}
                  >
                    {question.correct ? "Correct" : "Incorrect"}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  {question.choices.map((choice, i) => (
                    <motion.div
                      key={choice.answer + i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -200 }}
                      transition={{
                        delay:
                          0.5 + (questionIndex + 1) * 0.25 + (i + 1) * 0.25,
                        ease: "easeOut",
                      }}
                      className="col-span-1 flex w-full items-center gap-2"
                    >
                      <Button
                        variant={"outline"}
                        className={
                          question.selectedAnswer === choice.answer
                            ? "bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
                            : ""
                        }
                      >
                        {choice.answer}
                      </Button>
                      <p
                        className={badgeVariants({
                          variant: choice.correct ? "green" : "blue",
                          className: "empty:hidden",
                        })}
                      >
                        {choice.correct
                          ? "Correct"
                          : choice.answer === question.selectedAnswer
                            ? "Selected Answer"
                            : null}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
