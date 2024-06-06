"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import BarLoader from "react-spinners/BarLoader";
import { SystemErrorMessage } from "../system/system-error-message";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const AssistantMessageLoading = ({
  maxTimeoutSeconds = 30,
}: {
  maxTimeoutSeconds?: number;
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, maxTimeoutSeconds * 1000);

    return () => clearTimeout(timer);
  }, [maxTimeoutSeconds]);

  return loading ? (
    <div className={cn("flex gap-2")}>
      <div className="flex items-center h-8 w-8">
        <Image
          src={"/instant_personas_logo.png"}
          alt={"Instant Personas Logo"}
          width={32}
          height={32}
          priority
          className={cn("object-contain min-w-8")}
        />
      </div>
      <div className="flex items-center bg-gray-200 p-2 px-4 rounded-lg text-sm whitespace-pre-wrap">
        <BarLoader color="#36d7b7" />
      </div>
    </div>
  ) : (
    <SystemErrorMessage
      message={
        <div className="flex flex-col w-full gap-2">
          <span className="flex flex-col gap-1">
            <p>
              Looks like the assistant is taking a bit longer than usual to
              respond.
            </p>
            <p className="text-xs">
              This could be due to a slow network connection or a temporary
              issue due to high-traffic. Please try again in a few moments or
              report the issue to our support team.
            </p>
          </span>
          <Button variant={"outline"} size={"sm"} asChild>
            <Link href="/feedback">Send Feedback</Link>
          </Button>
        </div>
      }
    />
  );
};
