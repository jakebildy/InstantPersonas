import { nanoid } from "@/lib/utils";
import { ReactNode } from "react";
import { z } from "zod";

export const MessageValidator = z.object({
  role: z.enum(["user", "assistant", "system", "tool", "function", "data"]),
  content: z.string(),
});

type MessageRoles =
  | "user"
  | "assistant"
  | "system"
  | "function"
  | "data"
  | "tool";
//! Deprecated
export type Message = {
  role: "user" | "assistant" | "system" | "function" | "data" | "tool";
  content: string;
  id: string;
  name?: string;
};

export interface ServerMessage {
  role: MessageRoles;
  content: string;
}

export interface ClientMessage {
  id: string;
  role: MessageRoles;
  display: ReactNode;
}

export const PersonaArchetypeValidator = z.object({
  archetype_name: z.string(),
  pictureURL: z.string().url(),
  persona_components: z.object({
    Motivations: z.string(),
    Painpoints: z.string(),
    Preferences_and_Needs: z.string(),
    End_Goal: z.string(),
    Mindset_and_Perspective: z.string(),
  }),
  insights: z.object({
    Enhanced_Interaction_Patterns: z.string(),
    Strategic_Recommendations: z.string(),
  }),
  picture_components: z
    .object({
      clothing: z.string(),
      glasses: z.string(),
      hair: z.string(),
    })
    .optional(),
});

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
  suggestedMessages: z.array(z.string()).default([]),
});

export type PersonaArchetype = {
  archetype_name: string;
  pictureURL: string;
  persona_components: {
    Motivations: string;
    Painpoints: string;
    Preferences_and_Needs: string;
    End_Goal: string;
    Mindset_and_Perspective: string;
  };
  insights: {
    Enhanced_Interaction_Patterns: string;
    Strategic_Recommendations: string;
  };
};

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
  suggestedMessages: string[];
  userID: string | undefined;
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];
