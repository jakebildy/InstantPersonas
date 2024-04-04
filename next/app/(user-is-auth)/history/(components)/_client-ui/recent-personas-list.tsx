"use client";
import { AnimatedTooltip } from "@/components/aceternity-ui/animated_tooltip";
import { PersonaHistory } from "@/service/api.service";

export function RecentPersonasList({
  personas,
}: {
  personas: PersonaHistory[];
}) {
  const top10Personas = personas
    .slice(0)
    .reverse()
    .filter((persona) => persona.persona !== undefined)
    .slice(0, 10);

  const convertedPersonas: {
    id: number;
    name: string;
    designation: string;
    image: string;
    href: string;
  }[] = top10Personas.map((history, i) => {
    const firstName = history.persona?.name?.split(" ")[0] ?? "";
    const lastRelevantDescriptor =
      history.persona?.shortDescriptors
        ?.filter((s) => ["Occupation", "Location"].includes(s.label))
        .at(-1)?.description ??
      history.persona?.shortDescriptors?.at(0)?.description ??
      "";

    const name =
      firstName +
      (lastRelevantDescriptor ? ` | ${lastRelevantDescriptor}` : "");
    const image = history.persona?.pictureURL ?? "default-image-url.jpg"; // Assuming you have a default image URL
    const designation = history.persona?.productDescription ?? "";

    return {
      id: i,
      name,
      image,
      designation,
      href: `/persona/${history._id}`,
    } as const;
  });

  return <AnimatedTooltip items={convertedPersonas} />;
}
