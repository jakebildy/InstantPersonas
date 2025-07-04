import { PersonaChat } from "@/app/(server)/models/personachat.model";

export async function POST(req: Request, res: Response) {
  // a user can only get their own persona chats, filter by the provided userID in the request

  const body = JSON.parse(await req.text());

  const chatID = body.id;

  if (!chatID) {
    return Response.json({
      error: "No chatID provided in request",
    });
  }

  // check req.body is not empty
  if (!body.chat) {
    return Response.json({
      error: "No chat provided in request body",
    });
  }

  // Get MongoDB PersonaChats where user matches the provided userID
  const personaChat = await PersonaChat.findOneAndUpdate(
    { _id: chatID },
    { $set: { aiState: body.chat } },
    { new: true },
  );

  return Response.json({
    result: personaChat,
  });
}
