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
 let personaHistory;
 let intentToChangePersona: boolean = false;

  if (!historyID) {
    //  Create User Persona
    const userPersona = await generateUserPersona(newMessage);

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

    intentToChangePersona = await getIntentToChangePersona(newMessage);
    console.log("Intent to change persona: ", intentToChangePersona);

      // If intent is to change persona, update persona and return
      if (intentToChangePersona && personaHistory.persona) {
        const newUserPersona = await updateUserPersona(newMessage, personaHistory.persona);
        personaHistory.persona = newUserPersona;
      }
  }


  //Generate response and generate AI suggestion messages
  const response = await generateResponseAndSuggestionMessages(personaHistory.messageHistory, newMessage, intentToChangePersona, personaHistory.persona);

  console.log("ResponseAndSuggestionMessages: ", response);
  personaHistory.aiSuggestedChats = response.suggestions;
  personaHistory.messageHistory.push({ sender: "bot", text: response.response });

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
    "sections": [{
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
      ],
      "shortDescriptors": [ 
        "label": "age",
        "description": "details",
        "emoji": "🧔"
        },
        {
        "label": "location",
        "description": "details",
        "emoji": "📍"
        },
        {
        "label": "occupation",
        "description": "details",
        "emoji": "💼"
        },
        {
        "label": "familyStatus",
        "description": "details",
        "emoji": "🏠"
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
  
  


  export async function getIntentToChangePersona(
    newMessage: string,
  ): Promise<boolean> {
    const systemMessage = `Based on the following message, determine if the user wants to change the user persona they generated:
  Message from user: ${newMessage}
  
  Respond either 'true' or 'false' to indicate if the user wants to change their persona.
  `;
  
    const chatResponse = await ChatGPT(systemMessage);

    try {
        // try to convert chatResponse as boolean and return 
        const intent: boolean = chatResponse.text.trim().toLowerCase() === "true";
        return intent;
    } catch (error) {
      throw new Error(
        "Failed to parse the intent to change persona. Please try again.",
      );
    }
  }
  

export async function updateUserPersona(
    message: string,
    currentPersona: UserPersona,
  ): Promise<UserPersona> {
    const systemMessage = `Update the following User Persona in JSON format based on the following message:
  User Persona: ${JSON.stringify(currentPersona)}
  Message: ${message}
  
  Please structure your response in a clear and easily parsable JSON format.
  
  interface UserPersona {
    name: string;
    gender: string;
    pictureURL: string
    sections: [{label: string, description: string}]
  }
  
  For example:
  {
    "name": "John Doe",
    "gender" : "details",
    pictureURL: "a url",
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
  
    return userPersona;
  }
  

  export async function generateResponseAndSuggestionMessages(
    messageHistory: { sender: "bot" | "user"; text: string }[],
    newMessage: string,
    intentToChangePersona: boolean,
    userPersona?: UserPersona,
  ): Promise<{ response: string; suggestions: string[] }> {
    const systemMessage = `You are a bot that helps a user create customer personas. Based on the following message history, generate a response to the user and suggest some AI generated messages:
    Message History: ${JSON.stringify(messageHistory)}
    New Message from User: ${newMessage}
    User Persona: ${JSON.stringify(userPersona)}
    Did the bot just update the User Persona: ${intentToChangePersona}

    Please structure your response in a clear and easily parsable JSON format.

    example: 
    { response: "I updated the persona with the details you provided.", suggestions: ["Why did you change the age?", "Change the name as well"] }
    `;

    const chatResponse = await ChatGPT(systemMessage);

    try {
      const response = JSON.parse(chatResponse.text.trim());
      return response;
    } catch (error) {
      throw new Error(
        "Failed to parse the response and suggestions. Please try again.",
      );
    }
  }