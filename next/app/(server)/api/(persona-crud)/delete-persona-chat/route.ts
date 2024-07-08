import { PersonaChat } from "@/app/(server)/models/personachat.model";
import { IS_TEST_DEV_ENV } from "@/lib/utils";

export async function DELETE(req: Request) {
  // a user can only get their own persona chats, filter by the provided userID in the request

  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return Response.json({
      error: "No chatID provided in request",
    });
  }

  IS_TEST_DEV_ENV && console.log("DEV: Deleting chat with ID: ", id);
  // Get MongoDB PersonaChats where user matches the provided userID
  await PersonaChat.findOneAndDelete({ _id: id });

  return Response.json({
    result: true,
  });
}
