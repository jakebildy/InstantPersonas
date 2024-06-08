"use client";

import ActiveSubscription from "./_components/(views)/active-subscription";
import DashboardPricing from "./_components/(views)/pricing-page";
import BarLoader from "react-spinners/BarLoader";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";

export default function SubscriptionPage() {
  const { user, isSubscribed } = useInstantPersonasUser();

  return !user ? (
    <div className="mt-[200px] flex h-full w-full flex-col items-center justify-center">
      <div className="mb-4 text-slate-500">Getting subscription status...</div>

      <BarLoader
        color="#36d7b7"
        height={10}
        width={500}
        className="rounded-full"
      />
    </div>
  ) : isSubscribed ? (
    <ActiveSubscription
      status={user.subscription.status}
      cancel_at_period_end={user.subscription.cancel_at_period_end}
      interval={user.subscription.interval}
    />
  ) : (
    <DashboardPricing />
  );
}
