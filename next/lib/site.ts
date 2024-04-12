import { PersonStandingIcon } from "lucide-react";
import {
  BanknotesIcon,
  BookmarkIcon,
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
    title: "History",
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
    href: "https://forms.gle/zei5QLdBTfTgssBv9",
    icon: PencilSquareIcon,
    label: "",
  },
] as const;

export type SidebarLinkName = (typeof SIDEBAR_LINKS)[number]["title"];
