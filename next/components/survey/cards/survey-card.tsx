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
        "flex flex-col items-center p-1 border border-input bg-white rounded-lg  w-full group gap-2"
        // className
      )}
      // {...Props}
    >
      <div
        className={gradientVariants({
          variant,
          className:
            "h-full max-h-[900px] w-full grid grid-cols-4 grid-rows-7 p-4 text-left rounded-lg border border-input relative overflow-hidden group",
        })}
      >
        <PersonStandingIcon className="text-white size-8 transition-colors duration-150 ease-out absolute top-2 right-2 z-10" />
        <h2 className="col-span-3 row-span-2 text-white text-4xl font-bold font-jost py-10 z-10 text-wrap">
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
              "size-[250px] transition-colors duration-150 ease-out absolute bottom-3 -right-[30px] z-10 blur-lg tilt-backward-right",
          })}
        />
        {/* Grid Spacing Separator */}
        <div className="col-span-4 row-span-2" />

        {/* Survey Question Preview List */}
        <ul className="col-span-4 row-span-3 gap-2 flex flex-col justify-center h-full z-10">
          {questions.slice(0, 5).map((question, i) => (
            <li
              key={i}
              className={textColorVariants({
                variant,
                className: " flex items-start gap-2",
              })}
            >
              <span className="text-lg font-bold font-jost h-fit">
                0{i + 1}.
              </span>

              <p className="font-semibold text-sm pt-1">{question}</p>
            </li>
          ))}
        </ul>

        {/*End Section Left - Survey Time and Description */}
        <div
          className={textColorVariants({
            variant,
            className: "col-span-2 z-10",
          })}
        >
          <ArrowDownIcon
            className={textColorVariants({
              variant,
              className: "size-4 mb-2",
            })}
          />
          <p className="font-semibold text-xs pt-1">
            Survey time <i>{surveyTimeInMins} mins</i>
          </p>
          <p className=" text-xs pt-1">{description}</p>
        </div>

        {/*End Section Right - Survey Start Button */}
        <div className="col-span-2 flex items-end justify-end z-10">
          <Button
            variant={"outline"}
            className="hover:text-primary rounded-full hover:scale-100 h-fit  p-1 shadow-md"
            onClick={handleTakeSurvey}
          >
            <span
              className={cx(
                ButtonInnerHover({ variant }),
                gradientLightVariants({
                  variant,
                })
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
