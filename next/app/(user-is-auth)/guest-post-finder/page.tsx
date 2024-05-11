"use server";
import { GuestPostFinderTool } from "@/components/toolfolio/guest-post-finder";
import { Suspense } from "react";

export default async function GuestPostOpportunityFinder({}: {}) {
  return (
    <main>
      <div className="flex flex-col items-center h-full w-full min-h-screen">
        <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
          Guest Post Opportunity Finder
        </h1>
        <h2 className="text-center mt-4 text-xs text-slate-400 mb-16">
          Writing Guest Posts is a great way to build backlinks and authority.
          <br />
          Find the best opportunities for your niche here.
        </h2>

        <GuestPostFinderTool persona={"a marketing manager"} />
      </div>
    </main>
  );
}
