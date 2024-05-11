"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PersonaArchetype,
  PersonaArchetypeValidator,
  PersonaAvatarPopoverProps,
} from "../..";
import { EditPersonaTemplate } from "../../templates/edit-template";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAIState, useUIState } from "ai/rsc";
import { AI } from "@/app/(server)/action";
import {
  getSynchronizeStates,
  serializePersonas,
  transformDataToStructure,
  updatePersonaByName,
} from "../../utils";
import { useState } from "react";
import { PersonStandingIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { replaceParameterInURL } from "@/lib/utils";
import api from "@/service/api.service";
import { useParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import {
  badgeVariants,
  ColorVariant,
  ColorVariantMap,
  gradientVariants,
} from "@/components/variants";

export function EditPersonaButton({
  variant,
  archetype,
}: PersonaAvatarPopoverProps) {
  const { archetype_name, persona_components, insights } = archetype;
  const [aiState, setAIState] = useAIState<typeof AI>();
  const [uiState, setUIState] = useUIState<typeof AI>();
  const [localVariant, setLocalVariant] = useState<ColorVariant>(
    variant as ColorVariant
  );
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const params = useParams<{ id?: string[] }>();
  const id = params.id ? params.id.at(-1) : undefined;
  const [localArchetype, setLocalArchetype] =
    useState<PersonaArchetype>(archetype);

  const [error, setError] = useState<boolean>(false);
  const posthog = usePostHog();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const unstructuredData = Object.fromEntries(formData.entries());
    const embedVariant = {
      pictureURL: replaceParameterInURL({
        url: archetype.pictureURL,
        parameter: "backgroundColor",
        value: ColorVariantMap[localVariant as ColorVariant].substring(1), //removes the #
      }),
    };

    const structuredData = transformDataToStructure({
      unstructuredData: { ...unstructuredData, ...embedVariant },
      structuredData: archetype,
    });

    const validatedPersona =
      PersonaArchetypeValidator.safeParse(structuredData);

    if (!validatedPersona.success) {
      setError(true);
      posthog.capture("error", {
        error: "error in parsing persona",
        message: validatedPersona.error,
        persona: structuredData,
      });
      console.error(validatedPersona.error);
      return;
    }

    const updatedPersonasArray = updatePersonaByName({
      personas: aiState.personas,
      oldPersona: archetype,
      updatedArchetype: validatedPersona.data,
    });
    const serializedPersonas = serializePersonas(updatedPersonasArray);
    if (!serializedPersonas) {
      setError(true);
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
    setShowDialog(false);
  }

  function variantOnChange(value: string) {
    setLocalVariant(value as ColorVariant);
    setLocalArchetype({
      ...localArchetype,
      pictureURL: replaceParameterInURL({
        url: archetype.pictureURL,
        parameter: "backgroundColor",
        value: ColorVariantMap[value as ColorVariant].substring(1), //removes the #
      }),
    });
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button>Edit Persona</Button>
      </DialogTrigger>

      <DialogContent className="max-w-screen sm:max-w-[90vw] xl:max-w-[75vw]">
        <DialogHeader>
          <DialogTitle>Persona Archetype Editor</DialogTitle>
          <DialogDescription className="inline-flex items-center gap-2">
            Edit the details of the <b>{archetype_name}</b> persona. Any{" "}
            <span className="rounded-lg bg-pastel-red/25 border-pastel-red text-[9px] uppercase border px-2 text-red-500">
              unsaved changes
            </span>{" "}
            will be lost if you navigate away from this page!
          </DialogDescription>
        </DialogHeader>
        {error ? (
          <div
            className={gradientVariants({
              variant: localVariant,
              className:
                "flex flex-col items-center justify-center gap-2 h-[50vh] rounded-lg m-2 p-8 relative",
            })}
          >
            <PersonStandingIcon className="text-muted-foreground  m-6" />
            <h3 className="font-jost font-bold text-xl">
              Looks like there was a problem saving your persona ;(
            </h3>
            <span>
              We&apos;ve automatically logged this error and are investigating
              it
            </span>
            <div className="flex gap-8 my-4 items-center">
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
          <form onSubmit={onSubmit}>
            <ScrollArea className="h-[50vh]">
              <EditPersonaTemplate
                archetype={localArchetype}
                variant={localVariant}
              />
            </ScrollArea>
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2 flex-1">
                <ChangeColorSelect
                  value={localVariant}
                  onChange={(value) => variantOnChange(value as ColorVariant)}
                />
                {archetype.pictureURL !== localArchetype.pictureURL ? (
                  <span className="rounded-lg bg-pastel-red/25 border-pastel-red text-[9px] uppercase border px-2 text-red-500">
                    unsaved changes
                  </span>
                ) : null}
              </div>
              <div className="flex justify-end gap-2 items-center">
                <DialogClose asChild>
                  <Button variant={"secondary"}>Cancel</Button>
                </DialogClose>
                <Button type="submit">Apply Edits & Save Changes!</Button>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ChangeColorSelect({
  value = "blue",
  onChange,
}: {
  value?: ColorVariant;
  onChange: (value: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"}>Change Color</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="top">
        <DropdownMenuLabel>Select Archetype Color</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={onChange}
          className="flex flex-col items-center"
        >
          {Object.entries(ColorVariantMap).map(([color, hex]) => (
            <DropdownMenuRadioItem
              value={color}
              key={hex}
              className="w-full flex items-center justify-between group cursor-pointer data-[state=checked]:bg-slate-200 hover:bg-slate-100"
            >
              <div
                className={badgeVariants({
                  variant: color as ColorVariant,
                  className: "group-hover:animate-pulse",
                })}
              >
                {color}
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
