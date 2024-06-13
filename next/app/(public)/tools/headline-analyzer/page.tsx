"use client";
import { useEffect, useState } from "react";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";
import { HeadlineAnalyzerTool } from "@/components/toolfolio/headline-analyzer";
import { usePersonaChatHistory } from "@/components/context/persona/history-context";

export default function GuestPostOpportunityFinder({}: {}) {
  const [personaString, setPersonaString] = useState<string>("");
  const [detailsInput, setDetailsInput] = useState<string>("");
  const [headlineString, setHeadlineString] = useState<string>("");
  const { selectedPersonas, setSelectedPersonas } = usePersonaChatHistory();
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
          <title>Free Headline Analyzer | No Signup, Boost SEO Fast</title>
          <meta
            name="description"
            content="See how difficult it is to rank for your headline and more. Don't miss out on these insights to boost your SEO!"
          />
        </div>
      ) : (
        <div />
      )}
      <div className="flex h-full w-full flex-col items-center">
        <h1 className="pt-10 text-center text-5xl font-bold text-gray-700">
          Headline Analyzer
        </h1>
        <h2 className="mb-16 mt-4 text-center text-xs text-slate-400">
          Write the best headlines for your blog posts and other pages on your
          site.
          <br></br>
          See SEO metrics and get suggestions for improvement.
        </h2>

        <div className="mb-10 flex w-full flex-col items-center gap-2">
          {/* {isSubscribed ? (
            <PersonaSelectFromHistorySidebar
              selectedPersonas={selectedPersonas}
              setSelectedPersonas={setSelectedPersonas}
              className="xl:absolute top-4 right-4 z-[100]"
            />
          ) : null} */}
          <label className="my-2 text-sm text-gray-700">
            Enter your Headline:
          </label>
          <input
            type="text"
            className="w-1/2 rounded-md border border-white p-2 shadow-lg"
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
          isPopup={false}
          headline={headlineString}
          input={personaString}
          isSubscribed={isSubscribed}
          noInput={headlineString === ""}
        />
      </div>
    </section>
  );
}
