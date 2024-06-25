"use client";
import { Separator } from "@/components/ui/fcs/fcs-separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonStandingIcon } from "lucide-react";
import { PersonaTemplateProps } from "./template";
import { useState } from "react";
import { avatarVariants, gradientVariants } from "@/components/variants";

export function EditPersonaTemplate({
  variant,
  archetype,
}: PersonaTemplateProps) {
  const { archetype_name, persona_components, insights, pictureURL } =
    archetype;
  const avatarFallbackName = archetype_name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  const [name, setName] = useState(archetype_name);
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
          <span className="inline-flex gap-2 text-sm font-semibold text-muted-foreground">
            Archetype
            {name !== archetype_name ? (
              <span className="rounded-lg border border-pastel-red bg-pastel-red/25 px-2 text-[9px] uppercase text-red-500">
                unsaved changes
              </span>
            ) : null}
          </span>
          <textarea
            className="h-fit max-h-[100px] min-h-[1.75em] w-[400px] rounded-md border border-border text-base font-bold"
            placeholder={archetype_name}
            value={name}
            name="archetype_name"
            id="archetype_name"
            onChange={(e) => setName(e.target.value)}
          />
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
            <EditTextField
              key={key + archetype_name}
              id={key}
              label={key.replace(/_/g, " ")}
              initialValue={value}
            />
          ))}
        </ul>
        <Separator text="insights" className="mb-4" />

        <ul className="grid w-full grid-cols-2 gap-4">
          {Object.entries(insights).map(([key, value]) => (
            <EditTextField
              key={key + archetype_name}
              id={key}
              label={key.replace(/_/g, " ")}
              initialValue={value}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function EditTextField({
  label,
  id,
  initialValue,
}: {
  label: string;
  id: string;
  initialValue: string;
}) {
  const [value, setValue] = useState(initialValue);
  const isEdited = value !== initialValue;
  return (
    <li className="mb-4 flex flex-col gap-1">
      <span className="inline-flex gap-2 text-sm font-semibold text-muted-foreground">
        {label}{" "}
        {isEdited ? (
          <span className="rounded-lg border border-pastel-red bg-pastel-red/25 px-2 text-[9px] uppercase text-red-500">
            unsaved changes
          </span>
        ) : null}
      </span>
      <textarea
        className="h-[50px] max-h-[800px] min-h-[1.75em] rounded-md border border-border bg-transparent p-1 text-sm font-medium"
        placeholder={initialValue}
        value={value}
        name={id}
        id={id}
        onChange={(e) => setValue(e.target.value)}
      />
    </li>
  );
}
