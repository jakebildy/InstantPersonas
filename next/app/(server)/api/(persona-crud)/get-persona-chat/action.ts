"use server";

import { fixPersonaChatHistory } from "@/app/(server)/models/fix-persona-chat/fix-persona-chat-history";
import {
  PersonaChat,
  PersonaChatType,
} from "@/app/(server)/models/personachat.model";
import { initMongoDB } from "@/app/(server)/mongodb";
import { IS_TEST_DEV_ENV } from "@/lib/utils";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export async function getPersonaChat(id: string): Promise<PersonaChatType> {
  await initMongoDB();

  if (!id) throw new Error("Chat ID is required");
  let validatedID = "";

  if (mongoose.Types.ObjectId.isValid(id)) {
    validatedID = id;
  } else {
    //Coerce id to string in lowercase
    const stringifiedID = new ObjectId(`${id.toLowerCase()}`).toString();
    if (!mongoose.Types.ObjectId.isValid(stringifiedID)) {
      IS_TEST_DEV_ENV ? console.error(`Invalid ID: ${stringifiedID}`) : null;
      throw new Error(`Invalid ID: ${stringifiedID}`);
    } else validatedID = stringifiedID;
  }

  try {
    const data = await PersonaChat.findById(validatedID);
    const unverifiedChat = data?.toJSON() as PersonaChatType;
    const chat = (await fixPersonaChatHistory([unverifiedChat])).at(0);

    // if (!chat) throw new Error("Chat not found");
    if (!chat) {
      IS_TEST_DEV_ENV ? console.error(`Chat not found: ${validatedID}`) : null;
      console.error(unverifiedChat);
      // throw new Error(`Chat not found: ${validatedID}`);
      return {} as PersonaChatType;
    }

    return chat;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
