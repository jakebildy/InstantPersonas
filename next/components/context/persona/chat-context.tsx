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
import { IS_TEST_DEV_ENV, nanoid, setNestedField } from "@/lib/utils";
import api from "@/service/api.service";
import { useActions, useAIState, useUIState } from "ai/rsc";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  use,
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
import { LOCAL_STORAGE_CONFIG } from "@/lib/config/localstorage";
import { isEqual, set } from "lodash";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";
import { getSynchronizeStates } from "@/components/persona-archetype-generic/utils";
import { ValueOrUpdater } from "@/lib/types";
import { object } from "zod";

export const maxDuration = 300;

type PersonaChatContextType = {
  // Chat ID
  chatId: string | null;
  shareLink: string | null;
  // Chat State and Derived State
  aiState: AIState | null;
  messages: any;
  personas: PersonaArchetype[];
  setMessages: any;
  suggestedMessages: string[];
  setSuggestedMessages: Dispatch<SetStateAction<string[]>>;
  // Chat Submission
  handleSubmit: (message?: string) => void;
  // Path history state to track referrer && Route / Link + New Chat route function
  previousPath: string | null;
  resetChatId: () => void;
  //? State for `client-sidebar-layout` (PersonaChat) Tabs Persisting
  activeTab: PersonaChatTabs;
  setActiveTab: Dispatch<SetStateAction<PersonaChatTabs>>;
  selectedPersonaInEditor: string | null;
  setSelectedPersonaInEditor: Dispatch<SetStateAction<string | null>>;
  selectedPersonaInEditorIsDirty: boolean;
  setSelectedPersonaInEditorIsDirty: Dispatch<SetStateAction<boolean>>;
  personaEditorChanges: PersonaEditorChangesObject;
  setPersonaEditorChanges: Dispatch<SetStateAction<PersonaEditorChangesObject>>;
  editPersonaInEditor: ({
    field,
    value,
  }: {
    field: string;
    value: string | number;
  }) => void;
  unsavedPersonas: string[];
  savePersona: (personaName: string) => void;
  saveAllPersonas: () => void;
  revertPersonaChanges: (personaName: string) => void;
  resetEditorState: () => void;
};

const PersonaChatContext = createContext<PersonaChatContextType | undefined>(
  undefined,
);

interface PersonaChatProviderProps {
  children: ReactNode;
  fetchChatWithId: (id: string) => Promise<PersonaChatType | null>;
}

export type PersonaChatTabs = "personaChat" | "map" | "editor";
export type PersonaEditorChangesObject = {
  [chatId: string]: {
    [personaName: string]: PersonaArchetype;
  };
};

