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
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;
    // make async call to check if user is subscribed
    const checkSubscription = async () => {
      const userIsSubscribed = await api.stripe.isSubscriptionActive(
        user.user?.user_id as string
      );
      setIsSubscribed(
        userIsSubscribed.status === "active" ||
          userIsSubscribed.status === "trialing"
      );
      console.log("isSubscribed", userIsSubscribed);
    };
    checkSubscription();
  }, [isSubscribed, user]);

  return (
    <main className="bg-zinc-100 min-h-screen">
      {isSubscribed ? (
        <DashboardLayout>
          <ScrollArea className="h-[calc(100dvh-2px)]">{children}</ScrollArea>
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
