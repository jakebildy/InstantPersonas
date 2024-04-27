"use client";

import api from "@/service/api.service";
import { RecentPersonasList } from "../(client-ui)/recent-personas-list";
import { useStytchUser } from "@stytch/nextjs";
import { useEffect, useState } from "react";
import { RecentPersonasSkeleton } from "./recent-personas-skeleton";

export function RecentPersonas({}: {}) {
  const user = useStytchUser();
  const [personachats, setPersonachats] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.user) {
      api.userPersona.getPersonaHistory(user.user.user_id).then((data) => {
        setPersonachats(data);
      });
      setLoading(false);
    }
  }, [user.user]);

  return (
    <div>
      <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
        {personachats && personachats.length > 0
          ? "Recent Personas"
          : "History"}
      </h1>
      {personachats && personachats.length > 0 ? (
        <div className="flex flex-row items-center justify-center mt-20 w-full">
          <RecentPersonasList personachats={personachats} />
        </div>
      ) : loading ? (
        <RecentPersonasSkeleton />
      ) : null}
    </div>
  );
}
