"use client";
import { PersonStandingIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import {
  ColorVariant,
  gradientVariants,
  textPastelColorVariants,
} from "@/components/variants";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GradientButton } from "@/components/ui/gradient-button";
import {
  ScrollAreaScrollbar,
  ScrollAreaThumb,
} from "@radix-ui/react-scroll-area";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { cn, IS_TEST_DEV_ENV } from "@/lib/utils";
import { SelectArchetypeWidget } from "@/components/toolfolio/selected-personas/select-from-sidebar/select-archetype-widget";
import api from "@/service/api.service";
import { PersonaChatType } from "@/app/(server)/models/personachat.model";
import BarLoader from "react-spinners/BarLoader";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LOCAL_STORAGE_CONFIG } from "@/lib/config/localstorage";
import { PersonaBusinessArchetype } from "../types";

export function PersonaSelectFromHistorySidebar({
  className,
  variant = "blue",
}: {
  className?: string;
  variant?: ColorVariant;
}) {
  const { selectedPersonas, setSelectedPersonas, loading, error, history } =
    usePersonaChatHistory();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <GradientButton
          Icon={PersonStandingIcon}
          size={"md"}
          className={className}
        >
          Select Personas
        </GradientButton>
      </SheetTrigger>
      <SheetContent
        className={gradientVariants({
          variant,
          className:
            "flex w-[400px] flex-col gap-4 rounded-bl-md rounded-tl-md p-0 sm:w-[540px]",
        })}
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 px-6 pt-6">
            <PersonStandingIcon className="size-6 text-gray-800" />
            Select Personas
          </SheetTitle>
          <SheetDescription className="px-6 text-gray-800">
            Selected Personas will be used to generate tool results.
          </SheetDescription>
          <div className="px-6">
            <Separator className="bg-black/25" />
          </div>

          {/* Active Personas */}
          <div id="active-personas-preview">
            <Label className="px-6">Active Personas</Label>
            <ScrollArea>
              <div className="mx-6 my-2 flex min-h-[60px] items-center rounded-lg border border-green-400 bg-green-100">
                <AnimatePresence mode="popLayout">
                  {selectedPersonas && selectedPersonas.length > 0 ? (
                    selectedPersonas.map((archetype, i) => {
                      const variant = mapUrlBackgroundColorParamToVariant({
                        url: archetype.pictureURL,
                      });
                      return (
                        <motion.div
                          key={archetype.archetype_name + " active list "}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          layoutId={"persona-icon" + archetype.archetype_name}
                        >
                          <PersonaAvatarPopover
                            allowManage={false}
                            {...{ archetype: archetype, variant: variant }}
                            size={"sm"}
                          />
                        </motion.div>
                      );
                    })
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex h-full w-full items-center justify-center text-xs text-green-500"
                      key="empty-info-text"
                    >
                      Select a persona to add to the working area
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <ScrollAreaScrollbar
                orientation={"horizontal"}
                className={
                  "flex h-2.5 touch-none select-none flex-col border-t border-t-transparent p-[1px] transition-colors"
                }
              >
                <ScrollAreaThumb className="relative flex-1 rounded-full bg-black/25" />
              </ScrollAreaScrollbar>
            </ScrollArea>
          </div>
        </SheetHeader>

        {/* All Personas */}
        <div
          className="z-30 flex max-h-full flex-1 flex-col gap-2 overflow-hidden"
          id="persona-history"
        >
          <Label className="px-6">All Personas</Label>
          <p className="px-6 text-sm text-muted-foreground">
            Personas are grouped by chat history.
          </p>
          <div className="px-6">
            <Separator className="bg-black/25" />
          </div>
          <div className="scrollbar-track-hidden max-h-full flex-1 overflow-auto px-2 py-6">
            <div className="flex flex-col gap-2">
              {loading || error || history.length < 1 ? (
                <div className="flex w-full items-center justify-center px-2">
                  {loading ? <LoadingState /> : <EmptyState />}
                </div>
              ) : (
                <>
                  {history.map((chat, i) =>
                    chat.aiState.personas === undefined ||
                    chat.aiState.personas.length === 0 ? null : (
                      <PersonaWidgetGroup
                        personas={chat.aiState.personas.map((archetype) => ({
                          ...archetype,
                          business: {
                            description: chat.aiState.business,
                            target_problem: chat.aiState.targetProblem,
                          },
                        }))}
                        selectedPersonas={selectedPersonas}
                        setSelectedPersonas={setSelectedPersonas}
                        key={i}
                      />
                    ),
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <PersonaIconBackgroundElement variant={variant} />
      </SheetContent>
    </Sheet>
  );
}

function EmptyState() {
  return (
    <div className="mb-4 flex w-full flex-col gap-2 px-2">
      <span className="text-center text-sm font-medium">No Personas Found</span>
      <Button variant={"green"} className="w-full" asChild>
        <Link href="/persona">Create a Persona</Link>
      </Button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center">
      <BarLoader
        color="#36d7b7"
        height={10}
        width={335}
        className="mx-4 rounded-full"
      />
      <div className="my-4 flex w-full flex-col gap-2">
        <PersonaWidgetGroupSkeleton />
        <PersonaWidgetGroupSkeleton />
      </div>
    </div>
  );
}

function PersonaWidgetGroupSkeleton() {
  return (
    <div className="flex h-[280px] w-full flex-col gap-2 rounded-xl border bg-white/50 p-2">
      <Skeleton className="h-[60px] w-full bg-pastel-blue/90" />
      <Skeleton className="h-[60px] w-full bg-pastel-blue/80" />
      <Skeleton className="h-[60px] w-full bg-pastel-blue/70" />
      <Skeleton className="h-[60px] w-full bg-pastel-blue/60" />
    </div>
  );
}

import { isEqual } from "lodash";
import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
import { PersonaAvatarPopover } from "@/components/persona-archetype-generic/persona-avatar-popover";
import { usePersonaChatHistory } from "@/components/context/persona/history-context";

function PersonaWidgetGroup({
  personas,
  selectedPersonas,
  setSelectedPersonas,
}: {
  personas: PersonaBusinessArchetype[];
  selectedPersonas: PersonaBusinessArchetype[];
  setSelectedPersonas: React.Dispatch<
    React.SetStateAction<PersonaBusinessArchetype[]>
  >;
}) {
  // Checking if all personas are selected based on deep equality
  const allPersonasInChatSelected = personas.every((persona) =>
    selectedPersonas.some((selectedPersona) =>
      isEqual(selectedPersona, persona),
    ),
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl border bg-white/50 p-2 transition-colors duration-150 ease-out",
        allPersonasInChatSelected
          ? "border-green-400 bg-green-100"
          : "border-black/10 bg-white/50",
      )}
    >
      {personas.map((persona, i) => {
        // Determining if the current persona is selected based on deep equality
        const isSelected = selectedPersonas.some((selectedPersona) =>
          isEqual(selectedPersona, persona),
        );

        return (
          <SelectArchetypeWidget
            isSelected={isSelected}
            archetype={persona}
            key={i}
            onSelect={() => {
              setSelectedPersonas((prevSelectedPersonas) => {
                // To prevent adding duplicates, first check if not already selected
                if (!prevSelectedPersonas.some((p) => isEqual(p, persona))) {
                  return [...prevSelectedPersonas, persona];
                }
                return prevSelectedPersonas;
              });
            }}
            onDeselect={() => {
              setSelectedPersonas((prevSelectedPersonas) =>
                prevSelectedPersonas.filter(
                  (activePersona) => !isEqual(activePersona, persona),
                ),
              );
            }}
          />
        );
      })}
    </div>
  );
}

function PersonaIconBackgroundElement({ variant }: { variant: ColorVariant }) {
  return (
    <>
      <PersonStandingIcon
        className={textPastelColorVariants({
          variant,
          className:
            "tilt-backward-right absolute -right-[30px] bottom-0 z-20 size-[250px] blur-[1px] transition-colors duration-150 ease-out",
        })}
      />
      <PersonStandingIcon
        className={textPastelColorVariants({
          variant,
          className:
            "tilt-backward-right absolute -right-[30px] bottom-0 z-10 size-[250px] blur-sm transition-colors duration-150 ease-out",
        })}
      />
      <PersonStandingIcon
        className={textPastelColorVariants({
          variant,
          className:
            "tilt-backward-right absolute -right-[30px] bottom-0 z-10 size-[250px] blur-md transition-colors duration-150 ease-out",
        })}
      />
      <PersonStandingIcon
        className={textPastelColorVariants({
          variant,
          className:
            "tilt-backward-right absolute -right-[30px] bottom-0 z-10 size-[250px] blur-lg transition-colors duration-150 ease-out",
        })}
      />
    </>
  );
}
