import { UserI } from "../models/user.model";
import {
  Business,
  BusinessI,
  LeanCanvas,
  PESTELAnalysis,
  Porters5Forces,
  SWOTAnalysis,
  UserPersona,
  ValueProposition,
} from "../models/business.model";
import { SurveyQuestion } from "../types";
import { ChatGPT } from "./openai.service"; // Update the import path as needed

export async function generateLeanCanvas(
  companyDescription: string,
): Promise<LeanCanvas> {
  // Define the system message to instruct the model and provide the template
  const systemMessage = `You are an AI language model. Generate a Lean Canvas based on the following company description:
  Description: ${companyDescription}
  
  Please structure your response as follows:
  Problem: [Problem]
  Customer Segments: [Customer Segments]
  Solution: [Solution]
  Unique Value Proposition: [Unique Value Proposition]
  Channels: [Channels]
  Revenue Streams: [Revenue Streams]
  Cost Structure: [Cost Structure]
  Key Metrics: [Key Metrics]
  Unfair Advantage: [Unfair Advantage]`;

  // Call the ChatGPT function to get the model's response
  const chatResponse = await ChatGPT(systemMessage);

  // Extract the text from the model's response
  const responseText = chatResponse.text;

  // Parse the response text to extract the sections of the Lean Canvas
  let lines = responseText.split("\n");
  // Trim and remove empty lines.
  lines = lines
    .map((line: string) => line.trim())
    .filter((line: string) => line.length > 0);

  const leanCanvas: LeanCanvas = {
    problem: lines[0].replace("Problem: ", ""),
    customerSegments: lines[1].replace("Customer Segments: ", ""),
    solution: lines[2].replace("Solution: ", ""),
    uniqueValueProposition: lines[3].replace("Unique Value Proposition: ", ""),
    channels: lines[4].replace("Channels: ", ""),
    revenueStreams: lines[5].replace("Revenue Streams: ", ""),
    costStructure: lines[6].replace("Cost Structure: ", ""),
    keyMetrics: lines[7].replace("Key Metrics: ", ""),
    unfairAdvantage: lines[8].replace("Unfair Advantage: ", ""),
  };

  return leanCanvas;
}

export async function generatePESTELAnalysis(
  companyDescription: string,
): Promise<PESTELAnalysis> {
  const systemMessage = `You are an AI language model. Generate a PESTEL Analysis in JSON format based on the following company description:
Description: ${companyDescription}

Please structure your response in a clear and easily parsable JSON format.

interface PESTELAnalysisI {
  political: string;
  economic: string;
  sociocultural: string;
  technological: string;
  environmental: string;
  legal: string;
}

For example:
{
  "political": "details",
  "economic": "details",
  "sociocultural": "details",
  "technological": "details",
  "environmental": "details",
  "legal": "details"
}`;

  const chatResponse = await ChatGPT(systemMessage);
  const responseText = chatResponse.text.trim();
  let pestelAnalysis: PESTELAnalysis;
  try {
    pestelAnalysis = JSON.parse(responseText);
  } catch (error) {
    throw new Error("Failed to parse the generated JSON. Please try again.");
  }
  return pestelAnalysis;
}

export async function generateSWOTAnalysis(
  companyDescription: string,
): Promise<SWOTAnalysis> {
  const systemMessage = `You are an AI language model. Generate a SWOT Analysis in JSON format based on the following company description and Q & A:
Description: ${companyDescription}

Please structure your response in a clear and easily parsable JSON format.

interface SWOTAnalysisI {  
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
}

For example:
{
  "strengths": "details",
  "weaknesses": "details",
  "opportunities": "details",
  "threats": "details"
}`;

  const chatResponse = await ChatGPT(systemMessage, undefined, "gpt-4");
  const responseText = chatResponse.text.trim();
  let swotAnalysis: SWOTAnalysis;

  try {
    swotAnalysis = JSON.parse(responseText);
    if ((swotAnalysis as any)["SWOTAnalysis"]) {
      swotAnalysis = (swotAnalysis as any)["SWOTAnalysis"];
      console.log("Had to fix SWOT ANALYSIS");
    }
  } catch (error) {
    throw new Error("Failed to parse the generated JSON. Please try again.");
  }

  return swotAnalysis;
}

