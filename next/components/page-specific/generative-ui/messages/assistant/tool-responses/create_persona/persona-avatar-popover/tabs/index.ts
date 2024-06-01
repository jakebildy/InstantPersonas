import { PersonaTab } from "./persona";
import { InsightsTab } from "./insights";
import { ManageTab } from "./manage";

export const PersonaTabs = [
  {
    title: "Persona",
    description: "View persona details here.",
    content: PersonaTab,
  },
  {
    title: "Insights",
    description: "View archetype insights here.",
    content: InsightsTab,
  },
  {
    title: "Manage",
    description: "Manage your Persona Archetype here.",
    content: ManageTab,
  },
] as const;
