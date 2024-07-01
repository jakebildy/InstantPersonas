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
  useContext,
  useEffect,
  useState,
} from "react";
import { usePersonaChat } from "./chat-context";
import { isEqual } from "lodash";
import { IS_TEST_DEV_ENV, setNestedField } from "@/lib/utils";
import { getSynchronizeStates } from "@/components/persona-archetype-generic/utils";
import api from "@/service/api.service";
import { useAIState, useUIState } from "ai/rsc";
import { AI } from "@/app/(server)/ai/ai-server-action";
import { ValueOrUpdater } from "@/lib/types";

export const maxDuration = 300;

export type PersonaEditorChangesObject = {
  [chatId: string]: {
    [personaName: string]: PersonaArchetype;
  };
};

type PersonaEditorContextType = {
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

const PersonaEditorContext = createContext<
  PersonaEditorContextType | undefined
>(undefined);

interface PersonaEditorProviderProps {
  children: ReactNode;
}

export const PersonaEditorProvider = ({
  children,
}: PersonaEditorProviderProps) => {
  const [selectedPersonaInEditor, setSelectedPersonaInEditor] = useState<
    string | null
  >(null);
  const [selectedPersonaInEditorIsDirty, setSelectedPersonaInEditorIsDirty] =
    useState<boolean>(false); //? Flag for dirty state - Used to prevent info popups from spamming user
  const [personaEditorChanges, setPersonaEditorChanges] =
    useState<PersonaEditorChangesObject>({});
  const [unsavedPersonas, setUnsavedPersonas] = useState<string[]>([]);
  const [aiState, setAiState]: [AIState | null, (newState: any) => void] =
    useAIState<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();
  const { personas, chatId } = usePersonaChat();

  //? Handles unsaved personas
  useEffect(() => {
    if (chatId && personas && personaEditorChanges[chatId]) {
      console.log("personaEditorChanges", personaEditorChanges[chatId], chatId);
      const unsavedPersonas = Object.entries(personaEditorChanges[chatId])
        .map(([personaName, persona]) => {
          const isUnsaved = !isEqual(
            persona,
            personas.find((p) => p.archetype_name === personaName),
          );
          console.log(
            `persona ${personaName} unsaved:`,
            isUnsaved,
            " - ",
            persona,
            personas.find((p) => p.archetype_name === personaName),
          );

          return isUnsaved ? personaName : null;
        })
        .filter((n) => n) as string[];

      console.log("unsavedPersonas", unsavedPersonas);
      setUnsavedPersonas(unsavedPersonas);
    }
  }, [chatId, personaEditorChanges, personas]);

  //? Handles State for ID changes
  useEffect(() => {
    IS_TEST_DEV_ENV
      ? console.log("DEV: P-EDIT1: resetting editor", chatId)
      : null;

    setSelectedPersonaInEditor(null);
    setSelectedPersonaInEditorIsDirty(false);
    if (chatId) {
      setPersonaEditorChanges({
        [chatId]: personas.reduce(
          (acc, persona) => ({
            ...acc,
            [persona.archetype_name]: persona,
          }),
          {},
        ),
      });
    } else {
      setPersonaEditorChanges({});
    }
    //? Code if we want to persist the editor state across chatId changes
    // setPersonaEditorChanges((prev) => ({
    //   ...prev,
    // [chatId]: chat.aiState.personas.reduce(
    //   (acc, persona) => ({
    //     ...acc,
    //     [persona.archetype_name]: persona,
    //   }),
    //   {},
    // ),
    // }));
  }, [chatId, personas]);

  //? Handles isDirty flag state for selectedPersonaInEditor state change
  useEffect(() => {
    if (
      (selectedPersonaInEditor !== "" || selectedPersonaInEditor !== null) &&
      !selectedPersonaInEditorIsDirty
    ) {
      setSelectedPersonaInEditorIsDirty(true);
    }
  }, [selectedPersonaInEditor, selectedPersonaInEditorIsDirty]);

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
    <PersonaEditorContext.Provider
      value={{
        selectedPersonaInEditor,
        setSelectedPersonaInEditor,
        selectedPersonaInEditorIsDirty,
        setSelectedPersonaInEditorIsDirty,
        personaEditorChanges,
        setPersonaEditorChanges,
        unsavedPersonas,
        editPersonaInEditor,
        savePersona,
        saveAllPersonas,
        revertPersonaChanges,
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
