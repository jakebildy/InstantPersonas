import { usePersonaChatHistory } from "@/components/context/persona/history-context";
import AutomaticCarousel from "@/components/ui/fcs/automatic-carousel";
import NumberTicker from "@/components/ui/magicui/number-ticker";
import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

export default function UserHistoryChatStatsCarousel({
  className,
  ...Props
}: HTMLAttributes<HTMLDivElement>) {
  const { history, loading, error } = usePersonaChatHistory();

  return (
    <div
      className={cn(
        "flex h-[80px] max-h-[80px] flex-col gap-4 overflow-visible",
        className,
      )}
      {...Props}
    >
      <AutomaticCarousel msDelay={10000}>
        <div className="flex h-full flex-col gap-4">
          <span>Chats Started</span>
          <NumberTicker
            value={history.length}
            className="text-3xl font-semibold text-zinc-900"
          />
        </div>
        <div className="flex h-full flex-col gap-4">
          <span>Personas Generated</span>
          <NumberTicker
            value={history.reduce(
              (acc, curr) =>
                acc +
                (curr.aiState.personas ? curr.aiState.personas.length : 0),
              0,
            )}
            className="text-3xl font-semibold text-zinc-900"
          />
        </div>
        <div className="flex h-full flex-col gap-4">
          <span>Messages Sent</span>
          <NumberTicker
            value={history.reduce(
              (acc, curr) =>
                acc +
                (curr.aiState.messages ? curr.aiState.messages.length : 0),
              0,
            )}
            className="text-3xl font-semibold text-zinc-900"
          />
        </div>
      </AutomaticCarousel>
    </div>
  );
}
