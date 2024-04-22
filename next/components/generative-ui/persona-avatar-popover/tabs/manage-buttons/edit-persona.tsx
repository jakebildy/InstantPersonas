"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PersonaArchetypeValidator, PersonaAvatarPopoverProps } from "../..";
import { EditPersonaTemplate } from "../../templates/edit-template";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAIState, useUIState } from "ai/rsc";
import { AI } from "@/app/(server)/action";
import {
  getSynchronizeStates,
  serializePersonas,
  transformDataToStructure,
  tryParseJsonWithRepair,
  updatePersonaByName,
} from "../../utils";
import posthog from "posthog-js";
import { useState } from "react";

// setIsAccepted(true);
// const personas = aiState.personas.map(
//   (persona: PersonaArchetype, i: number) => {
//     if (i === personaIndex) {
//       return updated_archetype;
//     }
//     return persona;
//   }
// );
// // change Gourmet Feline Enthusiast to luxury cat lady

// let jsonPersona = "";
// try {
//   jsonPersona = JSON.stringify(personas);
// } catch (error) {
//   try {
//     jsonPersona = fixJson(JSON.stringify(personas));
//   } catch (error) {
//     posthog.capture("error", {
//       error: "error in parsing persona",
//       persona: personas,
//     });
//   }
// }

// const newAiState = {
//   ...aiState,
//   messages: [
//     ...aiState.messages.map((message: Message) => {
//       if (
//         message.role === "function" &&
//         message.name === "create_persona"
//       ) {
//         const updatedInLinePersonas = {
//           ...message,
//           // id: nanoid(),
//           content: jsonPersona,
//         };
//         console.log("server ", updatedInLinePersonas);
//         return updatedInLinePersonas;
//       } else return message;
//     }),
//   ],
//   personas: personas,
// };it lo

// console.log("newAiState", getUIStateFromAIState(newAiState));

// setAIState(newAiState);
// setUIState((currentMessages: any) => [
//   ...getUIStateFromAIState(newAiState),
// ]);

export function EditPersonaButton({
  variant,
  archetype,
}: PersonaAvatarPopoverProps) {
  const { archetype_name, persona_components, insights } = archetype;
  const [aiState, setAIState] = useAIState<typeof AI>();
  const [uiState, setUIState] = useUIState<typeof AI>();

  const [error, setError] = useState<boolean>(false);
  // const

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const unstructuredData = Object.fromEntries(formData.entries());

    const structuredData = transformDataToStructure({
      unstructuredData: unstructuredData,
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

    setAIState(newAIState);
    setUIState(newUIState);
  }

  return (
    <Dialog>
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
        <form onSubmit={onSubmit}>
          <ScrollArea className="h-[50vh]">
            <EditPersonaTemplate archetype={archetype} variant={variant} />
          </ScrollArea>
          <div className="flex items-center justify-between pt-4">
            <Button variant={"secondary"}>Change Color</Button>
            <div className="flex justify-end gap-2 items-center">
              <DialogClose asChild>
                <Button variant={"secondary"}>Cancel</Button>
              </DialogClose>
              <Button type="submit">Apply Edits & Save Changes!</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
