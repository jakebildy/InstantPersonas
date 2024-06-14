"use client";
import { usePersonaChat } from "@/components/context/persona/chat-context";
import { usePersonaChatHistory } from "@/components/context/persona/history-context";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";
import GradientScroll from "@/components/page-specific/persona-chat-history/new/gradient-scroll";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};

export function HistoryLoading({}: Props) {
  const { history, loading, error } = usePersonaChatHistory();
  const router = useRouter();

  return (
    <main className="grid h-full min-h-[99dvh] grid-cols-12 grid-rows-[auto_auto_1fr] gap-4 p-2 transition-all duration-700 ease-out md:p-10 xl:h-[calc(100dvh-2px)] xl:grid-rows-[auto_1fr] xl:overflow-hidden">
      {/* Header */}
      <div
        className={cn(
          "col-span-12",
          "flex flex-col gap-4 rounded-xl border border-zinc-300 bg-zinc-200 p-4 transition-colors duration-150 ease-out",
          "relative",
        )}
      >
        <h1 className="text-3xl font-semibold text-zinc-900">History</h1>

        <span className="text-sm font-light">Fetching your history...</span>
      </div>

      {/* Main Section */}

      <div
        className={cn(
          "flex flex-col rounded-xl border border-zinc-300 bg-zinc-200 transition-colors duration-150 ease-out",
          "relative",
          loading
            ? "order-2 col-span-12 h-full xl:order-1 xl:col-span-4"
            : "col-span-12 row-span-2 h-full",
        )}
      >
        <AnimatePresence>
          <div className="flex h-full flex-1 flex-col gap-2 pb-10">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="history-personas"
                className="flex flex-col gap-2"
              >
                <div className="p-4 pb-0">
                  <Skeleton className="h-[42px] w-1/2 rounded-full bg-zinc-600/30" />
                </div>

                <GradientScroll>
                  <div className="flex flex-col gap-2 overflow-hidden p-4 font-mono text-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton
                        className="h-[280px] w-full rounded-xl border bg-zinc-800/25 p-2"
                        key={i}
                      />
                    ))}
                  </div>
                </GradientScroll>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="history-personas-empty"
                className="grid h-full place-items-center"
              >
                <div className="text-center">
                  <Image
                    src={"/analytics.gif"}
                    alt="Create your first persona"
                    height={300}
                    width={300}
                    className="m-10 mx-auto max-w-4xl rounded-md bg-white p-8 shadow-sm"
                  />
                  {error ? (
                    <>
                      <p>
                        An error occurred while fetching your history. Please
                        try again later.
                      </p>

                      <button
                        className="w-350 rounded bg-green-500 px-3 py-2 text-sm font-bold text-white transition-all duration-200 ease-in-out hover:bg-green-400"
                        onClick={() => router.refresh()}
                      >
                        Try again
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="w-350 mb-5 text-sm font-bold text-gray-500">
                        No history yet. Create your first persona to get
                        started.
                      </p>
                      <Link
                        className="w-350 rounded bg-green-500 px-3 py-2 text-sm font-bold text-white transition-all duration-200 ease-in-out hover:bg-green-400"
                        href="/persona"
                      >
                        Create my first persona
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>
      {loading ? (
        <div
          className={cn(
            "order-1 col-span-12 h-full xl:order-2 xl:col-span-8",
            "flex flex-col rounded-xl border border-zinc-300 bg-zinc-200 transition-colors duration-150 ease-out",
            "relative",
          )}
        >
          <div className="flex items-center justify-between gap-4 p-4">
            <Skeleton className="h-[42px] w-[348px] rounded-full bg-zinc-600/30" />
            <Skeleton className="h-[42px] w-[148px] rounded-full bg-zinc-600/30" />
          </div>
          <GradientScroll>
            <div className="flex flex-col gap-2 overflow-hidden p-4 font-mono text-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  className="relative h-[160px] w-full rounded-xl border border-dashed border-black/10 bg-zinc-800/25 shadow-sm"
                  key={i}
                />
              ))}
            </div>
          </GradientScroll>
        </div>
      ) : null}
    </main>
  );
}
