import { PersonaArchetype } from "@/components/page-specific/generative-ui/persona-avatar-popover";

export type PersonaBusinessArchetype = PersonaArchetype & {
  business: {
    description: string;
    target_problem: string;
  };
};
