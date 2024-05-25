"use client";
import { PersonaArchetype } from "@/components/page-specific/generative-ui/persona-avatar-popover";
import { GuestPostFinderTool } from "@/components/toolfolio/guest-post-finder";
import { PersonaSelectFromHistorySidebar } from "@/components/toolfolio/selected-personas/select-from-sidebar/persona-select-from-history-sidebar";
import { SelectArchetypeWidget } from "@/components/toolfolio/selected-personas/select-from-sidebar/select-archetype-widget";
import { useEffect, useState } from "react";
import { ArticleCard, BLOG_POSTS } from "../../blog/page";
import * as SelectPersonaDemoGif from "@/public/tools/persona-select-demo.gif";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";
import SocialShareTool from "@/components/toolfolio/share-preview-optimizer/social-share-tool";

export default function GuestPostOpportunityFinder({}: {}) {
  const [personaString, setPersonaString] = useState<string>("");
  const [detailsInput, setDetailsInput] = useState<string>("");
  const [selectedPersonas, setSelectedPersonas] = useState<PersonaArchetype[]>(
    []
  );
  const { isSubscribed } = useInstantPersonasUser();

  useEffect(() => {
    const results = isSubscribed
      ? {
          personas: selectedPersonas,
          details: detailsInput,
          paid: isSubscribed,
        }
      : detailsInput;

    setPersonaString(JSON.stringify(results));
  }, [selectedPersonas, detailsInput, isSubscribed]);

  return (
    <section className="flex-1 bg-gray-100">
      {!isSubscribed ? (
        <div>
          <title>
            Generated & Optimized Social Media Share | Free & Niche-Specific
          </title>
          <meta
            name="description"
            content="Instantly generate and optimize social media share previews. No signup required. Supercharge your social media efforts."
          />
        </div>
      ) : (
        <div />
      )}
      <div className="flex flex-col items-center h-full w-full">
        <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
          Social Media Share Preview Generator
        </h1>
        <h2 className="text-center mt-4 text-xs text-slate-400 mb-16">
          Generate and optimize social media share previews for your content.
          <br />
          Improve your click-through rates and engagement.
        </h2>

        <div className="flex flex-col items-center w-full mb-10 gap-2">
          {isSubscribed ? (
            <PersonaSelectFromHistorySidebar
              selectedPersonas={selectedPersonas}
              setSelectedPersonas={setSelectedPersonas}
              className="xl:absolute top-4 right-4 z-[100]"
            />
          ) : null}
          {isSubscribed ? (
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
                    src={SelectPersonaDemoGif}
                    alt={
                      "Select Personas or Enter Details to Optimize Social Media Share Previews"
                    }
                    width={800}
                    height={600}
                  />
                </div>
              )}
            </section>
          ) : null}
          <label className="text-sm text-gray-700 my-2">
            {isSubscribed
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
        <SocialShareTool
          input={personaString}
          isSubscribed={isSubscribed}
          noInput={selectedPersonas.length === 0 && detailsInput === ""}
        />

        {/* {!isSubscribed ? (
          <div className="my-20 flex-1 flex flex-col justify-end">
            <div className="text-center text-slate-400 text-sm">
              Check out our comprehensive guide on Guest Posting to learn more:
              <br />
              <br />
            </div>
            <ArticleCard
              post={BLOG_POSTS[2]}
              key={BLOG_POSTS[2].slug}
              category={BLOG_POSTS[2].category}
              className={"lg:col-span-1 max-w-[600px]"}
            />
          </div>
        ) : (
          <div />
        )} */}
      </div>
    </section>
  );
}
