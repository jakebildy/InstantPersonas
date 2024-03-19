import { HTMLAttributes, useState } from "react";
// import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import api, { Persona } from "@/services/api.service";
import { Skeleton } from "./ui/skeleton";
import { useFetchBase64Image } from "@/lib/hooks";

interface Props extends Persona {
  selectedColor?: string;
  id?: string;
  setPersona: (persona: Persona) => void;
}

export default function UserPersona({
  name,
  gender,
  color,
  pictureURL,
  shortDescriptors,
  sections,
  selectedColor,
  id,
  setPersona,
  ...Props
}: Props) {
  //@ts-ignore
  const [img, loading, error] = useFetchBase64Image(pictureURL);

  const displayImage = () => {
    if (img)
      return (
        <div className="flex-grow relative">
          <img
            src={img}
            alt="Persona Image"
            className="object-contain rounded-xl"
          />
        </div>
      );

    if (pictureURL)
      return (
        <div className="flex-grow relative">
          <img
            src={pictureURL}
            alt="Persona Image"
            className="object-contain rounded-xl"
          />
        </div>
      );

    return (
      <div className="flex-grow p-2">
        <Skeleton className="h-60 w-full bg-black/5" />
      </div>
    );
  };

  return (
    <div
      className={cn(
        "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-0 shadow-lg rounded-xl overflow-hidden bg-persona-background md:m-10 xl:m-24 xl:mb-10"
      )}
      {...Props}
    >
      <div className="row-span-2 col-span-1 grid grid-rows-2 shadow-xl rounded-xl overflow-hidden border-2 border-persona-border">
        {displayImage()}

        <div
          className={"grid grid-cols-2 bg-persona-foreground"}
          style={{ backgroundColor: selectedColor || "defaultBackgroundColor" }}
        >
          {shortDescriptors.length > 0
            ? shortDescriptors.map((section, index) => (
                <EditableAttributeCard
                  key={section.description}
                  label={section.label}
                  personaID={id}
                  descriptorIndex={index}
                  description={section.description}
                  icon={section.emoji}
                  persona={{
                    name,
                    gender,
                    color,
                    pictureURL,
                    shortDescriptors,
                    sections,
                  }}
                  setPersona={setPersona}
                />
              ))
            : [1, 2, 3, 4].map((_, index) => (
                <Skeleton
                  key={index}
                  className={
                    "bg-persona-background shadow-lg rounded-lg m-2 text-center font-bold"
                  }
                />
              ))}
        </div>
      </div>

      {sections.length > 0
        ? sections.map((section, index) => (
            <PersonaText
              key={section.description}
              label={section.label}
              description={section.description}
              personaID={id}
              sectionIndex={index}
              persona={{
                name,
                gender,
                color,
                pictureURL,
                shortDescriptors,
                sections,
              }}
              setPersona={setPersona}
            />
          ))
        : [1, 2, 3, 4, 5, 6].map((_, index) => (
            <div className="p-2 flex-grow flex">
              <Skeleton
                key={index}
                className="p-4 bg-persona-accent/25 flex-1"
              />
            </div>
          ))}
    </div>
  );
}

interface PersonaTextProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  description: string;
  personaID: string | undefined;
  sectionIndex: number;
  persona: any;
  setPersona: (persona: Persona) => void;
}

function PersonaText({
  label,
  description,
  className,
  personaID,
  sectionIndex,
  persona,
  setPersona,
  ...Props
}: PersonaTextProps) {
  const [content, setContent] = useState(description);

  const updatePersona = async (persona: Persona) => {
    if (!personaID) return console.error("No id to update persona");
    await api.userPersona.updatePersona(persona, personaID);
  };

  return (
    <div
      className={cn(
        "p-4 text-persona-title text-center flex-grow flex flex-col",
        className
      )}
      {...Props}
    >
      <h3 className="text-2xl font-bold">{label}</h3>
      <Textarea
        value={content}
        onChange={(e) => {
          const description = e.target.value;
          setContent(description);
          setPersona({
            ...persona,
            sections: persona.sections.map((s: any, i: number) =>
              i === sectionIndex ? { ...s, description } : s
            ),
          });
          updatePersona({
            ...persona,
            sections: persona.sections.map((s: any, i: number) =>
              i === sectionIndex ? { ...s, description } : s
            ),
          });
        }}
        className="resize-none flex-grow mt-2 bg-persona-background/80 text-persona-text focus-visible:ring-persona-accent border-persona-border min-h-[5dvh]"
      />
    </div>
  );
}

interface GenericStatusProps extends HTMLAttributes<HTMLDivElement> {
  icon: string;
  label: string;
  description: string;
  personaID: string | undefined;
  descriptorIndex: number;
  persona: any;
  setPersona: (persona: Persona) => void;
}

const EditableAttributeCard = ({
  icon,
  label,
  description,
  className,
  personaID,
  descriptorIndex,
  persona,
  setPersona,
  ...Props
}: GenericStatusProps) => {
  const [content, setContent] = useState(description);

  const updatePersona = async (persona: Persona) => {
    if (!personaID) return console.error("No id to update persona");
    await api.userPersona.updatePersona(persona, personaID);
  };

  return (
    <div
      className={cn(
        "p-1 grid place-items-center bg-persona-background shadow-lg rounded-lg m-2 text-center font-bold",
        className
      )}
      {...Props}
    >
      <h2 className="text-xl mt-1">{icon}</h2>
      <h2 className="text-xs text-persona-title/80">{label}</h2>
      <Textarea
        value={content}
        onChange={(e) => {
          const description = e.target.value;
          setContent(description);
          setPersona({
            ...persona,
            shortDescriptors: persona.shortDescriptors.map(
              (s: any, i: number) =>
                i === descriptorIndex ? { ...s, description } : s
            ),
          });
          updatePersona({
            ...persona,
            shortDescriptors: persona.shortDescriptors.map(
              (s: any, i: number) =>
                i === descriptorIndex ? { ...s, description } : s
            ),
          });
        }}
        className="resize-none border-none scrollbar-hidden mt-2 text-center text-persona-text text-xs focus-visible:ring-persona-accent bg-persona-background"
        rows={2}
      />
    </div>
  );
};
