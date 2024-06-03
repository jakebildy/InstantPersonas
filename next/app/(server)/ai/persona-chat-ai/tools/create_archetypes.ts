"use server";
import { ChatGPT, GPT4 } from "../utils/gpt";
import { getRandomHeadshot } from "../utils/persona_picture";
import { CREATE_PERSONA_PROMPT } from "../utils/prompts";

export async function createArchetypes(
  business: string,
  targetProblem: string
) {
  const systemMessage = CREATE_PERSONA_PROMPT(business, targetProblem);

  const chatResponse = await GPT4(systemMessage);
  let responseText = chatResponse.text.trim();

  let archetypes: any = [];
  let userPersona: any;

  try {
    if (!responseText.startsWith("{")) {
      responseText = responseText.substring(responseText.indexOf("{"));
    }
  } catch (error) {
    throw new Error(
      "1. Failed to parse the generated userPersona JSON. Please try again. Here was the response: " +
        responseText
    );
  }
  try {
    userPersona = JSON.parse(responseText);
  } catch (error) {
    console.log("response text: " + responseText);
    console.log("error: " + error);
    return await createArchetypes(business, targetProblem);
  }
  for (let i = 0; i < userPersona["persona_archetypes"].length; i++) {
    let archetype;
    try {
      archetype = userPersona["persona_archetypes"][i];

      console.log("archetype: " + archetype);
    } catch (error) {
      throw new Error(
        "3. Failed to parse the generated userPersona JSON. Please try again. Here was the response: " +
          responseText
      );
    }
    archetype.pictureURL = await getRandomHeadshot(
      archetype.picture_components.hair,
      archetype.picture_components.glasses,
      archetype.picture_components.clothing
    );
    archetypes.push(archetype);
  }

  console.log("new archetypes: " + archetypes);

  return archetypes;
}
