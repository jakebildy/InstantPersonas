import { AIState } from "@/app/(server)/models/ai-state-type-validators";
import { PersonaChat } from "@/app/(server)/models/personachat.model";
import { UserSubscription } from "@/components/context/auth/user-context.types";
import axios, { AxiosError } from "axios";
// axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true;

const api = {
  tools: {
    findGuestPostOpportunities: async (
      personas: string,
      paid: boolean
    ): Promise<any> => {
      const response = await axios.post("/api/guest-post-opportunities", {
        personas,
        paid,
      });
      console.log("response from guest post opportunities", response);
      return response.data;
    },
    findGoogleKeywords: async (
      personas: string,
      paid: boolean
    ): Promise<any> => {
      const response = await axios.post("/api/google-keywords", {
        personas,
        paid,
      });
      console.log("response from google keywords api", response);
      return response.data;
    },
  },
  auth: {
    //? These are old routes from AiConsultingTools which haven't been reimplemented yet
    // me: async () => {
    //   const response = await axios.get("/api/user");
    //   return response.data;
    // },

    // logout: async () => {
    //   const response = await axios.put("/api/logout");
    //   return response.data;
    // },

    // setOnBoarded: async () => {
    //   const response = await axios.put("/api/onboarded");
    //   return response.data;
    // },

    createUserIfSignup: async (userID: string, email: string) => {
      const response = await axios.post(
        "/api/create-user-if-signup",
        {
          userID: userID,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  },

  stripe: {
    isSubscriptionActive: async (userID: string): Promise<UserSubscription> => {
      try {
        const response = await axios.get("/api/subscription-status", {
          params: { id: userID },
        });

        return response.data as UserSubscription;
      } catch (error: any) {
        console.error("Error getting subscription status:", error.message);
        return {
          status: "inactive",
          cancel_at_period_end: false,
          interval: "month",
        };
      }
    },
    getCustomerPortalUrl: async (userID: string): Promise<string> => {
      const response = await axios.get("/api/customer-portal", {
        params: { id: userID },
      });

      return response.data.url;
    },
  },

  userPersona: {
    getPersonaHistory: async (id?: string): Promise<PersonaChat[]> => {
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
      const data = response.data.results;
      //! TEMP: Check to make sure aiState is not an array

      if (!data) {
        return [];
      }

      //@ts-ignore
      const history = data.map((chat: any) => {
        if (Array.isArray(chat.aiState)) {
          chat.aiState = chat.aiState[0];
        }
        return chat;
      });
      return history;
    },
    getPersonaChat: async (chatID: string): Promise<PersonaChat> => {
      // Define the base URL for the request
      const baseUrl = "/api/get-persona-chat";

      // Create an object to hold any query parameters
      const params = {
        id: chatID,
      };

      // Make the GET request with the query parameters
      const response = await axios.get(baseUrl, { params });

      // Return the results from the response
      const data = response.data.result;
      //! TEMP: Check to make sure aiState is not an array
      if (data && Array.isArray(data.aiState)) {
        data.aiState = data.aiState[0];
      }

      return data;
    },
    updatePersonaChat: async (
      chat: AIState | {},
      id: string
    ): Promise<PersonaChat> => {
      const response = await axios.post(`/api/update-persona-chat/${id}`, {
        chat,
      });
      return response.data.result;
    },

    updatePersona: async (
      persona: PersonaChat["aiState"],
      historyID: string
    ): Promise<PersonaChat> => {
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
