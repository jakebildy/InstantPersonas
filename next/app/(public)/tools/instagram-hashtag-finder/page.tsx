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
            ({ pictureURL, ...rest }) => rest
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
      <div className="flex flex-col items-center h-full w-full ">
        {/* <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
          Instagram Hashtag Finder
        </h1> */}
        <h1 className="text-5xl text-gray-700 text-center pt-10 font-bold">
          Find the Best<br></br>{" "}
          <b className="bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 inline-block text-transparent bg-clip-text leading-relaxed">
            Instagram Hashtags
          </b>
        </h1>
        <h2 className="text-center mt-4 text-xs text-slate-400 mb-10">
          Discover hashtags and their search volume for your target audience
        </h2>
        <div className="flex flex-col items-center w-full mb-10 gap-2">
          {isSubscribed ? (
            <PersonaSelectFromHistorySidebar className="xl:absolute top-4 right-4 z-50" />
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
