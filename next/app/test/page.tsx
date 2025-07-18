"use client";

import {
  ColorVariant,
  ColorVariants,
  gradientVariants,
  shadowVariants,
} from "@/components/variants";

import { cn } from "@/lib/utils";

import { useState } from "react";
import { cx } from "class-variance-authority";
import AnimatedGridPattern from "@/components/ui/magicui/animated-grid-pattern";
import LandingPage from "@/components/page-specific/landing-page";
import { FreeToolSection } from "@/components/toolfolio/free-tools-section";
import RadialGradient from "@/components/ui/magicui/radial-gradient";
type Props = {};

export default function PageTest({}: Props) {
  const [variant, setVariant] = useState<ColorVariant>("blue");

  //function to change variant based on list of variants
  const changeVariant = () => {
    const index = ColorVariants.indexOf(variant);
    setVariant(ColorVariants[(index + 1) % ColorVariants.length]);
  };

  return (
    <div
      // className="relative flex w-screen flex-col items-center justify-center gap-4 py-[50px]"
      className="relative overflow-x-hidden"
    >
      {/* <Button variant={"outline"} onClick={() => changeVariant()}>
        Change Variant
      </Button> */}
      <div className="fixed top-0 z-50 w-full p-4">
        <div className="rounded-lg border bg-white/50 backdrop-blur-sm">
          <LandingPage.header />
        </div>
      </div>

      <LandingPage.showcaseHero />

      <div className="flex flex-col items-center p-10">
        <div className="relative grid place-items-center rounded-lg border bg-white p-2 shadow-md">
          <div
            className={cx(
              gradientVariants({
                variant,
                className:
                  "relative flex size-full flex-col gap-16 overflow-hidden rounded-lg border p-10 px-4 sm:px-10",
              }),
              shadowVariants({
                variant,
              }),
            )}
          >
            <RadialGradient size={600} className="absolute right-0 top-0" />
            <LandingPage.documentFeature />

            <div className="relative flex flex-col items-center">
              <LandingPage.testimonials />
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <AnimatedGridPattern
          numSquares={100}
          maxOpacity={0.5}
          duration={3}
          repeatDelay={1}
          className={cn(
            "absolute inset-x-0 bottom-0 h-full skew-y-12 opacity-50",
          )}
          squaresClassName="stroke-green-500 fill-green-500"
        />
        <LandingPage.pricing />
        <LandingPage.faqs />
        <div className="flex flex-col items-center py-8 lg:py-16">
          <p className="mt-6 max-w-2xl text-center font-jost text-lg font-semibold leading-8 text-gray-600">
            Still not convinced?
          </p>
          <FreeToolSection title="Try our Free Marketing Tools" />
        </div>
      </div>

      <div className="mt-[400px]" />
      <div className="supports-[backdrop-filter]:bg-bg-gradient-to-t h-[100px] w-full bg-gradient-to-t from-slate-50 to-transparent backdrop-blur max-sm:hidden" />
      <LandingPage.footer className="supports-[backdrop-filter]:bg-bg-gradient-to-t bottom-0 w-screen -translate-y-10 overflow-hidden bg-transparent bg-gradient-to-t from-slate-50 from-[33%] to-transparent pt-10 backdrop-blur sm:absolute" />

      {/* <Button variant={"outline"} onClick={() => changeVariant()}>
        Change Variant
      </Button> */}
    </div>
  );
}
