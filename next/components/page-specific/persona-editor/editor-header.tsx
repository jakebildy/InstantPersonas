"use client";
import { usePersonaChat } from "@/components/context/persona/chat-context";
import { useState } from "react";
import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";
import { PersonaBadge } from "@/components/persona-archetype-generic/persona-badge";
import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Border600 } from "@/components/variants";
import { cn } from "@/lib/utils";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

export function EditorPersonaHeader({
  selected,
  setSelected,
  hasFirstChange,
  personasWithChanges,
}: {
  selected: string;
  setSelected: (value: string) => void;
  hasFirstChange: boolean;
  personasWithChanges: string[];
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
        <div className="relative flex flex-wrap justify-between gap-1 pr-12">
          <div className="relative flex flex-wrap gap-1">
            {personas.map((persona: PersonaArchetype, i: number) => (
              <PersonaBadgeWrapper
                key={i + persona.archetype_name}
                persona={persona}
                index={i}
                isSelected={selected === persona.id}
                personasWithChanges={personasWithChanges}
                setSelected={setSelected}
              />
            ))}
          </div>

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
      <TooltipContent className="p-2 text-xs">
        <h2 className="font-bold">Select Persona to Edit</h2>
        <p>
          Click on a persona to select it. Click again to deselect it. Only one
          persona can be selected at a time.
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

export function getArchetypeName(
  persona: PersonaArchetype,
  isSelected: boolean,
  personasWithChanges: string[],
): string {
  let archetypeName = persona.archetype_name;

  if (isSelected) {
    archetypeName += " - (Selected)";
  }
  if (personasWithChanges.includes(persona.archetype_name)) {
    archetypeName += " - (Unsaved)";
  }

  return archetypeName;
}

interface PersonaBadgeWrapperProps {
  persona: PersonaArchetype;
  index: number;
  isSelected: boolean;
  personasWithChanges: string[];
  setSelected: (archetypeName: string) => void;
}

function PersonaBadgeWrapper({
  persona,
  index,
  isSelected,
  personasWithChanges,
  setSelected,
}: PersonaBadgeWrapperProps) {
  const archetypeName = getArchetypeName(
    persona,
    isSelected,
    personasWithChanges,
  );
  const variant = mapUrlBackgroundColorParamToVariant({
    url: persona.pictureURL,
  });

  return (
    <motion.div
      key={index + persona.archetype_name}
      initial={{ opacity: 0, y: -25, x: -10 }}
      animate={{
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          delay: index * 0.05,
        },
      }}
    >
      <PersonaBadge
        archetype={{ ...persona, archetype_name: archetypeName }}
        className={cn(
          "cursor-pointer border-2 shadow-sm transition-all duration-700 ease-out",
          isSelected
            ? "border-green-400"
            : Border600({ variant, className: "border-transparent" }),
        )}
        onClick={() => setSelected(isSelected ? "" : persona.id)}
        tabIndex={0}
        role="radio"
      />
    </motion.div>
  );
}
