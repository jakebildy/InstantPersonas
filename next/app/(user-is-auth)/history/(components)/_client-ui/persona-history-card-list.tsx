"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PersonaHistoryCard } from "./persona-history-card";
import { PersonaHistory } from "@/service/api.service";

export default function PersonaHistoryCardList({
  personas,
}: {
  personas: PersonaHistory[];
}) {
  return (
    <AnimatePresence>
      <div className="flex flex-col gap-2 px-2 pb-10">
        {personas
          .filter((persona) => persona.persona !== undefined)
          .reverse()
          .map((persona, i) => (
            <motion.div
              key={persona._id}
              initial={{
                opacity: 0,
                y: -50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -50,
              }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <PersonaHistoryCard {...persona} />
            </motion.div>
          ))}
      </div>
    </AnimatePresence>
  );
}
