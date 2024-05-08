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
      <div className="w-screen h-screen fixed p-4 grid place-items-center inset-0 bg-pastel-blue/75 backdrop-blur-lg z-[999]">
        <div className="text-center text-gray-700 flex flex-col items-center gap-1">
          <PersonStandingIcon className="text-muted-foreground size-8 mb-4 " />
          <h2 className="text-lg font-bold">
            Sorry, this page is not available on mobile devices.
          </h2>
          <p>Please use a desktop or laptop to access this page.</p>
          <Button
            variant={"outline"}
            className="hover:text-primary rounded-full hover:scale-100 h-full  p-1 m-4 shadow-xl"
          >
            <Link
              href="/"
              className={gradientLightVariants({
                variant: "blue",
                className:
                  "whitespace-nowrap rounded-full px-4 border border-input h-10 p-2 hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-out font-semibold text-muted-foreground ",
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
