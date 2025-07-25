"use client";
import { AI } from "@/app/(server)/ai/ai-server-action";
import { PERSONA_CHAT_INITIAL_AI_STATE } from "@/app/(server)/ai/persona-chat-ai/initial-ai-state";
import { getUIStateFromAIState } from "@/app/(server)/ai/persona-chat-ai/utils/get-ui-state-from-ai-state";
import {
  AIState,
  ClientMessage,
  PersonaArchetype,
} from "@/app/(server)/models/persona-ai.model";
import { PersonaChatType } from "@/app/(server)/models/personachat.model";
import { BASE_URL } from "@/lib/site";
import { IS_TEST_DEV_ENV, nanoid } from "@/lib/utils";
import api from "@/service/api.service";
import { useActions, useAIState, useUIState } from "ai/rsc";
import { useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useInstantPersonasUser } from "../auth/user-context";
import { SystemErrorMessage } from "@/components/page-specific/generative-ui/messages/system/system-error-message";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserMessage } from "@/components/page-specific/generative-ui/messages/user/user-message";
import { AssistantMessage } from "@/components/page-specific/generative-ui/messages/assistant/assistant-message";
import { stringIsMongoID } from "@/app/(server)/api/(persona-crud)/fix-persona-chat/validate-mongo-id";
import { usePersistedIDManager } from "./hooks/usePersistedIDManager";
import { PathHistory, usePathHistory } from "./hooks/usePathHistory";
import usePersonaChatSubmit from "./hooks/usePersonaChatSubmit";

export const maxDuration = 300;

type PersonaChatContextType = {
  // Chat ID
  chatId: string | null;
  shareLink: string | null;
  // Chat State and Derived State
  aiState: AIState | null;
  messages: any;
  personas: PersonaArchetype[];
  setPersonas: Dispatch<SetStateAction<PersonaArchetype[]>>;
  setAiState: (newState: any) => void;
  setMessages: any;
  suggestedMessages: string[];
  setSuggestedMessages: Dispatch<SetStateAction<string[]>>;
  // Chat Submission
  handleSubmit: (message?: string) => void;
  // Path history state to track referrer && Route / Link + New Chat route function
  path: PathHistory;
  resetChatId: () => void;
  //? State for `client-sidebar-layout` (PersonaChat) Tabs Persisting
  activeTab: PersonaChatTabs;
  setActiveTab: Dispatch<SetStateAction<PersonaChatTabs>>;
};

const PersonaChatContext = createContext<PersonaChatContextType | undefined>(
  undefined,
);

interface PersonaChatProviderProps {
  children: ReactNode;
  fetchChatWithId: (id: string) => Promise<PersonaChatType | null>;
}

export type PersonaChatTabs = "personaChat" | "map" | "editor";

export const PersonaChatProvider = ({
  children,
  fetchChatWithId,
}: PersonaChatProviderProps) => {
  //? State for Persona Chat
  const { chatId, setChatId } = usePersistedIDManager();
  const { path } = usePathHistory();
  const [aiState, setAiState]: [AIState | null, (newState: any) => void] =
    useAIState<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();
  const [personas, setPersonas] = useState<PersonaArchetype[]>([]);
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);
  const { handleSubmit } = usePersonaChatSubmit({
    chatId,
    setSuggestedMessages,
  });

  const router = useRouter();
  const [shareLink, setShareLink] = useState<string | null>(null);

  //? State for `client-sidebar-layout` (PersonaChat) Tabs Persisting
  const [activeTab, setActiveTab] = useState<PersonaChatTabs>("personaChat");

  //? Handles chat related state dependant on chatId (ie, fetching chat aiState)
  useEffect(() => {
    if (chatId !== null) {
      IS_TEST_DEV_ENV
        ? console.log("DEV: UE3: Fetching chat with id", chatId)
        : null;

      const fetchChat = async () => {
        const chatIDIsInvalid =
          !chatId || chatId === null || !stringIsMongoID(chatId);
        if (chatIDIsInvalid) return;

        const chat = await api.userPersona.getPersonaChat(chatId);
        if (chat) {
          setAiState(chat.aiState);
          //TODO Fix type error on Messages getUIStateFromAIState
          //@ts-ignore
          setMessages(getUIStateFromAIState(chat.aiState));
          if (chat.aiState.personas) {
            setPersonas(chat.aiState.personas);
          } else {
            setActiveTab("personaChat"); //? Reset to personaChat tab if no personas in case user navigates to map or editor
          }
        }
      };

      fetchChat();
    }

    setShareLink(chatId ? `${BASE_URL}/share/${chatId}` : null);
  }, [chatId, fetchChatWithId, setAiState, setMessages]);

  //? Updates personas state when aiState changes
  useEffect(() => {
    if (aiState) {
      IS_TEST_DEV_ENV ? console.log("DEV: UE4: Updating personas state") : null;
      setPersonas(aiState.personas);
      setSuggestedMessages(aiState.suggestedMessages);
      if (!aiState.personas || aiState.personas.length === 0) {
        setActiveTab("personaChat"); //? Reset to personaChat tab if no personas in case user navigates to map or editor
      }
    }
  }, [aiState, chatId, personas, setPersonas]);

  //? Handles chatId creation on first message
  useEffect(() => {
    const chatIsNew = messages.length === 2;
    const chatIDIsValid = aiState?.chatId && stringIsMongoID(aiState.chatId);
    const navigateToChat = path.current === "/persona";

    if (chatIsNew && chatIDIsValid && navigateToChat) {
      IS_TEST_DEV_ENV
        ? console.log("DEV: UE5: Redirecting to chat with id", aiState.chatId)
        : null;
      router.replace(`/persona/${aiState.chatId}`);
    }
  }, [aiState?.chatId, chatId, messages, path, router]);

  //? Function to manually reset chatId
  const resetChatId = () => {
    setChatId(null);
    router.replace("/persona");
    setAiState(PERSONA_CHAT_INITIAL_AI_STATE);
    setMessages([]);
  };

  return (
    <PersonaChatContext.Provider
      value={{
        chatId,
        aiState,
        messages,
        personas,
        setPersonas,
        shareLink,
        path,
        resetChatId,
        setAiState,
        setMessages,
        handleSubmit,
        suggestedMessages,
        setSuggestedMessages,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </PersonaChatContext.Provider>
  );
};

export const usePersonaChat = () => {
  const context = useContext(PersonaChatContext);
  if (context === undefined) {
    throw new Error("usePersonaChat must be used within a PersonaChatProvider");
  }
  return context;
};
