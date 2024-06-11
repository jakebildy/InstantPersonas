import { unValidated_getPersonaChat } from "../../get-persona-chat/action";

export async function GET(req: Request) {
  // a user can only get their own persona chats, filter by the provided userID in the request

  const url = new URL(req.url);

  const id = url.searchParams.get("id");

  if (!id) throw "Chat ID is not defined";
  // Get MongoDB PersonaChats where user matches the provided userID

  const personaChat = await unValidated_getPersonaChat(id);

  return Response.json({
    result: personaChat,
  });
}
