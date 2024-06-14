import React from "react";
import {
  avatarVariants,
  ColorVariant,
  gradientVariants,
} from "@/components/variants";
import { cva, VariantProps } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/fcs/fcs-separator";
import { PersonStandingIcon } from "lucide-react";
import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";

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
    <div className="relative grid h-full w-full rounded-xl border bg-background shadow-md">
      <PersonStandingIcon className="absolute right-0 top-0 m-6 text-muted-foreground" />
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
              " ",
            )}
          />
          <AvatarFallback>{avatarFallbackName}</AvatarFallback>
        </Avatar>

        <div className="my-6 flex flex-col">
          <span className="text-sm font-semibold text-muted-foreground">
            Archetype
          </span>
          <span className="font-bold">{archetype_name}</span>
        </div>
      </div>

      <div
        className={gradientVariants({
          variant,
          className: "m-2 flex flex-col gap-2 rounded-lg p-4",
        })}
      >
        <ul className="grid gap-4">
          {Object.entries(persona_components).map(([key, value]) => (
            <li key={key} className="mb-4 flex flex-col gap-1">
              <span className="text-sm font-semibold text-muted-foreground">
                {key.replace(/_/g, " ")}
              </span>
              <span className="text-sm font-medium">{value}</span>
            </li>
          ))}
        </ul>
        <Separator text="insights" className="mb-4" />

        <ul className="grid w-full grid-cols-2 gap-4">
          {Object.entries(insights).map(([key, value]) => (
            <li key={key} className="mb-4 flex flex-col gap-1">
              <span className="text-sm font-semibold text-muted-foreground">
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
    <div className="relative grid h-full w-full rounded-xl border bg-background shadow-md">
      <PersonStandingIcon className="absolute right-0 top-0 m-1 h-2 w-2 text-muted-foreground" />
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
              " ",
            )}
          />
          <AvatarFallback>{avatarFallbackName}</AvatarFallback>
        </Avatar>

        <div className="my-2 flex flex-col">
          <span className="text-[4px] font-semibold text-muted-foreground">
            Archetype
          </span>
          <span className="text-[4.5px] font-bold">{archetype_name}</span>
        </div>
      </div>

      <div
        className={gradientVariants({
          variant,
          className: "m-1 flex flex-col rounded-lg p-2",
        })}
      >
        <ul className="grid">
          {Object.entries(persona_components).map(([key, value]) => (
            <li key={key} className="mb-1 flex flex-col">
              <span className="text-[3px] font-semibold text-muted-foreground">
                {key.replace(/_/g, " ")}
              </span>
              <span className="text-[3px] font-medium">{value}</span>
            </li>
          ))}
        </ul>
        <Separator text="insights" className="scale-[33%]" />

        <ul className="grid w-full grid-cols-2">
          {Object.entries(insights).map(([key, value]) => (
            <li key={key} className="mb-1 flex flex-col">
              <span className="text-[3px] font-semibold text-muted-foreground">
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
