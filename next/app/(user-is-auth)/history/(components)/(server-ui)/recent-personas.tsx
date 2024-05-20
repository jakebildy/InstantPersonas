"use client";

import api from "@/service/api.service";
import { RecentPersonasList } from "../(client-ui)/recent-personas-list";
import { useEffect, useState } from "react";
import { RecentPersonasSkeleton } from "./recent-personas-skeleton";
import { AnimatePresence, motion } from "framer-motion";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";

export function RecentPersonas({}: {}) {
  const { user, isLoggedIn } = useInstantPersonasUser();
  const [personachats, setPersonachats] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      api.userPersona.getPersonaHistory(user.id).then((data) => {
        setPersonachats(data);
        setLoading(false);
      });
    }
  }, [isLoggedIn, user]);

  return (
    <div>
      <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
        {personachats && personachats.length > 0
          ? "Recent Personas"
          : "History"}
      </h1>
      <AnimatePresence mode="wait">
        {personachats && personachats.length > 0 ? (
          <motion.div
            className="flex flex-row items-center justify-center mt-20 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="recent-personas-list"
          >
            <RecentPersonasList personachats={personachats} />
          </motion.div>
        ) : loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="recent-personas-skeleton"
          >
            <RecentPersonasSkeleton />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
