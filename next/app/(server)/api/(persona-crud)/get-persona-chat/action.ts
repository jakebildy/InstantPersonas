"use server";

import { fixPersonaChatHistory } from "@/app/(server)/models/fix-persona-chat/fix-persona-chat-history";
import { stringIsMongoID } from "@/app/(server)/models/fix-persona-chat/validate-mongo-id";
import {
  PersonaChat,
  PersonaChatType,
} from "@/app/(server)/models/personachat.model";
import { initMongoDB } from "@/app/(server)/mongodb";

export async function getPersonaChat(id: string): Promise<PersonaChatType> {
  await initMongoDB();

  if (!stringIsMongoID(id)) throw new Error("Invalid ID");
  try {
    const targetData = await PersonaChat.findById(id);
    if (!targetData || targetData === null) throw new Error("Chat not found");
    const targetChat = targetData.toObject() as PersonaChatType;
    const verifiedChat = (
      await fixPersonaChatHistory([
        {
          ...targetChat,
          _id: targetChat._id?.toString(), // replaces mongoObject which is returned as string
        },
      ])
    ).at(0);

    if (!verifiedChat) {
      throw new Error("Chat not found");
    }

    return verifiedChat;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
