"use client";

import { StripePlanCard } from "../stripe-plan-card";

export default function DashboardPricing() {
  const features = [
    "Unlimited User Personas",
    "Create SEO Optimized Content",
    "Deep Target Market Insights",
    "Find Niche-Specific Marketing Opportunities",
    "Priority support",
  ];

  return (
    <section className="text-center flex flex-col gap-10 items-center py-14">
      {/* Header */}

      <h1 className="text-3xl font-bold tracking-tight text-gray-900 max-w-4xl">
        Pricing
      </h1>

      {/* InstantPersonas Pricing */}
      <div className="grid max-w-md gap-8 md:max-w-[800px] md:grid-cols-2">
        <StripePlanCard
          name="Monthly"
          price="9.95"
          description="Billed every month."
          description2=""
          features={features}
        />
        <StripePlanCard
          name="Yearly"
          price="6.20"
          description="Billed annually."
          description2="Save 37% with the yearly plan."
          features={features}
          popular
        />
      </div>

      <p className="text-sm font-semibold leading-6 text-gray-600 max-w-lg">
        {/* 30-day money-back guarantee. Cancel anytime. */}
        We offer a 30-day full refund guarantee. If for any reason you are not
        satisfied with our product within 30 days of your purchase, we will
        gladly give you a full refund.
      </p>
    </section>
  );
}
