import { PersonaChat } from "@/app/(server)/models/personachat.model";
import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
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
    getPersonaHistory: async (id?: string): Promise<any> => {
        // Define the base URL for the request
        const baseUrl = "/api/get-persona-history";

        // Create an object to hold any query parameters
        const params = {} as any;

        // If an ID is provided, add it as a query parameter
        if (id) {
          params.id = id;
        }

        // Make the GET request with the query parameters
        const response = await axios.get(baseUrl, { params });

        // Return the results from the response
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
