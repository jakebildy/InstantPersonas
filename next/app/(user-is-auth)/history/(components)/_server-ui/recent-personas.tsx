"use server";

import api from "@/service/api.service";
import { RecentPersonasList } from "../_client-ui/recent-personas-list";

export async function RecentPersonas() {
  const personas = await api.userPersona.getPersonaHistory();
  return (
    <div>
      <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
        {personas && personas.length > 0 ? "Recent Personas" : "History"}
      </h1>
      {personas && personas.length > 0 ? (
        <div className="flex flex-row items-center justify-center mt-20 w-full">
          <RecentPersonasList personas={personas} />
        </div>
      ) : null}
    </div>
  );
}
