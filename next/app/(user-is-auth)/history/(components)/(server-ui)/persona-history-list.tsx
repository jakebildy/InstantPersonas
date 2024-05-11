"use client";

import api from "@/service/api.service";
import PersonaHistoryCardList from "../(client-ui)/persona-history-card-list";
import Image from "next/image";
import { useStytchUser } from "@stytch/nextjs";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";
import { PersonaChat } from "@/app/(server)/models/personachat.model";
import { set } from "lodash";
import { PersonaHistoryListSkeleton } from "./persona-history-list-skeleton";
import { AnimatePresence, motion } from "framer-motion";
import { usePostHog } from "posthog-js/react";
import FeedbackPopup from "@/components/popups/feedback-popup";
import { LOCAL_STORAGE_CONFIG } from "@/lib/config/localstorage";

export function PersonaHistoryList({}: {}) {
  const user = useStytchUser();
  const [personachats, setPersonachats] = useState<PersonaChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUserFeedbackDialog, setShowUserFeedbackDialog] = useState(false);
  const posthog = usePostHog();

  useEffect(() => {
    if (user.user) {
      api.userPersona.getPersonaHistory(user.user.user_id).then((data) => {
        setPersonachats(data);
        setLoading(false);
      });

      const checkSubscription = async () => {
        const userIsSubscribed = await api.stripe.isSubscriptionActive(
          user.user?.user_id as string
        );
        posthog.identify(user.user?.user_id, {
          email: user.user?.emails[0].email,
          subscriptionType: userIsSubscribed ? "paid" : "free",
          userSignupDate: user.user?.created_at,
        });
      };
      checkSubscription();

      const checkAndShowFeedbackDialog = () => {
        if (!user.user) return; // Ensure there is a user object

        const currentDate = new Date();

        // Function to get the date x days ago without mutating currentDate
        const daysAgoInTime = (days: number) => {
          let pastDate = new Date(currentDate.getTime());
          pastDate.setDate(pastDate.getDate() - days);
          return pastDate;
        };

        // Check if user has generated more than 1 persona
        const personasGenerated = personachats.length;
        const personasGeneratedWithinThreshold = personasGenerated >= 1;

        // Check if the feedback dialog has been shown within the last day
        const feedbackShownDate = localStorage.getItem(
          LOCAL_STORAGE_CONFIG.feedback.shown
        );
        const feedbackNotRecentlyShown = feedbackShownDate
          ? new Date(feedbackShownDate) < daysAgoInTime(1)
          : true;

        // Check if feedback has been completed within the last 60 days
        const feedbackCompletedDate = localStorage.getItem(
          LOCAL_STORAGE_CONFIG.feedback.completed
        );
        const feedbackNotRecentlyCompleted = feedbackCompletedDate
          ? new Date(feedbackCompletedDate) < daysAgoInTime(60)
          : true;

        // Logic to show the feedback dialog (starting at new user)
        // ------------------------------
        // If user has used the app (generated at least 1 persona), show the feedback dialog
        // If user has seen the feedback dialog but clicked off it (didn't want to complete), don't show it again for 1 day (to prevent spamming the user and to get non spam / annoyed feedback)
        // If user has completed the feedback dialog, don't show it again for 60 days

        const showFeedback =
          (personasGeneratedWithinThreshold && feedbackNotRecentlyShown) ||
          feedbackNotRecentlyCompleted;

        if (showFeedback) {
          setShowUserFeedbackDialog(true);
          // Set / Update the date the feedback dialog was shown
          const currentDateFormatted = new Date().toISOString().slice(0, 10); // Format as 'YYYY-MM-DD'
          localStorage.setItem(
            LOCAL_STORAGE_CONFIG.feedback.shown,
            currentDateFormatted
          );
        }
      };

      checkAndShowFeedbackDialog();
    }
  }, [personachats.length, posthog, user.user]);

  return (
    <section>
      <AnimatePresence mode="wait">
        {personachats && personachats.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="history-personas-list"
          >
            <PersonaHistoryCardList personachats={personachats} />
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
          </motion.div>
        )}
      </AnimatePresence>
      <FeedbackPopup
        openFeedbackPopup={showUserFeedbackDialog}
        setOpenFeedbackPopup={setShowUserFeedbackDialog}
      />
    </section>
  );
}
