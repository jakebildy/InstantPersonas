import { PersonaAvatarPopoverProps } from "../persona-popover";

export function InsightsTab({ variant, archetype }: PersonaAvatarPopoverProps) {
  const { archetype_name, persona_components, insights } = archetype;
  return (
    <ul className="p-4">
      {Object.entries(insights).map(([key, value]) => (
        <li key={key} className="mb-4 flex flex-col gap-1">
          <span className="text-sm font-semibold text-muted-foreground">
            {key.replace(/_/g, " ")}
          </span>
          <span className="text-sm font-medium">{value}</span>
        </li>
      ))}
    </ul>
  );
}
