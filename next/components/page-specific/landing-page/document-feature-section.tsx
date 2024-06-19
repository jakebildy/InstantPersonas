import { Button } from "@/components/ui/button";
import { IconVariants } from "@/components/ui/gradient-button";
import {
  background600,
  ButtonInnerHover,
  gradientLightVariants,
  SVGLight600,
  avatarVariants,
  ColorVariant,
} from "@/components/variants";
import { cn } from "@/lib/utils";
import { CloudArrowDownIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { cx } from "class-variance-authority";
import {
  GraduationCapIcon,
  BarChart4Icon,
  BookOpenCheckIcon,
  Link,
  PersonStandingIcon,
  MessageCircleQuestionIcon,
} from "lucide-react";
import React, { useState } from "react";
import useMeasure from "react-use-measure";
import Image from "next/image";
import * as BlogFeatureImg from "@/public/instant_personas_blog_feature.png";

type Props = {
  variant?: ColorVariant;
};

export default function DocumentFeatureSection({ variant = "blue" }: Props) {
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
    <section
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
            Create Content that Matters
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
              <span className="lg:text-lg">Write content that resonates</span>
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
                <Link href="/register">Join InstantPersonas for Free</Link>
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
    </section>
  );
}
