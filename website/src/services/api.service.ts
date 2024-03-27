import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

export interface UserI {
  _id?: string;
  email: string;

  stripeCustomerId?: string;
  stripeSubscriptionId?: string;

  credits: number;

  // Affiliate info.
  promoCode?: string;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;

  // Onboarding
  onboarded?: boolean;
}

export interface LeanCanvas {
  problem: string;
  customerSegments: string;
  solution: string;
  uniqueValueProposition: string;
  channels: string;
  revenueStreams: string;
  costStructure: string;
  keyMetrics: string;
  unfairAdvantage: string;
}

export interface PESTELAnalysis {
  political: string;
  economic: string;
  sociocultural: string;
  technological: string;
  environmental: string;
  legal: string;
}

export interface SWOTAnalysis {
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
}

export interface UserPersona {
  _id?: string;
  name: string;
  gender: string;
  age: string;
  location: string;
  occupation: string;
  familyStatus: string;
  bio: string;
  goals: string;
  motivations: string;
  pains: string;
  devices: string;
  brandAffiliations: string;
  imageURL: string;
}

export interface ValueProposition {
  gainCreators: string;
  productsAndServices: string;
  painRelievers: string;
  customerJobs: string;
  customerPains: string;
  customerGains: string;
}

export interface Porters5Forces {
  threatOfNewEntrants: string;
  bargainingPowerOfSuppliers: string;
  bargainingPowerOfBuyers: string;
  threatOfSubstitutes: string;
  competitiveRivalry: string;
}

export interface BusinessI {
  _id?: string;
  user?: string;
  description: string;
  // SWOT Analysis
  // PESTEL Analysis
  // Lean Canvas
  // User Persona
  // Value Proposition
  // Porter's 5 Forces
  swotAnalysis?: SWOTAnalysis;
  pestelAnalysis?: PESTELAnalysis;
  leanCanvas?: LeanCanvas;
  userPersona?: UserPersona;
  valueProposition?: ValueProposition;
  porters5Forces?: Porters5Forces;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Persona {
  name: string;
  productDescription?: string;
  gender: string; //required for getting the pictureURL
  pictureURL: string;
  color: string;
  shortDescriptors: { label: string; description: string; emoji: string }[];
  sections: { label: string; description: string }[];
}

export interface Message {
  sender: "bot" | "user";
  text: string;
  _id?: string;
}
export interface PersonaHistory {
  messageHistory: Message[];
  persona?: Persona;
  aiSuggestedChats?: string[];
  contentLastGeneratedAt?: string;
  _id: string;
}

const api = {
  auth: {
    me: async () => {
      const response = await axios.get("/api/auth/me");
      return response.data;
    },

    logout: async () => {
      const response = await axios.put("/api/auth/logout");
      return response.data;
    },

    setOnBoarded: async () => {
      const response = await axios.put("/api/auth/onboarded");
      return response.data;
    },
  },

  stripe: {
    isSubscriptionActive: async () => {
      const response = await axios.get("api/stripe/subscription/active");
      return response.data;
    },
    getCustomerPortalUrl: async (): Promise<string> =>
      (await axios.get("/api/stripe/portal")).data,
  },

  userPersona: {
    messagePersona: async (
      newMessage: string,
      historyID?: string
    ): Promise<PersonaHistory> => {
      const response = await axios.post("/api/message-persona", {
        newMessage,
        historyID,
      });
      return response.data;
    },
    getPersonaHistory: async (id?: string): Promise<PersonaHistory[]> => {
      const response = await axios.get(
        id ? `/api/get-persona-history/${id}` : "/api/get-persona-history"
      );
      return response.data.results;
    },
    updatePersona: async (
      persona: Persona,
      historyID: string
    ): Promise<PersonaHistory> => {
      const response = await axios.post("/api/update-persona", {
        persona,
        historyID,
      });
      return response.data;
    },

    deletePersona: async (id: string) => {
      const response = await axios.delete(`/api/delete-persona/${id}`);
      return response.data;
    },
  },
};

export default api;
