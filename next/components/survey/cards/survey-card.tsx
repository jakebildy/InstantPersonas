"use client";

import { Button } from "@/components/ui/button";
import {
  ButtonInnerHover,
  ColorVariant,
  gradientLightVariants,
  gradientVariants,
  SurveyCardBackGroundElementCircle,
  SurveyCardBackGroundElementRing,
  textColorVariants,
} from "@/components/variants";
import { cn, IS_TEST_DEV_ENV } from "@/lib/utils";
import { PersonStandingIcon } from "lucide-react";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { usePostHog } from "posthog-js/react";
import { HTMLAttributes, useEffect, useRef, useState } from "react";

import { MaxLengthArray } from "@/lib/types";
import { cx } from "class-variance-authority";
// import { AnimatePresence, motion } from "framer-motion";

type Props = {
  variant?: ColorVariant;
  title: string;
  description: string;
  onTakeSurvey: () => void;
  logAnalytics?: boolean;
  questions: string[];
  surveyTimeInMins: number;
};

export function SurveyCard({
  // className,
  title,
  description,
  variant = "blue",
  questions,
  logAnalytics = true,
  onTakeSurvey,
  surveyTimeInMins,
}: // ...Props
Props) {
  const posthog = usePostHog();

  const handleTakeSurvey = () => {
    if (logAnalytics && !IS_TEST_DEV_ENV) {
      posthog.capture("survey_started", {
        surveyTimeInMins,
        questions,
      });
    }
    onTakeSurvey?.();
  };

  return (
    <div
      className={cn(
        "group flex w-full flex-col items-center gap-2 rounded-lg border border-input bg-white p-1",
        // className
      )}
      // {...Props}
    >
      <div
        className={gradientVariants({
          variant,
          className:
            "group relative grid h-full max-h-[900px] w-full grid-cols-4 grid-rows-7 overflow-hidden rounded-lg border border-input p-4 text-left",
        })}
      >
        <PersonStandingIcon className="absolute right-2 top-2 z-10 size-8 text-white transition-colors duration-150 ease-out" />
        <h2 className="z-10 col-span-3 row-span-2 text-wrap py-10 font-jost text-4xl font-bold text-white">
          {title}
        </h2>
        {/* Gradient background Elements */}
        <div className={SurveyCardBackGroundElementCircle({ variant })} />
        <div className={SurveyCardBackGroundElementRing({ variant })} />
        <div
          className={SurveyCardBackGroundElementRing({ variant, blur: true })}
        />
        <PersonStandingIcon
          className={textColorVariants({
            variant,
            className:
              "tilt-backward-right absolute -right-[30px] bottom-3 z-10 size-[250px] blur-lg transition-colors duration-150 ease-out",
          })}
        />
        {/* Grid Spacing Separator */}
        <div className="col-span-4 row-span-2" />

        {/* Survey Question Preview List */}
        <ul className="z-10 col-span-4 row-span-3 flex h-full flex-col justify-center gap-2">
          {questions.slice(0, 5).map((question, i) => (
            <li
              key={i}
              className={textColorVariants({
                variant,
                className: "flex items-start gap-2",
              })}
            >
              <span className="h-fit font-jost text-lg font-bold">
                0{i + 1}.
              </span>

              <p className="pt-1 text-sm font-semibold">{question}</p>
            </li>
          ))}
        </ul>

        {/*End Section Left - Survey Time and Description */}
        <div
          className={textColorVariants({
            variant,
            className: "z-10 col-span-2",
          })}
        >
          <ArrowDownIcon
            className={textColorVariants({
              variant,
              className: "mb-2 size-4",
            })}
          />
          <p className="pt-1 text-xs font-semibold">
            Survey time <i>{surveyTimeInMins} mins</i>
          </p>
          <p className="pt-1 text-xs">{description}</p>
        </div>

        {/*End Section Right - Survey Start Button */}
        <div className="z-10 col-span-2 flex items-end justify-end">
          <Button
            variant={"outline"}
            className="h-fit rounded-full p-1 shadow-md hover:scale-100 hover:text-primary"
            onClick={handleTakeSurvey}
          >
            <span
              className={cx(
                ButtonInnerHover({ variant }),
                gradientLightVariants({
                  variant,
                }),
              )}
            >
              Take Survey
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
