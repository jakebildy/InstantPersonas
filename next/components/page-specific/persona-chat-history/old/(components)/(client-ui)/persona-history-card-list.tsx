"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PersonaHistoryCard } from "./persona-history-card";
import { PersonaChatType } from "@/app/(server)/models/personachat.model";
import { convertPersonaChatsToPersonaWithIDs } from "@/app/(server)/models/persona_with_id.model";
import Image from "next/image";
import Link from "next/link";

export default function PersonaHistoryCardList({
  personachats,
}: {
  personachats: PersonaChatType[];
}) {
  const personas = convertPersonaChatsToPersonaWithIDs(personachats);

  return (
    <AnimatePresence>
      <div className="flex flex-col gap-2 px-2 pb-10">
        {personas.length > 0 ? (
          personas
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
            ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="history-personas-empty"
            className="grid place-items-center"
          >
            <div className="text-center">
              <Image
                src={"/analytics.gif"}
                alt="Create your first persona"
                height={300}
                width={300}
                className="m-10 mx-auto max-w-4xl rounded-md bg-white p-8 shadow-sm"
              />
              <p className="w-350 mb-5 text-sm font-bold text-gray-500">
                No history yet. Create your first persona to get started.
              </p>
              <Link
                className="w-350 rounded bg-green-500 px-3 py-2 text-sm font-bold text-white transition-all duration-200 ease-in-out hover:bg-green-400"
                href="/persona"
              >
                Create my first persona
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
