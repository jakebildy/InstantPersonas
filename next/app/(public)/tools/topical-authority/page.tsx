"use client";
import { PersonaArchetype } from "@/components/page-specific/generative-ui/persona-avatar-popover";
import { PersonaSelectFromHistorySidebar } from "@/components/toolfolio/selected-personas/select-from-sidebar/persona-select-from-history-sidebar";
import { SelectArchetypeWidget } from "@/components/toolfolio/selected-personas/select-from-sidebar/select-archetype-widget";
import { TopicalAuthorityMap } from "@/components/toolfolio/topical-authority-map/topical-authority-map";
import { cn } from "@/lib/utils";
import api from "@/service/api.service";
import { useStytchUser } from "@stytch/nextjs";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";
import * as TopicalAuthorityDemoGif from "@/public/tools/topical-authority-demo.gif";
import Image from "next/image";

export const runtime = "edge";
export const maxDuration = 300; // 5 minutes

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
      <div className="flex flex-col items-center h-full w-full bg-gray-100">
        <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
          Topical Authority Builder
        </h1>
        <h2 className="text-center mt-4 text-xs text-slate-400 mb-10">
          Topical Authority boosts your SEO by showing Google that you are an
          expert in your field. <br></br>Use our tool to find the best topics to
          write about for your personas.
        </h2>

        <div className="flex flex-col items-center w-full mb-10 gap-2">
          {userIsSubscribed ? (
            <PersonaSelectFromHistorySidebar
              selectedPersonas={selectedPersonas}
              setSelectedPersonas={setSelectedPersonas}
              className="xl:absolute top-4 right-4 z-50"
            />
          ) : null}
          {userIsSubscribed ? (
            <section
              className={cn(
                "border border-gray-300 rounded-md  bg-white p-2 flex flex-col gap-2",
                selectedPersonas.length > 0 ? "w-1/2" : ""
              )}
            >
              {selectedPersonas.length > 0 ? (
                selectedPersonas.map((persona, i) => (
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
                ))
              ) : (
                <div className="rounded-md overflow-hidden h-full w-full grid place-items-center">
                  <Image
                    src={TopicalAuthorityDemoGif}
                    alt={
                      "Select Personas or Enter Details to Generate Guest Posts"
                    }
                    width={800}
                    height={600}
                  />
                </div>
              )}
            </section>
          ) : null}
          <label className="text-sm text-gray-700 my-2">
            {userIsSubscribed
              ? "Enter any extra details"
              : "Describe your customer persona:"}
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
        <TopicalAuthorityMap
          userIsSubscribed={userIsSubscribed}
          personaString={personaString}
          noInput={selectedPersonas.length === 0 && detailsInput === ""}
        />
      </div>
    </section>
  );
}
