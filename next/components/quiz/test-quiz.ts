import { QuizBuilderSchema } from "./quiz-builder";

export const TEST_QUIZ: QuizBuilderSchema = {
  title: "General Knowledge Quiz",
  description:
    "A brief quiz to test your general knowledge across various topics.",
  questions: [
    {
      title: "What is the capital of France?",
      choices: [
        { answer: "Paris", correct: true },
        { answer: "London" },
        { answer: "Berlin" },
        { answer: "Madrid" },
      ],
    },
    {
      title: "Which element has the chemical symbol 'O'?",
      choices: [
        { answer: "Gold" },
        { answer: "Oxygen", correct: true },
        { answer: "Silver" },
        { answer: "Hydrogen" },
      ],
    },
    {
      title: "What year did the Titanic sink?",
      choices: [
        { answer: "1912", correct: true },
        { answer: "1905" },
        { answer: "1898" },
        { answer: "1923" },
      ],
    },
  ],
};
