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
