import { PersonaChat } from "@/app/(server)/models/personachat.model";
import { PERSONA_TEST_HISTORY } from "./test";
import mongoose from "mongoose";
import { initMongoDB } from "@/database/mongodb";

export async function GET(req: Request) {
  // a user can only get their own persona chats, filter by the provided userID in the request

  const url = new URL(req.url);

  const chatID = url.searchParams.get("chatID");

  // Get MongoDB PersonaChats where user matches the provided userID

  mongoose.connection.readyState === 1 ? console.log("Mongoose Connected") : await initMongoDB();
  const personaChat = await PersonaChat.findOne({ _id: chatID });

  return Response.json({
    result: personaChat,
  });
}
