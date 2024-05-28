"use client";
import React from "react";
import { StytchLoginForm } from "@/components/context/auth/stytch-login";
import { BackgroundGradientAnimation } from "@/components/ui/aceternity/gradient_background_login";
import { InstantPersonas } from "@/components/instantPersonas";
import ClientGlobe from "@/components/ui/aceternity/client-globe";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen ">
      <title>InstantPersonas | Get Started</title>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96 flex flex-col items-center">
          <InstantPersonas />
          <StytchLoginForm />
        </div>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <BackgroundGradientAnimation>
          <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
            <ClientGlobe />;
          </div>
        </BackgroundGradientAnimation>
      </div>
    </div>
  );
}
