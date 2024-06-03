import { nanoid } from "nanoid";
import { AIState } from "../../models/persona-ai.model";

export const PERSONA_CHAT_INITIAL_AI_STATE: AIState = {
  chatId: nanoid(),
  messages: [],
  suggestedMessages: [
    "Tell me about Instant Personas!",
    "How do I use your Tools?",
    "What specifically should I say about my business?",
  ],
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
