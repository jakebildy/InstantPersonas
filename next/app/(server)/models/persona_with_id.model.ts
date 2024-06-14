import { PersonaArchetype } from "./persona-ai.model";
import { PersonaChatType } from "@/app/(server)/models/personachat.model";

//? This file should be here, it's only used in the client on history page to link personas to their respective chat
//? Should refactor along with history page

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
      const personas = personaChat.aiState.personas;

      if (!personas || personas.length === 0) {
        return null;
      }

      return personas.map((persona) => {
        return { persona: persona, id: personaChat._id ?? "" };
      });
    })
    .flat()
    .filter((persona): persona is PersonaWithID => persona !== null);

  return personaWithIDs;
}
