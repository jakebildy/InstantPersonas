import { PersonaWithID } from "@/app/(server)/models/persona_with_id.model";
import { PersonaChat, UserPersona } from "@/app/(server)/models/personachat.model";

export function convertPersonaChatsToPersonaWithIDs(personaChats: PersonaChat[]): PersonaWithID[] {
    if (!personaChats) {
        return [];
    }

    const personas = personaChats
    .filter((personaChat) => personaChat.personas !== undefined)
    .map((personaChat) => personaChat.personas)
    .filter((persona) => persona !== undefined)
    .flat();

    const personaIDs = personaChats
        .map((personaChat) =>
        Array(personaChat.personas!.filter((persona) => persona !== undefined).length).fill(personaChat._id)
        )
        .flat();

    const personaWithIDs = personas.map((persona, i) => {
        return {
        persona: persona as UserPersona,
        id: personaIDs[i],
        };
    });
    
    return personaWithIDs;
}