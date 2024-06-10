"use client";
import { PersonaChatType } from "@/app/(server)/models/personachat.model";
import { AnimatedTooltip } from "@/components/ui/aceternity/animated_tooltip";
import { limitTextToFirstDelimiter } from "@/lib/utils";
import { convertPersonaChatsToPersonaWithIDs } from "@/app/(server)/models/persona_with_id.model";

export function RecentPersonasList({
  personachats,
}: {
  personachats: PersonaChatType[];
}) {
  const personas = convertPersonaChatsToPersonaWithIDs(personachats);
  const top10Personas = personas
    .slice(0)
    .reverse()
    .filter((persona: any) => persona !== undefined)
    .slice(0, 10);

  const convertedPersonas: {
    id: number;
    name: string;
    designation: string;
    image: string;
    href: string;
  }[] = top10Personas.map((chat, i) => {
    const name = chat.persona.archetype_name;

    const image = chat.persona.pictureURL ?? "/test-persona-avatar.jpg";
    // const designation = chat.persona.productDescription ?? "";
    const designation = limitTextToFirstDelimiter(
      chat.persona.persona_components.Mindset_and_Perspective ?? "",
    );
    return {
      id: i,
      name,
      image,
      designation,
      href: `/persona/${chat.id}`,
    };
  });

  return convertedPersonas.length > 0 ? (
    <AnimatedTooltip items={convertedPersonas} />
  ) : null;
}
