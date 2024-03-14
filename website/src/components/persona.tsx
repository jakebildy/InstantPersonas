import { HTMLAttributes, useState } from "react";
// import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Persona } from "@/services/api.service";
import { Skeleton } from "./ui/skeleton";

interface Props extends Persona, HTMLAttributes<HTMLDivElement> {}

export default function UserPersona({
  name,
  gender,
  pictureURL,
  shortDescriptors,
  sections,
  className,
  ...Props
}: Props) {
  return (
    <div
      className={cn(
        "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-0 shadow-lg rounded-xl overflow-hidden bg-persona-background md:m-10 xl:m-24 xl:mb-10",
        className
      )}
      {...Props}
    >
      <div className="row-span-2 col-span-1 grid grid-rows-2 shadow-xl rounded-xl overflow-hidden border-2 border-persona-border">
        {pictureURL ? (
          <div className="flex-grow relative">
            <img
              src={pictureURL}
              alt="Image"
              // fill={true}
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex-grow p-2">
            <Skeleton className="h-60 w-full bg-black/5" />
          </div>
        )}

        <div className="grid grid-cols-2 bg-persona-foreground">
          {shortDescriptors.length > 0
            ? shortDescriptors.map((section, index) => (
                <EditableAttributeCard
                  key={index}
                  label={section.label}
                  description={section.description}
                  icon={section.icon}
                />
              ))
            : [1, 2, 3, 4].map((_, index) => (
                <Skeleton
                  key={index}
                  className="bg-persona-background shadow-lg rounded-lg m-2 text-center font-bold"
                />
              ))}
        </div>
      </div>

      {sections.length > 0
        ? sections.map((section, index) => (
            <PersonaText
              key={index}
              label={section.label}
              description={section.description}
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
}

function PersonaText({
  label,
  description,
  className,
  ...Props
}: PersonaTextProps) {
  const [content, setContent] = useState(description);

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
        className="resize-none flex-grow mt-2 bg-persona-background/80 text-persona-text focus-visible:ring-persona-accent border-persona-border min-h-[150px]"
      />
    </div>
  );
}

interface GenericStatusProps extends HTMLAttributes<HTMLDivElement> {
  icon: string;
  label: string;
  description: string;
}

const EditableAttributeCard = ({
  icon,
  label,
  description,
  className,
  ...Props
}: GenericStatusProps) => {
  const [content, setContent] = useState(description);

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
        className="resize-none border-none scrollbar-hidden mt-2 text-center text-persona-text text-xs focus-visible:ring-persona-accent bg-persona-background"
        rows={2}
      />
    </div>
  );
};

export const PersonaActions = () => {
  return (
    <div className="flex gap-4 lg:gap-8 my-4 overflow-hidden flex-wrap justify-center">
      {[
        {
          suggestion: "Change Colour",
        },
        {
          suggestion: "Change Picture",
        },
        {
          suggestion: "Download Image",
        },
      ].map((userAction, i) => (
        <Button key={i}>{userAction.suggestion}</Button>
      ))}
    </div>
  );
};
