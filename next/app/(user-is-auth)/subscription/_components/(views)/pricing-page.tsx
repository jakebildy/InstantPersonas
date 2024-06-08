"use client";

import { StripePlanCard } from "../stripe-plan-card";

export default function DashboardPricing() {
  const features = [
    "Unlimited User Personas",
    "Persona Chat - Powered by AI",
    "Deep Target Market Insights",
    "Priority support",
  ];

  return (
    <section className="flex flex-col items-center gap-10 py-14 text-center">
      {/* Header */}

      <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-gray-900">
        Pricing
      </h1>

      {/* InstantPersonas Pricing */}
      <div className="grid max-w-md gap-8 md:max-w-[800px] md:grid-cols-2">
        <StripePlanCard
          name="Yearly"
          price="$5.99"
          description="Billed annually."
          description2="Save more with the yearly plan."
          features={features}
          popular
        />
        <StripePlanCard
          name="Monthly"
          price="$7.99"
          description="Billed every month."
          description2=""
          features={features}
        />
      </div>

      <p className="max-w-lg text-sm font-semibold leading-6 text-gray-600">
        {/* 30-day money-back guarantee. Cancel anytime. */}
        We offer a 30-day full refund guarantee. If for any reason you are not
        satisfied with our product within 30 days of your purchase, we will
        gladly give you a full refund.
      </p>
    </section>
  );
}
