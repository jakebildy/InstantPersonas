"use server";
import { getPersonaChat } from "@/app/(server)/api/(persona-crud)/get-persona-chat/function";
import {
  PersonaArchetype,
  mapUrlBackgroundColorParamToVariant,
} from "@/components/page-specific/generative-ui/persona-avatar-popover";
import { PersonaTemplate } from "@/components/page-specific/generative-ui/persona-avatar-popover/templates/template";

import { notFound } from "next/navigation";

export default async function ChatPage({
  params,
}: {
  params: { id?: string[] };
}) {
  const id = params.id?.at(-1);
  const chatHistory = id ? await getPersonaChat(id) : null;
  const personas = chatHistory?.aiState.personas as PersonaArchetype[] | null;

  if (!personas || !chatHistory) {
    console.log("Chat not found");
    notFound();
  }

  console.log(id, personas, chatHistory);
  return (
    <div className="flex flex-col justify-center gap-4 px-2 pb-10">
      {personas && personas.length > 0
        ? personas.map((persona, i) => (
            <PersonaTemplate
              archetype={persona}
              key={i}
              variant={mapUrlBackgroundColorParamToVariant({
                url: persona.pictureURL,
              })}
            />
          ))
        : null}
    </div>
  );
}
