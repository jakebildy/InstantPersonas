"use client";
import { AnimatedTooltip } from "@/components/aceternity-ui/animated_tooltip";
import { limitTextToFirstDelimiter } from "@/lib/utils";
import { convertPersonaChatsToPersonaWithIDs } from "@/util/util";

export function RecentPersonasList({ personachats }: { personachats: any[] }) {
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
    //@ts-ignore
  }[] = top10Personas.map((chat, i) => {
    // const firstName = chat.persona.archetype_name.split(" ")[0] ?? "";
    // const lastRelevantDescriptor =
    //   chat.persona.shortDescriptors
    //     ?.filter((s: any) => ["Occupation", "Location"].includes(s.label))
    //     .at(-1)?.description ??
    //   chat.persona.shortDescriptors?.at(0)?.description ??
    //   "";

    const name = chat.persona.archetype_name;
    // firstName +
    // (lastRelevantDescriptor ? ` | ${lastRelevantDescriptor}` : "");

    const image = chat.persona.pictureURL ?? "/test-persona-avatar.jpg";
    // const designation = chat.persona.productDescription ?? "";
    const designation = limitTextToFirstDelimiter(
      chat.persona.persona_components.Mindset_and_Perspective ?? ""
    );
    return {
      id: i,
      name,
      image,
      designation,
      href: `/persona/${chat.id}`,
    } as const;
  });

  return <AnimatedTooltip items={convertedPersonas} />;
}
