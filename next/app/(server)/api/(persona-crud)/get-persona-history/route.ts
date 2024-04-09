import { PersonaChat } from "@/app/(server)/models/personachat.model";
import { PERSONA_TEST_HISTORY } from "./test";

export async function GET(req: Request) {

  // a user can only get their own persona chats, filter by the provided userID in the request
  const url = new URL(req.url)

  const userID = url.searchParams.get("id")

  // Get MongoDB PersonaChats where user matches the provided userID
  const personaChats = await PersonaChat.find({ user: userID });

  return Response.json({
    results: personaChats,
  });
}
