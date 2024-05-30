"use client";
import { PersonStandingIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import {
  ColorVariant,
  gradientVariants,
  textPastelColorVariants,
} from "@/components/variants";
import {
  mapUrlBackgroundColorParamToVariant,
  PersonaArchetype,
  PersonaAvatarPopover,
} from "@/components/page-specific/generative-ui/persona-avatar-popover";
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
import { useStytchUser } from "@stytch/nextjs";
import api from "@/service/api.service";
import { PersonaChat } from "@/app/(server)/models/personachat.model";
import BarLoader from "react-spinners/BarLoader";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LOCAL_STORAGE_CONFIG } from "@/lib/config/localstorage";
import { PersonaBusinessArchetype } from "../types";
import { Description } from "@radix-ui/react-dialog";

export function PersonaSelectFromHistorySidebar({
  selectedPersonas,
  setSelectedPersonas,
  className,
  variant = "blue",
}: {
  selectedPersonas: PersonaBusinessArchetype[];
  setSelectedPersonas: React.Dispatch<
    React.SetStateAction<PersonaBusinessArchetype[]>
  >;
  className?: string;
  variant?: ColorVariant;
}) {
  const [history, setHistory] = React.useState<PersonaChat[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [userError, setUserError] = React.useState<string | null>(null);

  const { user, isSubscribed } = useInstantPersonasUser();
  const userRef = useRef<string | null>();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setUserError("User not found");
      return;
    }
    //? If is first fetch, or user has changed, get personas
    if (user.id !== userRef.current && isSubscribed) {
      setLoading(true);
      setUserError(null);
      //? Indicates that we tried to fetch user's persona history
      userRef.current = user.id;
      try {
        IS_TEST_DEV_ENV ? console.log("DEV: Fetching user history") : null;
        api.userPersona.getPersonaHistory(user.id).then((data) => {
          setHistory(data);
          setLoading(false);
          //? If no personas are selected, (first fetch), update from local storage
          if (selectedPersonas.length === 0) {
            IS_TEST_DEV_ENV
              ? console.log(
                  "DEV: No personas selected, updating from local storage"
                )
              : null;
            const localSelectedPersonaNames: string[] = JSON.parse(
              localStorage.getItem(
                LOCAL_STORAGE_CONFIG.tools.selectedPersonas
              ) ?? "[]"
            );
            IS_TEST_DEV_ENV
              ? console.log(
                  "DEV: localSelectedPersonaNames",
                  localSelectedPersonaNames
                )
              : null;
            if (localSelectedPersonaNames.length > 0) {
              const localSelectedPersonas = data
                //? Ensure persona are of type PersonaBusinessArchetype[]
                .flatMap((chat) =>
                  chat.aiState.personas.map((persona) => ({
                    ...persona,
                    business: {
                      description: chat.aiState.business,
                      target_problem: chat.aiState.targetProblem,
                    },
                  }))
                )
                //? Find only personas that are not in local storage
                .filter((persona) =>
                  localSelectedPersonaNames.includes(persona.archetype_name)
                );

              IS_TEST_DEV_ENV
                ? console.log(
                    "DEV: Updating selected personas from local storage",
                    localSelectedPersonas
                  )
                : null;

              setSelectedPersonas(localSelectedPersonas);
            }
          }
        });
      } catch (error) {
        console.log(error);
        setUserError("Error fetching user history");
      }
    }
  }, [
    history,
    isSubscribed,
    selectedPersonas.length,
    setSelectedPersonas,
    user,
  ]);

  useEffect(() => {
    if (selectedPersonas.length === 0) {
      return;
    }
    localStorage.setItem(
      LOCAL_STORAGE_CONFIG.tools.selectedPersonas,
      JSON.stringify(selectedPersonas.map((persona) => persona.archetype_name))
    );
  }, [selectedPersonas]);

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
            "w-[400px] sm:w-[540px] rounded-tl-md rounded-bl-md flex flex-col gap-4 p-0",
        })}
      >
        <SheetHeader>
          <SheetTitle className="flex gap-2 items-center pt-6 px-6">
            <PersonStandingIcon className="text-gray-800 size-6" />
            Select Personas
          </SheetTitle>
          <SheetDescription className="text-gray-800 px-6">
            Selected Personas will be used to generate tool results.
          </SheetDescription>
          <div className="px-6">
            <Separator className="bg-black/25 " />
          </div>

          {/* Active Personas */}
          <div id="active-personas-preview">
            <Label className="px-6">Active Personas</Label>
            <ScrollArea>
              <div className="flex my-2 border border-green-400 bg-green-100 rounded-lg mx-6 min-h-[60px] items-center">
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
                      className="flex text-xs items-center justify-center w-full h-full text-green-500"
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
                  "flex touch-none select-none transition-colors h-2.5 flex-col border-t border-t-transparent p-[1px]"
                }
              >
                <ScrollAreaThumb className="relative flex-1 rounded-full bg-black/25" />
              </ScrollAreaScrollbar>
            </ScrollArea>
          </div>
        </SheetHeader>

        {/* All Personas */}
        <div
          className="flex flex-col gap-2 flex-1 max-h-full overflow-hidden  z-30"
          id="persona-history"
        >
          <Label className="px-6">All Personas</Label>
          <p className="text-sm text-muted-foreground px-6">
            Personas are grouped by chat history.
          </p>
          <div className="px-6">
            <Separator className="bg-black/25 " />
          </div>
          <div className="flex-1 max-h-full overflow-auto px-2 py-6 scrollbar-track-hidden">
            <div className="flex flex-col gap-2">
              {loading || userError || history.length < 1 ? (
                <div className="px-2 flex items-center justify-center w-full">
                  {loading ? <LoadingState /> : <EmptyState />}
                </div>
              ) : (
                <>
                  {history.map((chat, i) =>
                    chat.aiState.personas === undefined ? null : (
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
                    )
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
    <div className=" mb-4 flex flex-col w-full gap-2 px-2">
      <span className="text-center text-sm font-medium">No Personas Found</span>
      <Button variant={"green"} className="w-full" asChild>
        <Link href="/persona">Create a Persona</Link>
      </Button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col justify-center items-center">
      <BarLoader
        color="#36d7b7"
        height={10}
        width={335}
        className="rounded-full mx-4"
      />
      <div className="flex flex-col gap-2 w-full my-4">
        <PersonaWidgetGroupSkeleton />
        <PersonaWidgetGroupSkeleton />
      </div>
    </div>
  );
}

function PersonaWidgetGroupSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-2  rounded-xl h-[280px] w-full bg-white/50 border">
      <Skeleton className="w-full h-[60px] bg-pastel-blue/90" />
      <Skeleton className="w-full h-[60px] bg-pastel-blue/80" />
      <Skeleton className="w-full h-[60px] bg-pastel-blue/70" />
      <Skeleton className="w-full h-[60px] bg-pastel-blue/60" />
    </div>
  );
}

