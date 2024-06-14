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
import SubscriptionPopup from "@/components/popups/subscription-popup";
import { BRAND_ICONS } from "@/components/brand-icons";
import { SlackPopup } from "@/components/popups/slack/slack-popup";
import { TwitterGiveAwayPopup } from "@/components/popups/twitter-giveaway/giveaway-popup";

type Props = {};

export default function PageTest({}: Props) {
  const [variant, setVariant] = useState<ColorVariant>("blue");

  //function to change variant based on list of variants
  const changeVariant = () => {
    const index = ColorVariants.indexOf(variant);
    setVariant(ColorVariants[(index + 1) % ColorVariants.length]);
  };

  return (
    <div className="relative flex h-full w-screen flex-col items-center justify-center gap-4 py-[50px]">
      {/* <Button variant={"outline"} onClick={() => changeVariant()}>
        Change Variant
      </Button> */}
      hello
      {/* <SlackPopup
        open={true}
        onOpenChange={function (value: React.SetStateAction<boolean>): void {
          throw new Error("Function not implemented.");
        }}
      /> */}
      <TwitterGiveAwayPopup
        open={true}
        onOpenChange={function (value: React.SetStateAction<boolean>): void {
          throw new Error("Function not implemented.");
        }}
      />
      {/* <Button variant={"outline"} onClick={() => changeVariant()}>
        Change Variant
      </Button> */}
    </div>
  );
}
