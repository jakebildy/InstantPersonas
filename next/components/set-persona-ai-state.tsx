"use client";

import { AI } from "@/app/(server)/action";
import { PersonaChat } from "@/app/(server)/models/personachat.model";
import { useActions } from "ai/rsc";

type Props = {
  chat: PersonaChat | null;
};

export default function SetPersonaAiState({ chat }: Props) {
  const { setInitialAIState } = useActions<typeof AI>();
  if (chat) {
    setInitialAIState(chat.aiState);
  }

  return null;
}
