"use server";

import {
  PersonaChat,
  PersonaChatType,
} from "@/app/(server)/models/personachat.model";
import { initMongoDB } from "@/app/(server)/mongodb";
import mongoose from "mongoose";

export async function getPersonaChat(id: string): Promise<PersonaChatType> {
  await initMongoDB();

  if (!id) throw new Error("Chat ID is required");
  let validatedID = "";

  if (mongoose.Types.ObjectId.isValid(id)) {
    validatedID = id;
  } else {
    //Coerce id to string in lowercase
    const stringifiedID = `${id.toLowerCase()}`;
    if (!mongoose.Types.ObjectId.isValid(stringifiedID))
      throw new Error(`Invalid ID: ${stringifiedID}`);
    else validatedID = stringifiedID;
  }

  try {
    const data = await PersonaChat.findById(validatedID);
    const chat = data?.toJSON() as PersonaChatType;

    if (!chat) throw new Error("Chat not found");

    console.log("ID:1 - Chat found", chat);

    return chat as unknown as PersonaChatType;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
