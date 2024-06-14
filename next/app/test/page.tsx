"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  avatarVariants,
  background600,
  Border600,
  ButtonInnerHover,
  ColorVariant,
  ColorVariantMap,
  ColorVariants,
  gradientDarkVariants,
  gradientLightVariants,
  gradientVariants,
  shadowVariants,
  SVG600,
  textColorVariants,
} from "@/components/variants";

import { cn, timeAgo } from "@/lib/utils";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRightIcon,
  ArrowTopRightIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import {
  Testimonial,
  TESTIMONIALS,
} from "../../components/page-specific/landing-page/testimonials/testimonials";
import { cx } from "class-variance-authority";
import { useRouter } from "next/navigation";
import { TestimonialSection } from "@/components/page-specific/landing-page/testimonials";
import AnimatedGridPattern from "@/components/ui/magicui/animated-grid-pattern";
import LandingPage from "@/components/page-specific/landing-page";
import { FreeToolSection } from "@/components/toolfolio/free-tools-section";
import * as HeroImg from "@/public/hero.png";
import { AnimatedTooltip } from "@/components/ui/aceternity/animated_tooltip";
import { GradientButton } from "@/components/ui/gradient-button";
import { LucideIcon, TrendingUpIcon } from "lucide-react";
type Props = {};

export default function PageTest({}: Props) {
  const [variant, setVariant] = useState<ColorVariant>("blue");

  //function to change variant based on list of variants
  const changeVariant = () => {
    const index = ColorVariants.indexOf(variant);
    setVariant(ColorVariants[(index + 1) % ColorVariants.length]);
  };

  const people = [
    {
      id: 1,
      name: "Marcus (Persona)",
      designation: "Software Engineer",
      image:
        "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant08&body=variant21&hair=variant13&backgroundColor=d9cbfc",
      href: "/",
    },
    {
      id: 2,
      name: "Joe (Persona)",
      designation: "Product Manager",
      image:
        "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant11&body=variant23&hair=variant60&backgroundColor=eaa9c1",
      href: "/",
    },
    {
      id: 3,
      name: "Jane (Persona)",
      designation: "TikTok Influencer",
      image:
        "https://api.dicebear.com/8.x/notionists/svg?body=variant07&hair=variant39&backgroundColor=fbe8b1",
      href: "/",
    },
    {
      id: 4,
      name: "Emily (Persona)",
      designation: "UX Designer",
      image:
        "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant11&body=variant14&hair=variant46&backgroundColor=e6d3d0",
      href: "/",
    },
    {
      id: 6,
      name: "Dora (Persona)",
      designation: "The Explorer",
      image:
        "https://api.dicebear.com/8.x/notionists/svg?body=variant23&hair=variant28&backgroundColor=fbe8b1",
      href: "/",
    },
    {
      id: 5,
      name: "Tyler (Persona)",
      designation: "Kombucha Brewer",
      image:
        "https://api.dicebear.com/8.x/notionists/svg?body=variant21&hair=variant13&backgroundColor=e6d3d0",
      href: "/",
    },
  ];
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

      <section
        id="hero"
        className="relative mt-[20vh] flex flex-col items-center gap-16"
      >
        <div className="z-10 flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex flex-col">
            <h1 className="text-md font-bold tracking-tight sm:text-lg">
              InstantPersonas
            </h1>

            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Create Content that Matters.
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-jost">
              Join <b className="text-green-500">4,660+</b> Marketers and
              Business Owners who use InstantPersonas to create content that
              resonates.
            </span>
          </div>
          <div className="relative flex w-full flex-row items-center justify-center">
            <AnimatedTooltip items={people} />
          </div>
        </div>

        <div className="relative z-10">
          <GradientButton
            variant="green"
            className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2"
            Icon={TrendingUpIcon}
          >
            <Link href="/register">Get 3 days FREE</Link>
          </GradientButton>
          <div className="w-fit rounded-md border bg-white p-2 shadow-lg">
            <div className="relative aspect-[2048/1232] w-[90vw] overflow-hidden rounded-md border shadow-md">
              <Image
                src={HeroImg}
                alt={"hero image"}
                fill={true}
                className="z-0 object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 size-[200vh] -translate-x-[100vh] translate-y-[100vh] rounded-full bg-gradient-to-t from-green-500 to-green-100 blur-[50vh]" />
        <AnimatedGridPattern
          numSquares={100}
          maxOpacity={0.5}
          duration={3}
          repeatDelay={1}
          className={cn(
            "absolute inset-x-0 inset-y-[-30%] h-[200vh] skew-y-12 bg-gradient-to-t from-white to-transparent opacity-50",
          )}
          squaresClassName="stroke-green-500 fill-green-500"
        />
      </section>

      <div className="flex flex-col items-center p-10">
        <div className="flex w-[calc(90vw+16px)] flex-col items-center">
          <LandingPage.testimonials />
        </div>
      </div>

      <LandingPage.pricing />
      <div className="flex flex-col items-center py-8 lg:py-16">
        <p className="mt-6 max-w-2xl text-center font-jost text-lg font-semibold leading-8 text-gray-600">
          Still not convinced?
        </p>
        <FreeToolSection title="Try our Free Seo Tools" />
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
