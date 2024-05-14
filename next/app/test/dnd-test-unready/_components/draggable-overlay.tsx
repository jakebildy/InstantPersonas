"use client";
import React from "react";
import { createPortal } from "react-dom";
import { DragOverlay, useDndContext } from "@dnd-kit/core";
import type { DropAnimation } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const dropAnimationConfig: DropAnimation = {
  keyframes({ transform }) {
    return [
      { transform: CSS.Transform.toString(transform.initial) },
      {
        transform: CSS.Transform.toString({
          ...transform.final,
          scaleX: 0.94,
          scaleY: 0.94,
        }),
      },
    ];
  },
};

interface Props {
  dropAnimation?: DropAnimation | null;
  root: React.MutableRefObject<HTMLElement | null>;
  Item?: JSX.Element | null;
}

export function DraggableOverlay({
  dropAnimation = dropAnimationConfig,
  root,
  Item,
}: Props) {
  const { active } = useDndContext();

  if (!root.current) {
    return null;
  }

  return createPortal(
    <DragOverlay dropAnimation={dropAnimation} className="max-w-screen">
      {active ? Item : null}
    </DragOverlay>,
    root.current
  );
}
