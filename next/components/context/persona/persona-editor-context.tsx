"use client";
import {
  AIState,
  ClientMessage,
  PersonaArchetype,
} from "@/app/(server)/models/persona-ai.model";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePersonaChat } from "./chat-context";
import { isEqual, set } from "lodash";
import { IS_TEST_DEV_ENV } from "@/lib/utils";
import { getSynchronizeStates } from "@/components/persona-archetype-generic/utils";
import api from "@/service/api.service";
import { useAIState, useUIState } from "ai/rsc";
import { AI } from "@/app/(server)/ai/ai-server-action";
import { ValueOrUpdater } from "@/lib/types";

export const maxDuration = 300;

type PersonaEditorContextType = {
  selectedPersonaIDInEditor: string | null;
  setSelectedPersonaIDInEditor: Dispatch<SetStateAction<string | null>>;
  selectedPersonaInEditorIsDirty: boolean;
  setSelectedPersonaInEditorIsDirty: Dispatch<SetStateAction<boolean>>;
  editPersonaInEditor: ({
    field,
    value,
  }: {
    field: string;
    value: string | number;
  }) => void;
  resetEditorState: () => void;
};

const PersonaEditorContext = createContext<
  PersonaEditorContextType | undefined
>(undefined);

interface PersonaEditorProviderProps {
  children: ReactNode;
}

export const PersonaEditorProvider = ({
  children,
}: PersonaEditorProviderProps) => {
  const [selectedPersonaIDInEditor, setSelectedPersonaIDInEditor] = useState<
    string | null
  >(null);
  const [selectedPersonaInEditorIsDirty, setSelectedPersonaInEditorIsDirty] =
    useState<boolean>(false); //? Flag for dirty state - Used to prevent info popups from spamming user

  const { personas, setPersonas, chatId, setMessages, setAiState, aiState } =
    usePersonaChat();

  //? Handles isDirty flag state for selectedPersonaInEditor state change
  useEffect(() => {
    if (
      (selectedPersonaIDInEditor !== "" ||
        selectedPersonaIDInEditor !== null) &&
      !selectedPersonaInEditorIsDirty
    ) {
      setSelectedPersonaInEditorIsDirty(true);
    }
  }, [selectedPersonaIDInEditor, selectedPersonaInEditorIsDirty]);

  const syncSavePersona = useCallback(
    (personas: PersonaArchetype[]) => {
      const { aiState: newAIState, uiState: newUIState } = getSynchronizeStates(
        {
          aiState,
          serializedPersonas: JSON.stringify(personas),
        },
      );

      const update = async (state: {}) => {
        if (!chatId) {
          console.error("chatId not found in `savePersona`");
          return;
        }
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
        }
      };

      update(newAIState);
      setAiState(newAIState as ValueOrUpdater<AIState>);
      setMessages(newUIState as ClientMessage[]);
    },
    [aiState, chatId, setAiState, setMessages],
  );

  /**
   * Updates the persona editor with the specified field and value.
   * Handles nested fields dynamically.
   *
   * @param {Object} params - Parameters for editing persona.
   * @param {string} params.field - The field to update (dot-separated for nested fields).
   * @param {string | number} params.value - The value to set.
   */
  const editPersonaInEditor = useCallback(
    async ({ field, value }: { field: string; value: string | number }) => {
      if (chatId && selectedPersonaIDInEditor) {
        const changes = [
          ...personas.map((p) =>
            p.id === selectedPersonaIDInEditor
              ? set({ ...p }, field, value)
              : p,
          ),
        ];
        syncSavePersona(changes);
      }
    },
    [chatId, personas, selectedPersonaIDInEditor, syncSavePersona],
  );

  /**
   * Resets the editor state by clearing selected persona and setting initial states.
   */
  const resetEditorState = useCallback(() => {
    setSelectedPersonaIDInEditor(null);
    setSelectedPersonaInEditorIsDirty(false);
  }, []);

  return (
    <PersonaEditorContext.Provider
      value={{
        selectedPersonaIDInEditor,
        setSelectedPersonaIDInEditor,
        selectedPersonaInEditorIsDirty,
        setSelectedPersonaInEditorIsDirty,
        editPersonaInEditor,
        resetEditorState,
      }}
    >
      {children}
    </PersonaEditorContext.Provider>
  );
};

export const usePersonaEditor = () => {
  const context = useContext(PersonaEditorContext);
  if (context === undefined) {
    throw new Error("usePersonaChat must be used within a PersonaChatProvider");
  }
  return context;
};
