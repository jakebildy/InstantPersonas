"use client";
import React from "react";
import { StytchLoginForm } from "@/components/auth/stytch-login";
import { BackgroundGradientAnimation } from "@/components/aceternity-ui/gradient_background_login";
import { globeConfig, sampleArcs } from "@/lib/config/globe";
import { InstantPersonas } from "@/components/instantPersonas";
import dynamic from "next/dynamic";
import World from "@/components/aceternity-ui/globe";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen ">
      <title>Instant Personas | Get Started</title>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96 flex flex-col items-center">
          <InstantPersonas />
          <StytchLoginForm />
        </div>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <BackgroundGradientAnimation>
          <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
            <World data={sampleArcs} globeConfig={globeConfig} />;
          </div>
        </BackgroundGradientAnimation>
      </div>
    </div>
  );
}
