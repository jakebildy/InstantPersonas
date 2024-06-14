export const LOCAL_STORAGE_CONFIG = {
  feedback: {
    shown: "instant_persona_feedback_shown", // Key for the last time feedback was shown | Date Format as 'YYYY-MM-DD'
    completed: "instant_persona_feedback_completed", // Key for the last time feedback was completed | Date Format as 'YYYY-MM-DD'
  },
  slack_popup: {
    shown: "instant_persona_slack_popup_shown", // Key for the last time the slack popup was shown | Date Format as 'YYYY-MM-DD'
  },
  twitter_giveaway: {
    shown: "instant_persona_twitter_giveaway_shown", // Key for the last time the twitter giveaway popup was shown | Date Format as 'YYYY-MM-DD'
  },
  tools: {
    selectedPersonas: "instant_persona_tool_selected_personas", // Key for the selected personas | JSON Array of Persona IDs
  },
} as const;
