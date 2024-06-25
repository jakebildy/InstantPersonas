"use client";

import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";
import { usePersonaChat } from "@/components/context/persona/chat-context";
import { usePersonaChatHistory } from "@/components/context/persona/history-context";
import { EditPersonaTemplate } from "@/components/persona-archetype-generic/persona-avatar-popover/templates/edit-template";
import { PersonaBadge } from "@/components/persona-archetype-generic/persona-badge";
import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Border600, gradientVariants } from "@/components/variants";
import { cn } from "@/lib/utils";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { PersonStandingIcon } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";

export default function EditorPage() {
  const [selected, setSelected] = useState<string>("");
  const [selectedIsDirty, setSelectedIsDirty] = useState<boolean>(false);
  const { personas } = usePersonaChat();

  useEffect(() => {
    if (selected !== "" && !selectedIsDirty) {
      setSelectedIsDirty(true);
      console.log("Selected has been changed for the first time to:", selected);
    }
  }, [selected]);

  const selectedArchetype = personas.find((p) => p.archetype_name === selected);
  const variant =
    selectedArchetype &&
    mapUrlBackgroundColorParamToVariant({
      url: selectedArchetype.pictureURL,
    });

  return (
    <div className="flex h-full flex-1 flex-col justify-center font-jost">
      <div className="relative m-2 box-border flex h-[calc(100%-70px)] min-h-[400px] w-[calc(100%-16px)] flex-1 flex-col gap-4 overflow-hidden rounded-lg border bg-background p-2">
        <Header
          selected={selected}
          setSelected={setSelected}
          hasFirstChange={selectedIsDirty}
        />
        <div className="grid h-full place-items-center">
          {selectedArchetype ? (
            <EditPersonaTemplate
              archetype={selectedArchetype}
              variant={variant}
            />
          ) : (
            <NoSelectedState
              selected={selected}
              setSelected={setSelected}
              hasFirstChange={selectedIsDirty}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Header({
  selected,
  setSelected,
  hasFirstChange,
}: {
  selected: string;
  setSelected: (value: string) => void;
  hasFirstChange: boolean;
}) {
  const { personas } = usePersonaChat();
  const [openToolTip, setOpenToolTip] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);

  // Control tooltip visibility based on hover and first change
  // Tooltip should only be visible if the user has not yet selected a persona or if they are hovering over the info icon
  const effectiveOpen = forceOpen || (!hasFirstChange && openToolTip);

  return (
    <Tooltip open={effectiveOpen} onOpenChange={setOpenToolTip}>
      <TooltipTrigger asChild>
        <div className="relative flex flex-wrap gap-1 pr-12">
          {personas.map((persona: PersonaArchetype, i: number) => {
            const isSelected = selected === persona.archetype_name;

            const variant = mapUrlBackgroundColorParamToVariant({
              url: persona.pictureURL,
            });

            return (
              <motion.div
                key={i + persona.archetype_name}
                initial={{ opacity: 0, y: -25, x: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                  transition: {
                    delay: i * 0.05,
                  },
                }}
              >
                <PersonaBadge
                  archetype={
                    isSelected
                      ? {
                          ...persona,
                          archetype_name:
                            persona.archetype_name + " - (Selected)",
                        }
                      : persona
                  }
                  className={cn(
                    "cursor-pointer border-2 shadow-sm transition-all duration-700 ease-out",
                    isSelected
                      ? "border-green-400"
                      : Border600({ variant, className: "border-transparent" }),
                  )}
                  onClick={() =>
                    setSelected(isSelected ? "" : persona.archetype_name)
                  }
                  tabIndex={0}
                  role="radio"
                />
              </motion.div>
            );
          })}
          <Button
            variant={"outline"}
            size={"icon"}
            className="absolute right-0 top-0"
            onClick={() => setOpenToolTip(true)}
            onMouseEnter={() => setForceOpen(true)}
            onMouseLeave={() => setForceOpen(false)}
          >
            <InfoCircledIcon className="size-4 text-muted-foreground hover:text-gray-600" />
          </Button>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="p-2 text-xs">
          <h2 className="font-bold">Select Persona to Edit</h2>
          <p>
            Click on a persona to select it. Click again to deselect it. Only
            one persona can be selected at a time.
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

function NoSelectedState({
  selected,
  setSelected,
  hasFirstChange,
}: {
  selected: string;
  setSelected: (value: string) => void;
  hasFirstChange: boolean;
}) {
  return (
    <div className="flex max-w-xl flex-col items-center justify-center gap-2 text-center">
      <h2 className="text-xl font-semibold">Persona Editor</h2>
      <p>
        In the persona editor, you can edit the details of a persona archetype.
        Add or remove traits, change the name, or update the picture.
      </p>
      <h3 className="text-md font-semibold">Select Persona to Begin</h3>
    </div>
  );
}

function PersonaEditor({
  archetype,
  id,
}: {
  archetype: PersonaArchetype;
  id: string;
}) {
  const variant = mapUrlBackgroundColorParamToVariant({
    url: archetype.pictureURL,
  });
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0 }}
      className={gradientVariants({
        variant,
        className: "m-1 flex flex-col rounded-lg p-2",
      })}
    >
      <ul className="grid">
        {Object.entries(archetype.persona_components).map(([key, value]) => (
          <li key={key} className="mb-1 flex flex-col">
            <span className="text-sm font-semibold text-muted-foreground">
              {key.replace(/_/g, " ")}
            </span>
            <span className="text-xs font-medium">{value}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
