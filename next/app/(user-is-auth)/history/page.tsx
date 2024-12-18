"use client";

import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";
import { usePersonaChatHistory } from "@/components/context/persona/history-context";
import { SelectArchetypeWidget } from "@/components/toolfolio/selected-personas/select-from-sidebar/select-archetype-widget";
import AutomaticCarousel from "@/components/ui/fcs/automatic-carousel";
import NumberTicker from "@/components/ui/magicui/number-ticker";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { useScrollAreaState } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { PersonStandingIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { ScrollBar } from "@/components/ui/scroll-area";
import UserHistoryChatStatsCarousel from "@/components/page-specific/persona-chat-history/new/user-history-chat-stats-carousel";
import PersonaHistory from "@/components/page-specific/persona-chat-history/new/persona-history";
import { GradientButton } from "@/components/ui/gradient-button";
import { usePersonaChat } from "@/components/context/persona/chat-context";
import ChatHistory from "@/components/page-specific/persona-chat-history/new/chat-history";
import { HistoryLoading } from "./loading-state";
import { useShowSlackPopup } from "@/components/popups/slack/useShowSlackPopup";
import { SlackPopup } from "@/components/popups/slack/slack-popup";

export default function HistoryPage({}: {}) {
  const { resetChatId } = usePersonaChat();
  const { history, loading, error } = usePersonaChatHistory();
  const [showSlackPopup, setShowSlackPopup] = useShowSlackPopup();

  if (loading || !history || error) {
    return <HistoryLoading />;
  }

  return (
    <main className="grid min-h-screen grid-cols-12 grid-rows-[auto_auto_1fr] gap-4 p-2 transition-all duration-700 ease-out md:p-10 xl:h-[calc(100dvh-2px)] xl:grid-rows-[auto_1fr] xl:overflow-hidden">
      {/* <SlackPopup open={showSlackPopup} onOpenChange={setShowSlackPopup} /> */}
      {/* Header */}
      <div
        className={cn(
          "col-span-12 md:col-span-8",
          "flex flex-col gap-4 rounded-xl border border-zinc-300 bg-zinc-200 p-4 transition-colors duration-150 ease-out",
          "relative",
        )}
      >
        <h1 className="text-3xl font-semibold text-zinc-900">History</h1>

        <span className="text-sm font-light">
          This is where you can view your history of interactions with the
          assistant.
        </span>
      </div>
      <div
        className={cn(
          "hidden md:col-span-4 md:flex",
          "flex-col gap-4 rounded-xl border border-zinc-300 bg-zinc-200 p-4 transition-colors duration-150 ease-out",
          "relative",
        )}
      >
        <PersonStandingIcon className="absolute right-0 top-0 m-4 text-muted-foreground" />
        <UserHistoryChatStatsCarousel />
      </div>
      {/* Main Section */}
      <div
        className={cn(
          "order-2 col-span-12 h-full xl:order-1 xl:col-span-4",
          "flex flex-col rounded-xl border border-zinc-300 bg-zinc-200 transition-colors duration-150 ease-out",
          "relative",
        )}
      >
        <h2 className="p-4 pb-0 text-lg font-medium">Personas</h2>
        <PersonaHistory />
      </div>
      <div
        className={cn(
          "order-1 col-span-12 h-full xl:order-2 xl:col-span-8",
          "flex flex-col rounded-xl border border-zinc-300 bg-zinc-200 transition-colors duration-150 ease-out",
          "relative",
        )}
      >
        <div className="flex items-center justify-between gap-4 p-4">
          <h2 className="text-lg font-medium">Chats</h2>
          <GradientButton
            Icon={PersonStandingIcon}
            variant="green"
            innerClassName="max-h-8 text-xs"
            onClick={() => resetChatId()}
          >
            New Chat
          </GradientButton>
        </div>
        <ChatHistory />
      </div>
    </main>
  );
}
