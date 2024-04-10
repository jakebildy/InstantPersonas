"use client";
import { AnimatedTooltip } from "@/components/aceternity-ui/animated_tooltip";
import { PersonaHistory } from "@/service/api.service";
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
  }[] = top10Personas.map((persona, i) => {
    const firstName = persona.persona.name?.split(" ")[0] ?? "";
    const lastRelevantDescriptor =
      persona.persona.shortDescriptors
        ?.filter((s: any) => ["Occupation", "Location"].includes(s.label))
        .at(-1)?.description ??
      persona.persona.shortDescriptors?.at(0)?.description ??
      "";

    const name =
      firstName +
      (lastRelevantDescriptor ? ` | ${lastRelevantDescriptor}` : "");

    const image = persona.persona.pictureURL ?? "/default-image-url.jpg"; // Assuming you have a default image URL
    const designation = persona.persona.productDescription ?? "";

    return {
      id: i,
      name,
      image,
      designation,
      href: `/persona/${persona.id}`,
    } as const;
  });

  return <AnimatedTooltip items={convertedPersonas} />;
}
