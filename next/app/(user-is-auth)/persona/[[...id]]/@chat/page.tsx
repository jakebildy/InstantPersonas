"use server";
import { AI } from "@/app/(server)/action";
import { PersonaChat } from "@/app/(server)/models/personachat.model";
import Chat from "@/components/chat";
import { PersonaAvatarPopover } from "@/components/generative-ui/persona-avatar-popover";
import api from "@/service/api.service";
import { useActions } from "ai/rsc";

export default async function ChatPage({
  params,
}: {
  params: { id?: string[] };
}) {
  const id = params.id?.at(-1);
  const { getCurrentAIState, setInitialAIState } = useActions<typeof AI>();
  const aiState = getCurrentAIState();

  if (id) {
    const personaModel: PersonaChat = await api.userPersona.getPersonaChat(id);
    setInitialAIState(personaModel.aiState);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-58px)] justify-center">
      <div className="flex flex-row">
        {aiState.personas.map((archetype: any, i: number) => {
          return <PersonaAvatarPopover key={i} {...{ archetype: archetype }} />;
        })}
      </div>
      <Chat className="border rounded-lg min-h-[400px]" />
    </div>
  );
}
