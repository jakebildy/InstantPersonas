"use client";
import { GuestPostFinderTool } from "@/components/toolfolio/guest-post-finder";
import { PersonaSelectFromHistorySidebar } from "@/components/toolfolio/selected-personas/select-from-sidebar/persona-select-from-history-sidebar";
import { SelectArchetypeWidget } from "@/components/toolfolio/selected-personas/select-from-sidebar/select-archetype-widget";
import { useEffect, useState } from "react";
import * as SelectPersonaDemoGif from "@/public/tools/persona-select-demo.gif";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";
import { PersonaBusinessArchetype } from "@/components/toolfolio/selected-personas/types";
import { usePersonaChatHistory } from "@/components/context/persona/history-context";
import { BLOG_POSTS } from "@/lib/config/blog";
import { ArticleCard } from "@/components/page-specific/blog/article-card";

export default function GuestPostOpportunityFinder({}: {}) {
  const { selectedPersonas, setSelectedPersonas } = usePersonaChatHistory();
  const [personaString, setPersonaString] = useState<string>("");
  const [detailsInput, setDetailsInput] = useState<string>("");
  const { isSubscribed } = useInstantPersonasUser();

  useEffect(() => {
    const results = isSubscribed
      ? {
          personas: selectedPersonas.map(
            ({ pictureURL, ...rest }) => rest,
          ) as Omit<PersonaBusinessArchetype, "pictureURL">[],
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
          <title>Site Finder for Guest Posts | Free & Niche-Specific</title>
          <meta
            name="description"
            content="Instantly find niche sites to pitch your guest posts to. No signup required. Supercharge your SEO efforts."
          />
        </div>
      ) : (
        <div />
      )}
      <div className="flex h-full w-full flex-col items-center">
        <h1 className="pt-10 text-center text-3xl font-bold text-gray-700">
          Guest Post Opportunity Finder
        </h1>
        <h2 className="mb-16 mt-4 text-center text-xs text-slate-400">
          Writing Guest Posts is a great way to build backlinks and authority.
          <br />
          Find the best opportunities for your niche here.
        </h2>

        <div className="mb-10 flex w-full flex-col items-center gap-2">
          {isSubscribed ? (
            <PersonaSelectFromHistorySidebar className="right-4 top-4 z-[50] xl:absolute" />
          ) : null}
          {isSubscribed ? (
            <section
              className={cn(
                "flex flex-col gap-2 rounded-md border border-gray-300 bg-white p-2",
                selectedPersonas.length > 0 ? "w-1/2" : "",
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
                          (activePersona) => activePersona !== persona,
                        ),
                      );
                    }}
                  />
                ))
              ) : (
                <div className="grid h-full w-full place-items-center overflow-hidden rounded-md">
                  <Image
                    src={SelectPersonaDemoGif}
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
          <label className="my-2 text-sm text-gray-700">
            {isSubscribed
              ? "Enter any extra details"
              : "Describe your customer persona:"}
          </label>
          <input
            type="text"
            className="w-1/2 rounded-md border border-gray-300 p-2"
            placeholder="e.g. a marketing manager"
            onChange={(e) => {
              setDetailsInput(e.target.value);
            }}
            value={detailsInput}
          />
        </div>
        <GuestPostFinderTool
          input={personaString}
          isSubscribed={isSubscribed}
          noInput={selectedPersonas.length === 0 && detailsInput === ""}
        />

        {!isSubscribed ? (
          <div className="my-20 flex flex-1 flex-col justify-end">
            <div className="text-center text-sm text-slate-400">
              Check out our comprehensive guide on Guest Posting to learn more:
              <br />
              <br />
            </div>
            <ArticleCard
              post={BLOG_POSTS[2]}
              key={BLOG_POSTS[2].slug}
              category={BLOG_POSTS[2].category}
              className={"max-w-[600px] lg:col-span-1"}
            />
          </div>
        ) : (
          <div />
        )}
      </div>
    </section>
  );
}
