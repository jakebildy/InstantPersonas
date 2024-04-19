"use client";

import api from "@/service/api.service";
import ActiveSubscription from "./_components/(views)/active-subscription";
import DashboardPricing from "./_components/(views)/pricing-page";
import { useStytchUser } from "@stytch/nextjs";
import { useEffect } from "react";
export default function SubscriptionPage() {
  const { user } = useStytchUser();

  let isSubscribed = false;

  // useEffect
  useEffect(() => {
    if (!user) return;
    // make async call to check if user is subscribed
    const checkSubscription = async () => {
      const userIsSubscribed = await api.stripe.isSubscriptionActive(
        user?.user_id as string
      );
      isSubscribed = userIsSubscribed;
    };
    checkSubscription();
  }, [user]);

  return isSubscribed ? <ActiveSubscription /> : <DashboardPricing />;
}
