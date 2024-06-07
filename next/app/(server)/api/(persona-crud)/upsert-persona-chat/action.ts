"use server";
import {
  PersonaChat,
  PersonaChatDocument,
  PersonaChatType,
} from "@/app/(server)/models/personachat.model";
import { initMongoDB } from "@/app/(server)/mongodb";
import mongoose, { UpdateQuery } from "mongoose";

type UpsertPersonaChatInput = {
  id: string;
  userID: string | null | undefined;
  data: UpdateQuery<PersonaChatDocument>;
};

//? This Action will Upsert a Persona Chat by ID
export async function upsertPersonaChat({
  id,
  userID,
  data,
}: UpsertPersonaChatInput): Promise<void> {
  await initMongoDB();

  if (!userID) throw new Error("User ID is required");
  let validatedID = "";

  if (mongoose.Types.ObjectId.isValid(id)) {
    validatedID = id;
  } else {
    //Coerce id to string in lowercase
    const stringifiedID = `${id.toLowerCase()}`;
    if (!mongoose.Types.ObjectId.isValid(stringifiedID))
      throw new Error("Invalid ID");
    else validatedID = stringifiedID;
  }
  try {
    //returns document BEFORE update
    const response = await PersonaChat.findByIdAndUpdate(
      id,
      { ...data },
      { upsert: true, new: false }
    );
    const chat = response?.toObject() as PersonaChatType;
    if (!chat) throw new Error("Chat not found");
    if (chat.user !== userID) {
      // If the user is not the owner of the chat, reject the request and reset the chat
      await PersonaChat.findByIdAndUpdate(
        id,
        { ...response?.toObject() },
        { upsert: true }
      );
      throw new Error("Unauthorized");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
