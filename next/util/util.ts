import { AIStateValidator } from "@/app/(server)/models/ai-state-type-validators";
import { PersonaWithID } from "@/app/(server)/models/persona_with_id.model";
import { PersonaChat } from "@/app/(server)/models/personachat.model";

export function convertPersonaChatsToPersonaWithIDs(
  personaChats: PersonaChat[]
): PersonaWithID[] {
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


// The Flesch reading-ease test approximates the U.S. grade level needed to understand a text.
export function calculateReadability(totalWords: number, totalSentences: number, totalSyllables: number) {
  const wordsPerSentence = totalWords / totalSentences;
  const syllablesPerWord = totalSyllables / totalWords;

  const readability =
    206.835 -
    1.015 * wordsPerSentence -
    84.6 * syllablesPerWord;


    // return a string of the school level:
    // 100.00–90.00	5th grade	Very easy to read. Easily understood by an average 11-year-old student.
    // 90.0–80.0	6th grade	Easy to read. Conversational English for consumers.
    // 80.0–70.0	7th grade	Fairly easy to read.
    // 70.0–60.0	8th & 9th grade	Plain English. Easily understood by 13- to 15-year-old students.
    // 60.0–50.0	10th to 12th grade	Fairly difficult to read.
    // 50.0–30.0	College	Difficult to read.
    // 30.0–10.0	College graduate	Very difficult to read. Best understood by university graduates.
    // 10.0–0.0	Professional	Extremely difficult to read. Best understood by university graduates.

  if (readability >= 90) {
    return "5th grade";
  } else if (readability >= 80) {
    return "6th grade";
  }
  else if (readability >= 70) {
    return "7th grade";
  }
  else if (readability >= 60) {
    return "8th & 9th grade";
  }
  else if (readability >= 50) {
    return "10th to 12th grade";
  }
  else if (readability >= 30) {
    return "College";
  }
  else if (readability >= 10) {
    return "College graduate";
  }
  else {
    return "Professional";
  }
}