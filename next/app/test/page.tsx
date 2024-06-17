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
  SVGLight600,
  textColorVariants,
} from "@/components/variants";

import { cn, delay, timeAgo } from "@/lib/utils";

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
import AnimatedGridPattern, {
  GridPattern,
} from "@/components/ui/magicui/animated-grid-pattern";
import LandingPage from "@/components/page-specific/landing-page";
import { FreeToolSection } from "@/components/toolfolio/free-tools-section";
import * as HeroImg from "@/public/hero.png";
import { AnimatedTooltip } from "@/components/ui/aceternity/animated_tooltip";
import { GradientButton, IconVariants } from "@/components/ui/gradient-button";
import {
  BarChart4Icon,
  BookOpenCheck,
  BookOpenCheckIcon,
  GraduationCapIcon,
  LucideIcon,
  MessageCircleQuestionIcon,
  PersonStandingIcon,
  TrendingUpIcon,
} from "lucide-react";
import { CloudArrowDownIcon } from "@heroicons/react/24/solid";
import * as BlogFeatureImg from "@/public/instant_personas_blog_feature.png";
import useMeasure from "react-use-measure";
import { motion } from "framer-motion";
import RadialGradient from "@/components/ui/magicui/radial-gradient";
import Ripple from "@/components/ui/magicui/ripple";
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

  // For `Guide to Instagram Marketing ` Blog Example Feature
  const personaThoughts = [
    "I'm not sure what to post about, how do I get ideas?",
    "I already have a lot on my plate.\n\nHow much time do I need to spend doing Instagram marketing every day?",
    "My ecommerce brand targets an older audience, would Instagram marketing still make sense?",
    "I'm not a designer, how do I create good looking posts?",
  ];

  const [thoughtIndex, setThoughtIndex] = useState(0);

  const nextThought = () => {
    setThoughtIndex((thoughtIndex + 1) % personaThoughts.length);
  };

  const [featureRef, bounds] = useMeasure();

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
            <h1 className="sm:text-md font-bold tracking-tight md:text-lg">
              InstantPersonas
            </h1>

            <h2 className="text-4xl font-bold tracking-tight lg:text-6xl">
              Create Content that Matters.
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            <span className="whitespace-pre-wrap px-10 font-jost">
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
            <div
              id="feature-1"
              className="relative flex w-full flex-1 flex-col justify-between gap-10 md:mb-0"
              style={{ marginBottom: bounds.height }}
            >
              <div
                className={background600({
                  variant,
                  className: "absolute right-0 top-0 size-[50vw] blur-[100px]",
                })}
              />
              <div
                className={background600({
                  variant: "purple",
                  className:
                    "absolute left-0 top-0 size-[40vw] -translate-x-10 -translate-y-10 opacity-50 blur-2xl",
                })}
              />
              <div
                className={background600({
                  variant,
                  className: "absolute bottom-0 left-0 size-[15vw] blur-3xl",
                })}
              />
              <div className="z-20 flex gap-2 font-jost">
                <div className="flex flex-col items-center justify-start">
                  <CloudArrowDownIcon className="size-[1.5rem] sm:size-[1.75rem]" />
                </div>
                <div className="flex max-w-[800px] flex-col gap-2 md:gap-4">
                  <span className="text-base font-semibold sm:text-lg lg:text-xl">
                    Persona-Driven Content Creation
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-6xl">
                    Understand your audience in seconds.
                  </h3>
                  <span className="sm:w-[300px] lg:text-lg">
                    Gain Real-Time Insights into the thoughts of your audience.
                  </span>
                  <br className="max-md:hidden" />
                  <ul className="flex flex-col gap-1 max-md:pt-4 sm:w-[300px] lg:gap-2">
                    <li className="flex items-center gap-4">
                      <GraduationCapIcon className="size-4 lg:size-6" />
                      <span className="lg:text-lg">
                        Understand your audience better
                      </span>
                    </li>
                    <li className="flex items-center gap-4">
                      <BarChart4Icon className="size-4 lg:size-6" />
                      <span className="lg:text-lg">Get Real-Time Insights</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <BookOpenCheckIcon className="size-4 lg:size-6" />
                      <span className="lg:text-lg">
                        Write content that resonates
                      </span>
                    </li>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "group mt-4 h-fit rounded-full p-1 shadow-md hover:scale-100 hover:text-primary",
                        "z-20",
                      )}
                    >
                      <span
                        className={cx(
                          ButtonInnerHover({ variant: variant }),
                          cn(
                            "flex w-full items-center justify-center gap-2 pl-5 text-sm",
                            "bg-gradient-to-b from-blue-500 to-blue-500 text-white hover:bg-gradient-to-b hover:from-blue-500 hover:to-blue-400",
                          ),
                        )}
                      >
                        <Link href="/register">
                          Join InstantPersonas for Free
                        </Link>
                        <PersonStandingIcon
                          className={IconVariants({
                            size: "sm",
                            className: "text-white",
                          })}
                        />
                      </span>
                    </Button>
                  </ul>
                </div>
              </div>

              <div
                className={cn(
                  "md:absolute md:right-0 md:top-[40%] md:size-[65%] lg:top-[35%] lg:size-[68%] xl:top-[30%] xl:size-[75%]",
                  "flex items-center md:items-start md:justify-end",
                  "transition-all duration-700 ease-out",
                )}
              >
                <div className="relative aspect-[2048/1279] w-full md:w-[90%]">
                  <div
                    className="absolute left-[16%] top-[14%] z-10 flex h-full w-[53%] flex-col items-center rounded-lg border bg-white p-1 shadow-xl"
                    ref={featureRef}
                  >
                    <div
                      className={gradientLightVariants({
                        variant,
                        className:
                          "relative flex h-full w-full flex-col items-center overflow-hidden rounded-lg border",
                      })}
                    >
                      <PersonStandingIcon className="absolute right-2 top-2 size-4 text-muted-foreground" />
                      <span className="py-6 text-center font-jost text-xs font-bold sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
                        Guide to Instagram
                        <br /> Marketing
                      </span>
                      <div className="mt-2 flex w-[80%] flex-col items-center gap-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "h-1 w-full rounded-full bg-gray-200 lg:h-2",
                              i === 3 && "mb-5",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className="group absolute left-[calc(16%+53%-50px)] top-[34%] z-20 flex flex-row p-2"
                    onMouseEnter={() => nextThought()}
                  >
                    <div className="relative">
                      <MessageCircleQuestionIcon
                        className={SVGLight600({
                          variant: "purple",
                          className: "absolute right-0 top-0 z-20 size-6",
                        })}
                      />
                      <MessageCircleQuestionIcon
                        className={
                          "absolute right-0 top-0 z-10 size-6 fill-white stroke-transparent"
                        }
                      />
                      <Avatar
                        className={avatarVariants({
                          variant: "purple",
                          interactive: true,
                        })}
                      >
                        <AvatarImage
                          src={
                            "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant08&body=variant21&hair=variant13&backgroundColor=d9cbfc"
                          }
                        />
                      </Avatar>
                    </div>

                    <div className="mt-2 flex w-[100px] items-center whitespace-pre-wrap rounded-lg border bg-gray-100 p-2 px-4 text-left font-jost text-sm opacity-0 shadow-xl transition-opacity duration-500 ease-out group-hover:opacity-100 max-md:text-xs md:w-[150px] lg:w-[200px]">
                      {personaThoughts[thoughtIndex]}
                    </div>
                  </div>

                  <Image
                    fill={true}
                    src={BlogFeatureImg}
                    alt="Instant Personas Blog with Real Time Insights"
                    className="overflow-hidden rounded-lg border shadow-lg"
                  />
                </div>
              </div>
            </div>

            <div className="relative flex flex-col items-center">
              {/* <div
                className={background600({
                  variant: "purple",
                  className:
                    "absolute right-0 top-0 size-[45vw] rounded-full blur-[25vw]",
                })}
              />
              <div
                className={background600({
                  variant,
                  className:
                    "absolute left-0 top-0 size-[50vw] -translate-x-10 -translate-y-10 rounded-full blur-[20vw]",
                })}
              />
              <div
                className={background600({
                  variant: "pink",
                  className:
                    "absolute bottom-0 right-0 size-[45vw] blur-[30vw]",
                })}
              /> */}
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
          <FreeToolSection title="Try our Free Seo Tools" />
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
