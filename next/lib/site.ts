import { PersonStandingIcon } from "lucide-react";
import {
  BanknotesIcon,
  BookmarkIcon,
  AcademicCapIcon,
  FireIcon,
  PencilSquareIcon,
  DocumentMagnifyingGlassIcon,
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

export const SEO_LINKS = [
  {
    title: "Topical Authority",
    href: "/tools/topical-authority",
    icon: AcademicCapIcon,
    label: "",
  },
  {
    title: "Guest Post Finder",
    href: "/tools/guest-post-finder",
    icon: DocumentMagnifyingGlassIcon,
    label: "",
  },
] as const;

export const LANDING_HEADER_LINKS = [
  // { text: "Features", href: "/#features" },
  {
    text: "Blog",
    href: "/blog",
  },
  {
    text: "Free SEO Tools",
    href: SEO_LINKS.find((link) => link.title === "Guest Post Finder")
      ?.href as string,
  },
  // {
  //   text: "Topical Authority Builder",
  //   href: SEO_LINKS.find((link) => link.title === "Topical Authority")
  //     ?.href as string,
  // },

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
