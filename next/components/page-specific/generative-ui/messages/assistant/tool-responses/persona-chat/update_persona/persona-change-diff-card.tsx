"use client";
import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/fcs/fcs-separator";
import {
  GitCompareArrows,
  PersonStandingIcon,
  ArrowUp,
  XIcon,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAIState, useUIState } from "ai/rsc";
import {
  ClientMessage,
  Message,
  PersonaArchetype,
} from "@/app/(server)/models/persona-ai.model";
import { fixJson } from "@/lib/fix-json";
import { avatarVariants } from "@/components/variants";
import { usePostHog } from "posthog-js/react";
import { getUIStateFromAIState } from "@/app/(server)/ai/persona-chat-ai/utils/get-ui-state-from-ai-state";
import { AI } from "@/app/(server)/ai/ai-server-action";

export interface PersonaChangeDiffCardProps {
  origin_archetype: PersonaArchetype;
  updated_archetype: PersonaArchetype;
  personaIndex: number;
}

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

const isEqual = (value1: any, value2: any): boolean => {
  if (
    typeof value1 !== "object" ||
    typeof value2 !== "object" ||
    value1 === null ||
    value2 === null
  ) {
    return value1 === value2;
  }

  if (Array.isArray(value1) !== Array.isArray(value2)) {
    return false;
  }

  const keys1 = Object.keys(value1);
  const keys2 = Object.keys(value2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!isEqual(value1[key], value2[key])) {
      return false;
    }
  }

  return true;
};

