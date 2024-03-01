type TextQuestion = {
  category?: string;
  question: string;
  response_type: "text";
  placeholder?: string;
};

type NumberQuestion = {
  category?: string;
  question: string;
  response_type: "number";
  placeholder?: string;
};

type SelectQuestion = {
  category?: string;
  question: string;
  response_type: "select";
  options: string[];
  placeholder?: string;
};

export type SurveyQuestion = TextQuestion | NumberQuestion | SelectQuestion;

export type OpenAIModels = "gpt-4" | "gpt-3.5-turbo";
