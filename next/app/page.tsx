"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LandingPage from "@/components/page-specific/landing-page";
import { FreeToolSection } from "@/components/toolfolio/free-tools-section";

const env = process.env.NEXT_PUBLIC_ENV;

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <title>{"Detailed User Personas in Seconds | Try for Free"}</title>
      <script type="application/ld+json">
        {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "InstantPersonas",
              "url": "https://instantpersonas.com/"
            }
          `}
      </script>
      <LandingPage.header />
      <LandingPage.hero />
      <LandingPage.productCarousel />
      <LandingPage.features />
      <LandingPage.pricing />
      <LandingPage.callToAction />
      <LandingPage.faqs />
      <div className="p-10 px-4 sm:px-10">
        <LandingPage.testimonials />
      </div>
      <div className="py-8 lg:py-16">
        <FreeToolSection />
      </div>
      <div className="mt-[400px]" />
      <div className="supports-[backdrop-filter]:bg-bg-gradient-to-t h-[100px] w-full bg-gradient-to-t from-slate-50 to-transparent backdrop-blur max-sm:hidden" />
      <LandingPage.footer className="supports-[backdrop-filter]:bg-bg-gradient-to-t bottom-0 w-screen -translate-y-10 overflow-hidden bg-transparent bg-gradient-to-t from-slate-50 from-[33%] to-transparent pt-10 backdrop-blur sm:absolute" />
    </main>
  );
}
