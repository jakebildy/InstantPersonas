import { PersonaArchetype } from "./persona-ai.model";
import { AIStateValidator } from "@/app/(server)/models/persona-ai.model";
import { PersonaChatType } from "@/app/(server)/models/personachat.model";
export interface PersonaWithID {
  persona: PersonaArchetype;
  id: string;
}

export function convertPersonaChatsToPersonaWithIDs(
  personaChats: PersonaChatType[],
): PersonaWithID[] {
  if (!personaChats) {
    return [];
  }

  const personaWithIDs = personaChats
    .map((personaChat) => {
      const state = AIStateValidator.safeParse(personaChat.aiState);
      if (!state.success) {
        console.error("Error parsing AI state", personaChat, state.error);
        return null; //? Early return if parsing fails
      }
      //? Return the result of the inner map directly
      return state.data.personas.map((persona) => {
        return { persona: persona, id: personaChat._id ?? "" };
      });
    })
    .flat()
    .filter((persona): persona is PersonaWithID => persona !== null);

  return personaWithIDs;
}
