import { UserI } from "../models/user.model";
import { SurveyQuestion } from "../types";
import { ChatGPT } from "./openai.service"; 
import { PersonaHistory } from "../models/persona.model";


function getRandomHeadshot(gender: string) {
  return `https://xsgames.co/randomusers/assets/avatars/${gender.toLowerCase()}/${Math.ceil(
    Math.random() * 78,
  )}.jpg`;
}

export async function messagePersona(
    newMessage: string,
    historyID: string,
): Promise<PersonaHistory> {
//   TODO:
  const personaHistory = await getPersonaHistoryFromID(historyID);

  if (!personaHistory) {
    throw new Error("PersonaHistory not found for the provided historyID");
  }
  
  // Identify intent

  // IF intent is to change/generate persona, update persona and return

  //Concurrently generate response


  // Generate AI suggestion messages




  return personaHistory;
}

export async function getPersonaHistory(user: UserI): Promise<PersonaHistory[]> {
    const _personaHistory = await PersonaHistory.find({ user: user._id });
    return _personaHistory;
}
  

async function getPersonaHistoryFromID(id: string): Promise<PersonaHistory|null> {
    const _personaHistory = await PersonaHistory.findById (id);
    return _personaHistory;
}