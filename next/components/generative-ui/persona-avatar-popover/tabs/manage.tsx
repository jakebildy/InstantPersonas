import { Button } from "@/components/ui/button";
import { PersonaAvatarPopoverProps } from "..";

export function ManageTab({ variant, archetype }: PersonaAvatarPopoverProps) {
  const { archetype_name, persona_components, insights } = archetype;
  return (
    <div className="flex flex-col gap-2 p-4">
      <Button>Edit Persona</Button>
      <Button variant={"destructive"}>Delete Persona</Button>
    </div>
  );
}
