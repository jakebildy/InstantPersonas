import { PersonaChat } from "@/app/(server)/models/personachat.model";

export async function POST(req: Request, res: Response) {
  // a user can only get their own persona chats, filter by the provided userID in the request

  const url = new URL(req.url);

  const chatID = url.searchParams.get("chatID");

  const body = JSON.parse(await req.text());

  // check req.body is not empty
  if (!body.chat) {
    return Response.json({
      error: "No chat provided in request body",
    });
  }

  // Get MongoDB PersonaChats where user matches the provided userID
  const personaChat = await PersonaChat.updateOne({ _id: chatID }, body.chat);

  return Response.json({
    result: personaChat,
  });
}
