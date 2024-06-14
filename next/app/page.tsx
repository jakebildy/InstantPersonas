"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LandingPage from "@/components/page-specific/landing-page";

const env = process.env.NEXT_PUBLIC_ENV;

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <title>{"Detailed User Personas in Seconds | Try for Free"}</title>
      <LandingPage.header />
      <LandingPage.hero />
      <LandingPage.productCarousel />
      <LandingPage.features />
      <LandingPage.pricing />
      <LandingPage.callToAction />
      <LandingPage.faqs />
      <LandingPage.testimonials />
      <div className="mt-[400px]" />
      <div className="supports-[backdrop-filter]:bg-bg-gradient-to-t h-[100px] w-full bg-gradient-to-t from-slate-50 to-transparent backdrop-blur max-sm:hidden" />
      <LandingPage.footer className="supports-[backdrop-filter]:bg-bg-gradient-to-t bottom-0 w-screen -translate-y-10 overflow-hidden bg-transparent bg-gradient-to-t from-slate-50 from-[33%] to-transparent pt-10 backdrop-blur sm:absolute" />
    </main>
  );
}
