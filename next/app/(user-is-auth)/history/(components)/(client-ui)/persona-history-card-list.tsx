"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PersonaHistoryCard } from "./persona-history-card";
import { PersonaChatType } from "@/app/(server)/models/personachat.model";
import { convertPersonaChatsToPersonaWithIDs } from "@/util/util";

export default function PersonaHistoryCardList({
  personachats,
}: {
  personachats: PersonaChatType[];
}) {
  const personas = convertPersonaChatsToPersonaWithIDs(personachats);

  return (
    <AnimatePresence>
      <div className="flex flex-col gap-2 px-2 pb-10">
        {personas
          .filter((persona) => persona.persona !== undefined)
          .reverse()
          //@ts-ignore
          .map((persona, i) => (
            <motion.div
              key={persona.id + i}
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
