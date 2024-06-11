import { nanoid } from "nanoid";
import { AIState } from "../../models/persona-ai.model";

export const PERSONA_CHAT_INITIAL_AI_STATE: AIState = {
  chatId: nanoid(),
  messages: [],
  suggestedMessages: [],
  business: "",
  personas: [],
  targetProblem: "",
  threadKnowledge: {
    context: "",
    personaCharacteristics: [],
    thresholdRating: 0,
  },
  userId: undefined,
};
