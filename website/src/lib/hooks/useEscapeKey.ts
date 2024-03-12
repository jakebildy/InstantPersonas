"use client";
import { useEffect } from "react";

export const useEscapeKey = (onEscape: () => void) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscape();
      }
    };

    document.addEventListener("keydown", handleEscape as any);

    return () => document.removeEventListener("keydown", handleEscape as any);
  }, [onEscape]);
};
