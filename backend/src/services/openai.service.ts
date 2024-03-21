import axios from "axios";
import dotenv from "dotenv";
import openai from "../connections/openai.client";
import { OpenAIModels } from "../types";
dotenv.config();

const apiKey: string = process.env.OPENAI_API_KEY || process.env.OPENAI || "";
if (!apiKey) throw new Error("Missing OpenAI API key.");

export async function GPT4(
  prompt: string,
  systemMessages?: string[],
  model: OpenAIModels = "gpt-4",
): Promise<any> {
  const endpoint = "https://api.openai.com/v1/chat/completions";
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  const _systemMessages =
    systemMessages?.map((message) => {
      return {
        role: "system",
        content: message,
      };
    }) || [];

  const requestBody = {
    model: model,
    messages: [..._systemMessages, { role: "user", content: prompt }],
  };

  try {
    const response = await axios.post(endpoint, requestBody, { headers });
    const text = response.data.choices[0].message.content.trim();
    return { response: response.data, text };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get OpenAI chat completion.");
  }
}

export async function curie(
  prompt = "Who's Joe?",
  temperature = 0.0,
  max_tokens = 500,
): Promise<string> {
  const response = await openai.createCompletion({
    // model: 'text-davinci-003',
    model: "text-curie-001",
    prompt: prompt,
    temperature,
    max_tokens,
    // stop: "User:",
  });

  if (!response.data.choices)
    throw new Error("There was an error running curie.");

  console.log(response.data.choices[0].text);
  return response.data.choices[0].text as string;
}

export async function davinci(
  prompt = "Who's Joe?",
  temperature = 0.0,
  max_tokens = 1500,
): Promise<string> {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature,
    max_tokens,
    // stop: "User:",
  });

  if (!response.data.choices)
    throw new Error("There was an error running curie.");

  console.log(response.data.choices[0].text);
  return response.data.choices[0].text as string;
}
