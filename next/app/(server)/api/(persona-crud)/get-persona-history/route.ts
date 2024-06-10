import { fixPersonaChatHistory } from "@/app/(server)/models/fix-persona-chat/fix-persona-chat-history";
import { PersonaChat } from "@/app/(server)/models/personachat.model";
import { initMongoDB } from "@/app/(server)/mongodb";

export async function GET(req: Request) {
  // a user can only get their own persona chats, filter by the provided userID in the request
  const url = new URL(req.url);

  const userID = url.searchParams.get("id");

  await initMongoDB();

  // Get MongoDB PersonaChats where user matches the provided userID
  const response = await PersonaChat.find({ user: userID });
  const personaChats = response.map((chat) => ({
    ...chat.toObject(),
    _id: chat._id.toString(),
  }));
  // console.log("personaChats", personaChats);
  // const fixedHistory = await fixPersonaChatHistory(personaChats);

  return Response.json({
    results: personaChats,
  });
}
