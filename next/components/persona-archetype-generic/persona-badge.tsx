import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";
import {
  background600Light,
  avatarVariants,
  textColorVariants,
} from "../variants";
import { mapUrlBackgroundColorParamToVariant } from "./utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type PersonaBadgeProps = HTMLAttributes<HTMLDivElement> & {
  archetype: PersonaArchetype;
};

export function PersonaBadge({
  archetype,
  className,
  ...Props
}: PersonaBadgeProps) {
  const avatarFallbackName =
    archetype.archetype_name ||
    "Persona Archetype"
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");

  const variant = mapUrlBackgroundColorParamToVariant({
    url: archetype.pictureURL,
  });

  return (
    <div
      className={cn(
        background600Light({
          variant,
          className: "flex items-center gap-0.5 rounded-2xl pr-3",
        }),
        className,
      )}
      {...Props}
    >
      <Avatar
        className={avatarVariants({
          variant,
          size: "xs",
          interactive: false,
          className: "rounded-full",
        })}
      >
        <AvatarImage
          src={archetype.pictureURL}
          alt={[
            (
              archetype.archetype_name || "Persona Archetype"
            ).toLocaleLowerCase(),
            "persona avatar",
          ].join(" ")}
          className="rounded-full"
        />
        <AvatarFallback>{avatarFallbackName}</AvatarFallback>
      </Avatar>
      <span
        className={textColorVariants({
          variant,
          className: "text-xs",
        })}
      >
        {avatarFallbackName}
      </span>
    </div>
  );
}
