import { AnimatedTooltip } from "@/components/ui/aceternity/animated_tooltip";
import { GradientButton } from "@/components/ui/gradient-button";
import { TrendingUpIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedGridPattern from "@/components/ui/magicui/animated-grid-pattern";
import * as HeroImg from "@/public/hero.png";
import { nanoid } from "nanoid";

type Props = {};

const people = [
  {
    id: nanoid(),
    name: "Marcus (Persona)",
    designation: "Software Engineer",
    image:
      "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant08&body=variant21&hair=variant13&backgroundColor=d9cbfc",
    href: "/",
  },
  {
    id: nanoid(),
    name: "Joe (Persona)",
    designation: "Product Manager",
    image:
      "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant11&body=variant23&hair=variant60&backgroundColor=eaa9c1",
    href: "/",
  },
  {
    id: nanoid(),
    name: "Jane (Persona)",
    designation: "TikTok Influencer",
    image:
      "https://api.dicebear.com/8.x/notionists/svg?body=variant07&hair=variant39&backgroundColor=fbe8b1",
    href: "/",
  },
  {
    id: nanoid(),
    name: "Emily (Persona)",
    designation: "UX Designer",
    image:
      "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant11&body=variant14&hair=variant46&backgroundColor=e6d3d0",
    href: "/",
  },
  {
    id: nanoid(),
    name: "Dora (Persona)",
    designation: "The Explorer",
    image:
      "https://api.dicebear.com/8.x/notionists/svg?body=variant23&hair=variant28&backgroundColor=fbe8b1",
    href: "/",
  },
  {
    id: nanoid(),
    name: "Tyler (Persona)",
    designation: "Kombucha Brewer",
    image:
      "https://api.dicebear.com/8.x/notionists/svg?body=variant21&hair=variant13&backgroundColor=e6d3d0",
    href: "/",
  },
];

export default function ShowcaseHeroSection({}: Props) {
  return (
    <section
      id="hero"
      className="relative mt-[20vh] flex flex-col items-center gap-16"
    >
      <div className="z-10 flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex flex-col">
          <h1 className="sm:text-md font-bold tracking-tight md:text-lg">
            InstantPersonas
          </h1>

          <h2 className="font-display mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
            Understand your audience{" "}
            <span className="text-green relative mt-4 whitespace-nowrap">
              <span className="relative text-green-500">in minutes</span>
            </span>
          </h2>

          {/* <h2 className="text-4xl font-bold tracking-tight lg:text-6xl">
            Create Content that Matters.
          </h2> */}
        </div>
        <div className="flex flex-col gap-2">
          <span className="whitespace-pre-wrap px-10 font-jost">
            Join <b className="text-green-500">4,700+</b> Marketers and Business
            Owners who use InstantPersonas to create detailed user personas and
            get insights.
          </span>
        </div>
        <div className="relative flex w-full flex-row items-center justify-center">
          <AnimatedTooltip items={people} />
        </div>
      </div>

      <div className="relative z-10">
        {/* <GradientButton
          variant="green"
          className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2"
          Icon={TrendingUpIcon}
        >
          <Link href="/register">Get 3 days FREE</Link>
        </GradientButton> */}
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

      <div className="absolute bottom-0 left-0 size-[200vh] -translate-x-[100vh] translate-y-[100vh] rounded-full bg-gradient-to-t from-white to-blue-200 blur-[50vh]" />
      {/* <AnimatedGridPattern
        numSquares={100}
        maxOpacity={0.5}
        duration={3}
        repeatDelay={1}
        className={
          "absolute inset-x-0 inset-y-[-30%] h-[200vh] skew-y-12 bg-gradient-to-t from-white to-transparent opacity-50 blur-sm"
        }
        squaresClassName="stroke-blue-500 fill-blue-500"
      /> */}
    </section>
  );
}
