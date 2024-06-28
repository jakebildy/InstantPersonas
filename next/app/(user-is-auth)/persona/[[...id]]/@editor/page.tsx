"use client";

import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";
import { usePersonaChat } from "@/components/context/persona/chat-context";
import { usePersonaChatHistory } from "@/components/context/persona/history-context";
import GradientScroll from "@/components/page-specific/persona-chat-history/new/gradient-scroll";
import { EditPersonaTemplate } from "@/components/persona-archetype-generic/persona-avatar-popover/templates/edit-template";
import { PersonaBadge } from "@/components/persona-archetype-generic/persona-badge";
import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  avatarVariants,
  Border600,
  gradientDarkVariants,
  gradientLightVariants,
  gradientVariants,
  textColorVariants,
} from "@/components/variants";
import { cn } from "@/lib/utils";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { PersonStandingIcon } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import { EditorFallbackErrorState, PersonaEditor } from "./editor";
import useMeasure from "react-use-measure";
import { useScrollAreaState } from "@/lib/hooks";
import { isEqual } from "lodash";
import { ErrorBoundary } from "react-error-boundary";

export default function EditorPage() {
  const {
    selectedPersonaInEditor,
    setSelectedPersonaInEditor,
    selectedPersonaInEditorIsDirty,
    unsavedPersonas,
    resetEditorState,
  } = usePersonaChat();

  const [scrollAreaBoundsRef, scrollAreaBounds] = useMeasure();

  const [scrollRef, scrollState] = useScrollAreaState();

  return (
    <ErrorBoundary
      fallback={<EditorFallbackErrorState />}
      onReset={(details) => {
        resetEditorState();
      }}
    >
      <div className="flex h-full flex-1 flex-col justify-center font-jost">
        <div className="relative m-2 box-border flex h-[calc(100%-70px)] min-h-[400px] w-[calc(100%-16px)] flex-1 flex-col gap-4 overflow-auto rounded-lg border bg-background p-2">
          <Header
            selected={selectedPersonaInEditor ?? ""}
            setSelected={setSelectedPersonaInEditor}
            hasFirstChange={selectedPersonaInEditorIsDirty}
            personasWithChanges={unsavedPersonas}
          />
          <div
            className="grid h-full place-items-center"
            ref={scrollAreaBoundsRef}
            id="scroll-area-bounds"
          >
            {selectedPersonaInEditor ? (
              <ScrollArea
                className="h-full w-full flex-1 rounded-xl"
                ref={scrollRef}
              >
                <PersonaEditor
                  key={selectedPersonaInEditor}
                  className="overflow-y-auto"
                  style={{ height: scrollAreaBounds.height }}
                />
              </ScrollArea>
            ) : (
              <NoSelectedState
                selected={selectedPersonaInEditor ?? ""}
                setSelected={setSelectedPersonaInEditor}
                hasFirstChange={selectedPersonaInEditorIsDirty}
              />
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

function Header({
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
            {personas.map((persona: PersonaArchetype, i: number) => {
              const isSelected = selected === persona.archetype_name;

              const variant = mapUrlBackgroundColorParamToVariant({
                url: persona.pictureURL,
              });

              let archetypeName = persona.archetype_name;

              // Add a selected suffix to the archetype name if it is selected
              if (isSelected) {
                archetypeName = archetypeName + " - (Selected)";
              }
              // Add an unsaved suffix to the archetype name if it has changes
              if (personasWithChanges.includes(persona.archetype_name)) {
                archetypeName = archetypeName + " - (Unsaved)";
              }

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
                    archetype={{
                      ...persona,
                      archetype_name: archetypeName,
                    }}
                    className={cn(
                      "cursor-pointer border-2 shadow-sm transition-all duration-700 ease-out",
                      isSelected
                        ? "border-green-400"
                        : Border600({
                            variant,
                            className: "border-transparent",
                          }),
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
  const { personas } = usePersonaChat();

  return (
    <>
      <div className="relative flex max-w-xl flex-col items-center justify-center gap-2 text-center">
        <motion.div
          initial={{
            opacity: 0,
            x: -120,
            y: -45,
            top: 0,
            position: "absolute",
          }}
          animate={{
            opacity: 1,
            x: -100,
            y: -20,
            top: 0,
            position: "absolute",
          }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <img src="https://i.imgur.com/rboSNI5.png" className="h-10" />
        </motion.div>
        <h2 className="text-xl font-semibold">Persona Editor</h2>
        <p>
          In the persona editor, you can edit the details of a persona
          archetype.
          {/* Add or remove traits, change the name, or update the
          picture. */}
        </p>
        <div className="relative">
          <h3 className="text-md font-semibold">Select Persona to Begin</h3>
          <motion.div
            initial={{
              opacity: 0,
              right: 0,
              bottom: 25,
              translateX: "150%",
              position: "absolute",
            }}
            animate={{
              opacity: 1,
              right: 0,
              bottom: 5,
              translateX: "115%",
              position: "absolute",
            }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <img
              src="https://i.imgur.com/rboSNI5.png"
              className="h-10 scale-x-[-1] transform"
            />
          </motion.div>
        </div>

        <div className="relative flex gap-2 rounded-xl border border-gray-300 bg-gray-100 p-4">
          {personas.map((archetype: PersonaArchetype, i: number) => {
            const variant = mapUrlBackgroundColorParamToVariant({
              url: archetype.pictureURL,
            });
            const avatarFallbackName = archetype.archetype_name
              .split(" ")
              .map((word) => word.charAt(0))
              .join("");

            return (
              <button
                key={i}
                tabIndex={0}
                onClick={() => setSelected(archetype.archetype_name)}
                className={gradientLightVariants({
                  variant,
                  className:
                    "group grid flex-1 place-items-center rounded-2xl border border-gray-300 bg-gray-100 p-2 shadow-sm transition-all duration-500 ease-out hover:mx-4 hover:scale-110 hover:px-6 hover:shadow-lg",
                })}
              >
                <div
                  className={
                    "flex size-full flex-1 flex-col items-center gap-1 transition-all duration-500 ease-out group-hover:scale-105"
                  }
                >
                  <Avatar className={avatarVariants({ variant, size: "sm" })}>
                    <AvatarImage
                      src={archetype.pictureURL}
                      alt={[
                        archetype.archetype_name.toLocaleLowerCase(),
                        "persona avatar",
                      ].join(" ")}
                    />
                    <AvatarFallback>{avatarFallbackName}</AvatarFallback>
                  </Avatar>
                  <span
                    className={textColorVariants({
                      variant,
                      className: "font-jost text-sm font-semibold",
                    })}
                  >
                    {archetype.archetype_name}
                  </span>
                </div>
              </button>
            );
          })}
          <span
            className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/3 rotate-12 cursor-pointer rounded-lg border border-gray-300 bg-gray-100 p-1 text-xs text-muted-foreground shadow-md transition-transform duration-500 hover:scale-105"
            role="button"
            onClick={() => setSelected(personas?.at(0)?.archetype_name ?? "")}
            tabIndex={0}
          >
            Click to Select!
          </span>
        </div>
      </div>
    </>
  );
}
