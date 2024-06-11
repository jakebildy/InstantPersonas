"use client";
import { AI } from "@/app/(server)/ai/ai-server-action";
import { PERSONA_CHAT_INITIAL_AI_STATE } from "@/app/(server)/ai/persona-chat-ai/initial-ai-state";
import { getUIStateFromAIState } from "@/app/(server)/ai/persona-chat-ai/utils/get-ui-state-from-ai-state";
import { AIState, ClientMessage } from "@/app/(server)/models/persona-ai.model";
import { PersonaChatType } from "@/app/(server)/models/personachat.model";
import { BASE_URL } from "@/lib/site";
import { IS_TEST_DEV_ENV, nanoid } from "@/lib/utils";
import api from "@/service/api.service";
import { useActions, useAIState, useUIState } from "ai/rsc";
import { usePathname, useRouter } from "next/navigation";
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

type PersonaChatContextType = {
  chatId: string | null;
  aiState: AIState | null;
  shareLink: string | null;
  resetChatId: () => void;
  messages: any;
  personas: any;
  setMessages: any;
  previousPath: string | null;
  handleSubmit: (message?: string) => void;
  suggestedMessages: string[];
  setSuggestedMessages: Dispatch<SetStateAction<string[]>>;
};

const PersonaChatContext = createContext<PersonaChatContextType | undefined>(
  undefined,
);

interface PersonaChatProviderProps {
  children: ReactNode;
  fetchChatWithId: (id: string) => Promise<PersonaChatType | null>;
}

export const PersonaChatProvider = ({
  children,
  fetchChatWithId,
}: PersonaChatProviderProps) => {
  //? State for Persona Chat
  const [chatId, setChatId] = useState<string | null>(null);
  const [aiState, setAiState]: [AIState | null, (newState: any) => void] =
    useAIState<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();
  const [personas, setPersonas] = useState<any>([]);
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);
  const { submitPersonaChatUserMessage } = useActions<typeof AI>();

  //? Path history state to track referrer && Route / Link
  const [pathHistory, setPathHistory] = useState<string[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const previousPath = pathHistory.at(-2) || null;
  const [shareLink, setShareLink] = useState<string | null>(null);

  //? State for User Auth
  const { isSubscribed, user } = useInstantPersonasUser();

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
        IS_TEST_DEV_ENV
          ? console.log("DEV: UE2 triggered outer condition chatId is not null")
          : null;
        const pathnameWithID = `/persona/${chatId}`;
        if (pathname !== pathnameWithID) {
          IS_TEST_DEV_ENV
            ? console.log("DEV: UE2: Redirecting to chat with id", chatId)
            : null;
          if (chatId === null) {
            IS_TEST_DEV_ENV
              ? console.log("DEV: UE2 triggered inner condition chatId is null")
              : null;
            router.replace(`/persona`);
          } else {
            router.replace(`/persona/${chatId}`);
          }
        }
      } else {
        if (chatId === null) {
          IS_TEST_DEV_ENV
            ? console.log("DEV: UE2 triggered outer condition chatId is null")
            : null;
          setChatId(null);
          router.replace(`/persona`);
        }
      }
    }
  }, [pathname, chatId, router]);

  //? Handles chat related state dependant on chatId
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
      console.log("UE4: Updating personas state");
      setPersonas(aiState.personas);
      setSuggestedMessages(aiState.suggestedMessages);
    }
  }, [aiState, setPersonas]);

  //? Handles chatId creation on first message
  useEffect(() => {
    const chatIsNew = messages.length === 2;
    const chatIDIsValid = aiState?.chatId && stringIsMongoID(aiState.chatId);
    const navigateToChat = pathname === "/persona";

    if (chatIsNew && chatIDIsValid && navigateToChat) {
      IS_TEST_DEV_ENV
        ? console.log("DEV: UE5: Redirecting to chat with id", aiState.chatId)
        : null;
      router.replace(`/persona/${aiState.chatId}`);
    }
  }, [aiState?.chatId, chatId, messages, pathname, router]);

  //? Handles Path History State
  //TODO: Refactor to separate context once complexity increases
  useEffect(() => {
    if (pathHistory.at(-1) !== pathname) {
      setPathHistory((prev) => [...prev, pathname]);
    }
  }, [pathHistory, pathname]);

  //? Function to manually reset chatId
  const resetChatId = () => {
    setChatId(null);
    router.replace("/persona");
    setAiState(PERSONA_CHAT_INITIAL_AI_STATE);
    setMessages([]);
  };

  const handleSubmit = async (message?: string | null) => {
    if (!isSubscribed && !IS_TEST_DEV_ENV) {
      setMessages((currentMessages: ClientMessage[]) => [
        ...currentMessages,
        {
          id: nanoid(),
          role: "assistant",
          display: (
            <SystemErrorMessage
              message={
                <div className="flex w-full flex-col gap-2">
                  <span>
                    Oops! It seems you haven&apos;t subscribed yet. To continue,
                    please explore our subscription plans.
                  </span>
                  <Button variant={"outline"} size={"sm"} asChild>
                    <Link href="/subscription">View Subscription Plans</Link>
                  </Button>
                </div>
              }
            />
          ),
        },
      ]);
    } else if (!message || message === null || message === "") {
      setMessages((currentMessages: ClientMessage[]) => [
        ...currentMessages,
        {
          id: nanoid(),
          role: "assistant",
          display: (
            <AssistantMessage
              message={
                "It appears your message was submitted without content. Please type your message and submit again."
              }
            />
          ),
        },
      ]);
    } else {
      const inputtedMessage = message;
      // Add user message to UI state
      setMessages((currentMessages: ClientMessage[]) => [
        ...currentMessages,
        {
          id: nanoid(),
          role: "user",
          display: <UserMessage message={inputtedMessage} />,
        },
      ]);

      // Clear suggested messages
      setSuggestedMessages([]);

      // Submit and get response message
      if (user) {
        const responseMessage = (await submitPersonaChatUserMessage(
          inputtedMessage,
          user.id,
          chatId,
        )) as ClientMessage;
        setMessages((currentMessages: ClientMessage[]) => [
          ...currentMessages,
          responseMessage,
        ]);
      } else {
        setMessages((currentMessages: ClientMessage[]) => [
          ...currentMessages,
          {
            id: nanoid(),
            role: "assistant",
            display: (
              <SystemErrorMessage
                message={
                  <div className="flex w-full flex-col gap-2">
                    <span>
                      Looks like your session is no longer valid, please log in
                      again!
                    </span>
                    <Button variant={"outline"} size={"sm"} asChild>
                      <Link href="/login">Log in</Link>
                    </Button>
                  </div>
                }
              />
            ),
          },
        ]);
      }
    }
  };

  return (
    <PersonaChatContext.Provider
      value={{
        chatId,
        aiState,
        messages,
        personas,
        shareLink,
        previousPath,
        resetChatId,
        setMessages,
        handleSubmit,
        suggestedMessages,
        setSuggestedMessages,
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
