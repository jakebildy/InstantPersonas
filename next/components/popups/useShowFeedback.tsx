import { LOCAL_STORAGE_CONFIG } from "@/lib/config/localstorage";
import { useEffect, useState } from "react";
import { usePersonaChatHistory } from "../context/persona/history-context";
import { useInstantPersonasUser } from "../context/auth/user-context";

export function useShowFeedback() {
  const [showFeedback, setShowFeedback] = useState(false);
  const { history } = usePersonaChatHistory();
  const { user } = useInstantPersonasUser();

  useEffect(() => {
    const checkAndShowFeedbackDialog = () => {
      if (!user) return; // Ensure there is a user object

      const currentDate = new Date();

      // Function to get the date x days ago without mutating currentDate
      const daysAgoInTime = (days: number) => {
        let pastDate = new Date(currentDate.getTime());
        pastDate.setDate(pastDate.getDate() - days);
        return pastDate;
      };

      // Check if user has generated more than 1 persona chat
      const personasGenerated = history.length;
      const personasGeneratedWithinThreshold = personasGenerated >= 1;

      // Check if the feedback dialog has been shown within the last day
      const feedbackShownDate = localStorage.getItem(
        LOCAL_STORAGE_CONFIG.feedback.shown,
      );
      const feedbackNotRecentlyShown = feedbackShownDate
        ? new Date(feedbackShownDate) < daysAgoInTime(1)
        : true;

      // Check if feedback has been completed within the last 60 days
      const feedbackCompletedDate = localStorage.getItem(
        LOCAL_STORAGE_CONFIG.feedback.completed,
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
        setShowFeedback(true);
        // Set / Update the date the feedback dialog was shown
        const currentDateFormatted = new Date().toISOString().slice(0, 10); // Format as 'YYYY-MM-DD'
        localStorage.setItem(
          LOCAL_STORAGE_CONFIG.feedback.shown,
          currentDateFormatted,
        );
      }
    };
    checkAndShowFeedbackDialog();
  }, [history.length, user]);

  return [showFeedback, setShowFeedback] as const;
}
