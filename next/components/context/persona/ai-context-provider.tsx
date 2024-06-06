"use server";

import { AI } from "@/app/(server)/ai/ai-server-action";
import { PersonaChatProvider } from "./chat-context";
import { getPersonaChat } from "@/app/(server)/api/(persona-crud)/get-persona-chat/action";
import { PersonaChatHistoryProvider } from "./history-context";

//? This has to be in its own file because it must be used server side

export async function AIContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AI>
      <PersonaChatProvider fetchChatWithId={getPersonaChat}>
        <PersonaChatHistoryProvider>{children}</PersonaChatHistoryProvider>
      </PersonaChatProvider>
    </AI>
  );
}
