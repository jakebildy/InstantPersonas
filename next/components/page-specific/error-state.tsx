import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SIDEBAR_LINKS } from "@/lib/site";
import { usePostHog } from "posthog-js/react";

type Props = {
  onRetry: () => void;
  error?: Error & { digest?: string };
};

export default function ErrorState({ error, onRetry }: Props) {
  const posthog = usePostHog();

  useEffect(() => {
    if (!error) return;
    posthog.capture("error", {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });
    console.error(error);
  }, [error, posthog]);

  const feedbackLink = SIDEBAR_LINKS.find(
    (link) => link.title === "Send Feedback"
  )?.href;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key="history-personas-empty"
        className="text-center flex flex-col gap-2"
      >
        <Image
          src={"/search.gif"}
          alt="Create your first persona"
          height={500}
          width={500}
          className="mx-auto bg-white rounded-md max-w-4xl shadow-sm"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto m-10 max-w-2xl text-lg tracking-tight text-slate-700"
        >
          <b>Something went wrong!</b> <br /> We&apos;ve automatically reported
          this error and are working to fix it as soon as possible.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="w-full flex gap-4 items-center justify-center"
        >
          {feedbackLink ? (
            <Button variant={"slate"} asChild>
              <Link href={feedbackLink}>Send Feedback</Link>
            </Button>
          ) : null}
          <Button
            variant={"green"}
            className="w-full font-bold"
            onClick={() => onRetry()}
          >
            Retry Connection
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
