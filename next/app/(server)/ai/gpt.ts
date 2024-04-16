"use server";
import axios from "axios";

function estimateGPTTurboCost({
  promptTokens,
  completionTokens,
}: {
  promptTokens: number;
  completionTokens: number;
}) {
  const inputPricePerMillion = 10.0; // $10 per million input tokens
  const outputPricePerMillion = 30.0; // $30 per million output tokens

  // Calculate costs
  const inputCost = (promptTokens / 1000000) * inputPricePerMillion;
  const outputCost = (completionTokens / 1000000) * outputPricePerMillion;

  // Total cost
  const totalCost = inputCost + outputCost;

  return totalCost;
}


export async function GPT4(
  prompt: string,
  systemMessages?: string[],
  model: any = "gpt-4"
): Promise<any> {
  const endpoint = "https://api.openai.com/v1/chat/completions";
  const headers = {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
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

export async function ChatGPT(
  prompt: string,
  systemMessages?: string[],
  model: any = "gpt-3.5-turbo"
): Promise<any> {
  const endpoint = "https://api.openai.com/v1/chat/completions";
  const headers = {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
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
