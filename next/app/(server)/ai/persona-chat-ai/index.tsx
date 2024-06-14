import { createAI, getAIState } from "ai/rsc";
import { nanoid } from "nanoid";
import { AIState, ClientMessage } from "../../models/persona-ai.model";
import { PERSONA_CHAT_AI_COMPONENT_MAP } from "@/components/page-specific/generative-ui/messages";
import { getUIStateFromAIState } from "./utils/get-ui-state-from-ai-state";
import { PERSONA_CHAT_INITIAL_AI_STATE } from "./initial-ai-state";
import { submitPersonaChatUserMessage } from "./render";
import { upsertPersonaChat } from "@/app/(server)/api/(persona-crud)/upsert-persona-chat/action";
import { IS_TEST_DEV_ENV } from "@/lib/utils";

export async function onSetPersonaChatState({
  state,
  done,
}: {
  state: AIState;
  done: boolean;
}) {
  "use server";

  if (done) {
    IS_TEST_DEV_ENV
      ? console.log("DEV: saving chat...", state.chatId, state.messages.length)
      : null;

    await upsertPersonaChat({
      id: state.chatId,
      userId: state.userId,
      data: { aiState: state },
    });
  }
}

export async function onGetPersonaChatState(): Promise<ClientMessage[]> {
  "use server";

  const aiState = getAIState();

  if (aiState) {
    console.log("AI state is valid", aiState);
    const uiState = getUIStateFromAIState(aiState);
    return uiState as ClientMessage[];
  } else {
    return [
      {
        id: nanoid(),
        role: "assistant",
        display: (
          <PERSONA_CHAT_AI_COMPONENT_MAP.system.error
            message={"AI state is invalid"}
          />
        ),
      },
    ];
  }
}

export const PERSONA_CHAT_AI = createAI<
  AIState,
  ClientMessage[],
  {
    submitPersonaChatUserMessage: typeof submitPersonaChatUserMessage;
  }
>({
  actions: { submitPersonaChatUserMessage },
  initialUIState: [],
  initialAIState: PERSONA_CHAT_INITIAL_AI_STATE,
  //@ts-ignore
  unstable_onGetUIState: onGetPersonaChatState,
  unstable_onSetAIState: onSetPersonaChatState,
});
