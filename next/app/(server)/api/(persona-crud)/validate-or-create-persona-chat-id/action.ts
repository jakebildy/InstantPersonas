import { PERSONA_CHAT_INITIAL_AI_STATE } from "@/app/(server)/ai/persona-chat-ai/initial-ai-state";
import {
  MongoID,
  MongoIDValidator,
} from "@/app/(server)/api/(persona-crud)/fix-persona-chat/validate-mongo-id";
import { PersonaChat } from "@/app/(server)/models/personachat.model";
import { initMongoDB } from "@/app/(server)/mongodb";
import { IS_TEST_DEV_ENV } from "@/lib/utils";

/**
 * Validates an existing chat ID or creates a new one if the validation fails.
 *
 * @param {Object} params - The parameters for the function.
 * @param {any} params.chatId - The ID of the chat to validate.
 * @param {string} params.userId - The user ID for whom the chat is being validated or created.
 * @returns {Promise<MongoID>} - The validated or newly created MongoID.
 * @throws {Error} - Throws an error if ID validation fails after chat creation.
 */
export async function validateOrCreatePersonaChatID({
  chatId,
  userId,
}: {
  chatId: any;
  userId: string;
}): Promise<MongoID> {
  // Initialize MongoDB connection
  await initMongoDB();

  // Validate the existing chat ID
  const validatedId = MongoIDValidator.safeParse(chatId);
  if (validatedId.success) {
    IS_TEST_DEV_ENV
      ? console.log("DEV: Chat ID is valid:", validatedId.data)
      : null;
    return validatedId.data;
  } else {
    IS_TEST_DEV_ENV
      ? console.log("DEV: Chat ID is invalid, creating new chat")
      : null;
    // If validation fails, create a new PersonaChat document
    const newPersonaChat = await PersonaChat.create({
      aiState: {
        ...PERSONA_CHAT_INITIAL_AI_STATE,
        userID: userId,
      },
      user: userId,
    });

    // Validate the new PersonaChat ID
    const newValidatedId = MongoIDValidator.safeParse(newPersonaChat._id);
    if (newValidatedId.success) {
      IS_TEST_DEV_ENV
        ? console.log("DEV: New chat ID is valid:", newValidatedId.data)
        : null;
      return newValidatedId.data;
    } else {
      IS_TEST_DEV_ENV ? console.log("DEV: New chat ID is invalid") : null;
      throw new Error("Invalid ID from chat creation");
    }
  }
}
