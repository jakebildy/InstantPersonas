import { BAD_TEST_HISTORY } from "../(persona-crud)/get-persona-chat/test-history";
import { fixPersonaChatMessageHistoryModel } from "../../models/fix-persona-chat/fix-messages";

export async function GET(req: Request) {
  // Map through BAD_TEST_HISTORY and fix each message asynchronously
  const fixedMessagesPromises = BAD_TEST_HISTORY.map(async (chat) => {
    const fixedMessage = await fixPersonaChatMessageHistoryModel(
      chat.aiState.messages
    );
    console.log(chat.aiState.messages); // Log the original messages for debugging
    return fixedMessage;
  });

  // Wait for all messages to be fixed
  const fixedMessages = await Promise.all(fixedMessagesPromises);

  return Response.json(fixedMessages);
}
