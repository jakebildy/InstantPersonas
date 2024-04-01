"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LandingPage from "@/components/landing-page";

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const defaultLayout = [265, 440, 655];
  const navCollapsedSize = 4;

  const canExpandSidebar = useMediaQuery("(min-width: 1025px)");
  // Expanded Sidebar needs to be at least 205px and has constraint of 20% of the screen
  // 205 * 5 = 1025px

  useEffect(() => {
    if (!canExpandSidebar) {
      setIsCollapsed(true);
      document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
        true
      )}`;
    } else {
      setIsCollapsed(false);
      document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
        false
      )}`;
    }
  }, [canExpandSidebar]);

  return (
    <main className="grid h-screen w-screen">
      <LandingPage.header />
      <LandingPage.hero />
      <LandingPage.videoFeature />
      <LandingPage.callToAction />
      <LandingPage.pricing />
      <LandingPage.faqs />
      <LandingPage.footer />

      <Button asChild className="fixed m-10 " variant={"destructive"}>
        <Link href={"/dashboard"}>Dashboard</Link>
      </Button>
    </main>
  );
}
