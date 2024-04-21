import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import router from "next/router";

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
      <Dialog.DialogOverlay className="w-screen h-screen fixed inset-0 bg-black/75 backdrop-blur-sm" />

      <Dialog.Content className="DialogContent">
        <Dialog.Title className="text-lg font-bold text-gray-800">
          Save hours or your money back. Try for FREE for 3 days.
        </Dialog.Title>
        <div className="grid place-items-center md:grid-cols-5 gap-4">
          <div className="w-[200px] h-[200px] md:col-span-2">
            <img
              src="https://i.imgur.com/lklRZq8.gif"
              alt="free subscription"
              className="object-contain"
            />
          </div>
          <div className="space-y-4 md:col-span-3">
            <p className="text-sm text-gray-600">
              To use Instant Personas, start your free trial! You can cancel at
              any time.
              <br></br>
              <br></br>• <b>Money Back Guarantee</b> for 30 days
              <br></br>
              <br></br>•{" "}
              <b>Marketing Managers and UX Designers can save hours</b>{" "}
              developing user personas and getting insights. Don't believe us?
              Try it and find out.
            </p>
            <div className="flex space-x-4">
              <button
                className="px-6 font-bold text-green-600"
                onClick={() => {
                  window.open("/subscription", "_self");
                }}
              >
                Try for Free
              </button>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default SubscriptionPopup;
