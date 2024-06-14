import React from "react";
import { mapUrlBackgroundColorParamToVariant } from "../../../../../../../persona-archetype-generic/utils";

import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";
import { PersonaAvatarPopover } from "@/components/persona-archetype-generic/persona-avatar-popover";

type Props = { archetypes: PersonaArchetype[] };

export function InlinePersonaArchetypeList({ archetypes }: Props) {
  return (
    <div className="flex flex-row">
      {...archetypes.map((archetype: any, i: number) => {
        const variant = mapUrlBackgroundColorParamToVariant({
          url: archetype.pictureURL,
        });
        return (
          <PersonaAvatarPopover
            key={i}
            {...{ archetype: archetype, variant: variant }}
          />
        );
      })}
    </div>
  );
}
