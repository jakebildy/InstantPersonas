import { z } from "zod";

export const PersonaArchetypeValidator = z.object({
  archetype_name: z.string(),
  pictureURL: z.string(),
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

export const ColorVariantMap = {
  blue: "#c7eaf1",
  purple: "#d9cbfc",
  red: "#ef9796",
  yellow: "#fbe8b1",
  green: "#c2e4bc",
  brown: "#e6d3d0",
  pink: "#eaa9c1",
} as const;

export type ColorVariant = keyof typeof ColorVariantMap;
