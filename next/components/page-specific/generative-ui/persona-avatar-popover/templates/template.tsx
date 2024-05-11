import React from "react";
import { avatarVariants, gradientVariants } from "@/components/variants";
import { cva, VariantProps } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/fcs/fcs-separator";
import { PersonStandingIcon } from "lucide-react";
import { PersonaArchetype } from "../types";

export const personaTemplateVariants = cva("bg-gradient-to-b ", {
  variants: {
    variant: {
      blue: "from-pastel-blue to-pastel-blue/25",
      purple: "from-pastel-purple to-pastel-purple/25",
      red: "from-pastel-red to-pastel-red/25",
      yellow: "from-pastel-yellow to-pastel-yellow/25",
      green: "from-pastel-green to-pastel-green/25",
      brown: "from-pastel-brown to-pastel-brown/25",
      pink: "from-pastel-pink to-pastel-pink/25",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

export interface PersonaTemplateProps
  extends VariantProps<typeof personaTemplateVariants> {
  archetype: PersonaArchetype;
}

export function PersonaTemplate({ variant, archetype }: PersonaTemplateProps) {
  const { archetype_name, persona_components, insights, pictureURL } =
    archetype;
  const avatarFallbackName = archetype_name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
  return (
    <div className="grid w-full h-full rounded-xl border relative shadow-md bg-background">
      <PersonStandingIcon className="text-muted-foreground absolute top-0 right-0 m-6" />
      <div className="flex gap-2 border-b">
        <Avatar
          className={avatarVariants({
            variant,
            size: "xl",
            interactive: false,
          })}
        >
          <AvatarImage
            src={pictureURL}
            alt={[archetype_name.toLocaleLowerCase(), "persona avatar"].join(
              " "
            )}
          />
          <AvatarFallback>{avatarFallbackName}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col my-6">
          <span className="text-muted-foreground font-semibold text-sm">
            Archetype
          </span>
          <span className="font-bold">{archetype_name}</span>
        </div>
      </div>

      <div
        className={gradientVariants({
          variant,
          className: "flex flex-col gap-2 p-4 rounded-lg m-2",
        })}
      >
        <ul className="grid gap-4">
          {Object.entries(persona_components).map(([key, value]) => (
            <li key={key} className="flex flex-col gap-1 mb-4">
              <span className="text-muted-foreground font-semibold text-sm">
                {key.replace(/_/g, " ")}
              </span>
              <span className="text-sm font-medium">{value}</span>
            </li>
          ))}
        </ul>
        <Separator text="insights" className="mb-4" />

        <ul className=" grid grid-cols-2 gap-4 w-full">
          {Object.entries(insights).map(([key, value]) => (
            <li key={key} className="flex flex-col gap-1 mb-4 ">
              <span className="text-muted-foreground font-semibold text-sm">
                {key.replace(/_/g, " ")}
              </span>
              <span className="text-sm font-medium">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PersonaTemplatePreview({
  variant,
  archetype,
}: PersonaTemplateProps) {
  const { archetype_name, persona_components, insights, pictureURL } =
    archetype;
  const avatarFallbackName = archetype_name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  return (
    <div className="grid w-full h-full rounded-xl border relative shadow-md bg-background">
      <PersonStandingIcon className="text-muted-foreground absolute top-0 right-0 m-1 h-2 w-2" />
      <div className="flex border-b">
        <Avatar
          className={avatarVariants({
            variant,
            size: "preview",
            interactive: false,
          })}
        >
          <AvatarImage
            src={pictureURL}
            alt={[archetype_name.toLocaleLowerCase(), "persona avatar"].join(
              " "
            )}
          />
          <AvatarFallback>{avatarFallbackName}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col my-2">
          <span className="text-muted-foreground font-semibold text-[4px]">
            Archetype
          </span>
          <span className="font-bold text-[4.5px]">{archetype_name}</span>
        </div>
      </div>

      <div
        className={gradientVariants({
          variant,
          className: "flex flex-col p-2 rounded-lg m-1",
        })}
      >
        <ul className="grid">
          {Object.entries(persona_components).map(([key, value]) => (
            <li key={key} className="flex flex-col mb-1">
              <span className="text-muted-foreground font-semibold text-[3px]">
                {key.replace(/_/g, " ")}
              </span>
              <span className="text-[3px] font-medium">{value}</span>
            </li>
          ))}
        </ul>
        <Separator text="insights" className=" scale-[33%]" />

        <ul className=" grid grid-cols-2 w-full">
          {Object.entries(insights).map(([key, value]) => (
            <li key={key} className="flex flex-col mb-1">
              <span className="text-muted-foreground font-semibold text-[3px]">
                {key.replace(/_/g, " ")}
              </span>
              <span className="text-[2px] font-medium">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
