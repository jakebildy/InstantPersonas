"use client";

import { usePersonaChat } from "@/components/context/persona/chat-context";
import { TabPageContainer } from "@/components/page-specific/persona-tab-layout/tab-page-container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/fcs/fcs-separator";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { avatarVariants } from "@/components/variants";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import { UserPlusIcon } from "lucide-react";

export default function PersonaLabPage() {
  const { personas } = usePersonaChat();

  const selectedPersona = personas[0];

  if (!selectedPersona) return null;

  return (
    <TabPageContainer>
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold" id="persona-lab-title">
            Persona Lab
          </h1>
          <span id="persona-lab-description">Create & Combine Personas</span>
        </div>
      </div>

      <div className="grid size-full grid-cols-3 gap-2 p-2">
        <Skeleton className="flex h-full w-full flex-col items-center gap-2 rounded-lg p-4">
          <div className="flex w-full flex-col items-center p-4">
            <h2 className="text-xl font-bold">Create Persona</h2>
            <span>Start from scratch</span>
          </div>
          <div className="flex w-full flex-col items-center p-4">
            <div className="relative flex w-full flex-col items-center">
              <Label htmlFor="edit-chat-description" className="px-2 text-xs">
                Enter a Social Media Profile URL
              </Label>
              <Input
                className="w-full rounded-lg border border-black/10 p-2"
                placeholder={"instagram.com/username"}
                value={"instagram.com/username"}
                onChange={(e) => {}}
              />
            </div>
            <Separator className="my-4" text="and - or" />
            <div className="relative flex w-full flex-col items-center">
              <Label htmlFor="edit-chat-description" className="px-2 text-xs">
                Enter Persona details
              </Label>
              <Textarea
                className="h-[220px] w-full rounded-lg border border-black/10 p-2"
                placeholder={"A customer who..."}
                value={"A customer who..."}
                onChange={(e) => {}}
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-center px-4">
            {" "}
            <GradientButton
              Icon={UserPlusIcon}
              variant="blue"
              className="w-full"
            >
              Create Persona
            </GradientButton>
          </div>
        </Skeleton>
        <Skeleton className="flex h-full w-full flex-col items-center gap-2 rounded-lg p-4"></Skeleton>
        <Skeleton className="relative flex h-full w-full flex-col items-center gap-2 rounded-lg p-4">
          <div className="absolute top-0 flex w-full items-center justify-between p-4 text-muted-foreground">
            <ArrowLeftCircleIcon className="size-6 cursor-pointer" />
            <ArrowRightCircleIcon className="size-6 cursor-pointer" />
          </div>
          <div className="flex w-full flex-col items-center p-4">
            <Avatar
              className={avatarVariants({
                variant: "red",
                size: "sm",
              })}
            >
              <AvatarImage
                src={selectedPersona.pictureURL}
                alt={[
                  (
                    selectedPersona.archetype_name || "Persona Archetype"
                  ).toLocaleLowerCase(),
                  "persona avatar",
                ].join(" ")}
              />
              <AvatarFallback>{"Name"}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">
              {selectedPersona.archetype_name}
            </h2>
          </div>
          <ul className="grid rounded-lg border border-black/10 bg-white p-4">
            {Object.entries(selectedPersona.persona_components).map(
              ([key, value]) => (
                <li key={key} className="mb-1 flex flex-col">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {key.replace(/_/g, " ")}
                  </span>
                  <span className="text-xs font-medium">{value}</span>
                </li>
              ),
            )}
          </ul>
          <ul className="grid rounded-lg border border-black/10 bg-white p-4">
            {Object.entries(selectedPersona.insights).map(([key, value]) => (
              <li key={key} className="mb-1 flex flex-col">
                <span className="text-sm font-semibold text-muted-foreground">
                  {key.replace(/_/g, " ")}
                </span>
                <span className="text-xs font-medium">{value}</span>
              </li>
            ))}
          </ul>
        </Skeleton>
      </div>
    </TabPageContainer>
  );
}
