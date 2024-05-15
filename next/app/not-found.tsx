"use client";
import { useEffect, useState } from "react";
import LandingPage from "@/components/page-specific/landing-page";
import { useStytchUser } from "@stytch/nextjs";
import api from "@/service/api.service";
import ErrorState from "@/components/page-specific/error-state";
import DashboardLayout from "@/components/page-specific/dashboard/dashboard";
import { useRouter } from "next/navigation";

export default function NotFound() {
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
    };
    checkSubscription();
  }, [user]);

  const router = useRouter();

  return (
    <section>
      {isSubscribed ? (
        <DashboardLayout>
          <div className="grid place-items-center w-full h-full">
            <ErrorState onRetry={() => router.push("/")} />
          </div>
        </DashboardLayout>
      ) : (
        <>
          <LandingPage.header />
          <div className="grid place-items-center w-full h-full">
            <ErrorState onRetry={() => router.push("/")} />
          </div>
        </>
      )}
    </section>
  );
}
