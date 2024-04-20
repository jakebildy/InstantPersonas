"use client";

import api from "@/service/api.service";
import ActiveSubscription from "./_components/(views)/active-subscription";
import DashboardPricing from "./_components/(views)/pricing-page";
import { useStytchUser } from "@stytch/nextjs";
import { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
export default function SubscriptionPage() {
  const { user } = useStytchUser();

  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [status, setStatus] = useState<string>("");
  const [cancel_at_period_end, setCancelAtPeriodEnd] = useState<boolean>(false);
  const [interval, setInterval] = useState<string>("");

  // useEffect
  useEffect(() => {
    if (!user) return;
    // make async call to check if user is subscribed
    const checkSubscription = async () => {
      const userIsSubscribed = await api.stripe.isSubscriptionActive(
        user?.user_id as string
      );
      setIsSubscribed(
        userIsSubscribed.status === "active" ||
          userIsSubscribed.status === "trialing"
      );
      setStatus(userIsSubscribed.status);
      setCancelAtPeriodEnd(userIsSubscribed.cancel_at_period_end);
      setInterval(userIsSubscribed.interval);
      setLoading(false);
    };
    checkSubscription();
  }, [user]);

  return loading ? (
    // center the bar loader in the middle of the screen
    <div className="flex justify-center items-center h-full w-full mt-[200px]">
      <div>
        <div className="text-slate-500 mb-4">
          Getting subscription status...
        </div>

        <BarLoader color="#36d7b7" height={10} width={200} />
      </div>
    </div>
  ) : isSubscribed ? (
    <ActiveSubscription
      status={status}
      cancel_at_period_end={cancel_at_period_end}
      interval={interval}
    />
  ) : (
    <DashboardPricing />
  );
}
