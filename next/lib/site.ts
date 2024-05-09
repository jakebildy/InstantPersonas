import { PersonStandingIcon } from "lucide-react";
import {
  BanknotesIcon,
  BookmarkIcon,
  AcademicCapIcon,
  FireIcon,
  PencilSquareIcon,
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
] as const;

export type SidebarLinkName = (typeof SIDEBAR_LINKS)[number]["title"];
