import { usePersonaChatHistory } from "@/components/context/persona/history-context";
import GradientScroll from "./gradient-scroll";
import { PersonaChatType } from "@/app/(server)/models/personachat.model";
import { cn, timeAgo } from "@/lib/utils";
import { gradientVariants } from "@/components/variants";
import { PersonStandingIcon } from "lucide-react";
import {
  ArrowTopRightIcon,
  CalendarIcon,
  ChatBubbleIcon,
  MagicWandIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

import Link from "next/link";
import { PersonaBadge } from "@/components/persona-archetype-generic/persona-badge";

type Props = {};

export default function ChatHistory({}: Props) {
  const { history, loading, error } = usePersonaChatHistory();

  if (loading || !history || !history[0]?.aiState) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full min-h-[600px] flex-1 flex-col">
      <GradientScroll>
        <div className="flex flex-col gap-2 overflow-hidden p-4 font-mono text-sm">
          {history.map((chat, i) => (
            <ChatGroup chat={chat} key={i} index={i + 1} />
          ))}
        </div>
      </GradientScroll>
    </div>
  );
}

function ChatGroup({ chat, index }: { chat: PersonaChatType; index: number }) {
  if (!chat.aiState.personas) return null;

  return (
    <Link
      href={`/persona/${chat._id}`}
      className={cn(
        "flex flex-col gap-2 rounded-xl border border-dashed border-black/10 bg-white/75 font-jost shadow-sm transition-all duration-500 ease-out hover:scale-[102%] hover:bg-white hover:shadow-xl",
      )}
    >
      <div className="relative flex w-full flex-1 flex-col gap-1 p-2">
        <div className="flex items-start justify-between gap-2 max-sm:flex-col">
          <div className="flex w-full items-center gap-2 font-semibold">
            <div className="grid size-6 place-items-center rounded-full border border-black/10 bg-white/50 max-sm:hidden">
              <span className="text-xs">{index}</span>
            </div>
            <span>{chat.aiState.threadMetadata?.title ?? "New Chat"}</span>
          </div>
          <span className="whitespace-pre-wrap text-wrap text-xs sm:text-right">
            {chat.aiState.threadMetadata?.description ?? "Start Conversing"}
          </span>
        </div>
        <div className="flex items-start justify-between gap-2 pt-2 max-md:flex-col">
          <div className="flex flex-wrap gap-1 md:ml-8 md:min-w-96">
            {chat.aiState.personas.length > 0 ? (
              chat.aiState.personas.map((persona, i) => (
                <PersonaBadge archetype={persona} key={i} />
              ))
            ) : (
              <button
                tabIndex={0}
                className={gradientVariants({
                  variant: "purple",
                  className:
                    "flex h-6 min-w-0 items-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r p-1 px-2 text-xs shadow-sm transition-all duration-300 ease-out hover:-translate-x-2 hover:scale-105 hover:px-4 hover:shadow-md",
                })}
              >
                <span>Start Generating Personas</span>
                <MagicWandIcon className="size-3" />
              </button>
            )}
          </div>
          <div
            className={
              "mt-1 flex w-fit items-center justify-between gap-1 rounded-2xl bg-gray-400/10 py-1 pl-1 pr-2"
            }
          >
            <PersonStandingIcon className="size-4" />
            <span className="text-xs">{chat.aiState.personas.length}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2 border-t border-dashed border-black/10 p-2 max-md:flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 px-2 text-xs">
            <ChatBubbleIcon className="size-3" />
            <span className="min-w-0 whitespace-nowrap">{`${chat.aiState.messages.length} Messages`}</span>
          </div>
          {chat.createdAt ? (
            <div className="flex items-center gap-2 px-2 text-xs">
              <CalendarIcon className="size-3" />
              <span className="min-w-0 whitespace-nowrap">{`Created ${timeAgo(new Date(chat.createdAt))}`}</span>
            </div>
          ) : null}
          {chat.updatedAt ? (
            <div className="flex items-center gap-2 px-2 text-xs">
              <StopwatchIcon className="size-3" />
              <span className="min-w-0 whitespace-nowrap">{`Last Updated ${timeAgo(new Date(chat.updatedAt))}`}</span>
            </div>
          ) : null}
        </div>

        <button
          tabIndex={0}
          className={gradientVariants({
            variant: "blue",
            className:
              "flex h-6 min-w-0 items-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r p-1 px-2 text-xs shadow-sm transition-all duration-300 ease-out hover:-translate-x-2 hover:scale-105 hover:px-4 hover:shadow-md",
          })}
        >
          <span>Open Chat</span>
          <ArrowTopRightIcon className="size-3" />
        </button>
      </div>
    </Link>
  );
}
