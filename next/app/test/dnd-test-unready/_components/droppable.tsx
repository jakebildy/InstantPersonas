import React from "react";
import { useDroppable, UniqueIdentifier } from "@dnd-kit/core";

import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  dragging: boolean;
  id: UniqueIdentifier;
}

export function Droppable({ children, className, id, dragging }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative transition-all duration-300 ease-in-out",
        className,
        dragging && "border-green-200",
        isOver && "border-green-500 shadow-2xl"
      )}
      aria-label="Droppable region"
    >
      <span
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold  text-2xl transition-all duration-300 ease-in-out",
          dragging ? "opacity-100" : "opacity-0"
        )}
      >
        Drop
      </span>
      {children}
    </div>
  );
}
