"use server";
import { getPersonaChat } from "@/app/(server)/api/(persona-crud)/get-persona-chat/action";
import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";
import {
  PersonaTemplate,
  PersonaTemplateProps,
} from "@/components/persona-archetype-generic/persona-avatar-popover/templates/template";
import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
import { IS_TEST_DEV_ENV } from "@/lib/utils";

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
    IS_TEST_DEV_ENV ? console.log("DEV: Chat not found", id) : null;
    notFound();
  }

  IS_TEST_DEV_ENV ? console.log("DEV: ", id, personas, chatHistory) : null;

  return (
    <div className="flex flex-col justify-center gap-4 px-2 pb-10">
      {personas && personas.length > 0
        ? personas.map((persona, i) => (
            <PersonaTemplate
              archetype={persona}
              key={i}
              variant={
                mapUrlBackgroundColorParamToVariant({
                  url: persona.pictureURL,
                }) as PersonaTemplateProps["variant"]
              }
            />
          ))
        : null}
    </div>
  );
}
