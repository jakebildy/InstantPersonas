"use client";
import { AI } from "@/app/(server)/action";
import { AIState } from "@/app/(server)/models/ai-state-type-validators";
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
  submitUserMessage: any;
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
  const { submitUserMessage } = useActions<typeof AI>();

  const pathname = usePathname();
  const router = useRouter();

  //? Handle Logic for pathname matching /persona/:chatId and persisting chatId
  useEffect(() => {
    const match = pathname.match(/^\/persona\/(\w+)/);
    if (match) {
      setChatId(match[1]);
      IS_TEST_DEV_ENV
        ? console.log("DEV: UE1: Persisted chatId", match[1])
        : null;
    }
  }, [pathname]);

  //? Ensures active chatID matches route
  useEffect(() => {
    if (pathname === "/persona" && chatId) {
      console.log("UE2 triggered outer condition");
      const pathnameWithID = `/persona/${chatId}`;
      if (pathname !== pathnameWithID) {
        console.log("UE2: Redirecting to chat with id", chatId);
        router.replace(`/persona/${chatId}`);
      }
    }
  }, [pathname, chatId, router]);

  //? Handles chat related state dependant on chatId
  useEffect(() => {
    if (chatId !== null) {
      console.log("UE3: Fetching chat with id", chatId);
      const fetchChat = async () => {
        const chat = await fetchChatWithId(chatId);
        if (chat) {
          setAiState(chat.aiState);
          setPersonas(chat.aiState.personas);
        }
      };

      fetchChat();
    }

    setShareLink(chatId ? `${BASE_URL}/share/${chatId}` : null);
  }, [chatId, fetchChatWithId, setAiState]);

  //? Updates personas state when aiState changes
  // useEffect(() => {
  //   if (aiState) {
  //     console.log("UE4: Updating personas state");
  //     setPersonas(aiState.personas);
  //   }
  // }, [aiState, setPersonas]);

  //? Handles chatId creation on first message
  useEffect(() => {
    if (messages.length === 2 && pathname === "/persona" && aiState?.chatId) {
      console.log("UE5: Redirecting to chat with id", aiState.chatId);
      router.replace(`/persona/${chatId}`);
    }
  }, [aiState?.chatId, chatId, messages, pathname, router]);

  //? Function to manually reset chatId
  const resetChatId = () => {
    setChatId(null);
    router.replace("/persona");
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
        submitUserMessage,
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
