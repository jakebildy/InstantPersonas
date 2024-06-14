"use client";
import React from "react";
import { StytchLoginForm } from "@/components/context/auth/stytch-login";
import { BackgroundGradientAnimation } from "@/components/ui/aceternity/gradient_background_login";
import { InstantPersonas } from "@/components/instantPersonas";
import ClientGlobe from "@/components/ui/aceternity/client-globe";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <title>InstantPersonas | Get Started</title>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto flex w-full max-w-sm flex-col items-center lg:w-96">
          <InstantPersonas />
          <StytchLoginForm />
        </div>
      </div>
      <div className="hidden flex-1 items-center justify-center lg:flex">
        <BackgroundGradientAnimation>
          <div className="absolute -bottom-20 z-10 h-72 w-full md:h-full">
            <ClientGlobe />;
          </div>
        </BackgroundGradientAnimation>
      </div>
    </div>
  );
}
