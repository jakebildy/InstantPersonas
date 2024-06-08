"use client";
import { Button } from "@/components/ui/button";
import { PersonStandingIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import { gradientLightVariants } from "@/components/variants";
import { isMobile } from "react-device-detect";

export function PreventMobile() {
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-pastel-blue/75 p-4 backdrop-blur-lg">
        <div className="flex max-w-[90vw] flex-col items-center gap-1 text-center text-gray-700">
          <PersonStandingIcon className="mb-4 size-8 text-muted-foreground" />
          <h2 className="text-sm font-bold md:text-lg">
            Sorry, this page is not available on mobile devices.
          </h2>
          <p className="max-md:text-xs">
            Please use a desktop or laptop to access this page.
          </p>
          <Button
            variant={"outline"}
            className="m-4 h-full rounded-full p-1 shadow-xl hover:scale-100 hover:text-primary"
          >
            <Link
              href="/"
              className={gradientLightVariants({
                variant: "blue",
                className:
                  "h-8 whitespace-nowrap rounded-full border border-input p-2 px-4 text-xs font-semibold text-muted-foreground transition-colors duration-300 ease-out hover:bg-blue-500 hover:text-white md:h-10 md:text-sm",
              })}
            >
              Go back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  return null;
}
