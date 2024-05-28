"use client";

import LandingPage from "@/components/page-specific/landing-page";
import React from "react";

type Props = { children: React.ReactNode };

export default function layout({ children }: Props) {
  return (
    <>
      <LandingPage.header />
      <div className="grid place-items-center w-full h-full">{children}</div>
      <LandingPage.footer />
    </>
  );
}
