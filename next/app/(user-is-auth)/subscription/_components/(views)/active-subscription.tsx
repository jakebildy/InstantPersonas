"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "@/service/api.service";
import { SIDEBAR_LINKS } from "@/lib/site";
import { Button } from "@/components/ui/button";
import * as PriceLoading from "@/public/price-loading.gif";
import { useStytchUser } from "@stytch/nextjs";

export default function ActiveSubscription({
  status,
  cancel_at_period_end,
  interval,
}: {
  status: string;
  cancel_at_period_end: boolean;
  interval: string;
}) {
  const [stripeCustomerPortalLink, setStripeCustomerPortalLink] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useStytchUser();
  useEffect(() => {
    const fetchStripeCustomerPortalLink = async () => {
      setStripeCustomerPortalLink(
        await api.stripe.getCustomerPortalUrl(user?.user_id as string)
      );
      setLoading(false);
      return stripeCustomerPortalLink;
    };
    fetchStripeCustomerPortalLink();
  }, []);

  const feedbackLink = SIDEBAR_LINKS.find(
    (link) => link.title === "Send Feedback"
  )?.href;
  return (
    <section className="align-center text-center text-gray-700 font-bold flex flex-col gap-10 py-14">
      <h1 className="text-3xl">
        Your Subscription is{" "}
        {cancel_at_period_end ? (
          <span className="text-red-600">Ending Soon!!</span>
        ) : (
          <span className="text-green-600">Active!</span>
        )}
        <h2 className="text-sm">
          Your subscription is currently {status} and renews on a{" "}
          {interval === "month" ? "monthly" : "yearly"} basis.
        </h2>
      </h1>

      {cancel_at_period_end ? (
        <div>
          <h2 className="text-md text-green-600">
            Your subscription will cancel at the end of the current billing
            cycle. Renew now so you don&apos;t lose access!
          </h2>
          {stripeCustomerPortalLink ? (
            <Button className="mt-4" variant={"default"} asChild>
              <Link href={stripeCustomerPortalLink!}>Renew Subscription</Link>
            </Button>
          ) : (
            <div />
          )}
        </div>
      ) : null}
      <Image
        height={200}
        width={200}
        src={PriceLoading}
        className="mx-auto"
        alt="Active Subscription Dashboard Image"
        unoptimized
        priority
      />
      <h2 className="text-md">
        How can InstantPersonas serve you better? We&apos;d love to hear your
        feedback!
      </h2>
      <div className="flex gap-4 items-center justify-center">
        {feedbackLink ? (
          <Button variant={"slate"} asChild>
            <Link href={feedbackLink}>Send Feedback</Link>
          </Button>
        ) : null}
        {loading ? (
          <span className="text-sm text-gray-500 text-center font-semibold h-10 px-4 py-2 rounded-md border border-slate-400 cursor-help">
            Loading...
          </span>
        ) : stripeCustomerPortalLink ? (
          <Button
            variant={cancel_at_period_end ? "green" : "destructive"}
            asChild
          >
            <Link href={stripeCustomerPortalLink}>
              {cancel_at_period_end
                ? "Renew Subscription"
                : "Cancel Subscription"}
            </Link>
          </Button>
        ) : (
          <span className="text-sm text-gray-500 text-center font-semibold h-10 px-4 py-2 rounded-md border border-slate-400 cursor-help">
            There seems to be an error with our payment processor, please
            contact support for assistance.
          </span>
        )}
      </div>
    </section>
  );
}
