import { AIStateValidator } from "@/app/(server)/models/ai-state-type-validators";
import { PersonaWithID } from "@/app/(server)/models/persona_with_id.model";
import { PersonaChat } from "@/app/(server)/models/personachat.model";

export function convertPersonaChatsToPersonaWithIDs(
  personaChats: PersonaChat[]
): PersonaWithID[] {
  console.log(personaChats);
  if (!personaChats) {
    return [];
  }

  const personaWithIDs = personaChats
    .map((personaChat) => {
      const state = AIStateValidator.safeParse(personaChat.aiState);
      if (!state.success) {
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
