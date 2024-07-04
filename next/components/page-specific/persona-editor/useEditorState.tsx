"use client";

import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";
import { usePersonaChat } from "@/components/context/persona/chat-context";
import { usePersonaEditor } from "@/components/context/persona/persona-editor-context";

type EditorStateValid = {
  fallbackReason: null;
  archetype: PersonaArchetype;
  changedArchetype: PersonaArchetype;
  editorChanges: Record<string, PersonaArchetype>;
};

type EditorStateInvalid = {
  fallbackReason: string;
  archetype: null;
  changedArchetype: null;
  editorChanges: Record<string, PersonaArchetype> | null;
};

export type EditorState = EditorStateValid | EditorStateInvalid;

export function useEditorState() {
  const { personas, chatId } = usePersonaChat();
  const { personaEditorChanges, selectedPersonaIDInEditor, resetEditorState } =
    usePersonaEditor();

  if (!chatId || !selectedPersonaIDInEditor) {
    return {
      fallbackReason: "Waiting for Selected Persona",
      archetype: null,
      changedArchetype: null,
      editorChanges: null,
    } as EditorStateInvalid;
  }

  let changedArchetype: PersonaArchetype | null | undefined = null;

  try {
    changedArchetype =
      personaEditorChanges?.[chatId]?.[selectedPersonaIDInEditor];
    if (changedArchetype === undefined || changedArchetype === null) {
      resetEditorState();
    }
  } catch (error) {
    resetEditorState();
  }

  if (!changedArchetype) {
    return {
      fallbackReason: "Waiting For Personas",
      archetype: null,
      changedArchetype: null,
      editorChanges: null,
    } as EditorStateInvalid;
  }

  const archetype = personas.find(
    (persona) => persona.id === selectedPersonaIDInEditor,
  );
  if (!archetype) {
    return {
      fallbackReason: `Waiting For Archetype`,
      archetype: null,
      changedArchetype: null,
      editorChanges: null,
    } as EditorStateInvalid;
  }

  return {
    fallbackReason: null,
    archetype,
    changedArchetype,
    editorChanges: personaEditorChanges[chatId],
  } as EditorStateValid;
}

export function isEditorStateValid(
  state: EditorState,
): state is EditorStateValid {
  return state.fallbackReason === null;
}
