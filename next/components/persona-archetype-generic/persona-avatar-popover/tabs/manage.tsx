import { PersonaAvatarPopoverProps } from "../";
import { DeletePersonaButton } from "./manage-buttons/delete-persona";
import { EditPersonaButton } from "./manage-buttons/edit-persona";

export function ManageTab({ ...Props }: PersonaAvatarPopoverProps) {
  return (
    <div className="flex flex-col gap-2 p-4">
      <EditPersonaButton {...Props} />
      <DeletePersonaButton {...Props} />
    </div>
  );
}
