import { DocumentDraft } from "@/app/(server)/models/document_draft.model";
import { AIState } from "@/app/(server)/models/persona-ai.model";
import { PersonaChatType } from "@/app/(server)/models/personachat.model";
import { UserSubscription } from "@/components/context/auth/user-context.types";
import axios, { AxiosError } from "axios";
// axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true;

const api = {
  tools: {
    findGuestPostOpportunities: async (
      personas: string,
      paid: boolean,
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
      paid: boolean,
    ): Promise<any> => {
      const response = await axios.post("/api/google-keywords", {
        personas,
        paid,
      });
      console.log("response from google keywords api", response);
      return response.data;
    },
    findGoogleKeywordsDocumentEditor: async (
      personas: string,
      paid: boolean,
    ): Promise<any> => {
      const response = await axios.post("/api/google-keywords-blog", {
        personas,
        paid,
      });
      console.log("response from google keywords blog api", response);
      return response.data;
    },
    findInstagramHashtags: async (
      personas: string,
      paid: boolean,
    ): Promise<any> => {
      const response = await axios.post("/api/instagram-hashtags", {
        personas,
        paid,
      });
      console.log("response from instagram hashtags api", response);
      return response.data;
    },
    analyzeHeadline: async (headline: string, paid: boolean): Promise<any> => {
      const response = await axios.post("/api/headline-analyzer", {
        headline,
        paid,
      });
      console.log("response from headline analyzer api", response);
      return response.data;
    },
    autocomplete: async (text: string): Promise<any> => {
      const response = await axios.post("/api/autocomplete", {
        text,
      });
      console.log("response from autocomplete api", response);
      return response.data;
    },
    outlineSections: async (title: string): Promise<any> => {
      const response = await axios.post("/api/outline-sections", {
        title,
      });
      console.log("response from outline sections api", response);
      return response.data;
    },
    generatePersonaThoughts: async (
      text: string,
      personas: string,
    ): Promise<any> => {
      const response = await axios.post("/api/persona-thoughts", {
        text,
        personas,
      });
      console.log("response from persona thoughts api", response);
      return response.data;
    },
    generatePersonaThoughtsFromURL: async (
      url: string,
      personas: string,
    ): Promise<any> => {
      const response = await axios.post("/api/persona-thoughts-url", {
        url,
        personas,
      });
      console.log("response from persona thoughts url api", response);
      return response.data;
    },
    findInstagramAccounts: async (
      personas: string,
      paid: boolean,
    ): Promise<any> => {
      const response = await axios.post("/api/instagram-accounts", {
        personas,
        paid,
      });
      console.log("response from instagram accounts api", response);
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
        },
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
    getPersonaHistory: async (id?: string): Promise<PersonaChatType[]> => {
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
    getPersonaChat: async (chatID: string): Promise<PersonaChatType> => {
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
      id: string,
    ): Promise<PersonaChatType> => {
      const response = await axios.post(`/api/update-persona-chat`, {
        id,
        chat,
      });
      return response.data.result;
    },
    updatePersona: async (
      persona: PersonaChatType["aiState"],
      historyID: string,
    ): Promise<PersonaChatType> => {
      const response = await axios.post("/api/update-persona", {
        persona,
        historyID,
      });
      return response.data;
    },

    deletePersonaChat: async (id: string) => {
      const response = await axios.delete(`/api/delete-persona-chat`, {
        params: { id },
      });
      const success = response.data.result ?? false;
      return success;
    },
    deletePersona: async (id: string) => {
      const response = await axios.delete(`/api/delete-persona/${id}`);
      return response.data;
    },
  },
  documentEditor: {
    getDocuments: async (id?: string): Promise<DocumentDraft[]> => {
      // Define the base URL for the request
      const baseUrl = "/api/get-documents";

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

      return data;
    },

    updateDocument: async (
      content: string,
      title: string,
      id: string,
    ): Promise<DocumentDraft> => {
      const response = await axios.post(`/api/update-document/`, {
        documentID: id,
        content,
        title,
      });
      return response.data.result;
    },

    createDocument: async (userID: string) => {
      const response = await axios.post(`/api/create-document`, {
        userID,
      });
      return response.data;
    },
    deleteDocument: async (id: string): Promise<DocumentDraft> => {
      // Create an object to hold any query parameters
      const params = {
        id: id,
      };

      const response = await axios.delete(`/api/delete-document`, {
        params,
      });
      console.log("response from delete document", response);
      return response.data.result;
    },
  },
};

export default api;
