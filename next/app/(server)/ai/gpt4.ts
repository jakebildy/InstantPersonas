import axios from "axios";

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
  