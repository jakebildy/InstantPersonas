"use client";
import { GuestPostFinderTool } from "@/components/toolfolio/guest-post-finder";
import { PersonaSelectFromHistorySidebar } from "@/components/toolfolio/selected-personas/select-from-sidebar/persona-select-from-history-sidebar";
import { SelectArchetypeWidget } from "@/components/toolfolio/selected-personas/select-from-sidebar/select-archetype-widget";
import { use, useEffect, useState } from "react";
import * as SelectPersonaDemoGif from "@/public/tools/persona-select-demo.gif";
import Image from "next/image";
import { cn, isValidUrl } from "@/lib/utils";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";
import { PersonaBusinessArchetype } from "@/components/toolfolio/selected-personas/types";
import { usePersonaChatHistory } from "@/components/context/persona/history-context";
import { BLOG_POSTS } from "@/lib/config/blog";
import { ArticleCard } from "@/components/page-specific/blog/article-card";
import { IconSearch } from "@tabler/icons-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PersonaAvatarPopover } from "@/components/persona-archetype-generic/persona-avatar-popover";
import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
import { ActivePersonas } from "@/app/(public)/tools/editor/ActivePersonas";
import NextImage from "next/image";
import api from "@/service/api.service";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";

export default function PersonaInsightsPage({}: {}) {
  const { selectedPersonas, setSelectedPersonas } = usePersonaChatHistory();
  const [personaString, setPersonaString] = useState<string>("");
  const [detailsInput, setDetailsInput] = useState<string>("");
  const { isSubscribed } = useInstantPersonasUser();

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [isValidWebsite, setIsValidWebsite] = useState(false);

  useEffect(() => {
    if (isValidUrl(detailsInput)) {
      setIsValidWebsite(true);
    } else {
      setIsValidWebsite(false);
    }
  }, [detailsInput]);

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

  const [personaThoughts, setPersonaThoughts] = useState<
    {
      personaInterested: string;
      // searchIntent: string;
      thought: string;
      action: string;
      persona: PersonaBusinessArchetype;
    }[]
  >([]);

  return (
    <section className="h-screen flex-1 bg-gray-100">
      <div className="flex h-full w-full flex-col items-center">
        <h1 className="pt-10 text-center text-3xl font-bold text-gray-700">
          Persona Insights
        </h1>
        <h2 className="mb-16 mt-4 text-center text-xs text-slate-400">
          Select personas, paste in a link, and see their thoughts and
          objections
        </h2>
        {isSubscribed ? (
          <PersonaSelectFromHistorySidebar className="absolute right-4 top-4 z-[50]" />
        ) : null}
        <div className="absolute right-1 top-[8.5rem] mb-10 mr-14 flex w-full flex-col items-center gap-2 font-jost md:right-20 lg:right-1">
          <div className="w-1/2 rounded-md border border-gray-300 bg-white shadow-md">
            <span className="flex flex-row">
              <IconSearch className="ml-2 mt-2 text-gray-400" />
              {detailsInput !== "" && (
                <span className="p-2 pr-0">https://</span>
              )}
              <input
                type="text"
                className="mr-2 w-full pb-2 pr-2 pt-2 outline-none"
                placeholder="  Enter any URL..."
                onChange={(e) => {
                  // if https:// is included, remove it
                  if (e.target.value.includes("https://")) {
                    setDetailsInput(e.target.value.slice(8));
                  } else {
                    setDetailsInput(e.target.value);
                  }
                }}
                value={detailsInput}
              />
            </span>

            {detailsInput != "" ? (
              <div className="h-0.5 w-full bg-gray-100" />
            ) : (
              <div />
            )}
            {detailsInput != "" ? (
              <div className="p-2">
                <button
                  onClick={() => {
                    if (
                      isValidWebsite &&
                      selectedPersonas.length >= 0 &&
                      !isAnalyzing
                    ) {
                      setIsAnalyzing(true);
                      api.tools
                        //TODO: this should also scrape the site (using Apify most likely). also move to separate function
                        .generatePersonaThoughtsFromURL(
                          "https://" + detailsInput,
                          personaString,
                        )
                        .then((response) => {
                          // thoughts are returned like this: PersonaName:Thought•PersonaName2:Thought
                          const thoughts =
                            response.response.thoughtsAndActions.split("•");
                          const personaThoughts = thoughts.map(
                            (thought: string) => {
                              const [personaName, thoughtText] =
                                thought.split(":");
                              const persona = selectedPersonas.find(
                                (persona) =>
                                  persona.archetype_name === personaName,
                              );
                              // const searchIntent =
                              //   response.response.searchIntents
                              //     .split("•")
                              //     .find(
                              //       (intent: string) =>
                              //         intent.split(":")[0].trimStart() ===
                              //         personaName,
                              //     )
                              //     ?.split(":")[1] ?? "";

                              const personaInterested =
                                response.response.personasInterested
                                  .split("•")
                                  .find(
                                    (intent: string) =>
                                      intent.split(":")[0].trimStart() ===
                                      personaName,
                                  )
                                  ?.split(":")[1] ?? " it doesn't interest me";

                              return {
                                personaInterested: personaInterested,
                                // searchIntent: searchIntent,
                                thought: thoughtText.split("|")[0],
                                action: thoughtText.split("|")[1],
                                persona: persona!,
                              };
                            },
                          );

                          // filter out undefined personas
                          setPersonaThoughts(
                            personaThoughts.filter(
                              (thought: {
                                thought: string;
                                action: string;
                                persona: PersonaBusinessArchetype;
                              }) => thought.persona,
                            ),
                          );

                          setIsAnalyzing(false);
                        });
                    }
                  }}
                  className={
                    !isValidWebsite || selectedPersonas.length === 0
                      ? "w-full rounded-sm bg-gray-100 p-5 text-left text-black"
                      : isAnalyzing
                        ? "w-full cursor-wait rounded-sm bg-gray-100 p-5 text-left text-black"
                        : "w-full rounded-sm bg-green-600 p-5 text-left text-white hover:bg-green-500"
                  }
                >
                  {isAnalyzing && (
                    <div className="loading-animation2 z-1 absolute left-[25.5vw] top-[3.2rem] w-[45%] rounded-sm bg-green-200 p-5 text-left text-white"></div>
                  )}
                  <div className="z-2 absolute right-[27vw] top-[3.6rem] flex w-[45%] flex-row justify-between">
                    <div className="flex flex-row">
                      <IconSearch
                        className={
                          !isValidWebsite ||
                          selectedPersonas.length === 0 ||
                          isAnalyzing
                            ? "mr-2 h-5 w-5 text-black"
                            : "mr-2 h-5 w-5 text-white"
                        }
                      />
                      {detailsInput}
                    </div>
                    <div className="flex flex-row font-jost">
                      {!isValidWebsite
                        ? "Enter Valid URL"
                        : selectedPersonas.length === 0
                          ? "Select Personas"
                          : isAnalyzing
                            ? "Analyzing..."
                            : "Get Insights"}
                      {isValidWebsite && (
                        <div className="ml-2 h-6 w-6 rounded-md bg-white pl-1 text-green-600">
                          →
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <span />
            )}
            {/* 
            <br></br>
            <button className="ml-10 p-2 text-gray-500">previous link</button> */}
          </div>
          {personaThoughts.length > 0 && (
            <div className="w-1/2 rounded-md border border-gray-300 bg-white p-2 text-gray-400">
              Personas can give different outputs each time! As personas
              represent a group of people, they may have a variety of thoughts
              and actions based on the same content.
            </div>
          )}
          {/* <GuestPostFinderTool
            input={personaString}
            isSubscribed={isSubscribed}
            noInput={selectedPersonas.length === 0 && detailsInput === ""}
          /> */}
        </div>
      </div>

      <div className="fixed right-2 top-10 ml-[20px] mt-24 h-full w-[340px] rounded-md border border-gray-300 bg-white p-2">
        <ActivePersonas selectedPersonas={selectedPersonas} />

        {/* Persona Thoughts */}
        <div className="h-fit rounded-md border-2 border-slate-300 bg-white">
          <ScrollArea className="z-50 order-1 h-[calc(85vh-136px)] w-full overflow-hidden rounded-md bg-white p-2 text-xs text-black/70 transition-all duration-200 ease-out peer-hover:opacity-25 lg:max-w-none">
            {personaThoughts.length === 0 ? (
              <div className="flex flex-row">
                <div className="mr-2 flex h-8 w-8 items-center">
                  <NextImage
                    src={"/instant_personas_logo.png"}
                    alt={"Instant Personas Logo"}
                    width={32}
                    height={32}
                    priority
                    className={cn("min-w-8 object-contain")}
                  />
                </div>
                <div className="flex items-center whitespace-pre-wrap rounded-lg bg-gray-200 p-2 px-4 text-sm">
                  Select some personas, and you will see their thoughts here
                  when you paste in a link.
                </div>
              </div>
            ) : (
              personaThoughts.map((thought, i) => (
                <div key={i}>
                  <div className="flex flex-row p-2">
                    {selectedPersonas.length > 0 ? (
                      <div
                        className={
                          thought.personaInterested.trim() !== "YES"
                            ? "opacity-50"
                            : ""
                        }
                      >
                        <PersonaAvatarPopover
                          allowManage={false}
                          {...{
                            archetype: thought.persona,
                            variant: mapUrlBackgroundColorParamToVariant({
                              url: thought.persona.pictureURL,
                            }),
                          }}
                          size={"sm"}
                        />
                        <div className="relative left-[40px] top-[-20px] text-lg">
                          {thought.personaInterested.trim() !== "YES"
                            ? "🚫"
                            : thought.thought.split("~")[0]}
                        </div>
                      </div>
                    ) : null}
                    {thought.personaInterested.trim() !== "YES" ? (
                      <div className="ml-2 mt-2 text-xs font-bold text-gray-400">
                        {thought.persona.archetype_name} may not be interested
                        in this based on the title and description on Google -{" "}
                        {thought.personaInterested}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center whitespace-pre-wrap px-2 text-sm">
                        {/* <div className="mb-2 flex flex-row text-xs font-bold text-gray-500">
                          🔍 {thought.searchIntent}
                        </div> */}
                        <div className="rounded-lg bg-gray-200 p-2">
                          {thought.thought.split("~")[1]}
                        </div>
                        <div className="mb-4 mt-2 text-xs font-bold text-green-500">
                          -&gt; {thought.persona.archetype_name}{" "}
                          {thought.action}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="h-[2px] w-full bg-gray-100" />
                </div>
              ))
            )}

            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>

        <div className="h-0.5 w-full bg-gray-100" />
      </div>
    </section>
  );
}
