"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getSynchronizeStates,
  PersonaAvatarPopoverProps,
  serializePersonas,
} from "../..";
import { PersonStandingIcon } from "lucide-react";
import { useAIState, useUIState } from "ai/rsc";
import { AI } from "@/app/(server)/action";
import { useState } from "react";

import { isEqual } from "lodash";
import { useParams } from "next/navigation";
import api from "@/service/api.service";
import { usePostHog } from "posthog-js/react";
import { gradientVariants } from "@/components/variants";
import { PersonaTemplatePreview } from "../../templates/template";
import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";

export function DeletePersonaButton({
  variant,
  archetype,
}: PersonaAvatarPopoverProps) {
  const { archetype_name, persona_components, insights } = archetype;
  const [aiState, setAIState] = useAIState<typeof AI>();
  const [uiState, setUIState] = useUIState<typeof AI>();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const params = useParams<{ id?: string[] }>();
  const id = params.id ? params.id.at(-1) : undefined;
  const posthog = usePostHog();

  const deletePersonaAction = () => {
    // Delete persona action
    setIsSaving(true);
    const updatedPersonasArray = aiState.personas.filter(
      (persona: PersonaArchetype) => {
        return !isEqual(persona, archetype);
      },
    );
    const serializedPersonas = serializePersonas(updatedPersonasArray);
    if (!serializedPersonas) {
      setError(true);
      setIsSaving(false);
      posthog.capture("error", {
        error: "error in serializing personas when deleting persona",
        personas: updatedPersonasArray,
      });
      return;
    }
    const { aiState: newAIState, uiState: newUIState } = getSynchronizeStates({
      aiState,
      serializedPersonas,
    });

    const update = async (state: {}) => {
      if (id) {
        const updatedState = await api.userPersona.updatePersonaChat(state, id);
        if (!updatedState) {
          setError(true);
          posthog.capture("error", {
            error: "error in updating persona state",
            persona: state,
          });
          return;
        }
      }
    };

    update(newAIState);
    setAIState(newAIState);
    setUIState(newUIState);
    setIsSaving(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Delete Persona</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently the{" "}
            <b className="text-sm">{archetype_name}</b> persona from your
            account and remove its data from our servers.
          </DialogDescription>
        </DialogHeader>
        {error ? (
          <div
            className={gradientVariants({
              variant,
              className:
                "relative m-2 flex h-[50vh] flex-col items-center justify-center gap-2 rounded-lg p-8",
            })}
          >
            <PersonStandingIcon className="m-6 text-muted-foreground" />
            <h3 className="font-jost text-xl font-bold">
              Looks like there was a problem saving your persona ;(
            </h3>
            <span>
              We&apos;ve automatically logged this error and are investigating
              it
            </span>
            <div className="my-4 flex items-center gap-8">
              <Button
                variant={"outline"}
                className="bg-pastel-red/50 text-red-500"
              >
                Exit Editor
              </Button>{" "}
              or{" "}
              <Button
                variant={"outline"}
                onClick={() => setError(false)}
                className="bg-pastel-green/50 text-green-500"
              >
                Try Again?
              </Button>
            </div>
          </div>
        ) : (
          <>
            <PersonaTemplatePreview archetype={archetype} variant={variant} />
            <Button
              variant={"destructive"}
              onClick={() => deletePersonaAction()}
              disabled={isSaving}
              className={isSaving ? "animate-pulse cursor-not-allowed" : ""}
            >
              {isSaving ? "Deleting..." : "Delete Persona"}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
