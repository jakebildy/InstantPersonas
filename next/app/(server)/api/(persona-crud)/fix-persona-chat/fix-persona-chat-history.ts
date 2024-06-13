import { isEqual } from "lodash";
import { fixPersonaChatMessageHistoryModel } from "./fix-messages";
import { upsertPersonaChat } from "@/app/(server)/api/(persona-crud)/upsert-persona-chat/action";
import { IS_TEST_DEV_ENV } from "@/lib/utils";
import { fixPersonaArchetype } from "./fix-persona-archetype";
import {
  PersonaChatType,
  PersonaChatTypeValidator,
} from "@/app/(server)/models/personachat.model";
import { fixChatMetaData } from "./fix-chat-metadata";

export async function fixPersonaChatHistory(
  history: any[],
): Promise<PersonaChatType[]> {
  const fixedHistory = await Promise.all(
    history.map(async (chat) => {
      const chatHasPersonas = chat?.aiState?.personas?.length > 0;
      const fixedPersonas = chatHasPersonas
        ? chat.aiState.personas.map(
            (persona: any) => fixPersonaArchetype(persona) ?? {},
          )
        : undefined;

      const fixedMessage = await fixPersonaChatMessageHistoryModel({
        messages: chat.aiState?.messages ?? [],
        fixedPersonas,
      });
      const fixedChatHistory: PersonaChatType = {
        ...chat,
        aiState: {
          ...chat.aiState,
          personas: fixedPersonas,
          messages: fixedMessage.messages,
          chatId: chat._id,
        },
      };

      const fixedChatWithMetadata = await fixChatMetaData(fixedChatHistory);
      const parseResult = PersonaChatTypeValidator.safeParse(
        fixedChatWithMetadata,
      );

      if (parseResult.success) {
        if (!isEqual(chat, parseResult.data)) {
          IS_TEST_DEV_ENV
            ? console.log("DEV: Chat fixed, pushing update to db", chat._id)
            : null;
          await upsertPersonaChat({
            id: chat._id,
            userId: chat.user, //? Can use chat.user because function should only be called on history, which fetching requires user ID
            data: parseResult.data,
          });
        }
        return parseResult.data as PersonaChatType;
      } else {
        IS_TEST_DEV_ENV
          ? console.log(
              "DEV: failed to fix chat:",
              chat._id,
              JSON.stringify(parseResult.error.errors, null, 2),
            )
          : null;
        return undefined;
      }
    }),
  );

  function isPersonaChatType(
    chat: PersonaChatType | undefined,
  ): chat is PersonaChatType {
    return chat !== undefined;
  }

  return fixedHistory.filter(isPersonaChatType);
}
