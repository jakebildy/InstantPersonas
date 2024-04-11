"use client";
import { AI } from "@/app/(server)/action";
import Chat from "@/components/chat";
import { PersonaAvatarPopover } from "@/components/generative-ui/persona-avatar-popover";
import { useAIState } from "ai/rsc";

export default function ChatPage() {
  const [aiState, setAIState] = useAIState<typeof AI>();

  return (
    <div className="flex flex-col h-[calc(100vh-58px)] justify-center">
      <div className="flex flex-row">
        {aiState.personas.map((persona: any) => {
          return <PersonaAvatarPopover {...{ archetype: persona }} />;
        })}
      </div>
      <Chat className="border rounded-lg min-h-[400px]" />
    </div>
  );
}
