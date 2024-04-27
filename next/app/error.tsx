"use client"; // Error components must be Client Components

import { useEffect, useState } from "react";
import LandingPage from "@/components/landing-page";
import { useStytchUser } from "@stytch/nextjs";
import api from "@/service/api.service";
import ErrorState from "@/components/error-state";
import DashboardLayout from "@/components/dashboard";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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

  return (
    <section>
      {isSubscribed ? (
        <DashboardLayout>
          <div className="grid place-items-center w-full h-full">
            <ErrorState error={error} onRetry={reset} />
          </div>
        </DashboardLayout>
      ) : (
        <>
          <LandingPage.header />
          <div className="grid place-items-center w-full h-full">
            <ErrorState error={error} onRetry={reset} />
          </div>
        </>
      )}
    </section>
  );
}