export const PersonaChatProvider = ({
  children,
  fetchChatWithId,
}: PersonaChatProviderProps) => {
  //? State for Persona Chat
  const [chatId, setChatId] = useState<string | null>(null);
  const [aiState, setAiState]: [AIState | null, (newState: any) => void] =
    useAIState<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();
  const [personas, setPersonas] = useState<PersonaArchetype[]>([]);
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);
  const { submitPersonaChatUserMessage } = useActions<typeof AI>();

  //? Path history state to track referrer && Route / Link
  const [pathHistory, setPathHistory] = useState<string[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const previousPath = pathHistory.at(-2) || null;
  const [shareLink, setShareLink] = useState<string | null>(null);

  //? State for `client-sidebar-layout` (PersonaChat) Tabs Persisting
  const [activeTab, setActiveTab] = useState<PersonaChatTabs>("personaChat");
  const [selectedPersonaInEditor, setSelectedPersonaInEditor] = useState<
    string | null
  >(null);
  const [selectedPersonaInEditorIsDirty, setSelectedPersonaInEditorIsDirty] =
    useState<boolean>(false); //? Flag for dirty state - Used to prevent info popups from spamming user
  const [personaEditorChanges, setPersonaEditorChanges] =
    useState<PersonaEditorChangesObject>({});
  const unsavedPersonas =
    chatId && personaEditorChanges[chatId]
      ? (Object.entries(personaEditorChanges[chatId])
          .map(([personaName, persona]) => {
            const isUnsaved = !isEqual(
              persona,
              personas.find((p) => p.archetype_name === personaName),
            );

            return isUnsaved ? personaName : null;
          })
          .filter((n) => n) as string[])
      : [];

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

  //? Handles chat related state dependant on chatId (ie, fetching chat aiState)
  useEffect(() => {
    if (chatId !== null) {
      if (!Object.keys(personaEditorChanges).includes(chatId)) {
        setPersonaEditorChanges((prev) => ({
          ...prev,
          [chatId]: {},
        }));
      }

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
            chat.aiState.personas.length > 0 &&
              chat.aiState.personas.map((persona) => {
                setPersonaEditorChanges((prev) => ({
                  ...prev,
                  [chatId]: {
                    [persona.archetype_name]: persona,
                    ...prev[chatId],
                  },
                }));
              });
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
      console.log("UE4: Updating personas state");
      setPersonas(aiState.personas);
      setSuggestedMessages(aiState.suggestedMessages);
      if (!aiState.personas || aiState.personas.length === 0) {
        setActiveTab("personaChat"); //? Reset to personaChat tab if no personas in case user navigates to map or editor
      }
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

  //? Handles isDirty flag state for selectedPersonaInEditor state change
  useEffect(() => {
    if (
      (selectedPersonaInEditor !== "" || selectedPersonaInEditor !== null) &&
      !selectedPersonaInEditorIsDirty
    ) {
      setSelectedPersonaInEditorIsDirty(true);
    }
  }, [selectedPersonaInEditor, selectedPersonaInEditorIsDirty]);

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

  /**
   * Updates the persona editor with the specified field and value.
   * Handles nested fields dynamically.
   *
   * @param {Object} params - Parameters for editing persona.
   * @param {string} params.field - The field to update (dot-separated for nested fields).
   * @param {string | number} params.value - The value to set.
   */
  const editPersonaInEditor = ({
    field,
    value,
  }: {
    field: string;
    value: string | number;
  }) => {
    if (chatId && selectedPersonaInEditor) {
      setPersonaEditorChanges((prev) => {
        const currentPersona = prev[chatId][selectedPersonaInEditor];
        const newPersona = setNestedField(currentPersona, field, value);
        const changes = {
          ...prev,
          [chatId]: {
            ...prev[chatId],
            [selectedPersonaInEditor]: newPersona,
          },
        };

        return changes;
      });
    }
  };

  const savePersona = async (personaName: string) => {
    if (chatId && personaEditorChanges[chatId]) {
      const persona = personaEditorChanges[chatId][personaName];
      const personasWithChangedPersona = personas.map((p) =>
        p.archetype_name === personaName ? persona : p,
      );
      const serializedPersonas = JSON.stringify(personasWithChangedPersona);

      const { aiState: newAIState, uiState: newUIState } = getSynchronizeStates(
        {
          aiState,
          serializedPersonas,
        },
      );

      const update = async (state: {}) => {
        const updatedState = await api.userPersona.updatePersonaChat(
          state,
          chatId,
        );

        if (!updatedState) {
          console.error(
            "error in updating persona to chat state in `savePersona`",
            updatedState,
          );
          return;
        } else {
          setPersonaEditorChanges((prev) => {
            const newState = { ...prev };

            // Add or update the persona for the given chatId
            newState[chatId] = {
              ...prev[chatId],
              [persona.archetype_name]: persona,
            };

            // Delete the old persona name key if it exists
            if (prev[chatId][personaName]) {
              delete newState[chatId][personaName];
            }

            return newState;
          });
          if (selectedPersonaInEditor === personaName) {
            setSelectedPersonaInEditor(persona.archetype_name);
          }
        }
      };

      update(newAIState);
      setAiState(newAIState as ValueOrUpdater<AIState>);
      setMessages(newUIState as ClientMessage[]);
    }
  };

  const saveAllPersonas = async () => {
    if (chatId && personaEditorChanges[chatId]) {
      // Map through the personas to reflect the changes from personaEditorChanges
      const personasWithChangedNames = personas.map((p) => {
        const editedPersona = personaEditorChanges[chatId][p.archetype_name];
        return editedPersona ? editedPersona : p;
      });

      // Include any new personas from personaEditorChanges that do not exist in the original personas
      Object.values(personaEditorChanges[chatId]).forEach((p) => {
        if (
          !personasWithChangedNames.some(
            (persona) => persona.archetype_name === p.archetype_name,
          )
        ) {
          personasWithChangedNames.push(p);
        }
      });

      const indexOfCurrentlySelectedPersona = personas.findIndex(
        (p) => p.archetype_name === selectedPersonaInEditor,
      );

      const serializedPersonas = JSON.stringify(personasWithChangedNames);

      const { aiState: newAIState, uiState: newUIState } = getSynchronizeStates(
        {
          aiState,
          serializedPersonas,
        },
      );

      const update = async (state: any) => {
        const updatedState = await api.userPersona.updatePersonaChat(
          state,
          chatId,
        );

        if (!updatedState) {
          console.error(
            "error in updating persona to chat state in `saveAllPersonas`",
            updatedState,
          );
          return;
        } else {
          setPersonaEditorChanges((prev) => {
            const newState = { ...prev };

            // Define the type for the accumulator object in reduce
            type PersonaMap = {
              [key: string]: (typeof updatedState.aiState.personas)[0];
            };

            // Replace the chatId personas state with the new one
            newState[chatId] = updatedState.aiState.personas.reduce<PersonaMap>(
              (acc, persona) => {
                acc[persona.archetype_name] = persona;
                return acc;
              },
              {} as PersonaMap,
            );

            return newState;
          });

          // Safely set the selected persona in editor
          const selectedPersona =
            updatedState.aiState.personas[indexOfCurrentlySelectedPersona];

          setSelectedPersonaInEditor(selectedPersona?.archetype_name ?? null);
        }
      };

      update(newAIState);
      setAiState(newAIState as ValueOrUpdater<AIState>);
      setMessages(newUIState as ClientMessage[]);
    }
  };

  /**
   * Reverts the changes for a given persona name under the specified chatId.
   *
   * @param {string} personaName - The name of the persona to revert changes for.
   */
  const revertPersonaChanges = (personaName: string) => {
    if (chatId && personaEditorChanges[chatId]) {
      setPersonaEditorChanges((prev) => {
        // Clone the previous state to avoid direct mutations
        const newState = { ...prev };

        // Retrieve the correct persona from the personas array
        const originalPersona = personas.find(
          (p) => p.archetype_name === personaName,
        );

        // Ensure the chatId exists in the new state and update the persona
        if (originalPersona) {
          const personaNames = personas.flatMap((p) => p.archetype_name);

          newState[chatId] = {
            ...prev[chatId],
            [personaName]: originalPersona,
          };

          Object.keys(prev[chatId]).forEach((key) => {
            if (!personaNames.includes(key)) {
              delete newState[chatId][key];
            }
          });
        }

        return newState;
      });
    }
  };

  const resetEditorState = () => {
    console.log("Resetting editor state");
    setSelectedPersonaInEditor(null);
    setSelectedPersonaInEditorIsDirty(false);
    setPersonaEditorChanges((prev) => {
      const newState = { ...prev };
      if (chatId) {
        personas.map((persona) => {
          setPersonaEditorChanges((prev) => ({
            ...prev,
            [chatId]: {
              [persona.archetype_name]: persona,
              ...prev[chatId],
            },
          }));
        });
      }
      return newState;
    });
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
        activeTab,
        setActiveTab,
        selectedPersonaInEditor,
        setSelectedPersonaInEditor,
        selectedPersonaInEditorIsDirty,
        setSelectedPersonaInEditorIsDirty,
        personaEditorChanges,
        setPersonaEditorChanges,
        editPersonaInEditor,
        unsavedPersonas,
        savePersona,
        saveAllPersonas,
        revertPersonaChanges,
        resetEditorState,
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
