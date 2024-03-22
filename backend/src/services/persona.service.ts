import { UserI } from "../models/user.model";
import { SurveyQuestion } from "../types";
import { GPT4 } from "./openai.service"; 
import { PersonaHistory, UserPersona } from "../models/persona.model";
import axios from "axios";
const { ApifyClient } = require('apify-client');


const apifyToken: string = process.env.APIFY_TOKEN || "";
if (!apifyToken) throw new Error("Missing Apify API Token.");

function getRandomHeadshot(gender: string) {
  return `https://instantpersonas.com/profiles/${gender.toLowerCase()}/${Math.ceil(
    Math.random() * 78,
  )}.jpg`;
}

export async function messagePersona(
    user: UserI,
    newMessage: string,
    historyID?: string,
): Promise<PersonaHistory> {
 let personaHistory: any;
 let intentToChangePersona: boolean = false;
 
 let creatingNewPersona = false;
  let videos: string[] = [];

  if (!historyID) {

    // Check if the user is providing details about a product or service.

    const intentToCreatePersona = await getIntentToCreatePersona(newMessage);
    console.log ("Intent to create persona: ", intentToCreatePersona);

    if (!intentToCreatePersona) {
      personaHistory = await PersonaHistory.create({
        messageHistory: [
          { sender: "bot", text: "Describe your product or service, and I can create a user persona." },
          { sender: "user", text: newMessage },
          { sender: "bot", text: "Please specify a product or service. Be detailed." },],
        user: user._id,
     });

     return personaHistory;
    } else {
    //  Create User Persona
    const userPersona = await generateUserPersona(newMessage);
    personaHistory = {
      messageHistory: [
        { sender: "bot" as "bot" | "user", text: "Describe your product or service, and I can create a user persona." },
        { sender: "user" as "bot" | "user", text: newMessage },
      ],
      user: user._id,
      persona: userPersona,
      aiSuggestedChats: [],
    };
    creatingNewPersona = true;
    }


  } else {
    personaHistory = await getPersonaHistoryFromID(historyID!);
    
    if (!personaHistory) {
        throw new Error("PersonaHistory not found for the provided historyID");
      }

      console.log (newMessage.toLowerCase())
      console.log( "new message is: ", newMessage.includes("⭐️ show me what content they consume"))
    if (newMessage.toLowerCase().includes("⭐️ show me what content they consume")) {
      const keyword = await getKeywordFromPersona(personaHistory.persona!);
      console.log("keyword:" , keyword);
      videos = await getTikTokVideos(keyword);
      console.log("TikTok Videos: ", videos);
    } else {

    // add the new message to the message history
    personaHistory.messageHistory.push({ sender: "user", text: newMessage });
   

    intentToChangePersona = await getIntentToChangePersona(newMessage);
    console.log("Intent to change persona: ", intentToChangePersona);

      // If intent is to change persona, update persona and return
      if (intentToChangePersona && personaHistory.persona) {
        const newUserPersona = await updateUserPersona(newMessage, personaHistory.persona);
        personaHistory.persona = newUserPersona;
      }
    }
  }

  


  if (!newMessage.toLowerCase().includes("⭐️ show me what content they consume")) {
  //Generate response and generate AI suggestion messages
  const response = await generateResponseAndSuggestionMessages(personaHistory.messageHistory, intentToChangePersona, personaHistory.persona);

  console.log("ResponseAndSuggestionMessages: ", response);
  personaHistory.aiSuggestedChats = response.suggestions;
  personaHistory.messageHistory.push({ sender: "bot", text: response.response });
  
  } else {

    personaHistory.messageHistory.push ({sender: "user", text: newMessage});
    personaHistory.messageHistory.push({ sender: "bot", text: "This is what kind of content they would be consuming:"});
    personaHistory.messageHistory.push({ sender: "bot", text: "[TIKTOKS]: " +  videos.join(", ")});

    personaHistory.aiSuggestedChats = ["How can I gain insights from the content they consume?", "What platforms do they use?"];
  
  }



  if (creatingNewPersona) {
    personaHistory.aiSuggestedChats?.pop();
    personaHistory.aiSuggestedChats?.push("⭐️ Show me what content they consume");

    personaHistory = await PersonaHistory.create({
      messageHistory: personaHistory.messageHistory,
      user: user._id,
      aiSuggestedChats: personaHistory.aiSuggestedChats,
      persona: personaHistory.persona,
   });
  } else {
    try {
      const updatedDocument = await PersonaHistory.findOneAndUpdate(
        { _id: historyID },
        {
          messageHistory: personaHistory.messageHistory,
          persona: personaHistory.persona,
          aiSuggestedChats: personaHistory.aiSuggestedChats
        },
        { new: true }
      );
      console.log(updatedDocument);
    } catch (error) {
      console.error("Error updating PersonaHistory:", error);
    }
  }


  return personaHistory as PersonaHistory;
}

