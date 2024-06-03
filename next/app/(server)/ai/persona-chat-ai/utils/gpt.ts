"use server";
import axios from "axios";
import posthog from "posthog-js";

//Pricing Data from  https://www.openai.com/pricing
const ModelPricingInfo = {
  "gpt-3.5-turbo-0125": {
    description:
      "Flagship model of this family, supports a 16K context window and is optimized for dialog.",
    inputPricePerMillion: 0.5,
    outputPricePerMillion: 1.5,
  },
  "gpt-3.5-turbo-instruct": {
    description: "An Instruct model and only supports a 4K context window.",
    inputPricePerMillion: 1.5,
    outputPricePerMillion: 2.0,
  },
  "gpt-4": {
    inputPricePerMillion: 30.0,
    outputPricePerMillion: 60.0,
  },
  "gpt-4-32k": {
    inputPricePerMillion: 60.0,
    outputPricePerMillion: 120.0,
  },
  "gpt-4-turbo-2024-04-09": {
    inputPricePerMillion: 10.0,
    outputPricePerMillion: 30.0,
  },
} as const;

type Models = keyof typeof ModelPricingInfo;

function estimateOpenAiCost({
  promptTokens,
  completionTokens,
  model,
}: {
  promptTokens: number;
  completionTokens: number;
  model: Models;
}) {
  const { inputPricePerMillion, outputPricePerMillion } =
    ModelPricingInfo[model];

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
  model: any = "gpt-4-turbo-2024-04-09"
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

    const { completion_tokens, prompt_tokens, total_tokens } =
      response.data.usage;

    posthog.capture("open-ai-call", {
      model: model,
      prompt_tokens: prompt_tokens,
      completion_tokens: completion_tokens,
      total_tokens: total_tokens,
      estimated_cost: estimateOpenAiCost({
        promptTokens: prompt_tokens,
        completionTokens: completion_tokens,
        model: model,
      }),
    });

    return { response: response.data, text };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get OpenAI chat completion.");
  }
}

export async function ChatGPT(
  prompt: string,
  systemMessages?: string[],
  model: any = "gpt-3.5-turbo-0125"
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

    const { completion_tokens, prompt_tokens, total_tokens } =
      response.data.usage;

    posthog.capture("open-ai-call", {
      model: model,
      prompt_tokens: prompt_tokens,
      completion_tokens: completion_tokens,
      total_tokens: total_tokens,
      estimated_cost: estimateOpenAiCost({
        promptTokens: prompt_tokens,
        completionTokens: completion_tokens,
        model: model,
      }),
    });

    return { response: response.data, text };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get OpenAI chat completion.");
  }
}
