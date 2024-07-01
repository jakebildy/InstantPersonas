"use server";

import { AI } from "@/app/(server)/ai/ai-server-action";
import { PersonaChatProvider } from "./chat-context";
import { getPersonaChat } from "@/app/(server)/api/(persona-crud)/get-persona-chat/action";
import { PersonaChatHistoryProvider } from "./history-context";
import { PERSONA_CHAT_INITIAL_AI_STATE } from "@/app/(server)/ai/persona-chat-ai/initial-ai-state";
import { PersonaEditorProvider } from "./persona-editor-context";

//? This has to be in its own file because it must be used server side

export async function AIContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AI initialAIState={PERSONA_CHAT_INITIAL_AI_STATE} initialUIState={[]}>
      <PersonaChatProvider fetchChatWithId={getPersonaChat}>
        <PersonaChatHistoryProvider>
          <PersonaEditorProvider>{children}</PersonaEditorProvider>
        </PersonaChatHistoryProvider>
      </PersonaChatProvider>
    </AI>
  );
}
