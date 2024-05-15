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

const SubscriptionPopup = ({
  variant = "green",
  openSubscriptionPopup,
  setOpenSubscriptionPopup,
}: {
  variant?: ColorVariant;
  openSubscriptionPopup: boolean;
  setOpenSubscriptionPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Dialog.Root
    open={openSubscriptionPopup}
    onOpenChange={setOpenSubscriptionPopup}
  >
    <Dialog.Portal>
      <Dialog.DialogOverlay className="w-screen h-screen fixed inset-0 bg-black/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <Dialog.Content
        className={shadowVariants({
          variant: variant,
          className:
            "bg-white rounded-2xl shadow-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl p-6 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        })}
      >
        <div>
          <div className="flex items-center gap-2">
            <BadgeDollarSignIcon className="text-gray-600" />
            <h2 className="text-lg font-bold text-gray-700">
              Save hours or your money back.
            </h2>
          </div>
          <p className="text-sm text-gray-600">
            To use Instant Personas, start your free trial!{" "}
            <i className="underline">You can cancel at any time</i>.
          </p>

          <div
            className={gradientLightVariants({
              variant: variant,
              className:
                " grid place-items-center  border rounded-2xl shadow-sm my-4 relative",
            })}
          >
            <AnimatePresence mode="wait">
              <div className="flex flex-col h-full justify-between p-4 gap-6 group">
                <div className="flex flex-col h-full justify-between gap-2 ">
                  <div className="w-full bg-white grid place-items-center h-fit md:col-span-2 rounded-lg border overflow-hidden empty:hidden">
                    <Image
                      src={MetricsSrc}
                      alt="Subscribe to Instant Personas!"
                      className="object-contain"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="flex flex-col items-center p-1 border border-input bg-white rounded-lg relative">
                    <div className="flex flex-col items-center gap-2 p-4 border border-input bg-white rounded-lg">
                      <div className="absolute top-0 right-0 p-4">
                        <BadgePlusIcon className="text-gray-300 size-8 group-hover:text-green-400 transition-colors duration-300 ease-out" />
                        <span className="sr-only">Benefits</span>
                      </div>
                      <ul className="space-y-4">
                        <li>
                          <b className=" text-semibold text-gray-700">
                            Try for <span className="text-green-500">FREE</span>
                          </b>{" "}
                          for 3 days.
                        </li>
                        <li>
                          <b className="text-semibold text-gray-700">
                            Money Back Guarantee
                          </b>{" "}
                          for 30 days
                        </li>
                        <li>
                          <b className="text-semibold text-gray-700">
                            Marketing Managers and UX Designers can save hours
                          </b>{" "}
                          developing user personas and getting insights.
                          Don&apos;t believe us? Try it and find out.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <Button
                    variant={"outline"}
                    className="hover:text-primary rounded-full hover:scale-100 h-full  p-1 shadow-sm"
                  >
                    <Link
                      href="/subscription"
                      className={gradientLightVariants({
                        variant: "blue",
                        className:
                          "whitespace-nowrap rounded-full px-4 border border-input h-10 p-2 hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-out font-semibold text-muted-foreground ",
                      })}
                    >
                      Learn More
                    </Link>
                  </Button>
                  <Button
                    variant={"outline"}
                    className="hover:text-primary rounded-full hover:scale-110 h-full  p-1 shadow-sm transition-all duration-200"
                  >
                    <Link
                      href="/subscription"
                      className={
                        "bg-gradient-to-b whitespace-nowrap rounded-full px-10 border border-input h-10 p-2  to-green-500 hover:bg-gradient-to-b hover:from-green-500 hover:to-green-400 from-green-500  text-white transition-colors duration-300 ease-out font-semibold "
                      }
                    >
                      Try for Free
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatePresence>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            We appreciate your time and consideration. Thank you!
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

export default SubscriptionPopup;
