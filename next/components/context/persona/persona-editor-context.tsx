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

export type PersonaEditorChangesObject = {
  [chatId: string]: {
    [personaName: string]: PersonaArchetype;
  };
};

type PersonaEditorContextType = {
  selectedPersonaIDInEditor: string | null;
  setSelectedPersonaIDInEditor: Dispatch<SetStateAction<string | null>>;
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
  const [selectedPersonaIDInEditor, setSelectedPersonaIDInEditor] = useState<
    string | null
  >(null);
  const [selectedPersonaInEditorIsDirty, setSelectedPersonaInEditorIsDirty] =
    useState<boolean>(false); //? Flag for dirty state - Used to prevent info popups from spamming user
  const [personaEditorChanges, setPersonaEditorChanges] =
    useState<PersonaEditorChangesObject>({});
  const [test_personaEditorChanges, test_setPersonaEditorChanges] = useState<
    PersonaArchetype[]
  >([]);
  const [unsavedPersonas, setUnsavedPersonas] = useState<string[]>([]);
  const [aiState, setAiState]: [AIState | null, (newState: any) => void] =
    useAIState<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();
  const { personas, chatId } = usePersonaChat();

  /**
   * Creates a mapping of personas by their archetype name.
   * @param personas - Array of persona objects
   * @returns A mapping of personas keyed by archetype name
   */
  const createPersonaMapping = useCallback((personas: PersonaArchetype[]) => {
    return personas.reduce(
      (acc, persona) => ({
        ...acc,
        [persona.id]: persona,
      }),
      {},
    );
  }, []);

  //? Handles unsaved personas
  useEffect(() => {
    if (chatId && personas && personaEditorChanges[chatId]) {
      console.log("personaEditorChanges", personaEditorChanges[chatId], chatId);
      const unsavedPersonas = Object.entries(personaEditorChanges[chatId])
        .map(([id, persona]) => {
          const isUnsaved = !isEqual(
            persona,
            personas.find((p) => p.id === id),
          );
          console.log(`persona ${id} unsaved:`, isUnsaved, " - ", {
            origin: persona,
            modified: personas.find((p) => p.id === id),
          });

          return isUnsaved ? id : null;
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

    setSelectedPersonaIDInEditor(null);
    setSelectedPersonaInEditorIsDirty(false);
    if (chatId) {
      setPersonaEditorChanges({
        [chatId]: personas.reduce(
          (acc, persona) => ({
            ...acc,
            [persona.id]: persona,
          }),
          {},
        ),
      });
      test_setPersonaEditorChanges(personas);
    } else {
      setPersonaEditorChanges({});
      test_setPersonaEditorChanges([]);
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
      (selectedPersonaIDInEditor !== "" ||
        selectedPersonaIDInEditor !== null) &&
      !selectedPersonaInEditorIsDirty
    ) {
      setSelectedPersonaInEditorIsDirty(true);
    }
  }, [selectedPersonaIDInEditor, selectedPersonaInEditorIsDirty]);

  const test = {
    archetype_name: "The Agile Marketer",
    pictureURL:
      "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant08&body=variant21&hair=variant13&backgroundColor=d9cbfc",
    persona_components: {
      Motivations: "TEST",
      Painpoints:
        "Frustrated by the slow pace of traditional market research and persona development.",
      Preferences_and_Needs:
        "Needs swift, reliable, and easily interpretable persona insights that integrate seamlessly with existing marketing tools.",
      End_Goal:
        "To implement dynamic and responsive marketing campaigns that are closely aligned with customer behaviors and trends.",
      Mindset_and_Perspective:
        "Values efficiency and agility in marketing operations; believes in data-driven decision making.",
    },
    insights: {
      Enhanced_Interaction_Patterns:
        "Utilizes interactive dashboards for real-time persona updates and prefers integrating persona insights directly with marketing automation tools.",
      Strategic_Recommendations:
        "Enhance API capabilities for seamless integration with popular marketing platforms; introduce real-time data feeds to keep personas updated.",
    },
    picture_components: {
      clothing: "button_up",
      glasses: "glasses",
      hair: "short",
    },
    id: "rQyvt12J5bpUav53nlX0l",
  };

  /**
   * Updates the persona editor with the specified field and value.
   * Handles nested fields dynamically.
   *
   * @param {Object} params - Parameters for editing persona.
   * @param {string} params.field - The field to update (dot-separated for nested fields).
   * @param {string | number} params.value - The value to set.
   */
  const editPersonaInEditor = useCallback(
    ({ field, value }: { field: string; value: string | number }) => {
      if (chatId && selectedPersonaIDInEditor) {
        console.log("Editing persona in editor", field, value);
        setPersonaEditorChanges((prev) => {
          const currentPersona = prev[chatId][selectedPersonaIDInEditor];
          console.log("currentPersona", currentPersona);
          // const newPersona = setNestedField(currentPersona, field, value);
          const newPersona = set({ ...currentPersona }, field, value);
          console.log("newPersona", newPersona);
          const changes = {
            ...prev,
            [chatId]: {
              ...prev[chatId],
              [selectedPersonaIDInEditor]: newPersona,
            },
          } as PersonaEditorChangesObject;
          console.log("changes", changes);

          return changes;
        });
      }
    },
    [chatId, selectedPersonaIDInEditor],
  );

  const savePersona = useCallback(
    async (personaID: string) => {
      if (chatId && personaEditorChanges[chatId]) {
        const persona = personaEditorChanges[chatId][personaID];
        const personasWithChangedPersona = personas.map((p) =>
          p.id === personaID ? persona : p,
        );
        const serializedPersonas = JSON.stringify(personasWithChangedPersona);

        const { aiState: newAIState, uiState: newUIState } =
          getSynchronizeStates({
            aiState,
            serializedPersonas,
          });

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
            setPersonaEditorChanges((prev) => ({
              ...prev,
              [chatId]: {
                ...prev[chatId],
                [persona.id]: persona,
              },
            }));
            if (selectedPersonaIDInEditor === persona.archetype_name) {
              setSelectedPersonaIDInEditor(persona.archetype_name);
            }
          }
        };

        update(newAIState);
        setAiState(newAIState as ValueOrUpdater<AIState>);
        setMessages(newUIState as ClientMessage[]);
      }
    },
    [
      aiState,
      chatId,
      personaEditorChanges,
      personas,
      selectedPersonaIDInEditor,
      setAiState,
      setMessages,
    ],
  );

  const saveAllPersonas = useCallback(async () => {
    if (chatId && personaEditorChanges[chatId]) {
      const indexOfCurrentlySelectedPersona = personas.findIndex(
        (p) => p.archetype_name === selectedPersonaIDInEditor,
      );

      const serializedPersonas = JSON.stringify(
        Object.values(personaEditorChanges[chatId]),
      );

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
          setPersonaEditorChanges((prev) => ({
            ...prev,
            [chatId]: createPersonaMapping(updatedState.aiState.personas),
          }));

          // Safely set the selected persona in editor
          const selectedPersona =
            updatedState.aiState.personas[indexOfCurrentlySelectedPersona];

          setSelectedPersonaIDInEditor(selectedPersona?.archetype_name ?? null);
        }
      };

      update(newAIState);
      setAiState(newAIState as ValueOrUpdater<AIState>);
      setMessages(newUIState as ClientMessage[]);
    }
  }, [
    aiState,
    chatId,
    createPersonaMapping,
    personaEditorChanges,
    personas,
    selectedPersonaIDInEditor,
    setAiState,
    setMessages,
  ]);

  /**
   * Reverts the changes for a given persona name under the specified chatId.
   *
   * @param {string} personaName - The name of the persona to revert changes for.
   */
  const revertPersonaChanges = useCallback(
    (personaID: string) => {
      if (chatId && personaEditorChanges[chatId]) {
        setPersonaEditorChanges((prev) => {
          // Clone the previous state to avoid direct mutations
          const newState = { ...prev };

          // Retrieve the correct persona from the personas array
          const originalPersona = personas.find((p) => p.id === personaID);

          // Ensure the chatId exists in the new state and update the persona
          if (originalPersona) {
            const validPersonaIds = personas.flatMap((p) => p.id);

            newState[chatId] = {
              ...prev[chatId],
              [personaID]: originalPersona,
            };

            //? Remove any personas that are not in the original state
            Object.keys(prev[chatId]).forEach((id) => {
              if (!validPersonaIds.includes(id)) {
                delete newState[chatId][id];
              }
            });
          }

          return newState;
        });
      }
    },
    [chatId, personaEditorChanges, personas],
  );

  /**
   * Resets the editor state by clearing selected persona and setting initial states.
   */
  const resetEditorState = useCallback(() => {
    console.log("Resetting editor state");
    setSelectedPersonaIDInEditor(null);
    setSelectedPersonaInEditorIsDirty(false);

    setPersonaEditorChanges((prev) => {
      if (chatId) {
        const updatedPersonas = createPersonaMapping(personas);
        test_setPersonaEditorChanges(personas);
        return {
          ...prev,
          [chatId]: updatedPersonas,
        };
      }
      return { ...prev };
    });
  }, [chatId, createPersonaMapping, personas]);

  return (
    <PersonaEditorContext.Provider
      value={{
        selectedPersonaIDInEditor,
        setSelectedPersonaIDInEditor,
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