export async function getPersonaHistory(user: UserI, id?: string): Promise<PersonaHistory[]> {

    if (id) {
        const _personaHistory = await PersonaHistory.find({ user: user._id, _id: id });
        return _personaHistory;
    }
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
  
  Please structure your response in a clear and easily parsable JSON format. The beginning of the response should be "{" and it should end with "}".
  
  interface UserPersona {
    name: string;
    productDescription: string;
    gender: string;
    sections: [{label: string, description: string}];
    shortDescriptors: [{label: string, description: string, emoji: string}];
  }
  
  For example:
  {
    "name": "John Doe",
    "productDescription" : "Skiing App ⛷️"
    "gender" : "details",
    "sections": [{
        {
        "label": "Bio",
        "description": "details"
        },
        {
        "label": "Goals",
        "description": "details"
        },
        {
        "label": "Motivations",
        "description": "details"
        },
        {
        "label": "Pains",
        "description": "details"
        },
        {
        "label": "Devices",
        "description": "details"
        },
        {
        "label": "Brand Affiliations",
        "description": "details"
        }
      ],
      "shortDescriptors": [ 
        "label": "Age",
        "description": "details",
        "emoji": "🧔"
        },
        {
        "label": "Location",
        "description": "details",
        "emoji": "📍"
        },
        {
        "label": "Occupation",
        "description": "details",
        "emoji": "💼"
        },
        {
        "label": "Family Status",
        "description": "details",
        "emoji": "🏠"
        }
    ]
  }
  `;
  
    const chatResponse = await GPT4(systemMessage);
    let responseText = chatResponse.text.trim();
    let userPersona: UserPersona;
  //TODO:
    try {
      if (!responseText.startsWith("{")) {
        responseText = responseText.substring(responseText.indexOf("{"));
      }
      userPersona = JSON.parse(responseText);
      if ((userPersona as any)["UserPersona"]) {
        userPersona = (userPersona as any)["UserPersona"];
        console.log("Had to fix USER PERSONA");
      }
    } catch (error) {
      throw new Error(
        "Failed to parse the generated userPersona JSON. Please try again. Here was the response: " + responseText,
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
  
    const chatResponse = await GPT4(systemMessage);

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
  

  export async function getIntentToCreatePersona(
    newMessage: string,
  ): Promise<boolean> {
    const systemMessage = `Based on the following message, determine if the user provided information about a product or service:
  Message from user: ${newMessage}
  
  Respond either 'true' or 'false' to indicate if the user provided details about a product or service.
  `;
  
    const chatResponse = await GPT4(systemMessage);

    try {
        // try to convert chatResponse as boolean and return 
        const intent: boolean = chatResponse.text.trim().toLowerCase() === "true";
        return intent;
    } catch (error) {
      throw new Error(
        "Failed to parse the intent to create persona. Please try again.",
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
  
  Please structure your response in a clear and easily parsable JSON format. The beginning of the response should be "{" and it should end with "}"
  
  interface UserPersona {
    name: string;
    productDescription: string;
    gender: string;
    pictureURL: string;
    sections: [{label: string, description: string}];
    shortDescriptors: [{label: string, description: string, emoji: string}];
  }
  
  For example:
  {
    "name": "John Doe",
    "productDescription" : "Skiing App ⛷️"
    "gender" : "details",
    "pictureURL": "a url",
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
      "label": "Age",
      "description": "details",
      "emoji": "🧔"
      },
      {
      "label": "Location",
      "description": "details",
      "emoji": "📍"
      },
      {
      "label": "Occupation",
      "description": "details",
      "emoji": "💼"
      },
      {
      "label": "Family Status",
      "description": "details",
      "emoji": "🏠"
      }
  ]
  }
  `;
  
    const chatResponse = await GPT4(systemMessage);
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
        "Failed to parse the generated userPersona JSON. Please try again. Here was the response: " + responseText,
      );
    }
  
    return userPersona;
  }
  

  export async function generateResponseAndSuggestionMessages(
    messageHistory: { sender: "bot" | "user"; text: string }[],
    intentToChangePersona: boolean,
    userPersona?: UserPersona,
  ): Promise<{ response: string; suggestions: string[] }> {

 

    const systemMessage =

    
    intentToChangePersona === false ?
    `You are a bot that helps a user learn about and understand customer personas. Based on the following message history, generate a response to the user and help the user come up with follow up questions to ask:
    Message History (from oldest to newest): ${JSON.stringify(messageHistory. map(((e) => e.sender + ":" +e.text)).reverse().slice(0, 6).reverse())}
    The User Persona you (the bot) created: ${JSON.stringify(userPersona)}

    Avoid repeating yourself.

    "response" should be a string that is a response to the user's message. Try to be insightful. "suggestions" should be an array of 2 strings that that the user might want to ask next, written from the perspective of the user.

    Please structure your output in a clear and easily parsable JSON format. The beginning of the response should be "{" and it should end with "}"
    
    example output when the user asks "why should I make a user persona?": 
    { "response": "User personas are often used for understanding a customer market", "suggestions": ["Tell me more", "Is it the same as a customer persona?"] }
    ` :
    
    
    `You are a bot that creates customer personas. Based on the following message history, generate a response to the user and help the user come up with follow up questions to ask:
    Message History (from oldest to newest): 
    ${JSON.stringify(messageHistory. map(((e) => e.sender + ":" +e.text)).reverse().slice(0, 6).reverse())}
    User Persona: ${JSON.stringify(userPersona)}
    Is the bot updating an existing persona: ${intentToChangePersona}

    Avoid repeating yourself.

    "response" should be a string that is a response to the user's message. "suggestions" should be an array of 2 strings that that the user might want to ask next, written from the perspective of the user.

    Please structure your output in a clear and easily parsable JSON format. You should only provide 'response' and 'suggestions'

    example: 
    { "response": "I updated the persona with the details you provided.", "suggestions": ["Why did you change the age?", "Change the name as well"] }
    `;

    console.log(systemMessage);
    const chatResponse = await GPT4(systemMessage);

    try {
      console.log("Chat Response: ", chatResponse.text.trim());
      const response = JSON.parse(chatResponse.text.trim());
      return response;
    } catch (error) {
      throw new Error(
        "Failed to parse the response and suggestions. Please try again. Here was the response: " + chatResponse.text.trim(),
      );
    }
  }



  export async function updatePersona(
    persona: UserPersona,
    historyID: string,
  ): Promise<PersonaHistory> {
    try {
      const filter = { _id: historyID };
      const update = { persona: persona };
      const options = { new: true }; // Return the updated document
  
      const updatedPersonaHistory = await PersonaHistory.findOneAndUpdate(filter, update, options);
  
      if (!updatedPersonaHistory) {
        throw new Error("PersonaHistory not found for the provided historyID");
      }
  
      return updatedPersonaHistory;
    } catch (error) {
      console.error("Error updating persona: ", error);
      throw error; // Or handle the error as per your application's error handling strategy
    }
  }

  // delete persona
