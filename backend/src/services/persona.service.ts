import { UserI } from "../models/user.model";
import { SurveyQuestion } from "../types";
import { ChatGPT } from "./openai.service"; 
import { PersonaHistory, UserPersona } from "../models/persona.model";


function getRandomHeadshot(gender: string) {
  return `https://xsgames.co/randomusers/assets/avatars/${gender.toLowerCase()}/${Math.ceil(
    Math.random() * 78,
  )}.jpg`;
}

export async function messagePersona(
    user: UserI,
    newMessage: string,
    historyID?: string,
): Promise<PersonaHistory> {
//   TODO:

 var personaHistory;

  if (!historyID) {
    //  Create User Persona
    const userPersona = await  generateUserPersona(newMessage);


    //createPersonaHistory
    personaHistory = await PersonaHistory.create({
        messageHistory: [{ sender: "user", text: newMessage }],
        user: user._id,
        persona: userPersona,
     });


  } else {
    personaHistory = await getPersonaHistoryFromID(historyID!);

    if (!personaHistory) {
        throw new Error("PersonaHistory not found for the provided historyID");
      }


    // Identify intent

      // IF intent is to change persona, update persona and return
  }


  //Generate response and concurrently

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


export async function generateUserPersona(
    companyDescription: string,
  ): Promise<UserPersona> {
    const systemMessage = `You are an AI language model. Generate a User Persona in JSON format based on the following company description and Q & A::
  Description: ${companyDescription}
  
  Please structure your response in a clear and easily parsable JSON format.
  
  interface UserPersona {
    name: string;
    gender: string;
    sections: [{label: string, description: string}]
  }
  
  For example:
  {
    "name": "John Doe",
    "gender" : "details",
    sections: [{
        "label": "age",
        "description": "details"
        },
        {
        "label": "location",
        "description": "details"
        },
        {
        "label": "occupation",
        "description": "details"
        },
        {
        "label": "familyStatus",
        "description": "details"
        },
        {
        "label": "bio",
        "description": "details"
        },
        {
        "label": "goals",
        "description": "details"
        },
        {
        "label": "motivations",
        "description": "details"
        },
        {
        "label": "pains",
        "description": "details"
        },
        {
        "label": "devices",
        "description": "details"
        },
        {
        "label": "brandAffiliations",
        "description": "details"
        }
    ] 
  }
  `;
  
    const chatResponse = await ChatGPT(systemMessage);
    const responseText = chatResponse.text.trim();
    let userPersona: UserPersona;
  //TODO:
    try {
      userPersona = JSON.parse(responseText);
      if ((userPersona as any)["UserPersona"]) {
        userPersona = (userPersona as any)["UserPersona"];
        console.log("Had to fix USER PERSONA");
      }
    } catch (error) {
      throw new Error(
        "Failed to parse the generated userPersona JSON. Please try again.",
      );
    }
  
    userPersona.pictureURL = getRandomHeadshot(userPersona.gender);
    return userPersona;
  }
  