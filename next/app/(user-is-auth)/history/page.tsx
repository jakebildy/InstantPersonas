"use client";

import { PersonaHistoryList } from "./(components)/(client-ui)/persona-history-list";
import { RecentPersonas } from "./(components)/(client-ui)/recent-personas";

export default function HistoryPage({}: {}) {
  return (
    <main>
      <RecentPersonas />
      <div className="mt-10">
        <PersonaHistoryList />
      </div>
    </main>
  );
}
