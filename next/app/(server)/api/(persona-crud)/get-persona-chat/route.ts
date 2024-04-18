import { PersonaChat } from "@/app/(server)/models/personachat.model";
import { PERSONA_TEST_HISTORY } from "./test";

export async function GET(req: Request) {
  // a user can only get their own persona chats, filter by the provided userID in the request

  const url = new URL(req.url);

  const chatID = url.searchParams.get("chatID");

  // Get MongoDB PersonaChats where user matches the provided userID
  const personaChat = await PersonaChat.findOne({ _id: chatID });

  return Response.json({
    result: personaChat,
  });
}
