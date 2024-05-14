"use client";
import React, { useState } from "react";
import {
  closestCenter,
  closestCorners,
  rectIntersection,
  pointerWithin,
  DndContext,
  useDraggable,
  UniqueIdentifier,
  CollisionDetection as CollisionDetectionType,
  Modifiers,
} from "@dnd-kit/core";

import { Draggable, DraggableOverlay, Droppable } from "../_components";

interface Props {
  collisionDetection?: CollisionDetectionType;
  containers?: string[];
  modifiers?: Modifiers;
  value?: string;
}

function DroppableStory({
  containers = ["A"],
  collisionDetection,
  modifiers,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  const item = <DraggableItem />;

  return (
    <main id="drag-root" className="h-screen w-screen " ref={ref}>
      <DndContext
        collisionDetection={collisionDetection}
        modifiers={parent === null ? undefined : modifiers}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={({ over }) => {
          setParent(over ? over.id : null);
          setIsDragging(false);
        }}
        onDragCancel={() => setIsDragging(false)}
      >
        <div className="flex w-full box-border p-5 justify-start">
          <div className="flex w-[350px] box-border p-5 justify-start shrink-0">
            {parent === null ? item : null}
          </div>
          <ul className="grid grid-cols-2 gap-2 p-5 max-w-3xl">
            {containers.map((id) => (
              <Droppable id={id} key={id} dragging={isDragging}>
                {parent === id ? item : null}
              </Droppable>
            ))}
          </ul>
        </div>
        <DraggableOverlay root={ref} />
      </DndContext>
    </main>
  );
}

interface DraggableProps {
  handle?: boolean;
}

function DraggableItem({ handle }: DraggableProps) {
  const { isDragging, setNodeRef, listeners } = useDraggable({
    id: "draggable-item",
  });

  return (
    <Draggable
      dragging={isDragging}
      ref={setNodeRef}
      handle={handle}
      listeners={listeners}
      style={{
        opacity: isDragging ? 0 : undefined,
      }}
    />
  );
}

export default function MultipleDroppables() {
  return <DroppableStory containers={["A", "B", "C"]} />;
}
