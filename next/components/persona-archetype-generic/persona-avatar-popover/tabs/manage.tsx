<<<<<<<< HEAD:next/components/persona-archetype-generic/persona-avatar-popover/tabs/manage.tsx
import { PersonaAvatarPopoverProps } from "../";
import { DeletePersonaButton } from "./manage-buttons/delete-persona";
import { EditPersonaButton } from "./manage-buttons/edit-persona";
========
import { EditPersonaButton } from "./manage-buttons/edit-persona";
import { DeletePersonaButton } from "./manage-buttons/delete-persona";
import { PersonaAvatarPopoverProps } from "../persona-popover";
>>>>>>>> 9032273 (refactor(generative-ui): message folder structure and imports (fixed issue)):next/components/page-specific/generative-ui/messages/assistant/tool-responses/create_persona/persona-avatar-popover/tabs/manage.tsx

export function ManageTab({ ...Props }: PersonaAvatarPopoverProps) {
  return (
    <div className="flex flex-col gap-2 p-4">
      <EditPersonaButton {...Props} />
      <DeletePersonaButton {...Props} />
    </div>
  );
}
