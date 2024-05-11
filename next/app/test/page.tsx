"use client";
import { Button } from "@/components/ui/button";
import { PersonStandingIcon, X } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import PersonaAdoptionStageAndSatisfactionCorrelationAnalysisSurveyPopup from "@/components/survey/persona-adoption-stage-and-satisfaction-correlation-analysis-survey";
import { gradientLightVariants } from "@/components/variants";
import { isMobile } from "react-device-detect";
import { PreventMobile } from "@/components/page-specific/prevent-mobile";
import SubscriptionPopup from "@/components/popups/subscription-popup";

type Props = {};

export default function PageTest({}: Props) {
  const [openSubscriptionPopup, setOpenSubscriptionPopup] =
    React.useState(true);

  return (
    <div className="grid place-items-center h-screen w-screen">
      <Subscription2 />
      <SubscriptionPopup
        openSubscriptionPopup={openSubscriptionPopup}
        setOpenSubscriptionPopup={setOpenSubscriptionPopup}
      />
      {/* <FeedbackPopup
        openFeedbackPopup={false}
        setOpenFeedbackPopup={function (
          value: React.SetStateAction<boolean>
        ): void {
          throw new Error("Function not implemented.");
        }}
      /> */}
      <PersonaAdoptionStageAndSatisfactionCorrelationAnalysisSurveyPopup
        openFeedbackPopup={true}
        setOpenFeedbackPopup={function (
          value: React.SetStateAction<boolean>
        ): void {
          throw new Error("Function not implemented.");
        }}
      />
      {/* <PreventMobile /> */}
    </div>
  );
}

function Subscription2() {
  return (
    <div className="bg-white rounded-md shadow-lg w-[90vw] max-w-2xl p-6 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
      <h2 className="text-lg font-bold text-gray-800">
        Save hours or your money back.
      </h2>
      <p className="text-sm text-gray-600">
        To use Instant Personas, start your free trial! You can cancel at any
        time.
      </p>
      <div className="grid place-items-center md:grid-cols-5 gap-4 mt-4">
        <div className="w-[200px] h-[200px] md:col-span-2">
          <Image
            src="/metrics.gif"
            alt="free subscription"
            className="object-contain"
            width={200}
            height={200}
          />
        </div>
        <div className="md:col-span-3 flex flex-col items-center gap-8">
          <ul className="list-disc space-y-4">
            <li>
              <b className=" text-semibold">
                Try for <span className="text-green-500">FREE</span>
              </b>{" "}
              for 3 days.
            </li>
            <li>
              <b className="text-semibold">Money Back Guarantee</b> for 30 days
            </li>
            <li>
              <b className="text-semibold">
                Marketing Managers and UX Designers can save hours
              </b>{" "}
              developing user personas and getting insights. Don&apos;t believe
              us? Try it and find out.
            </li>
          </ul>
          <Button variant={"green"} asChild className="w-full">
            <Link href={"/subscription"}>Try for Free</Link>
          </Button>
        </div>
      </div>
      <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
}
