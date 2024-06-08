import { isEqual } from "lodash";
import { AIStateValidator } from "../persona-ai.model";
import { fixPersonaChatMessageHistoryModel } from "./fix-messages";
import { upsertPersonaChat } from "@/app/(server)/api/(persona-crud)/upsert-persona-chat/action";
import {
  PersonaChatType,
  PersonaChatTypeValidator,
} from "../personachat.model";
import { IS_TEST_DEV_ENV } from "@/lib/utils";
import { fixPersonaArchetype } from "./fix-persona-archetype";
import { ObjectId } from "mongodb";

export async function fixPersonaChatHistory(
  history: any[],
): Promise<PersonaChatType[]> {
  const fixedHistory = await Promise.all(
    history.map(async (chat) => {
      const fixedPersonas = chat.aiState.personas.map(
        (persona: any) => fixPersonaArchetype(persona) ?? {},
      );
      const fixedMessage = await fixPersonaChatMessageHistoryModel({
        messages: chat.aiState.messages,
        fixedPersonas: fixedPersonas,
      });
      const fixedChatHistory = {
        ...chat,
        aiState: {
          ...chat.aiState,
          messages: fixedMessage.messages,
          _id: new ObjectId(`${chat._id}`).toString(),
        },
      };
      const parseResult = PersonaChatTypeValidator.safeParse(fixedChatHistory);

      if (parseResult.success) {
        if (!isEqual(chat, parseResult.data)) {
          IS_TEST_DEV_ENV
            ? console.log("DEV: Chat fixed, pushing update to db", chat._id)
            : null;
          // await upsertPersonaChat({
          //   id: chat._id,
          //   userID: chat.user, //? Can use chat.user because function should only be called on history, which fetching requires user ID
          //   data: chat,
          // });
        }
        return fixedChatHistory as PersonaChatType;
      } else {
        IS_TEST_DEV_ENV
          ? console.log(
              "DEV: Error parsing chat history in `fixPersonaChatHistory.ts`",
              parseResult.error,
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
