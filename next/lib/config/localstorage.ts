export const LOCAL_STORAGE_CONFIG = {
  feedback: {
    shown: "instant_persona_feedback_shown", // Key for the last time feedback was shown | Date Format as 'YYYY-MM-DD'
    completed: "instant_persona_feedback_completed", // Key for the last time feedback was completed | Date Format as 'YYYY-MM-DD'
  },
} as const;
