"use client";
import { GuestPostFinderTool } from "@/components/toolfolio/guest-post-finder";
import { useState } from "react";

export default function GuestPostOpportunityFinder({}: {}) {
  const [personaString, setPersonaString] = useState<string>("");

  return (
    <section>
      <div className="flex flex-col items-center h-full w-full">
        <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
          Guest Post Opportunity Finder
        </h1>
        <h2 className="text-center mt-4 text-xs text-slate-400 mb-16">
          Writing Guest Posts is a great way to build backlinks and authority.
          <br />
          Find the best opportunities for your niche here.
        </h2>

        <div className="flex flex-col items-center w-full mb-10">
          <label className="text-sm text-gray-700">Enter your persona:</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md w-1/2 p-2"
            placeholder="e.g. a marketing manager"
            onChange={(e) => {
              setPersonaString(e.target.value);
            }}
            value={personaString}
          />
        </div>
        <GuestPostFinderTool persona={personaString} />
      </div>
    </section>
  );
}
