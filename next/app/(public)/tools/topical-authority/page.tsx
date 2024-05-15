"use server";
import { Suspense } from "react";

export default async function HistoryPage({}: {}) {
  return (
    <section className="flex-1">
      <div className="flex flex-col items-center h-full w-full">
        <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
          Topical Authority Builder
        </h1>
        <h2 className="text-center mt-4 text-xs text-slate-400">
          Topical Authority boosts your SEO by showing Google that you are an
          expert in your field. <br></br>Use our tool to find the best topics to
          write about for your personas.
        </h2>
      </div>
    </section>
  );
}
