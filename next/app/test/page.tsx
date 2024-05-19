"use client";
import { AuthFallback } from "@/components/context/auth/stytch-auth";
import {
  ColorVariant,
  ColorVariantMap,
  gradientVariants,
  textPastelColorVariants,
} from "@/components/variants";
import { cn } from "@/lib/utils";
import { PersonStandingIcon } from "lucide-react";
import React, { useState } from "react";
import BarLoader from "react-spinners/BarLoader";

type Props = {};

export default function PageTest({}: Props) {
  return (
    <div className="flex flex-col items-center h-screen w-screen relative overflow-hidden">
      <AuthFallback />
    </div>
  );
}
