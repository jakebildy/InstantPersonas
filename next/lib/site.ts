import { MessageSquareShareIcon, PersonStandingIcon } from "lucide-react";
import {
  BanknotesIcon,
  BookmarkIcon,
  AcademicCapIcon,
  FireIcon,
  PencilSquareIcon,
  DocumentMagnifyingGlassIcon,
  KeyIcon,
  HashtagIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/24/solid";

export const SIDEBAR_LINKS = [
  {
    title: "Persona Creator",
    href: "/persona",
    icon: PersonStandingIcon,
    label: "",
  },
  {
    title: "Recent Personas",
    href: "/history",
    icon: BookmarkIcon,
    label: "",
  },
  {
    title: "Subscription",
    href: "/subscription",
    icon: BanknotesIcon,
    label: "",
  },
  // {
  //   title: "Become an Affiliate",
  //   href: "/affiliate",
  //   icon: FireIcon,
  //   label: "",
  // },
  {
    title: "Send Feedback",
    href: "/feedback",
    icon: PencilSquareIcon,
    label: "",
  },
] as const;

export const GOOGLE_FORM_FEEDBACK_LINK = "https://forms.gle/zei5QLdBTfTgssBv9";

// Search icons at https://lucide.dev/icons
export const SEO_LINKS = [
  {
    title: "Topical Authority",
    href: "/tools/topical-authority",
    icon: AcademicCapIcon,
    category: "SEO",
    lead: "Increase your site's reach with content ideas specifically designed to boost your topical authority. Create a topical authority map and a downloadable table.",

    label: "",
  },
  {
    title: "Guest Post Finder",
    href: "/tools/guest-post-finder",
    category: "Blogging",
    lead: "Find guest post opportunities in your niche",
    icon: DocumentMagnifyingGlassIcon,
    label: "",
  },
  {
    title: "Google Keyword Finder",
    href: "/tools/google-keyword-finder",
    category: "SEO",
    lead: "Find the best Google keywords for your target audience",
    icon: KeyIcon,
    label: "",
  },
  {
    title: "Instagram Hashtag Finder",
    href: "/tools/instagram-hashtag-finder",
    category: "Marketing",
    lead: "Find the best Instagram hashtags for your target audience. View hashtag popularity and more.",
    icon: HashtagIcon,
    label: "",
  },
  {
    title: "Share Preview Optimizer",
    href: "/tools/share-preview-optimizer",
    category: "SEO",
    lead: "Generate and optimize social media share previews for your content.",
    icon: MessageSquareShareIcon,
    label: "",
  },
  {
    title: "Headline Analyzer",
    href: "/tools/headline-analyzer",
    category: "Blogging",
    lead: "Find the best titles",
    icon: ChartBarSquareIcon,
    label: "",
  },
] as const;

export type SEOLINK = (typeof SEO_LINKS)[number];

export const LANDING_HEADER_LINKS = [
  {
    text: "Blog",
    href: "/blog",
  },
  {
    text: "Free SEO Tools",
    href: "/tools",
  },
  {
    text: "Pricing",
    href: "/#pricing",
  },
];

export const LANDING_FOOTER_LINKS = [
  { text: "Features", href: "/#features" },
  {
    text: "Blog",
    href: "/blog",
  },
  {
    text: "Pricing",
    href: "/#pricing",
  },
];

export const BLOG_FOOTER_LINKS = LANDING_FOOTER_LINKS;

export type SidebarLinkName = (typeof SIDEBAR_LINKS)[number]["title"];
