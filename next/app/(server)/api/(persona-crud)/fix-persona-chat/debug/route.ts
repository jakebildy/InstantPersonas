import {
  PersonaChatType,
  PersonaChatTypeValidator,
} from "@/app/(server)/models/personachat.model";
import { isEqual } from "lodash";
import { unValidated_getPersonaChat } from "../../get-persona-chat/action";
import { fixPersonaChatMessageHistoryModel } from "../fix-messages";
import { fixPersonaArchetype } from "../fix-persona-archetype";

export async function GET(req: Request) {
  // a user can only get their own persona chats, filter by the provided userID in the request

  const url = new URL(req.url);

  const id = url.searchParams.get("id");

  if (!id) throw "Chat ID is not defined";
  // Get MongoDB PersonaChats where user matches the provided userID

  const chat = await unValidated_getPersonaChat(id);

  const chatHasPersonas = chat?.aiState?.personas?.length > 0;
  const fixedMessage = await fixPersonaChatMessageHistoryModel({
    messages: chat.aiState?.messages ?? [],
    fixedPersonas: chatHasPersonas
      ? chat.aiState.personas
          .map((persona: any) => fixPersonaArchetype(persona) ?? undefined)
          .filter((persona) => persona !== undefined)
      : undefined,
  });
  const fixedChatHistory: PersonaChatType = {
    ...chat,
    aiState: {
      ...chat.aiState,
      messages: fixedMessage.messages,
      chatId: chat._id ?? id,
    },
  };
  const parseResult = PersonaChatTypeValidator.safeParse(fixedChatHistory);

  if (parseResult.success) {
    if (!isEqual(chat, parseResult.data)) {
      return Response.json({
        before: chat,
        fix: parseResult.data,
      });
    }
    return fixedChatHistory as PersonaChatType;
  } else {
    return Response.json({
      error: parseResult.error,
      data: chat,
    });
  }
}
