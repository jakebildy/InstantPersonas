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
import { StarFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  Testimonial,
  TESTIMONIALS,
} from "../../components/page-specific/landing-page/testimonials/testimonials";
import { cx } from "class-variance-authority";
import { useRouter } from "next/navigation";
import { TestimonialSection } from "@/components/page-specific/landing-page/testimonials";

type Props = {};

export default function PageTest({}: Props) {
  const [variant, setVariant] = useState<ColorVariant>("blue");

  //function to change variant based on list of variants
  const changeVariant = () => {
    const index = ColorVariants.indexOf(variant);
    setVariant(ColorVariants[(index + 1) % ColorVariants.length]);
  };

  return (
    <div className="relative flex w-screen flex-col items-center justify-center gap-4 py-[50px]">
      <Button variant={"outline"} onClick={() => changeVariant()}>
        Change Variant
      </Button>

      <TestimonialSection />

      <Button variant={"outline"} onClick={() => changeVariant()}>
        Change Variant
      </Button>
    </div>
  );
}
