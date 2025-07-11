import { HTMLAttributes, useState } from "react";
// import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import api, { Persona } from "@/services/api.service";
import { Skeleton } from "./ui/skeleton";

interface Props extends Persona {
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
  id,
  setPersona,
  ...Props
}: Props) {
  return (
    <div
      className={cn(
        "grid lg:grid-cols-4 grid-rows-2 gap-0 shadow-lg rounded-xl overflow-hidden bg-persona-background"
      )}
      {...Props}
    >
      <div className="row-span-2 col-span-1 shadow-xl rounded-xl overflow-hidden border-2 border-persona-border">
        <div className="w-full grid place-items-center relative">
          <img
            src={pictureURL}
            alt="Persona Image"
            className="w-full object-cover"
          />
        </div>

        <div className={"grid grid-cols-2 bg-persona-foreground"}>
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

  const handleBlur = () => {
    setPersona({
      ...persona,
      sections: persona.sections.map((s: any, i: number) =>
        i === sectionIndex ? { ...s, description: content } : s
      ),
    });
    updatePersona({
      ...persona,
      sections: persona.sections.map((s: any, i: number) =>
        i === sectionIndex ? { ...s, description: content } : s
      ),
    });
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
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleBlur}
        className="resize-none mt-2 bg-persona-background/80 text-persona-text focus-visible:ring-persona-accent border-persona-border flex-1"
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

  const handleBlur = () => {
    setPersona({
      ...persona,
      shortDescriptors: persona.shortDescriptors.map((s: any, i: number) =>
        i === descriptorIndex ? { ...s, description: content } : s
      ),
    });
    updatePersona({
      ...persona,
      shortDescriptors: persona.shortDescriptors.map((s: any, i: number) =>
        i === descriptorIndex ? { ...s, description: content } : s
      ),
    });
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
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleBlur}
        className="resize-none border-none scrollbar-hidden mt-2 text-center text-persona-text text-xs focus-visible:ring-persona-accent bg-persona-background"
        rows={2}
      />
    </div>
  );
};
