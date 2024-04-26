"use client";

import api from "@/service/api.service";
import PersonaHistoryCardList from "../(client-ui)/persona-history-card-list";
import Image from "next/image";
import { useStytchUser } from "@stytch/nextjs";
import Link from "next/link";

export async function PersonaHistoryList({}: {}) {
  const user = useStytchUser();
  const personachats = await api.userPersona.getPersonaHistory(
    user.user?.user_id
  );
  return (
    <section>
      {personachats && personachats.length > 0 ? (
        <PersonaHistoryCardList personachats={personachats} />
      ) : (
        <div className="grid place-items-center">
          <div className="text-center ">
            <Image
              src={"/analytics.gif"}
              alt="Create your first persona"
              height={300}
              width={300}
              className="mx-auto bg-white p-8 rounded-md max-w-4xl shadow-sm m-10"
            />
            <p className="text-gray-500 font-bold text-sm w-350 mb-5">
              No history yet. Create your first persona to get started.
            </p>
            <Link
              className="text-white py-2 px-3 bg-green-500 rounded font-bold text-sm w-350 hover:bg-green-400  transition-all duration-200 ease-in-out"
              href="/persona"
            >
              Create my first persona
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
