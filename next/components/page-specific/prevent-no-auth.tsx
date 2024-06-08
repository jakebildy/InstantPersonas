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
  const { isLoggedIn, isInitialized, isLoading, user } =
    useInstantPersonasUser();

  if ((!isInitialized && !isLoggedIn) || !user) {
    return (
      <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-pastel-blue/75 p-4 backdrop-blur-lg">
        <div className="flex max-w-[90vw] flex-col items-center gap-1 text-center text-gray-700">
          <PersonStandingIcon className="mb-4 size-8 text-muted-foreground" />
          <h2 className="text-sm font-bold md:text-lg">
            {isLoading
              ? "Authorizing User..."
              : "Sorry, you must be logged in to access this page."}
          </h2>
          <div
            className={cn(
              "flex w-full flex-col items-center gap-1 transition-all duration-500 ease-out",
              isLoading
                ? "translate-y-10 opacity-0"
                : "translate-y-0 opacity-100",
            )}
          >
            <p className="max-md:text-xs">
              Click the button below to log in or sign up.
            </p>
            <Button
              variant={"outline"}
              className="m-4 h-full rounded-full p-1 shadow-xl hover:scale-100 hover:text-primary"
            >
              <Link
                href="/login"
                className={gradientLightVariants({
                  variant: "blue",
                  className:
                    "h-8 whitespace-nowrap rounded-full border border-input p-2 px-4 text-xs font-semibold text-muted-foreground transition-colors duration-300 ease-out hover:bg-blue-500 hover:text-white md:h-10 md:text-sm",
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
