import { generateThreadMetadata } from "@/app/(server)/ai/persona-chat-ai/utils/generate-thread-metadata";
import { AIStateMetadataValidator } from "@/app/(server)/models/persona-ai.model";
import { PersonaChatType } from "@/app/(server)/models/personachat.model";

export async function fixChatMetaData(chat: PersonaChatType) {
  const metadataParse = AIStateMetadataValidator.safeParse(
    chat?.aiState?.threadMetadata,
  );

  if (metadataParse.success) {
    return {
      ...chat,
      aiState: {
        ...chat.aiState,
        threadMetadata: metadataParse.data,
      },
    };
  } else {
    const metadata = await generateThreadMetadata(chat.aiState);

    return {
      ...chat,
      aiState: {
        ...chat.aiState,
        threadMetadata: metadata,
      },
    };
  }
}
