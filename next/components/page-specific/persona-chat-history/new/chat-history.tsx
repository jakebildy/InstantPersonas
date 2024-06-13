import { usePersonaChatHistory } from "@/components/context/persona/history-context";
import { SelectArchetypeWidget } from "@/components/toolfolio/selected-personas/select-from-sidebar/select-archetype-widget";
import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";
import GradientScroll from "./gradient-scroll";
import { PersonaChatType } from "@/app/(server)/models/personachat.model";
import { cn, timeAgo } from "@/lib/utils";
import {
  avatarVariants,
  background600,
  gradientVariants,
  textColorVariants,
  textLightColorVariants,
} from "@/components/variants";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { PersonStandingIcon } from "lucide-react";
import {
  ArrowTopRightIcon,
  CalendarIcon,
  ChatBubbleIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
import Link from "next/link";

type Props = {};

export default function ChatHistory({}: Props) {
  const { history, loading, error } = usePersonaChatHistory();

  if (loading || !history || !history[0]?.aiState) {
    return <div>Loading...</div>;
  }

  return (
    <GradientScroll>
      <div className="flex flex-col gap-2 overflow-hidden p-4 font-mono text-sm">
        {history.map((chat, i) => (
          <ChatGroup chat={chat} key={i} index={i + 1} />
        ))}
      </div>
    </GradientScroll>
  );
}

function ChatGroup({ chat, index }: { chat: PersonaChatType; index: number }) {
  if (!chat.aiState.personas) return null;

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl border border-dashed border-black/10 bg-white/50 transition-colors duration-150 ease-out",
      )}
    >
      <div className="flex justify-between p-2">
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="grid size-6 place-items-center rounded-full border border-black/10 bg-white/50">
              <span className="text-xs">{index}</span>
            </div>
            <span>Instant Personas Saas Business</span>
          </div>

          <div className="ml-8 flex flex-wrap gap-1 pr-10">
            {chat.aiState.personas.map((persona, i) => (
              <PersonaBadge archetype={persona} key={i} />
            ))}
          </div>
        </div>
        <div className="flex min-w-[120px] flex-col items-end gap-1">
          <span>Increasing Revenue</span>

          <div
            className={
              "flex w-fit items-center justify-between gap-1 rounded-2xl bg-gray-400/10 py-1 pl-1 pr-2"
            }
          >
            <PersonStandingIcon className="size-4" />
            <span className="text-xs">{chat.aiState.personas.length}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between border-t border-dashed border-black/10 p-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2 text-xs">
            <ChatBubbleIcon className="size-3" />
            <span>{`${chat.aiState.messages.length} Messages`}</span>
          </div>
          {chat.createdAt ? (
            <div className="flex items-center gap-2 px-2 text-xs">
              <CalendarIcon className="size-3" />
              <span>{`Created ${timeAgo(new Date(chat.createdAt))}`}</span>
            </div>
          ) : null}
          {chat.updatedAt ? (
            <div className="flex items-center gap-2 px-2 text-xs">
              <StopwatchIcon className="size-3" />
              <span>{`Last Updated ${timeAgo(new Date(chat.updatedAt))}`}</span>
            </div>
          ) : null}
        </div>

        <Link
          href={`/persona/${chat._id}`}
          className={gradientVariants({
            variant: "blue",
            className:
              "flex items-center gap-2 rounded-2xl bg-gradient-to-r p-1 px-2 text-xs transition-transform duration-150 ease-out hover:scale-105",
          })}
        >
          <span>Open Chat</span>
          <ArrowTopRightIcon className="size-3" />
        </Link>
      </div>
    </div>
  );
}

function PersonaBadge({ archetype }: { archetype: PersonaArchetype }) {
  const avatarFallbackName =
    archetype.archetype_name ||
    "Persona Archetype"
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");

  const variant = mapUrlBackgroundColorParamToVariant({
    url: archetype.pictureURL,
  });

  return (
    <div
      className={background600({
        variant,
        className: "flex items-center gap-0.5 rounded-2xl bg-opacity-10 pr-3",
      })}
    >
      <Avatar
        className={avatarVariants({
          variant,
          size: "xs",
          interactive: false,
          className: "rounded-full",
        })}
      >
        <AvatarImage
          src={archetype.pictureURL}
          alt={[
            (
              archetype.archetype_name || "Persona Archetype"
            ).toLocaleLowerCase(),
            "persona avatar",
          ].join(" ")}
          className="rounded-full"
        />
        <AvatarFallback>{avatarFallbackName}</AvatarFallback>
      </Avatar>
      <span
        className={textColorVariants({
          variant,
          className: "text-xs",
        })}
      >
        {avatarFallbackName}
      </span>
    </div>
  );
}
