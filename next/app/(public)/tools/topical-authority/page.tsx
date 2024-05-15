"use client";
import { PersonaArchetype } from "@/components/page-specific/generative-ui/persona-avatar-popover";
import { TopicalAuthorityMap } from "@/components/toolfolio/topical-authority-map/topical-authority-map";
import api from "@/service/api.service";
import { useStytchUser } from "@stytch/nextjs";
import { usePostHog } from "posthog-js/react";
import { Suspense, useEffect, useState } from "react";

export default function HistoryPage({}: {}) {
  const [personaString, setPersonaString] = useState<string>("");
  const [detailsInput, setDetailsInput] = useState<string>("");
  const [selectedPersonas, setSelectedPersonas] = useState<PersonaArchetype[]>(
    []
  );
  const [userIsSubscribed, setUserIsSubscribed] = useState<boolean>(false);

  const user = useStytchUser();
  const posthog = usePostHog();

  useEffect(() => {
    const results = userIsSubscribed
      ? {
          personas: selectedPersonas.map(
            (persona) => persona.persona_components.Motivations
          ),
          details: detailsInput,
          paid: userIsSubscribed,
        }
      : detailsInput;

    setPersonaString(JSON.stringify(results));
  }, [selectedPersonas, detailsInput, userIsSubscribed]);

  useEffect(() => {
    if (user.user) {
      const checkSubscription = async () => {
        const userIsSubscribed = await api.stripe.isSubscriptionActive(
          user.user?.user_id as string
        );
        posthog.identify(user.user?.user_id, {
          email: user.user?.emails[0].email,
          subscriptionType: userIsSubscribed ? "paid" : "free",
          userSignupDate: user.user?.created_at,
        });
        setUserIsSubscribed(
          userIsSubscribed.status === "active" ||
            userIsSubscribed.status === "trialing"
        );
      };
      checkSubscription();
    }
  }, [posthog, user.user]);

  return (
    <section className="flex-1">
      <div className="flex flex-col items-center h-full w-full">
        <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
          Topical Authority Builder
        </h1>
        <h2 className="text-center mt-4 text-xs text-slate-400 mb-10">
          Topical Authority boosts your SEO by showing Google that you are an
          expert in your field. <br></br>Use our tool to find the best topics to
          write about for your personas.
        </h2>

        <TopicalAuthorityMap />
      </div>
    </section>
  );
}
