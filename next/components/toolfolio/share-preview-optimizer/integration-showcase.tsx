"use client";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/magicui/animated-beam";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import React, { forwardRef, HTMLAttributes, useRef } from "react";
import { PersonStandingIcon } from "lucide-react";
import { BRAND_ICONS } from "@/components/brand-icons";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function SocialPreviewIntegrationShowcase({
  ...Props
}: HTMLAttributes<HTMLDivElement>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg  p-10 "
      ref={containerRef}
      {...Props}
    >
      <div className="flex h-full w-full flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <BRAND_ICONS.iMessage className="size-6" />
          </Circle>
          <Circle ref={div5Ref}>
            <BRAND_ICONS.X className="size-6" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <BRAND_ICONS.LinkedIn className="size-6" />
          </Circle>
          <Circle ref={div4Ref} className="h-16 w-16">
            <PersonStandingIcon className="size-6" />
          </Circle>
          <Circle ref={div6Ref}>
            <BRAND_ICONS.Discord className="h-6 w-6" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <BRAND_ICONS.Pintrest className="h-6 w-6" />
          </Circle>
          <Circle ref={div7Ref}>
            <BRAND_ICONS.messenger className="h-6 w-6" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        reverse
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        reverse
        endYOffset={10}
      />
    </div>
  );
}
