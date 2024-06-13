import { ScrollBar } from "@/components/ui/scroll-area";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { useScrollAreaState } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";

type Props = {
  children: React.ReactNode;
};

export default function GradientScroll({ children }: Props) {
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const [scrollAreaRef, scrollAreaState] = useScrollAreaState();

  const [scrollContainerRef, bounds] = useMeasure();

  return (
    <div
      className="h-full flex-1"
      ref={scrollContainerRef}
      id={"scroll-container-bounds"}
    >
      <ScrollAreaPrimitive.Root
        className={cn("relative overflow-hidden")}
        style={{
          height: bounds.height,
          width: "100%",
        }}
      >
        <ScrollAreaPrimitive.Viewport
          className="h-full w-full rounded-[inherit]"
          ref={scrollAreaRef}
        >
          <div
            className={cn(
              "pointer-events-none absolute top-0 z-50 h-10 w-full bg-gradient-to-b from-zinc-200 via-zinc-200/75 to-transparent transition-opacity duration-300 ease-out",
              scrollAreaState.is.atTop ? "opacity-0" : "opacity-100",
            )}
          />
          {children}
          <div
            className={cn(
              "pointer-events-none absolute bottom-0 z-50 h-10 w-full bg-gradient-to-t from-zinc-200 via-zinc-200/75 to-transparent transition-opacity duration-300 ease-out",
              scrollAreaState.is.atBottom ? "opacity-0" : "opacity-100",
            )}
          />
          <div ref={scrollBottomRef} />
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    </div>
  );
}