// This component is displayed to show the differences when the ai makes an update to an existing persona archetype.
export function PersonaChangeDiffCard({
  origin_archetype,
  updated_archetype,
  personaIndex,
}: PersonaChangeDiffCardProps) {
  // const { archetype_name, persona_components, insights } = origin_archetype;
  // const { archetype_name, persona_components, insights } = updated_archetype;

  const [aiState, setAIState] = useAIState<typeof AI>();
  const [uiState, setUIState] = useUIState<typeof AI>();

  const avatarFallbackName = updated_archetype.archetype_name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  const renderDifferences = (
    origin: Record<string, any>,
    updated: Record<string, any>,
  ) => {
    if (
      !origin ||
      !updated ||
      typeof origin !== "object" ||
      typeof updated !== "object"
    ) {
      return null;
    }

    const changes = Object.entries(updated)
      .map(([key, value]) => {
        if (!isEqual(value, origin[key])) {
          return (
            <ShowChangeDifferences
              key={key}
              title={key.replace(/_/g, " ")}
              origin={JSON.stringify(origin[key], null, 2)} // Adding pretty print
              updated={JSON.stringify(value, null, 2)} // Adding pretty print
            />
          );
        }
        return null;
      })
      .filter((element) => element !== null); // Filter out null values

    return (
      <div>
        {changes.length > 0 ? (
          changes
        ) : (
          <p className="text-xs text-gray-400">
            No changes detected in this section.
          </p>
        )}
      </div>
    );
  };

  const [isRejected, setIsRejected] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  console.log(aiState);
  const posthog = usePostHog();

  // check if messageID matches the aiState.messages most recent message ID
  const mostRecentMsg = aiState.messages[aiState.messages.length - 1];
  const isMostRecentMsg =
    mostRecentMsg.role === "function" &&
    mostRecentMsg.name === "update_persona" &&
    isEqual(
      JSON.parse(mostRecentMsg.content).updated_archetype,
      updated_archetype,
    );

  return (
    <div className="relative grid h-full w-full rounded-xl border bg-background shadow-md">
      <PersonStandingIcon className="absolute right-0 top-0 m-6 text-muted-foreground" />
      <div className="flex gap-2 border-b">
        <Avatar
          className={avatarVariants({
            variant: "blue",
            size: "xl",
            interactive: false,
          })}
        >
          <AvatarImage
            src={updated_archetype.pictureURL}
            alt={[
              updated_archetype.archetype_name.toLocaleLowerCase(),
              "persona avatar",
            ].join(" ")}
          />
          <AvatarFallback>{avatarFallbackName}</AvatarFallback>
        </Avatar>

        <div className="my-6 flex flex-col">
          <span className="text-sm font-semibold text-muted-foreground">
            Archetype
          </span>

          {origin_archetype.archetype_name !==
          updated_archetype.archetype_name ? (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 rounded-lg bg-pastel-red/50 px-2 text-black/75">
                <XIcon className="h-4 w-4" />
                <span className="font-semibold">
                  {origin_archetype.archetype_name}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-pastel-green/50 px-2 text-black/75">
                <ArrowUp className="h-4 w-4" />
                <span className="font-semibold">
                  {updated_archetype.archetype_name}
                </span>
              </div>
            </div>
          ) : (
            <span className="font-bold">{origin_archetype.archetype_name}</span>
          )}
        </div>
      </div>
      {origin_archetype.persona_components !==
      updated_archetype.persona_components ? (
        <div className="m-2 flex flex-col gap-2 rounded-lg p-4">
          {renderDifferences(
            origin_archetype.persona_components,
            updated_archetype.persona_components,
          )}
        </div>
      ) : null}

      {origin_archetype.insights !== updated_archetype.insights ? (
        <div className="m-2 flex flex-col gap-2 rounded-lg p-4">
          <Separator text="insights" className="mb-4" />
          {renderDifferences(
            origin_archetype.insights,
            updated_archetype.insights,
          )}
        </div>
      ) : null}
      {!isMostRecentMsg ? (
        <div />
      ) : isAccepted ? (
        <div className="mx-6 mb-2 inline-flex items-center justify-center whitespace-nowrap rounded-md bg-gradient-to-b from-primary to-green-50 py-2 text-sm font-medium text-primary-foreground">
          Accepted Changes
        </div>
      ) : !isRejected ? (
        <div>
          <Button
            className="mx-6 mb-2 h-10"
            onClick={() => {
              setIsAccepted(true);
              const personas = aiState.personas.map(
                (persona: PersonaArchetype, i: number) => {
                  if (i === personaIndex) {
                    return updated_archetype;
                  }
                  return persona;
                },
              );
              // change Gourmet Feline Enthusiast to luxury cat lady

              let jsonPersona = "";
              try {
                jsonPersona = JSON.stringify(personas);
              } catch (error) {
                try {
                  jsonPersona = fixJson(JSON.stringify(personas));
                } catch (error) {
                  posthog.capture("error", {
                    error: "error in parsing persona",
                    persona: personas,
                  });
                }
              }

              const newAiState = {
                ...aiState,
                messages: [
                  ...aiState.messages.map((message: Message) => {
                    if (
                      message.role === "function" &&
                      message.name === "create_persona"
                    ) {
                      const updatedInLinePersonas = {
                        ...message,
                        // id: nanoid(),
                        content: jsonPersona,
                      };
                      console.log("server ", updatedInLinePersonas);
                      return updatedInLinePersonas;
                    } else return message;
                  }),
                ],
                personas: personas,
              };

              console.log("newAiState", getUIStateFromAIState(newAiState));

              setAIState(newAiState);
              setUIState(
                (currentMessages: ClientMessage[]) =>
                  [...getUIStateFromAIState(newAiState)] as ClientMessage[],
              );
            }}
          >
            Accept Changes
          </Button>
          <Button
            variant={"destructive"}
            className="mx-6 mb-4"
            onClick={() => {
              setIsRejected(true);
            }}
          >
            Reject Changes
          </Button>
        </div>
      ) : (
        <div className="mb-[10px] ml-[20px] mt-[10px] text-red-600">
          Rejected Changes
        </div>
      )}
    </div>
  );
}

function ShowChangeDifferences({
  title,
  origin,
  updated,
}: {
  title: string;
  origin: string;
  updated: string;
}) {
  return (
    <li className="mb-4 flex flex-col gap-1">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-sm font-semibold">{title}</span>
        <GitCompareArrows className="h-4 w-4" />
      </div>
      <div className="flex flex-col gap-1">
        <ChangeItem className="bg-pastel-red/50" icon={XIcon} text={origin} />
        <ChangeItem
          className="bg-pastel-green/50"
          icon={ArrowUp}
          text={updated}
        />
      </div>
    </li>
  );
}

interface ChangeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  text: string;
}

function ChangeItem({ icon, text, className, ...props }: ChangeItemProps) {
  const IconComponent = icon;
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg px-2 text-black/75",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center justify-start">
        <IconComponent className="h-4 w-4" />
      </div>
      <span className="p-1 text-left text-sm font-medium">{text}</span>
    </div>
  );
}
