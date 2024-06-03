import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";

export type PersonaBusinessArchetype = PersonaArchetype & {
  business: {
    description: string;
    target_problem: string;
  };
};
