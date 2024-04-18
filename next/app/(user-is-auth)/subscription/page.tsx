"use server";

import api from "@/service/api.service";
import ActiveSubscription from "./_components/(views)/active-subscription";
import DashboardPricing from "./_components/(views)/pricing-page";
import { useStytchUser } from "@stytch/nextjs";
export default async function SubscriptionPage() {
  // const { user } = useStytchUser();
  // const userIsSubscribed = await api.stripe.isSubscriptionActive(user?.user_id as string);
  const userIsSubscribed = true;
  return userIsSubscribed ? <ActiveSubscription /> : <DashboardPricing />;
}
