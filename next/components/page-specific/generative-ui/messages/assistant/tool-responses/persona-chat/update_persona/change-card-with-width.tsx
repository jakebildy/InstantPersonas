import React from "react";
import {
  PersonaChangeDiffCard,
  PersonaChangeDiffCardProps,
} from "./persona-change-diff-card";

export function PersonaChangeDiffCardWithWidth(
  Props: PersonaChangeDiffCardProps,
) {
  return (
    <div className="w-[600px]">
      <PersonaChangeDiffCard {...Props} />
    </div>
  );
}