export async function generateUserPersona(
  companyDescription: string,
): Promise<UserPersona> {
  const systemMessage = `You are an AI language model. Generate a User Persona in JSON format based on the following company description and Q & A::
Description: ${companyDescription}

Please structure your response in a clear and easily parsable JSON format.

interface UserPersona {
  _id?: string;
  name: string;
  gender: string
  age: string
  location: string
  occupation: string
  familyStatus: string
  bio: string
  goals: string
  motivations: string
  pains: string
  devices: string
  brandAffiliations: string
}

For example:
{
  "name": "John Doe",
  "gender" : "details",
  "age" : "details",
  "location" : "details",
  "occupation" : "details",
  "familyStatus" : "details",
  "bio" : "details",
  "goals" : "details",
  "motivations" : "details",
  "pains" : "details",
  "devices" : "details",
  "brandAffiliations" : "details"
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

  userPersona.imageURL = getRandomHeadshot(userPersona.gender);
  return userPersona;
}

export async function generateValueProposition(
  companyDescription: string,
): Promise<ValueProposition> {
  if (!companyDescription) {
    throw new Error("Company description cannot be empty.");
  }
  const systemMessage = `You are an AI language model. Generate a Value Proposition in JSON format based on the following company description and Q & A::
Description: ${companyDescription}

Please structure your response in a clear and easily parsable JSON format.

interface ValueProposition {
  gainCreators: string;
  productsAndServices: string;
  painRelievers: string;
  customerJobs: string;
  customerPains: string;
  customerGains: string;
}

For example:
{
  "gainCreators": "details";
  "productsAndServices": "details";
  "painRelievers": "details";
  "customerJobs": "details";
  "customerPains": "details";
  "customerGains": "details";
}
`;

  const chatResponse = await ChatGPT(systemMessage);
  const responseText = chatResponse.text.trim();
  let valueProposition: ValueProposition;

  try {
    valueProposition = JSON.parse(responseText);
    if ((valueProposition as any)["ValueProposition"]) {
      valueProposition = (valueProposition as any)["ValueProposition"];
      console.log("Had to fix ValueProposition");
    }
  } catch (error) {
    throw new Error(
      "Failed to parse the generated ValueProposition JSON. Please try again.",
    );
  }
  return valueProposition;
}

export async function generatePorters5Forces(
  companyDescription: string,
): Promise<Porters5Forces> {
  if (!companyDescription) {
    throw new Error("Company description cannot be empty.");
  }
  const systemMessage = `You are an AI language model. Generate a detailed Porter's 5 Forces Analysis in JSON format based on the following company description and Q & A::
Description: ${companyDescription}

Please structure your response in a clear and easily parsable JSON format.

interface Porters5Forces {
  threatOfNewEntrants: string;
  bargainingPowerOfSuppliers: string;
  bargainingPowerOfBuyers: string;
  threatOfSubstitutes: string;
  competitiveRivalry: string;
}

For example, the following is a valid response. "details" should contain a couple in depth sentences for each force analysis and Q & A::
{
  "threatOfNewEntrants": "details";
  "bargainingPowerOfSuppliers": "details";
  "bargainingPowerOfBuyers": "details";
  "threatOfSubstitutes": "details";
  "competitiveRivalry": "details";
}
`;

  const chatResponse = await ChatGPT(systemMessage);
  const responseText = chatResponse.text.trim();
  let porters5Forces: Porters5Forces;

  try {
    porters5Forces = JSON.parse(responseText);
    console.log(responseText);
    if ((porters5Forces as any)["Porters5Forces"]) {
      porters5Forces = (porters5Forces as any)["Porters5Forces"];
      console.log("Had to fix Porter's 5 Forces");
    }
  } catch (error) {
    throw new Error(
      "Failed to parse the generated Porter's 5 Forces JSON. Please try again.",
    );
  }
  return porters5Forces;
}

export async function generateAssessmentQuestions(
  companyDescription: string,
): Promise<SurveyQuestion[]> {
  if (!companyDescription) {
    throw new Error("Company description cannot be empty.");
  }
  const systemMessage = `
    Given the following business "${companyDescription}" generates 5 specific questions to ask the founder to gain additional novel context to better understand the strengths, weaknesses, opportunities and threats of the business.

Format the questions in ECMA-404 compliant JSON. The response types from the user can either be text or a number, or select response from a set of options. Type format:

type SurveyQuestion = {
  question: string;
  response_type: "text" | "number";
  placeholder: string;
  category: string;
} | {
  question: string;
  response_type: "select";
  options: string[];
  placeholder: string;
  category: string;
};

response = SurveyQuestion[]

example: [ {"question": "specific example question",
    "response_type": "text" | "number",
    "placeholder" : "My business...",
    "category": "Short Specific Example"
  },{
    "question": "detailed example question 2",
    "response_type": "select",
    "options": ["model 1", "model 2", "model 3", "model 4"]
     "placeholder" : "Select a model",
     "category": "Business Model"
  },] 

  Extend to include 2 number questions and 2 select questions
  `;

  const chatResponse = await ChatGPT(systemMessage, undefined, "gpt-4");
  // const chatResponse = await ChatGPT(systemMessage);
  const responseText = chatResponse.text.trim();
  let assessmentQuestions: SurveyQuestion[];

  try {
    assessmentQuestions = JSON.parse(responseText);
    console.log(responseText);
  } catch (error) {
    throw new Error(
      "Failed to parse the generated Assessment Questions JSON. Please try again.",
    );
  }
  return assessmentQuestions;
}

export async function createBusiness(
  user: UserI,
  description: string,
): Promise<BusinessI> {
  const createdBusiness = await Business.create({
    description,
    user: user._id,
  });
  return createdBusiness.toObject();
}

// Save / Update Business.
export async function saveBusiness(business: BusinessI): Promise<BusinessI> {
  const _business = await Business.findByIdAndUpdate(business._id, business, {
    new: true,
  });
  if (!_business) {
    throw new Error("Failed to update business.");
  }
  return _business;
}

export async function getBusinessById(businessId: string): Promise<BusinessI> {
  const _business = await Business.findById(businessId);
  if (!_business) {
    throw new Error("Failed to find business.");
  }
  return _business;
}

export async function getBusinessesByUser(user: UserI): Promise<BusinessI[]> {
  const _businesses = await Business.find({ user: user._id });
  return _businesses;
}

export async function deleteBusinessById(
  businessId: string,
): Promise<BusinessI> {
  const _business = await Business.findByIdAndDelete(businessId);
  if (!_business) {
    throw new Error("Failed to delete business.");
  }
  return _business;
}

function getRandomHeadshot(gender: string) {
  return `https://xsgames.co/randomusers/assets/avatars/${gender.toLowerCase()}/${Math.ceil(
    Math.random() * 78,
  )}.jpg`;
}
