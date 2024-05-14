"use client";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  CopyIcon,
  PersonStandingIcon,
  ShareIcon,
  X,
} from "lucide-react";
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PersonaAdoptionStageAndSatisfactionCorrelationAnalysisSurveyPopup from "@/components/popups/persona-adoption-stage-and-satisfaction-correlation-analysis-survey";
import { ButtonInnerHover, gradientLightVariants } from "@/components/variants";
import { isMobile } from "react-device-detect";
import { PreventMobile } from "@/components/page-specific/prevent-mobile";
import SubscriptionPopup from "@/components/popups/subscription-popup";
import {
  mapUrlBackgroundColorParamToVariant,
  PersonaArchetype,
  PersonaAvatarPopover,
} from "@/components/page-specific/generative-ui/persona-avatar-popover";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cx } from "class-variance-authority";
import { GuestPostFinderTool } from "@/components/toolfolio/guest-post-finder";
import { TEST_PERSONA_HISTORY_DO_NOT_ALLOW_ON_PROD } from "@/tests/data/persona-history";
import CopyLinkPopover from "@/components/copy-link-popover";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {};

export default function PageTest({}: Props) {
  const [openSubscriptionPopup, setOpenSubscriptionPopup] =
    React.useState(true);

  return (
    <div className="flex flex-col items-center h-screen w-screen relative">
      <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
        Guest Post Opportunity Finder
      </h1>
      <h2 className="text-center mt-4 text-xs text-slate-400 mb-16">
        Writing Guest Posts is a great way to build backlinks and authority.
        <br />
        Find the best opportunities for your niche here.
      </h2>

      <GuestPostFinderTool persona={"a marketing manager"} />

      {/* <GuestPostOpportunitiesTool/> */}

      {/* <Subscription2 />
      <SubscriptionPopup
        openSubscriptionPopup={openSubscriptionPopup}
        setOpenSubscriptionPopup={setOpenSubscriptionPopup}
      /> */}
      {/* <FeedbackPopup
        openFeedbackPopup={false}
        setOpenFeedbackPopup={function (
          value: React.SetStateAction<boolean>
        ): void {
          throw new Error("Function not implemented.");
        }}
      /> */}
      {/* <PersonaAdoptionStageAndSatisfactionCorrelationAnalysisSurveyPopup
        openFeedbackPopup={true}
        setOpenFeedbackPopup={function (
          value: React.SetStateAction<boolean>
        ): void {
          throw new Error("Function not implemented.");
        }}
      /> */}
      {/* <PreventMobile /> */}
    </div>
  );
}
