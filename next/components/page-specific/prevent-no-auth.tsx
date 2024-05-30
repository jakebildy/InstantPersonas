"use client";
import { Button } from "@/components/ui/button";
import { PersonStandingIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import { ColorVariantMap, gradientLightVariants } from "@/components/variants";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";
import { cn } from "@/lib/utils";
import BarLoader from "react-spinners/BarLoader";

export function PreventNotAuth() {
  const { isLoggedIn, isInitialized, isLoading } = useInstantPersonasUser();

  if (!isInitialized && !isLoggedIn) {
    return (
      <div className="w-screen h-screen fixed p-4 grid place-items-center inset-0 bg-pastel-blue/75 backdrop-blur-lg z-[999]">
        <div className="text-center text-gray-700 flex flex-col items-center gap-1 max-w-[90vw]">
          <PersonStandingIcon className="text-muted-foreground size-8 mb-4 " />
          <h2 className="text-sm md:text-lg font-bold">
            {isLoading
              ? "Authorizing User..."
              : "Sorry, you must be logged in to access this page."}
          </h2>
          <div
            className={cn(
              "transition-all duration-500 ease-out flex flex-col items-center gap-1 w-full",
              isLoading
                ? "opacity-0 translate-y-10"
                : "opacity-100 translate-y-0"
            )}
          >
            <p className="max-md:text-xs">
              Click the button below to log in or sign up.
            </p>
            <Button
              variant={"outline"}
              className="hover:text-primary rounded-full hover:scale-100 h-full  p-1 m-4 shadow-xl "
            >
              <Link
                href="/login"
                className={gradientLightVariants({
                  variant: "blue",
                  className:
                    "text-xs md:text-sm whitespace-nowrap rounded-full px-4 border border-input h-8 md:h-10 p-2 hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-out font-semibold text-muted-foreground ",
                })}
              >
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
