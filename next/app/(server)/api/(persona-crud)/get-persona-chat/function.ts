"use server";

import { PersonaChat } from "@/app/(server)/models/personachat.model";
import { initMongoDB } from "@/database/mongodb";
import mongoose from "mongoose";

export async function getPersonaChat(id: string) {
  mongoose.connection.readyState === 1
    ? console.log("Mongoose Connected")
    : await initMongoDB();
  const personaChat = await PersonaChat.findOne({ _id: id });

  return personaChat;
}
