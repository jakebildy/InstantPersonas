"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import BarLoader from "react-spinners/BarLoader";
import { SystemErrorMessage } from "../system/system-error-message";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SLACK_INVITE_LINK } from "@/lib/site";

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
      <div className="flex h-8 w-8 items-center">
        <Image
          src={"/instant_personas_logo.png"}
          alt={"Instant Personas Logo"}
          width={32}
          height={32}
          priority
          className={cn("min-w-8 object-contain")}
        />
      </div>
      <div className="flex items-center whitespace-pre-wrap rounded-lg bg-gray-200 p-2 px-4 text-sm">
        <BarLoader color="#36d7b7" />
      </div>
    </div>
  ) : (
    <SystemErrorMessage
      message={
        <div className="flex w-full flex-col gap-2">
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
            <Link href={SLACK_INVITE_LINK}>Send us a Slack Message</Link>
          </Button>
        </div>
      }
    />
  );
};
