import React, { useState } from "react";
import QuizOuterLayout from "./quiz-steps/quiz-outer-layout";
import { StartQuiz } from "./quiz-steps/start-quiz";
import { ColorVariant } from "../variants";
import { QuizQuestionMultipleChoiceInput } from "./quiz-steps/multiple-choice";
import { MaxLengthArray } from "@/lib/types";
import { EndQuiz } from "./quiz-steps/end-quiz";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

type Props = { schema: QuizBuilderSchema; variant: ColorVariant };

export interface QuizBuilderSchema {
  title: string;
  description: string;
  questions: Array<MultipleChoiceQuestion>;
}

export interface MultipleChoiceQuestion {
  title: string;
  choices: {
    answer: string;
    correct?: boolean;
  }[];
}

export interface MultipleChoiceQuestionReview extends MultipleChoiceQuestion {
  selectedAnswer: string;
  correct: boolean;
}

export function useQuizBuilder({ schema, variant }: Props) {
  const [answers, setAnswers] = useState<{
    [key: string]: string | null;
  }>({
    ...schema.questions.reduce(
      (
        initialAnswers: Record<string, string | null>,
        question: MultipleChoiceQuestion,
      ) => {
        initialAnswers[question.title] = null; // Set each question's initial answer to null
        return initialAnswers; // Return the updated accumulator for the next iteration
      },
      {},
    ),
  });
  const [currentQuestion, setCurrentQuestion] = useState<
    "start" | (typeof schema.questions)[number]["title"] | "end"
  >("start");

  const questions = schema.questions.map((question) => {
    return {
      title: question.title,
      choices: question.choices.map((choice) => {
        return {
          answer: choice.answer,
          correct: choice.correct || false,
        };
      }),
    };
  });

  const reviewSchema: MultipleChoiceQuestionReview[] = questions.map(
    (question) => {
      return {
        ...question,
        selectedAnswer: answers[question.title] || "",
        correct:
          answers[question.title] ===
          question.choices.find((choice) => choice.correct)?.answer,
      };
    },
  );

  const quiz: {
    [key: string]: React.ReactNode;
  } = {
    start: (
      <StartQuiz
        variant={variant}
        onStartSurvey={() => setCurrentQuestion(schema.questions[0].title)}
        startButtonText={`Start ${schema.title}!`}
      />
    ),
    ...Object.fromEntries(
      schema.questions.map((question, index) => [
        question.title,
        <QuizQuestionMultipleChoiceInput
          key={question.title}
          title={question.title}
          currentAnswer={answers[question.title] || ""}
          choices={
            question.choices.map((choice) => choice.answer) as MaxLengthArray<
              string,
              4
            >
          }
          onSkipQuestion={() => {
            if (index === schema.questions.length - 1) {
              setCurrentQuestion("end");
            } else {
              setCurrentQuestion(schema.questions[index + 1].title);
            }
          }}
          {...(index > 0 && {
            goBack: () => setCurrentQuestion(schema.questions[index - 1].title),
          })}
          variant={variant}
          isLastQuestion={index === schema.questions.length - 1}
          onAnswerQuestion={(answer) =>
            setAnswers((prev) => ({
              ...prev,
              [question.title]: answer,
            }))
          }
        />,
      ]),
    ),
    end: <EndQuiz variant={variant} reviewSchema={reviewSchema} />,
  };

  return {
    currentQuestion,
    quiz,
    answers,
    isLastQuestion: currentQuestion === "end",
  };
}

export default function QuizBuilder({ schema, variant }: Props) {
  const totalQuestions = schema.questions.length;
  const estimatedTime = (totalQuestions * 45) / 60;

  const { currentQuestion, quiz, answers, isLastQuestion } = useQuizBuilder({
    schema,
    variant,
  });

  return (
    <QuizOuterLayout
      title={schema.title}
      footerText={`Estimated time: ${estimatedTime} minutes`}
      description={schema.description}
      variant={variant}
    >
      {quiz[currentQuestion]}
    </QuizOuterLayout>
  );
}
