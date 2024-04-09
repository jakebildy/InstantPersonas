import { PersonaAvatarPopoverProps } from "..";

export function InsightsTab({ variant, archetype }: PersonaAvatarPopoverProps) {
  const { archetype_name, persona_components, insights } = archetype;
  return (
    <ul className="p-4">
      {Object.entries(insights).map(([key, value]) => (
        <li key={key} className="flex flex-col gap-1 mb-4 ">
          <span className="text-muted-foreground font-semibold text-sm">
            {key.replace(/_/g, " ")}
          </span>
          <span className="text-sm font-medium">{value}</span>
        </li>
      ))}
    </ul>
  );
}
