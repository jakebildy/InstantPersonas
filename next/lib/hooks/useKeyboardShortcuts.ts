"use client";
import { useEffect, useCallback, RefObject } from "react";

// Define a type for KeyBind
export type KeyBind = {
  bindLabel: string;
  key: string;
  modifier: Array<"ctrlKey" | "altKey" | "shiftKey" | "metaKey">;
  action: (e: KeyboardEvent, ref: RefObject<HTMLTextAreaElement>) => void;
};

export const useKeyboardShortcuts = (
  keyBinds: KeyBind[],
  ref: RefObject<HTMLTextAreaElement>
) => {
  // Memoized handler
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      keyBinds.forEach((bind) => {
        if (
          e.key &&
          bind.key &&
          e.key.toLowerCase() === bind.key.toLowerCase() &&
          modifiersMatch(e, bind)
        ) {
          e.preventDefault();
          bind.action(e, ref);
        }
      });
    },
    [keyBinds]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
};

// Type guard function
const isModifierKey = (
  key: string
): key is "ctrlKey" | "altKey" | "shiftKey" | "metaKey" => {
  return ["ctrlKey", "altKey", "shiftKey", "metaKey"].includes(key);
};

// Helper function to check if modifiers match
const modifiersMatch = (event: KeyboardEvent, bind: KeyBind): boolean => {
  // Check if at least one modifier in bind.modifier is pressed
  const anyModifierMatches = bind.modifier.some(
    (mod) => isModifierKey(mod) && event[mod]
  );

  const noExtraModifiers = ["ctrlKey", "altKey", "shiftKey", "metaKey"].every(
    (mod) => !isModifierKey(mod) || bind.modifier.includes(mod) || !event[mod]
  );

  return anyModifierMatches && noExtraModifiers;
};
