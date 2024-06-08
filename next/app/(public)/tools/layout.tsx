"use client";
import { useEffect, useState } from "react";
import LandingPage from "@/components/page-specific/landing-page";
import { useStytchUser } from "@stytch/nextjs";
import api from "@/service/api.service";
import DashboardLayout from "@/components/page-specific/dashboard/dashboard";
import { BlogFooter } from "@/components/page-specific/blog/footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useStytchUser();
  const { isSubscribed, isLoggedIn } = useInstantPersonasUser();

  return (
    <main
      className={
        isLoggedIn ? "min-h-screen bg-gray-100" : "min-h-screen bg-white"
      }
    >
      {user.user ? (
        <DashboardLayout>
          <ScrollArea className="h-[calc(100dvh-2px)]">
            <div className="h-full w-full flex-1">{children}</div>
          </ScrollArea>
        </DashboardLayout>
      ) : (
        <section className="flex h-screen flex-col justify-between">
          <LandingPage.header />
          {children}
          <BlogFooter />
        </section>
      )}
    </main>
  );
}
