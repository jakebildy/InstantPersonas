"use client";

import { RecentPersonasList } from "./recent-personas-list";
import { RecentPersonasSkeleton } from "../(server-ui)/recent-personas-skeleton";
import { AnimatePresence, motion } from "framer-motion";
import { usePersonaChatHistory } from "@/components/context/persona/history-context";

export function RecentPersonas({}: {}) {
  const { history, loading } = usePersonaChatHistory();

  return (
    <div>
      <h1 className="pt-10 text-center text-3xl font-bold text-gray-700">
        {history && history.length > 0 ? "Recent Personas" : "History"}
      </h1>
      <AnimatePresence mode="wait">
        {history && history.length > 0 ? (
          <motion.div
            className="mt-20 flex w-full flex-row items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="recent-personas-list"
          >
            <RecentPersonasList personachats={history} />
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
