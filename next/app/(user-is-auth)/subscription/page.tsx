"use server";

import api from "@/service/api.service";
import ActiveSubscription from "./_components/(views)/active-subscription";
import DashboardPricing from "./_components/(views)/pricing-page";
export default async function SubscriptionPage() {
  const userIsSubscribed = await api.stripe.isSubscriptionActive();
  return userIsSubscribed ? <ActiveSubscription /> : <DashboardPricing />;
}
