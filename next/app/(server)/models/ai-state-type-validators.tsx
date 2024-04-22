import {
  PersonaArchetype,
  PersonaArchetypeValidator,
} from "@/components/generative-ui/persona-avatar-popover/types";
import { nanoid } from "@/lib/utils";
import { z } from "zod";

export const MessageValidator = z.object({
  role: z.enum(["user", "assistant", "system", "function", "data", "tool"]),
  content: z.string(),
  id: z.string(),
  name: z.string().optional(),
});

export type Message = {
  role: "user" | "assistant" | "system" | "function" | "data" | "tool";
  content: string;
  id: string;
  name?: string;
};

export const AIStateValidator = z.object({
  chatId: z.string().default(() => nanoid()), // Assume customNanoId is a function that generates nanoIds
  business: z.string().default(""),
  targetProblem: z.string().default(""),
  threadKnowledge: z.object({
    context: z.string().default(""),
    personaCharacteristics: z.array(z.string()).default([]),
    thresholdRating: z.number().min(0).max(10).default(0),
  }),
  personas: z.array(PersonaArchetypeValidator).default([]),
  messages: z.array(MessageValidator).default([]),
});

export type AIState = {
  chatId: string;
  business: string;
  targetProblem: string;
  threadKnowledge: {
    context: string;
    personaCharacteristics: string[];
    thresholdRating: number; // 0-10
  };
  personas: PersonaArchetype[];
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];
