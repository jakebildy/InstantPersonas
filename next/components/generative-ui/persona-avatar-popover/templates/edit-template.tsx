"use client";
import { Separator } from "@/components/fcs-ui/fcs-separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonStandingIcon } from "lucide-react";
import { PersonaTemplateProps } from "./template";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { avatarVariants, gradientVariants } from "../variants";

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
          <span className="text-muted-foreground font-semibold text-sm inline-flex gap-2">
            Archetype
            {name !== archetype_name ? (
              <span className="rounded-lg bg-pastel-red/25 border-pastel-red text-[9px] uppercase border px-2 text-red-500">
                unsaved changes
              </span>
            ) : null}
          </span>
          <textarea
            className="font-bold text-base h-fit border border-border rounded-md w-[400px] max-h-[100px] min-h-[1.75em]"
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
          className: "flex flex-col gap-2 p-4 rounded-lg m-2",
        })}
      >
        <ul className="grid gap-4">
          {Object.entries(persona_components).map(([key, value]) => (
            <EditTextField
              key={key}
              id={key}
              label={key.replace(/_/g, " ")}
              initialValue={value}
            />
          ))}
        </ul>
        <Separator text="insights" className="mb-4" />

        <ul className=" grid grid-cols-2 gap-4 w-full">
          {Object.entries(insights).map(([key, value]) => (
            <EditTextField
              key={key}
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
    <li className="flex flex-col gap-1 mb-4 ">
      <span className="text-muted-foreground font-semibold text-sm inline-flex gap-2">
        {label}{" "}
        {isEdited ? (
          <span className="rounded-lg bg-pastel-red/25 border-pastel-red text-[9px] uppercase border px-2 text-red-500">
            unsaved changes
          </span>
        ) : null}
      </span>
      <textarea
        className="text-sm font-medium border border-border rounded-md p-1 min-h-[1.75em] h-[50px] max-h-[800px] bg-transparent"
        placeholder={initialValue}
        value={value}
        name={id}
        id={id}
        onChange={(e) => setValue(e.target.value)}
      />
    </li>
  );
}
