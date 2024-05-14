"use client";
import { PersonaArchetype } from "@/components/page-specific/generative-ui/persona-avatar-popover";
import { GuestPostFinderTool } from "@/components/toolfolio/guest-post-finder";
import { PersonaSelectFromHistorySidebar } from "@/components/toolfolio/selected-personas/select-from-sidebar/persona-select-from-history-sidebar";
import { SelectArchetypeWidget } from "@/components/toolfolio/selected-personas/select-from-sidebar/select-archetype-widget";
import api from "@/service/api.service";
import { useStytchUser } from "@stytch/nextjs";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";

export default function GuestPostOpportunityFinder({}: {}) {
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
          personas: selectedPersonas,
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
        {userIsSubscribed ? (
          <PersonaSelectFromHistorySidebar
            selectedPersonas={selectedPersonas}
            setSelectedPersonas={setSelectedPersonas}
            className="absolute top-4 right-4"
          />
        ) : null}
        <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
          Guest Post Opportunity Finder
        </h1>
        <h2 className="text-center mt-4 text-xs text-slate-400 mb-16">
          Writing Guest Posts is a great way to build backlinks and authority.
          <br />
          Find the best opportunities for your niche here.
        </h2>

        <div className="flex flex-col items-center w-full mb-10">
          {userIsSubscribed ? (
            <section className="border border-gray-300 rounded-md w-1/2 min-h-[400px] bg-white p-2 flex flex-col gap-2">
              {selectedPersonas.map((persona, i) => (
                <SelectArchetypeWidget
                  key={i}
                  archetype={persona}
                  isSelected={true}
                  onSelect={() => {
                    setSelectedPersonas((prevSelectedPersonas) => [
                      ...prevSelectedPersonas,
                      persona,
                    ]);
                  }}
                  onDeselect={() => {
                    setSelectedPersonas((prevSelectedPersonas) =>
                      prevSelectedPersonas.filter(
                        (activePersona) => activePersona !== persona
                      )
                    );
                  }}
                />
              ))}
            </section>
          ) : null}
          <label className="text-sm text-gray-700 my-2">
            {userIsSubscribed
              ? "Enter any extra details"
              : "Enter your persona:"}
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-md w-1/2 p-2"
            placeholder="e.g. a marketing manager"
            onChange={(e) => {
              setDetailsInput(e.target.value);
            }}
            value={detailsInput}
          />
        </div>
        <GuestPostFinderTool
          input={personaString}
          isSubscribed={userIsSubscribed}
        />
      </div>
    </section>
  );
}