export async function deletePersona(
    id: string,
  ): Promise<void> {
    try {
      await PersonaHistory.findByIdAndDelete(id);
    } catch (error) {
      console.error("Error deleting persona: ", error);
      throw error; 
    }
  }


  const client = new ApifyClient({
    token: apifyToken,
});

  export async function getTikTokVideos(
    keyword: string,
  ) : Promise<string[]> {
    try {

      // Prepare Actor input
      const input = {
        "keyword": keyword,
        "limit": 5,
        "publishTime": "ALL_TIME",
        "proxyConfiguration": {
            "useApifyProxy": true
        }
      };

      const run = await client.actor("jQfZ1h9FrcWcliKZX").call(input);

      // Fetch and print Actor results from the run's dataset (if any)
      console.log('Results from dataset');
      const { items } = await client.dataset(run.defaultDatasetId).listItems();
      items.forEach((item: any) => {
          console.dir(item["aweme_info"]["video"]["bit_rate"][0]["play_addr"]["url_list"][0] as string);
      });
    
      return items.map((item: any) => item["aweme_info"]["video"]["bit_rate"][0]["play_addr"]["url_list"][0] as string);

    } catch (error) {
      console.error("Error getting TikTok videos: ", error);
      throw error; 
    }
  }


  export async function getKeywordFromPersona(
    persona: UserPersona,
  ): Promise<string> {

    const systemMessage =
    `Give me a one word keyword that would describe what the content the user persona would engage with would be about.

    User Persona: ${JSON.stringify(persona)}
  
    example response: "skiing"
    `;

    console.log(systemMessage);
    const chatResponse = await GPT4(systemMessage);

    try {
      console.log("Chat Response: ", chatResponse.text.trim());
      return chatResponse.text.trim();
    } catch (error) {
      throw new Error(
        "Failed to create the keyword. Please try again. Here was the response: " + chatResponse.text.trim(),
      );
    }
  }

