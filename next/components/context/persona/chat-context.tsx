"use client";
import { AI } from "@/app/(server)/ai/ai-server-action";
import { PERSONA_CHAT_INITIAL_AI_STATE } from "@/app/(server)/ai/persona-chat-ai/initial-ai-state";
import { getUIStateFromAIState } from "@/app/(server)/ai/persona-chat-ai/utils/get-ui-state-from-ai-state";
import { AIState } from "@/app/(server)/models/persona-ai.model";
import { PersonaChatType } from "@/app/(server)/models/personachat.model";
import { BASE_URL } from "@/lib/site";
import { IS_TEST_DEV_ENV } from "@/lib/utils";
import { useActions, useAIState, useUIState } from "ai/rsc";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type PersonaChatContextType = {
  chatId: string | null;
  aiState: AIState | null;
  shareLink: string | null;
  resetChatId: () => void;
  messages: any;
  personas: any;
  setMessages: any;
  submitPersonaChatUserMessage: any;
};

const PersonaChatContext = createContext<PersonaChatContextType | undefined>(
  undefined
);

interface PersonaChatProviderProps {
  children: ReactNode;
  fetchChatWithId: (id: string) => Promise<PersonaChatType | null>;
}

export const PersonaChatProvider = ({
  children,
  fetchChatWithId,
}: PersonaChatProviderProps) => {
  const [chatId, setChatId] = useState<string | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [aiState, setAiState]: [AIState | null, (newState: any) => void] =
    useAIState<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();
  const [personas, setPersonas] = useState<any>([]);
  const { submitPersonaChatUserMessage } = useActions<typeof AI>();

  const pathname = usePathname();
  const router = useRouter();

  //? Handle Logic for pathname matching /persona/:chatId and persisting chatId
  useEffect(() => {
    const match = pathname.match(/^\/persona\/(\w+)/);
    if (match) {
      const pathnameID = match[1];
      if (pathnameID !== null) {
        setChatId(pathnameID);
        IS_TEST_DEV_ENV
          ? console.log("DEV: UE1: Persisted chatId", pathnameID)
          : null;
      }
    }
  }, [pathname]);

  //? Ensures active chatID matches route
  useEffect(() => {
    if (pathname === "/persona") {
      if (chatId) {
        console.log("UE2 triggered outer condition");
        const pathnameWithID = `/persona/${chatId}`;
        if (pathname !== pathnameWithID) {
          console.log("UE2: Redirecting to chat with id", chatId);
          if (chatId === null) {
            console.log("UE2 triggered inner condition chatId is null");
            router.replace(`/persona`);
          } else {
            router.replace(`/persona/${chatId}`);
          }
        }
      } else {
        if (chatId === null) {
          console.log("UE2 triggered inner condition chatId is null");
          setChatId(null);
          router.replace(`/persona`);
        }
      }
    }
  }, [pathname, chatId, router]);

  //? Handles chat related state dependant on chatId
  useEffect(() => {
    if (chatId !== null) {
      console.log("UE3: Fetching chat with id", chatId);
      const fetchChat = async () => {
        if (!chatId || chatId === null) return;
        console.log("UE3: Chat ID passed 2nd null check", chatId);
        const chat = await fetchChatWithId(chatId);
        if (chat) {
          setAiState(chat.aiState);
          //TODO Fix type error on Messages getUIStateFromAIState
          //@ts-ignore
          setMessages(getUIStateFromAIState(chat.aiState));
          setPersonas(chat.aiState.personas);
        }
      };

      fetchChat();
    }

    setShareLink(chatId ? `${BASE_URL}/share/${chatId}` : null);
  }, [chatId, fetchChatWithId, setAiState, setMessages]);

  //? Updates personas state when aiState changes
  useEffect(() => {
    if (aiState) {
      console.log("UE4: Updating personas state");
      setPersonas(aiState.personas);
    }
  }, [aiState, setPersonas]);

  //? Handles chatId creation on first message
  useEffect(() => {
    if (messages.length === 2 && pathname === "/persona" && aiState?.chatId) {
      console.log("UE5: Redirecting to chat with id", aiState.chatId);
      router.replace(`/persona/${aiState.chatId}`);
    }
  }, [aiState?.chatId, chatId, messages, pathname, router]);

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
        shareLink,
        resetChatId,
        setMessages,
        submitPersonaChatUserMessage,
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
