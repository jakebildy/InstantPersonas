import { useInstantPersonasUser } from "@/components/context/auth/user-context";
import { LOCAL_STORAGE_CONFIG } from "@/lib/config/localstorage";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// If true, the dialog will never be shown
//? Set to false when ready
const NEVER_SHOW = true;

export function useShowGiveawayPopup() {
  const [show, setShow] = useState(false);
  const { user } = useInstantPersonasUser();

  useEffect(() => {
    const checkAndShowDialog = () => {
      if (!user) return; // Ensure there is a user object

      // Check if the dialog has been shown
      const feedbackShownDate = localStorage.getItem(
        LOCAL_STORAGE_CONFIG.twitter_giveaway.shown,
      );

      const isBeforeAugust31st2024 = (): boolean => {
        const currentDate = new Date();
        const targetDate = new Date("2024-08-31");

        return currentDate < targetDate;
      };

      // If the dialog has never been shown, and the current date is before August 31st 2024, show the dialog
      // Never show the dialog if NEVER_SHOW is true
      const showFeedback =
        !NEVER_SHOW && isBeforeAugust31st2024() && !feedbackShownDate;

      if (showFeedback) {
        setShow(true);
        // Set / Update the date the dialog was shown
        const currentDateFormatted = new Date().toISOString().slice(0, 10); // Format as 'YYYY-MM-DD'
        localStorage.setItem(
          LOCAL_STORAGE_CONFIG.twitter_giveaway.shown,
          currentDateFormatted,
        );
      }
    };
    checkAndShowDialog();
  }, [user]);

  return [show, setShow] as const;
}
