import React, { HTMLAttributes } from "react";
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
import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type PopupProps = {
  variant?: ColorVariant;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

type PopupTemplateProps = PopupProps & {
  children: React.ReactNode;
  overlayClassName?: string;
  Icon: React.ReactNode;
  title: string;
  subTitle: string | React.ReactNode;
  footerNote: string;
};

export const PopupTemplate = ({
  variant = "green",
  open,
  onOpenChange,
  children,
  Icon,
  title,
  subTitle,
  footerNote,
  overlayClassName,
}: PopupTemplateProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.DialogOverlay
        className={cn(
          "fixed inset-0 h-screen w-screen bg-black/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          overlayClassName,
        )}
      />
      <Dialog.Content
        className={shadowVariants({
          variant: variant,
          className:
            "fixed left-1/2 top-1/2 w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        })}
      >
        <div>
          <div className="flex items-center gap-2">
            {Icon}
            <h2 className="text-lg font-bold text-gray-700">{title}</h2>
          </div>
          <p className="text-sm text-gray-600">{subTitle}</p>

          <div
            className={gradientLightVariants({
              variant: variant,
              className:
                "relative my-4 grid place-items-center rounded-2xl border shadow-sm",
            })}
          >
            <AnimatePresence mode="wait">
              <div className="group flex h-full flex-col justify-between gap-6 p-4">
                {children}
              </div>
            </AnimatePresence>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {footerNote}
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

export const PopupMainSection = ({
  src,
  alt,
}: {
  src: string | StaticImport;
  alt: string;
}) => (
  <div className="grid h-fit w-full place-items-center overflow-hidden rounded-lg border bg-white empty:hidden md:col-span-2">
    <Image
      src={src}
      alt={alt}
      className="object-contain"
      width={300}
      height={300}
    />
  </div>
);
export const PopupSection = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "grid h-fit w-full place-items-center overflow-hidden rounded-lg border bg-white empty:hidden md:col-span-2",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export const PopupBenefitsSection = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="relative flex flex-col items-center rounded-lg border border-input bg-white p-1">
    <div className="flex flex-col items-center gap-2 rounded-lg border border-input bg-white p-4">
      <div className="absolute right-0 top-0 p-4">
        <BadgePlusIcon className="size-8 text-gray-300 transition-colors duration-300 ease-out group-hover:text-green-400" />
        <span className="sr-only">Benefits</span>
      </div>
      <ul className="space-y-4">{children}</ul>
    </div>
  </div>
);
