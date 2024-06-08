"use client";

import { PersonaChatType } from "@/app/(server)/models/personachat.model";
import { PersonaBusinessArchetype } from "@/components/toolfolio/selected-personas/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInstantPersonasUser } from "../auth/user-context";
import { IS_TEST_DEV_ENV } from "@/lib/utils";
import { LOCAL_STORAGE_CONFIG } from "@/lib/config/localstorage";
import api from "@/service/api.service";
import { usePathname } from "next/navigation";

type PersonaChatHistoryContextType = {
  selectedPersonas: PersonaBusinessArchetype[];
  setSelectedPersonas: Dispatch<SetStateAction<PersonaBusinessArchetype[]>>;
  history: PersonaChatType[];
  loading: boolean;
  error: string | null;
};

const PersonaChatHistoryContext = createContext<
  PersonaChatHistoryContextType | undefined
>(undefined);

interface PersonaChatHistoryProviderProps {
  children: ReactNode;
}

export const PersonaChatHistoryProvider = ({
  children,
}: PersonaChatHistoryProviderProps) => {
  const [selectedPersonas, setSelectedPersonas] = useState<
    PersonaBusinessArchetype[]
  >([]);
  const [history, setHistory] = useState<PersonaChatType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user, isSubscribed } = useInstantPersonasUser();
  const userRef = useRef<string | null>();
  const pathname = usePathname();

  //? Fetch user's persona history & update selected personas from local storage
  useEffect(() => {
    if (!user) {
      setLoading(false);
      setError("User not found");
      return;
    }
    //? If is first fetch, or user has changed, get personas
    if (user.id !== userRef.current && isSubscribed) {
      setLoading(true);
      setError(null);
      //? Indicates that we tried to fetch user's persona history
      userRef.current = user.id;
      try {
        IS_TEST_DEV_ENV ? console.log("DEV: Fetching user history") : null;
        api.userPersona.getPersonaHistory(user.id).then((data) => {
          setHistory(data);
          setLoading(false);
          //? If no personas are selected, (first fetch), update from local storage
          if (selectedPersonas.length === 0) {
            IS_TEST_DEV_ENV
              ? console.log(
                  "DEV: No personas selected, updating from local storage",
                )
              : null;
            const localSelectedPersonaNames: string[] = JSON.parse(
              localStorage.getItem(
                LOCAL_STORAGE_CONFIG.tools.selectedPersonas,
              ) ?? "[]",
            );
            IS_TEST_DEV_ENV
              ? console.log(
                  "DEV: localSelectedPersonaNames",
                  localSelectedPersonaNames,
                )
              : null;
            if (localSelectedPersonaNames.length > 0) {
              const localSelectedPersonas = data
                //? Ensure persona are of type PersonaBusinessArchetype[]
                .flatMap((chat) =>
                  chat.aiState.personas.map((persona) => ({
                    ...persona,
                    business: {
                      description: chat.aiState.business,
                      target_problem: chat.aiState.targetProblem,
                    },
                  })),
                )
                //? Find only personas that are not in local storage
                .filter((persona) =>
                  localSelectedPersonaNames.includes(persona.archetype_name),
                );

              IS_TEST_DEV_ENV
                ? console.log(
                    "DEV: Updating selected personas from local storage",
                    localSelectedPersonas,
                  )
                : null;

              setSelectedPersonas(localSelectedPersonas);
            }
          }
        });
      } catch (error) {
        console.log(error);
        setError("Error fetching user history");
      }
    }
  }, [
    history,
    isSubscribed,
    selectedPersonas.length,
    setSelectedPersonas,
    user,
  ]);

  //? Save selected personas to local storage on change
  useEffect(() => {
    if (selectedPersonas.length === 0) {
      return;
    }
    localStorage.setItem(
      LOCAL_STORAGE_CONFIG.tools.selectedPersonas,
      JSON.stringify(selectedPersonas.map((persona) => persona.archetype_name)),
    );
  }, [selectedPersonas]);

  //? Refetch history in background when user navigates to a new page ~won't trigger loading state
  useEffect(() => {
    const silentRefetchHistory = async () => {
      if (user && isSubscribed) {
        try {
          IS_TEST_DEV_ENV
            ? console.log("DEV: Silent Refetching history")
            : null;
          const data = await api.userPersona.getPersonaHistory(user.id);
          setHistory(data);
        } catch (error) {
          console.error("Error refetching history", error);
        }
      }
    };

    silentRefetchHistory();
  }, [isSubscribed, pathname, user]);

  return (
    <PersonaChatHistoryContext.Provider
      value={{
        selectedPersonas,
        setSelectedPersonas,
        history,
        loading,
        error,
      }}
    >
      {children}
    </PersonaChatHistoryContext.Provider>
  );
};

export const usePersonaChatHistory = () => {
  const context = useContext(PersonaChatHistoryContext);
  if (context === undefined) {
    throw new Error(
      "usePersonaChatHistory must be used within a PersonaChatHistoryProvider",
    );
  }
  return context;
};
