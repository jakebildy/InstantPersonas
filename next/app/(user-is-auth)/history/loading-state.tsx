import { usePersonaChat } from "@/components/context/persona/chat-context";
import { usePersonaChatHistory } from "@/components/context/persona/history-context";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";
import GradientScroll from "@/components/page-specific/persona-chat-history/new/gradient-scroll";

type Props = {};

export function HistoryLoading({}: Props) {
  return (
    <main className="grid grid-cols-12 grid-rows-[auto_auto_1fr] gap-4 p-2 transition-all duration-700 ease-out md:p-10 xl:h-[calc(100dvh-2px)] xl:grid-rows-[auto_1fr] xl:overflow-hidden">
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
          "order-2 col-span-12 h-full xl:order-1 xl:col-span-4",
          "flex flex-col rounded-xl border border-zinc-300 bg-zinc-200 transition-colors duration-150 ease-out",
          "relative",
        )}
      >
        <Skeleton className="m-4 mb-0 h-[42px] w-[calc(100%-32px)] rounded-full bg-zinc-600/30" />
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
      </div>
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
    </main>
  );
}
