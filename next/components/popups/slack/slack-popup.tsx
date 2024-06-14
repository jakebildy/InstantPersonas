import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BadgeDollarSignIcon, BadgePlusIcon, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import {
  shadowVariants,
  gradientLightVariants,
  gradientVariants,
  ColorVariant,
} from "@/components/variants";
import * as TalkingGif from "@/public/talking.gif";
import { BRAND_ICONS } from "../../brand-icons";
import { SLACK_INVITE_LINK } from "@/lib/site";
import {
  PopupBenefitsSection,
  PopupMainSection,
  PopupProps,
  PopupTemplate,
} from "../template/popup";

export const SlackPopup = ({
  variant = "green",
  open,
  onOpenChange,
}: PopupProps) => (
  <PopupTemplate
    {...{
      variant,
      open,
      onOpenChange,
      Icon: <BRAND_ICONS.Slack className="size-6" />,
      title: "Join InstantPersonas on Slack!",
      subTitle:
        "Get the latest updates, ask questions, and share your feedback!",
      footerNote:
        "Thank you for considering joining our community. We value your input and look forward to connecting with you!",
    }}
  >
    <PopupMainSection src={TalkingGif} alt="Slack Community Conversation GIF" />
    <PopupBenefitsSection>
      <ul className="space-y-4">
        <li>
          <b className="text-semibold text-gray-700">
            Direct Access to Our Team
          </b>
          {" - "}
          Reach out directly and get
          <br /> the answers you need.
        </li>
        <li>
          <b className="text-semibold text-gray-700">Exclusive Insights</b>
          {" - "}
          Be the first to receive sneak peeks and special updates.
        </li>
        <li>
          <b className="text-semibold text-gray-700">Community Support</b>
          {" - "}
          Share ideas and solutions with peers who are just as passionate as you
          are.
        </li>
      </ul>
    </PopupBenefitsSection>
    <div className="flex w-full items-center justify-between">
      <Button
        variant={"outline"}
        className="h-full rounded-full p-1 shadow-sm hover:scale-100 hover:text-primary"
      >
        <Link
          href={SLACK_INVITE_LINK}
          className={gradientLightVariants({
            variant: "blue",
            className:
              "h-10 whitespace-nowrap rounded-full border border-input p-2 px-4 font-semibold text-muted-foreground transition-colors duration-300 ease-out hover:bg-blue-500 hover:text-white",
          })}
        >
          Learn More
        </Link>
      </Button>
      <Button
        variant={"outline"}
        className="h-full rounded-full p-1 shadow-sm transition-all duration-200 hover:scale-110 hover:text-primary"
      >
        <Link
          href={SLACK_INVITE_LINK}
          className={
            "h-10 whitespace-nowrap rounded-full border border-input bg-gradient-to-b from-green-500 to-green-500 p-2 px-10 font-semibold text-white transition-colors duration-300 ease-out hover:bg-gradient-to-b hover:from-green-500 hover:to-green-400"
          }
        >
          Join the Community!
        </Link>
      </Button>
    </div>
  </PopupTemplate>
);
