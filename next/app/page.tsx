"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LandingPage from "@/components/landing-page";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <LandingPage.header />
      <LandingPage.hero />
      <LandingPage.videoFeature />
      <LandingPage.callToAction />
      <LandingPage.pricing />
      <LandingPage.faqs />
      <div className="w-full h-[100px] from-slate-50 to-transparent bg-gradient-to-t backdrop-blur supports-[backdrop-filter]:bg-bg-gradient-to-t" />
      <LandingPage.footer className="from-slate-50 from-[33%] to-transparent bg-gradient-to-t absolute bottom-0 bg-transparent w-screen overflow-hidden backdrop-blur supports-[backdrop-filter]:bg-bg-gradient-to-t" />

      <Button asChild className="absolute top-0 m-10 " variant={"destructive"}>
        <Link href={"/dashboard"}>Dashboard</Link>
      </Button>
    </main>
  );
}
