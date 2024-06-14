"use client";
import { SelectArchetypeWidget } from "@/components/toolfolio/selected-personas/select-from-sidebar/select-archetype-widget";
import { useEffect, useState } from "react";
import { BLOG_POSTS } from "@/lib/config/blog";
import * as SelectPersonaDemoGif from "@/public/tools/persona-select-demo.gif";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";
import SocialShareTool from "@/components/toolfolio/share-preview-optimizer/social-share-tool";
import { SocialPreviewIntegrationShowcase } from "@/components/toolfolio/share-preview-optimizer/integration-showcase";
import { PersonaBusinessArchetype } from "@/components/toolfolio/selected-personas/types";
import { usePersonaChatHistory } from "@/components/context/persona/history-context";

export default function GuestPostOpportunityFinder({}: {}) {
  const [personaString, setPersonaString] = useState<string>("");
  const [detailsInput, setDetailsInput] = useState<string>("");
  const { selectedPersonas, setSelectedPersonas } = usePersonaChatHistory();
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
    <section className="flex-1">
      {!isSubscribed ? (
        <div>
          <title>Make the Best Social Media Share Previews | 100% Free</title>
          <meta
            name="description"
            content="Ensure your site is ready for sharing on LinkedIn, X, iMessage, Pinterest and more. No signup required. Supercharge your social media efforts."
          />
        </div>
      ) : (
        <div />
      )}
      <div className="flex h-full w-full flex-col items-center">
        <h1 className="pt-10 text-center text-5xl font-bold text-gray-700">
          <b className="text-green-600">Optimize</b> your<br></br>Social Media{" "}
          <b className="text-green-600">Share Previews</b>
        </h1>
        <h1 className="text-md mt-4 text-center">
          Ensure your site is ready for sharing on LinkedIn, X, iMessage,
          Pinterest and more.
        </h1>

        <div className="m-4 flex w-full flex-col items-center gap-2">
          <section
            className={cn(
              "flex flex-col gap-2 rounded-md border border-gray-300 bg-white p-2 transition-all duration-300",
              selectedPersonas.length > 0 ? "mt-10 w-1/2" : "",
            )}
          >
            {isSubscribed && selectedPersonas.length > 0 ? (
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
              <SocialToolPreview />
            )}
          </section>
        </div>

        <SocialShareTool
          input={personaString}
          detailsInput={detailsInput}
          setDetailsInput={setDetailsInput}
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

function SocialToolPreview() {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden rounded-md">
      <Image
        src={SelectPersonaDemoGif}
        alt={
          "Select Personas or Enter Details to Optimize Social Media Share Previews"
        }
        // className="rounded-lg overflow-hidden"
        width={800}
        height={600}
      />
      <div className="absolute left-1/2 top-1/2 grid size-full -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-lg bg-white/25 backdrop-blur-sm">
        <SocialPreviewIntegrationShowcase className="relative my-10 min-w-[500px]" />
      </div>
    </div>
  );
}
