"use client";
import { PersonaSelectFromHistorySidebar } from "@/components/toolfolio/selected-personas/select-from-sidebar/persona-select-from-history-sidebar";
import { SelectArchetypeWidget } from "@/components/toolfolio/selected-personas/select-from-sidebar/select-archetype-widget";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import * as TopicalAuthorityDemoGif from "@/public/tools/persona-select-demo.gif";
import Image from "next/image";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";
import { InstagramHashtagFinderTool } from "@/components/toolfolio/instagram-hashtag-finder";
import { PersonaBusinessArchetype } from "@/components/toolfolio/selected-personas/types";
import { usePersonaChatHistory } from "@/components/context/persona/history-context";

export const maxDuration = 300; // 5 minutes

export default function InstagramHashtagFinder({}: {}) {
  const [personaString, setPersonaString] = useState<string>("");
  const [detailsInput, setDetailsInput] = useState<string>("");
  const { selectedPersonas, setSelectedPersonas } = usePersonaChatHistory();
  const { isSubscribed, isLoggedIn } = useInstantPersonasUser();

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
    <section className="flex-1">
      {!isSubscribed ? (
        <div>
          <title>Instagram Hashtag Finder | Free & Niche-Specific</title>
          <meta
            name="description"
            content="Quickly find Instagram hashtags and their volume. No signup required. Don't miss out on these hashtags!"
          />
        </div>
      ) : (
        <div />
      )}
      <div className="flex h-full w-full flex-col items-center">
        <h1 className="pt-10 text-center text-5xl font-bold text-gray-700">
          Find the Best<br></br>{" "}
          <b className="inline-block bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 bg-clip-text leading-relaxed text-transparent">
            Instagram Hashtags
          </b>
        </h1>
        <h2 className="mb-10 mt-4 text-center text-xs text-slate-400">
          Discover hashtags and their search volume for your target audience
        </h2>
        <div className="mb-10 flex w-full flex-col items-center gap-2">
          {isSubscribed ? (
            <PersonaSelectFromHistorySidebar className="right-4 top-4 z-50 xl:absolute" />
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
        <InstagramHashtagFinderTool
          input={personaString}
          isSubscribed={isSubscribed}
          isLoggedIn={isLoggedIn}
          noInput={selectedPersonas.length === 0 && detailsInput === ""}
        />
      </div>
    </section>
  );
}
