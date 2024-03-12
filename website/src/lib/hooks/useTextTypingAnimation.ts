"use client";
import { useEffect, useState } from "react";

type TextTypingAnimationProps = {
  targetText: string;
  onReady?: () => void;
  delay: number; // in milliseconds
  isTotalTime?: boolean;
  onChange?: (newText: string) => void;
  initialDelay?: number; // Optional initial delay in milliseconds
};

export const useTextTypingAnimation = ({
  targetText,
  delay,
  isTotalTime = false,
  initialDelay = 0, // Default to no initial delay
  onChange,
  onReady,
}: TextTypingAnimationProps) => {
  const [text, setText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const typeText = (index: number) => {
      if (index === targetText.length) {
        setIsTyping(false);
        onReady?.();
        return;
      }

      const newText = targetText.substring(0, index + 1);
      setText(newText);
      onChange?.(newText);

      const typingDelay = isTotalTime ? delay / targetText.length : delay; // If isTotalTime is true, spread delay evenly across all characters

      timeoutId = setTimeout(() => typeText(index + 1), typingDelay);
    };

    const initialTimeoutId = setTimeout(() => typeText(0), initialDelay);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialTimeoutId);
    };
  }, [delay, initialDelay, isTotalTime, targetText]);

  return { text, isTyping, setText };
};
