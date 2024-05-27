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
import { HeadlineAnalyzerTool } from "@/components/toolfolio/headline-analyzer";

export default function GuestPostOpportunityFinder({}: {}) {
  const [personaString, setPersonaString] = useState<string>("");
  const [detailsInput, setDetailsInput] = useState<string>("");
  const [headlineString, setHeadlineString] = useState<string>("");
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
    <section className="flex-1">
      {!isSubscribed ? (
        <div>
          <title>Headline Analzyer to Boost SEO | Free & No Signup</title>
          <meta
            name="description"
            content="Instantly find niche sites to pitch your guest posts to. No signup required. Supercharge your SEO efforts."
          />
        </div>
      ) : (
        <div />
      )}
      <div className="flex flex-col items-center h-full w-full">
        <h1 className="text-5xl text-gray-700 text-center pt-10 font-bold">
          Headline Analyzer
        </h1>
        <h2 className="text-center mt-4 text-xs text-slate-400 mb-16">
          Write the best headlines for your blog posts and other pages on your
          site.
          <br></br>
          See SEO metrics and get suggestions for improvement.
        </h2>

        <div className="flex flex-col items-center w-full mb-10 gap-2">
          {isSubscribed ? (
            <PersonaSelectFromHistorySidebar
              selectedPersonas={selectedPersonas}
              setSelectedPersonas={setSelectedPersonas}
              className="xl:absolute top-4 right-4 z-[100]"
            />
          ) : null}
          <label className="text-sm text-gray-700 my-2">
            Enter your Headline:
          </label>
          <input
            type="text"
            className="border border-white rounded-md w-1/2 p-2 shadow-lg"
            placeholder="e.g. Top 10 Dog Tricks for Beginners"
            onChange={(e) => {
              setHeadlineString(e.target.value);
            }}
            value={headlineString}
          />
          {/* {isSubscribed ? (
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
                      "Select Personas or Enter Details to Generate Guest Posts"
                    }
                    width={800}
                    height={600}
                  />
                </div>
              )}
            </section>
          ) : null} */}
          {/* <label className="text-sm text-gray-700 my-2">
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
          /> */}
        </div>
        <HeadlineAnalyzerTool
          headline={headlineString}
          input={personaString}
          isSubscribed={isSubscribed}
          noInput={headlineString === ""}
        />
      </div>
    </section>
  );
}
