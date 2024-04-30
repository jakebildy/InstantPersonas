import { getPersonaChat } from "./function";

export async function GET(req: Request) {
  // a user can only get their own persona chats, filter by the provided userID in the request

  const url = new URL(req.url);

  const chatID = url.searchParams.get("chatID");

  if (!chatID) throw "Chat ID is not defined";
  // Get MongoDB PersonaChats where user matches the provided userID

  const personaChat = await getPersonaChat(chatID);

  return Response.json({
    result: personaChat,
  });
}
