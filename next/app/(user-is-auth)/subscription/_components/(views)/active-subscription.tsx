"use server";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import api from "@/service/api.service";
import { SIDEBAR_LINKS } from "@/lib/site";
import { Button } from "@/components/ui/button";
import * as PriceLoading from "@/public/price-loading.gif";

export default async function ActiveSubscription() {
  const stripeCustomerPortalLink = await api.stripe.getCustomerPortalUrl();
  const feedbackLink = SIDEBAR_LINKS.find(
    (link) => link.title === "Send Feedback"
  )?.href;
  return (
    <section className="align-center text-center text-gray-700 font-bold flex flex-col gap-10 py-14">
      <h1 className="text-3xl">
        Your Subscription is <span className="text-green-600">Active!</span>
      </h1>
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
        {stripeCustomerPortalLink ? (
          <Button variant={"destructive"} asChild>
            <Link href={stripeCustomerPortalLink}>Cancel Subscription</Link>
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
