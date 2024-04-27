import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import router from "next/router";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { X } from "lucide-react";

const SubscriptionPopup = ({
  openSubscriptionPopup,
  setOpenSubscriptionPopup,
}: {
  openSubscriptionPopup: boolean;
  setOpenSubscriptionPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Dialog.Root
    open={openSubscriptionPopup}
    onOpenChange={setOpenSubscriptionPopup}
  >
    <Dialog.Portal>
      <Dialog.DialogOverlay className="w-screen h-screen fixed inset-0 bg-black/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <Dialog.Content className="bg-white rounded-md shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl p-6 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
        <Dialog.Title className="text-lg font-bold text-gray-800">
          Save hours or your money back.
        </Dialog.Title>
        <Dialog.Description className="text-sm text-gray-600">
          To use Instant Personas, start your free trial! You can cancel at any
          time.
        </Dialog.Description>
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
                <b className="text-semibold">Money Back Guarantee</b> for 30
                days
              </li>
              <li>
                <b className="text-semibold">
                  Marketing Managers and UX Designers can save hours
                </b>{" "}
                developing user personas and getting insights. Don&apos;t
                believe us? Try it and find out.
              </li>
            </ul>
            <Button variant={"green"} asChild className="w-full">
              <Link href={"/subscription"}>Try for Free</Link>
            </Button>
          </div>
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
