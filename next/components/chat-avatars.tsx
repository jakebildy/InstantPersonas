"use client";

import { AI } from "@/app/(server)/action";
import { useActions } from "ai/rsc";
import { PersonaAvatarPopover } from "./generative-ui/persona-avatar-popover";

export default function ChatAvatars() {
  const { getCurrentAIState } = useActions<typeof AI>();
  const aiState = getCurrentAIState();

  const personas = aiState.personas;

  // const personas = null;

  return (
    <>
      {personas
        ? personas.map((archetype: any, i: number) => {
            return (
              <PersonaAvatarPopover key={i} {...{ archetype: archetype }} />
            );
          })
        : null}
    </>
  );
}
