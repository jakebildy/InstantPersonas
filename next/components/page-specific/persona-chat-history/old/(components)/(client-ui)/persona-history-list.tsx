"use client";
import PersonaHistoryCardList from "./persona-history-card-list";
import Image from "next/image";
import Link from "next/link";
import { PersonaHistoryListSkeleton } from "../(server-ui)/persona-history-list-skeleton";
import { AnimatePresence, motion } from "framer-motion";

import { usePersonaChatHistory } from "@/components/context/persona/history-context";
import PersonaAdoptionStageAndSatisfactionCorrelationAnalysisSurveyPopup from "@/components/popups/feedback-survey/persona-adoption-stage-and-satisfaction-correlation-analysis-survey";
import { useShowFeedback } from "@/components/popups/feedback-survey/useShowFeedback";

export function PersonaHistoryList({}: {}) {
  const { history, loading } = usePersonaChatHistory();

  const [showUserFeedbackDialog, setShowUserFeedbackDialog] = useShowFeedback();

  return (
    <section>
      <AnimatePresence mode="wait">
        {history && history.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="history-personas-list"
          >
            <PersonaHistoryCardList personachats={history} />
          </motion.div>
        ) : loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="history-personas-skeleton"
          >
            <PersonaHistoryListSkeleton />
          </motion.div>
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
      </AnimatePresence>
      <PersonaAdoptionStageAndSatisfactionCorrelationAnalysisSurveyPopup
        openFeedbackPopup={showUserFeedbackDialog}
        setOpenFeedbackPopup={setShowUserFeedbackDialog}
      />
    </section>
  );
}
