"use client";
import { useEffect, useState } from "react";
import LandingPage from "@/components/page-specific/landing-page";
import { useStytchUser } from "@stytch/nextjs";
import api from "@/service/api.service";
import DashboardLayout from "@/components/page-specific/dashboard/dashboard";
import { BlogFooter } from "@/components/page-specific/blog/footer";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useStytchUser();

  return (
    <main className="bg-zinc-100 min-h-screen">
      {user.user ? (
        <DashboardLayout>
          <ScrollArea className="h-[calc(100dvh-2px)]">
            <div className="h-full w-full flex-1">{children}</div>
          </ScrollArea>
        </DashboardLayout>
      ) : (
        <section className="flex flex-col justify-between h-screen">
          <LandingPage.header />
          {children}
          <BlogFooter />
        </section>
      )}
    </main>
  );
}
