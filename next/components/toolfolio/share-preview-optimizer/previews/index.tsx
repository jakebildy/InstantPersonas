import { PINTREST_CONFIG } from "./pintrest";
import { IMESSAGE_CONFIG } from "./imessage";
import { DISCORD_CONFIG } from "./discord";
import { X_CONFIG } from "./x-twitter";
import { LINKEDIN_CONFIG } from "./linkedin";

export const SOCIAL_SHARE_PREVIEWS = {
  imessage: IMESSAGE_CONFIG,
  twitter: X_CONFIG,
  linkedin: LINKEDIN_CONFIG,
  discord: DISCORD_CONFIG,
  pintrest: PINTREST_CONFIG,
} as const;

export const OG_SOCIAL_PREVIEW_TEMPLATE_TABS = [
  ...Object.values(SOCIAL_SHARE_PREVIEWS),
];

//? Future social share previews
// import { FACEBOOK_CONFIG } from "./facebook";
// import { INSTAGRAM_CONFIG } from "./instagram";
// import { SLACK_CONFIG } from "./slack";
// import { TELEGRAM_CONFIG } from "./telegram";
// import { WHATSAPP_CONFIG } from "./whatsapp";
// import { EMAIL_CONFIG } from "./email";
