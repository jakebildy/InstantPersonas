"use server";
import { Suspense } from "react";
import { RecentPersonasSkeleton } from "./(components)/(server-ui)/recent-personas-skeleton";
import { RecentPersonas } from "./(components)/(server-ui)/recent-personas";
import { PersonaHistoryListSkeleton } from "./(components)/(server-ui)/persona-history-list-skeleton";
import { PersonaHistoryList } from "./(components)/(server-ui)/persona-history-list";

export default async function HistoryPage({}: {}) {
  return (
    <main>
      <Suspense fallback={<RecentPersonasSkeleton />}>
        {/*! Typescript Error with async RSC - Reference:
        https://github.com/vercel/next.js/issues/42292#issuecomment-1298459024 */}
        <RecentPersonas />
      </Suspense>
      <div className="mt-10">
        <Suspense fallback={<PersonaHistoryListSkeleton />}>
          <PersonaHistoryList />
        </Suspense>
      </div>
    </main>
  );
}
