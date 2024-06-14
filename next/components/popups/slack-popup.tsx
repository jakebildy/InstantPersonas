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
import { BRAND_ICONS } from "../brand-icons";
import { SLACK_INVITE_LINK } from "@/lib/site";

export const SlackPopup = ({
  variant = "green",
  open,
  onOpenChange,
}: {
  variant?: ColorVariant;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.DialogOverlay className="fixed inset-0 h-screen w-screen bg-black/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <Dialog.Content
        className={shadowVariants({
          variant: variant,
          className:
            "fixed left-1/2 top-1/2 w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        })}
      >
        <div>
          <div className="flex items-center gap-2">
            <BRAND_ICONS.Slack className="size-6" />
            <h2 className="text-lg font-bold text-gray-700">
              Join InstantPersonas on Slack!
            </h2>
          </div>
          <p className="text-sm text-gray-600">
            Get the latest updates, ask questions, and share your feedback!
          </p>

          <div
            className={gradientLightVariants({
              variant: variant,
              className:
                "relative my-4 grid place-items-center rounded-2xl border shadow-sm",
            })}
          >
            <AnimatePresence mode="wait">
              <div className="group flex h-full flex-col justify-between gap-6 p-4">
                <div className="flex h-full flex-col justify-between gap-2">
                  <div className="grid h-fit w-full place-items-center overflow-hidden rounded-lg border bg-white empty:hidden md:col-span-2">
                    <Image
                      src={TalkingGif}
                      alt="Slack Community Conversation GIF"
                      className="object-contain"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="relative flex flex-col items-center rounded-lg border border-input bg-white p-1">
                    <div className="flex flex-col items-center gap-2 rounded-lg border border-input bg-white p-4">
                      <div className="absolute right-0 top-0 p-4">
                        <BadgePlusIcon className="size-8 text-gray-300 transition-colors duration-300 ease-out group-hover:text-green-400" />
                        <span className="sr-only">Benefits</span>
                      </div>
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
                          <b className="text-semibold text-gray-700">
                            Exclusive Insights
                          </b>
                          {" - "}
                          Be the first to receive sneak peeks and special
                          updates.
                        </li>
                        <li>
                          <b className="text-semibold text-gray-700">
                            Community Support
                          </b>
                          {" - "}
                          Share ideas and solutions with peers who are just as
                          passionate as you are.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
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
              </div>
            </AnimatePresence>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Thank you for considering joining our community. We value your input
            and look forward to connecting with you!
          </p>
        </div>
        <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
