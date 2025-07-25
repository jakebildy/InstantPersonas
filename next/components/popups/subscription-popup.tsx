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
import * as MetricsSrc from "@/public/metrics.gif";
import {
  PopupProps,
  PopupTemplate,
  PopupMainSection,
  PopupBenefitsSection,
} from "./template/popup";

const SubscriptionPopup = ({
  variant = "green",
  open,
  onOpenChange,
}: PopupProps) => (
  <PopupTemplate
    {...{
      variant,
      open,
      onOpenChange,
      Icon: <BadgeDollarSignIcon className="text-gray-600" />,
      title: "Save hours or your money back.",
      subTitle: (
        <>
          To use InstantPersonas, start your free trial!{" "}
          <i className="underline">You can cancel at any time</i>.
        </>
      ),
      footerNote: "We appreciate your time and consideration. Thank you!",
    }}
  >
    <PopupMainSection src={MetricsSrc} alt="Subscribe to Instant Personas!" />
    <PopupBenefitsSection>
      <ul className="space-y-4">
        <li>
          <b className="text-semibold text-gray-700">
            Try for <span className="text-green-500">FREE</span>
          </b>{" "}
          for 3 days.
        </li>
        <li>
          <b className="text-semibold text-gray-700">Money Back Guarantee</b>{" "}
          for 30 days
        </li>
        <li>
          <b className="text-semibold text-gray-700">
            Marketing Managers and UX Designers can save hours
          </b>{" "}
          developing user personas and getting insights. Don&apos;t believe us?
          Try it and find out.
        </li>
      </ul>
    </PopupBenefitsSection>
    <div className="flex w-full items-center justify-between">
      <Button
        variant={"outline"}
        className="h-full rounded-full p-1 shadow-sm hover:scale-100 hover:text-primary"
      >
        <Link
          href="/subscription"
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
          href="/subscription"
          className={
            "h-10 whitespace-nowrap rounded-full border border-input bg-gradient-to-b from-green-500 to-green-500 p-2 px-10 font-semibold text-white transition-colors duration-300 ease-out hover:bg-gradient-to-b hover:from-green-500 hover:to-green-400"
          }
        >
          Try for Free
        </Link>
      </Button>
    </div>
  </PopupTemplate>
);

export default SubscriptionPopup;
