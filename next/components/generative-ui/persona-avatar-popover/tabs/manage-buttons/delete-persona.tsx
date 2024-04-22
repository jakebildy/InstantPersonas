"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PersonaAvatarPopoverProps } from "../..";
import { PersonaTemplatePreview } from "../../templates/template";

export function DeletePersonaButton({
  variant,
  archetype,
}: PersonaAvatarPopoverProps) {
  const { archetype_name, persona_components, insights } = archetype;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Delete Persona</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently the{" "}
            <b className="text-sm">{archetype_name}</b> persona from your
            account and remove its data from our servers.
          </DialogDescription>
        </DialogHeader>
        <PersonaTemplatePreview archetype={archetype} variant={variant} />
        <Button variant={"destructive"}>Delete Persona</Button>
      </DialogContent>
    </Dialog>
  );
}