import { isEqual } from "lodash";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

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
      isEqual(selectedPersona, persona)
    )
  );

  return (
    <div
      className={cn(
        "border rounded-xl bg-white/50 p-2 flex flex-col gap-2 transition-colors duration-150 ease-out",
        allPersonasInChatSelected
          ? "bg-green-100 border-green-400"
          : "border-black/10  bg-white/50"
      )}
    >
      {personas.map((persona, i) => {
        // Determining if the current persona is selected based on deep equality
        const isSelected = selectedPersonas.some((selectedPersona) =>
          isEqual(selectedPersona, persona)
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
                  (activePersona) => !isEqual(activePersona, persona)
                )
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
            "size-[250px] transition-colors duration-150 ease-out absolute bottom-0 -right-[30px] z-20 blur-[1px] tilt-backward-right",
        })}
      />
      <PersonStandingIcon
        className={textPastelColorVariants({
          variant,
          className:
            "size-[250px] transition-colors duration-150 ease-out absolute bottom-0 -right-[30px] z-10 blur-sm tilt-backward-right",
        })}
      />
      <PersonStandingIcon
        className={textPastelColorVariants({
          variant,
          className:
            "size-[250px] transition-colors duration-150 ease-out absolute bottom-0 -right-[30px] z-10 blur-md tilt-backward-right",
        })}
      />
      <PersonStandingIcon
        className={textPastelColorVariants({
          variant,
          className:
            "size-[250px] transition-colors duration-150 ease-out absolute bottom-0 -right-[30px] z-10 blur-lg tilt-backward-right",
        })}
      />
    </>
  );
}
