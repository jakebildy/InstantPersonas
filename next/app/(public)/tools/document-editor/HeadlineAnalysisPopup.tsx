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
import { HeadlineAnalyzerTool } from "@/components/toolfolio/headline-analyzer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const HeadlineAnalysisPopup = ({
  headline,
  variant = "green",
  openHeadlineAnalysisPopup: openSubscriptionPopup,
  setShowHeadlineAnalysisPopup: setOpenSubscriptionPopup,
}: {
  headline: string;
  variant?: ColorVariant;
  openHeadlineAnalysisPopup: boolean;
  setShowHeadlineAnalysisPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Dialog.Root
    open={openSubscriptionPopup}
    onOpenChange={setOpenSubscriptionPopup}
  >
    <Dialog.Portal>
      <Dialog.DialogOverlay className="w-full h-screen fixed inset-0 bg-black/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <Dialog.Content
        className={shadowVariants({
          variant: variant,
          className:
            "bg-white rounded-2xl shadow-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 p-6 w-[1000px] focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        })}
      >
        <div>
          <ScrollArea className="order-1 peer-hover:opacity-25 transition-all duration-200 ease-out w-full p-2 bg-white rounded-md overflow-hidden shadow-md lg:max-w-none h-screen">
            <p className="text-3xl text-gray-700 font-bold text-center mb-4">
              {headline}
            </p>
            <HeadlineAnalyzerTool
              isPopup={openSubscriptionPopup}
              headline={headline}
              input={""}
              isSubscribed={true}
              noInput={headline === ""}
            />
            <div className="h-[100px]" />
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
        <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default HeadlineAnalysisPopup;
