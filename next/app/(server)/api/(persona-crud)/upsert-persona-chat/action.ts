"use server";
import { PERSONA_CHAT_INITIAL_AI_STATE } from "@/app/(server)/ai/persona-chat-ai/initial-ai-state";
import { stringIsMongoID } from "@/app/(server)/api/(persona-crud)/fix-persona-chat/validate-mongo-id";
import {
  PersonaChat,
  PersonaChatDocument,
  PersonaChatType,
  PersonaChatTypeValidator,
} from "@/app/(server)/models/personachat.model";
import { initMongoDB } from "@/app/(server)/mongodb";
import { IS_TEST_DEV_ENV } from "@/lib/utils";
import { UpdateQuery } from "mongoose";

type UpsertPersonaChatInput = {
  id: string;
  userId: string | null | undefined;
  data: UpdateQuery<PersonaChatDocument>;
};

//? This Action will Upsert a Persona Chat by ID
export async function upsertPersonaChat({
  id,
  userId,
  data,
}: UpsertPersonaChatInput): Promise<void> {
  await initMongoDB();

  if (!userId) throw new Error("User ID is required");
  if (!stringIsMongoID(id)) throw new Error("Invalid ID");
  try {
    const targetData = await PersonaChat.findById(id);
    if (!targetData) {
      //? If the chat does not exist, create a new one
      IS_TEST_DEV_ENV ? console.log("DEV: Creating new chat...", id) : null;
      const newChat = PersonaChatTypeValidator.safeParse({
        aiState: {
          ...data,
          chatId: id,
        },
        user: userId,
      });
      if (!newChat.success) {
        // console.error(newChat.error, data, newChat);
        throw new Error(newChat.error.message);
      }
      // console.log("Creating new chat", newChat.data);
      await PersonaChat.create(newChat.data);
      return;
    }
    const targetChat = targetData.toObject() as PersonaChatType;

    if (!targetChat) {
      throw new Error("Chat not found");
    }

    if (targetChat.user !== userId) {
      throw new Error("User Unauthorized");
    }

    const newData = await PersonaChat.findOneAndUpdate(
      { _id: id },
      { $set: { ...data } },
      { new: true },
    );
    const updatedChat = newData?.toObject() as PersonaChatType;
    const updatedChatMessages = updatedChat.aiState.messages;
    IS_TEST_DEV_ENV
      ? console.log("DEV: Updated chat...", updatedChatMessages.length)
      : null;
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
