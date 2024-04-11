"use server";
import { AI } from "@/app/(server)/action";
import { PersonaChat } from "@/app/(server)/models/personachat.model";
import Chat from "@/components/chat";
import { PersonaAvatarPopover } from "@/components/generative-ui/persona-avatar-popover";
import api from "@/service/api.service";

export default async function ChatPage({
  params,
}: {
  params: { id?: string[] };
}) {
  const id = params.id?.at(-1);
  let data = null;

  if (id) {
    const personaModel: PersonaChat = await api.userPersona.getPersonaChat(id);
    data = personaModel;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-58px)] justify-center">
      <div className="flex flex-row">
        {aiState.personas.map((archetype: any, i) => {
          return <PersonaAvatarPopover key={i} {...{ archetype: archetype }} />;
        })}
      </div>
      <Chat className="border rounded-lg min-h-[400px]" />
    </div>
  );
}
