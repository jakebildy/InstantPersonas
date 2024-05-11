"use server";
import { Suspense } from "react";

export default async function GuestPostOpportunityFinder({}: {}) {
  return (
    <main>
      <div className="flex flex-col items-center h-screen w-full">
        <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
          Guest Post Opportunity Finder
        </h1>
        <h2 className="text-center mt-4 text-xs text-slate-400">
          Writing Guest Posts is a great way to build backlinks and authority.
          <br />
          Find the best opportunities for your niche here.
        </h2>
      </div>
    </main>
  );
}
