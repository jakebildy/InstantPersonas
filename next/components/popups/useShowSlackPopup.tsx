import { LOCAL_STORAGE_CONFIG } from "@/lib/config/localstorage";
import { useEffect, useState } from "react";
import { usePersonaChatHistory } from "../context/persona/history-context";
import { useInstantPersonasUser } from "../context/auth/user-context";

export function useShowSlackPopup() {
  const [show, setShow] = useState(false);
  const { history } = usePersonaChatHistory();
  const { user } = useInstantPersonasUser();

  useEffect(() => {
    const checkAndShowFeedbackDialog = () => {
      if (!user) return; // Ensure there is a user object

      // Check if user has generated more than 2 persona chats
      const personasGenerated = history.reduce(
        (acc, chat) => acc + chat.aiState.personas.length,
        0,
      );
      const personasGeneratedWithinThreshold = personasGenerated >= 5;

      // Check if the dialog has been shown
      const feedbackShownDate = localStorage.getItem(
        LOCAL_STORAGE_CONFIG.slack_popup.shown,
      );

      const showFeedback =
        personasGeneratedWithinThreshold && !feedbackShownDate;

      if (showFeedback) {
        setShow(true);
        // Set / Update the date the dialog was shown
        const currentDateFormatted = new Date().toISOString().slice(0, 10); // Format as 'YYYY-MM-DD'
        localStorage.setItem(
          LOCAL_STORAGE_CONFIG.slack_popup.shown,
          currentDateFormatted,
        );
      }
    };
    checkAndShowFeedbackDialog();
  }, [history, user]);

  return [show, setShow] as const;
}
