"use client";

const env = process.env.NEXT_PUBLIC_ENV;
import { gradientVariants, shadowVariants } from "@/components/variants";
import { cn } from "@/lib/utils";
import { cx } from "class-variance-authority";
import AnimatedGridPattern from "@/components/ui/magicui/animated-grid-pattern";
import LandingPage from "@/components/page-specific/landing-page";
import { FreeToolSection } from "@/components/toolfolio/free-tools-section";
import RadialGradient from "@/components/ui/magicui/radial-gradient";
import { useEffect } from "react";

export default function Home() {
  const variant = "blue";

  const InstantPersonasJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "InstantPersonas",
    url: "https://instantpersonas.com/",
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://salespopup.io/api/script.js?website=instantpersonas.com";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup the script on component unmount
      document.head.removeChild(script);

      const injectedElements = document.querySelectorAll(
        ".__SP_recent-transactions",
      );
      injectedElements.forEach((element) => element.remove());
    };
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <title>{"Detailed User Personas in Seconds | Try for Free"}</title>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(InstantPersonasJsonLd),
        }}
      />
      {/* <script
        src="https://salespopup.io/api/script.js?website=instantpersonas.com"
        async
        defer
      ></script> */}

      <div className="fixed top-0 z-50 w-full p-4">
        <div className="rounded-lg border bg-white/50 backdrop-blur-sm">
          <LandingPage.header />
        </div>
      </div>

      <LandingPage.showcaseHero />

      <div className="flex flex-col items-center py-10 sm:p-4 md:p-10">
        <div className="relative grid place-items-center rounded-lg border bg-white p-2 shadow-md">
          <div
            className={cx(
              gradientVariants({
                variant,
                className:
                  "relative flex h-full w-full flex-col rounded-lg border p-10 px-4 sm:gap-16 sm:px-10",
              }),
              shadowVariants({
                variant,
              }),
            )}
          >
            <RadialGradient size={600} className="absolute right-0 top-0" />
            <LandingPage.documentFeature />

            <div className="relative flex flex-col items-center">
              <LandingPage.testimonials />
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        {/* <AnimatedGridPattern
          numSquares={100}
          maxOpacity={0.5}
          duration={3}
          repeatDelay={1}
          className={cn(
            "absolute inset-x-0 bottom-0 h-full skew-y-12 opacity-50",
          )}
          squaresClassName="stroke-blue-500 fill-blue-500"
        /> */}
        <LandingPage.pricing />
        <LandingPage.faqs />
        <div className="flex flex-col items-center py-8 lg:py-16">
          <p className="mt-6 max-w-2xl text-center font-jost text-lg font-semibold leading-8 text-gray-600">
            Still not convinced?
          </p>
          <FreeToolSection title="Try our Free Seo Tools" />
        </div>
      </div>

      <div className="mt-[400px]" />
      <div className="supports-[backdrop-filter]:bg-bg-gradient-to-t h-[100px] w-full bg-gradient-to-t from-slate-50 to-transparent backdrop-blur max-sm:hidden" />
      <LandingPage.footer className="supports-[backdrop-filter]:bg-bg-gradient-to-t bottom-0 w-screen -translate-y-10 overflow-hidden bg-transparent bg-gradient-to-t from-slate-50 from-[33%] to-transparent pt-10 backdrop-blur sm:absolute" />
    </main>
  );
}
