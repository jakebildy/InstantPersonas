"use client";

import { cn, IS_TEST_DEV_ENV } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import {
  CommandUserInput,
  CommandUserInputKeybind,
} from "@/components/ui/fcs/cli-input";
import { ScrollBar } from "@/components/ui/scroll-area";
import { PersonStandingIcon, PlusIcon } from "lucide-react";
import SubscriptionPopup from "@/components/popups/subscription-popup";
import CopyLinkPopover from "@/components/ui/copy-link-popover";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";
import useMeasure from "react-use-measure";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { motion } from "framer-motion";
import { usePersonaChat } from "@/components/context/persona/chat-context";
import { useScrollAreaState } from "@/lib/hooks";
import { AssistantMessage } from "./messages/assistant/assistant-message";
import { mapUrlBackgroundColorParamToVariant } from "../../persona-archetype-generic/utils";
import { PersonaAvatarPopover } from "../../persona-archetype-generic/persona-avatar-popover";
import { GradientButton } from "@/components/ui/gradient-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GearIcon } from "@radix-ui/react-icons";

type Props = {
  className?: string;
};

export default function Chat({ className }: Props) {
  const [input, setInput] = useState("");
  const { isSubscribed } = useInstantPersonasUser();
  const [showSubscriptionPromptDialog, setShowSubscriptionPromptDialog] =
    useState<boolean>(false);
  const {
    shareLink,
    aiState,
    personas,
    messages,
    suggestedMessages,
    setSuggestedMessages,
    handleSubmit,
    resetChatId,
  } = usePersonaChat();

  const keyBinds: CommandUserInputKeybind[] = [
    {
      bindLabel: "Submit", // because this is a form submission, we need to use the "Submit" bindLabel and we don't need to specify an action
      key: "Enter",
      modifier: ["ctrlKey", "metaKey"],
    },
  ];

  //! useMeasure is currently not working as expected as of 2024-06-01
  //? The bounds are not updating correctly, https://github.com/streamich/react-use/issues/2522
  // const [scrollContainerRef, bounds] = useMeasure();
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollAreaRef, scrollAreaState] = useScrollAreaState();
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    if (scrollContainerRef.current) {
      setContainerHeight(scrollContainerRef.current.clientHeight);
    }
  }, []);

  const calculateProgressBarWidth = (numMessages: number) => {
    const a = 0.9;
    const b = -Math.log(0.1) / 8;
    return a * (1 - Math.exp(-b * numMessages));
  };

  const submitIfUserSubscribed = async (message: string) => {
    if (!isSubscribed && !IS_TEST_DEV_ENV) {
      setShowSubscriptionPromptDialog(true);
    } else {
      setInput("");
      handleSubmit(message);
    }
  };

  if (!aiState) {
    return (
      <section
        className={cn(
          "relative m-2 box-border flex h-[calc(100%-70px)] w-[calc(100%-16px)] flex-col overflow-hidden bg-background",
          className,
        )}
      >
        No state{" "}
      </section>
    );
  }

  return (
    <section
      className={cn(
        "relative m-2 box-border flex h-[calc(100%-70px)] w-[calc(100%-16px)] flex-col bg-background",
        className,
      )}
    >
      <SubscriptionPopup
        onOpenChange={setShowSubscriptionPromptDialog}
        open={IS_TEST_DEV_ENV ? false : showSubscriptionPromptDialog}
      />

      {personas && personas.length > 0 ? (
        <Popover>
          <PopoverTrigger asChild className="z-50">
            <span className="absolute right-2 top-0 -translate-y-1/3 cursor-pointer rounded-lg border border-gray-300 bg-gray-100 p-1 px-4 text-xs text-muted-foreground shadow-md transition-all duration-200 hover:scale-105 hover:border-gray-400 hover:bg-gray-200 hover:text-foreground md:hidden">
              <GearIcon className="size-4" />
            </span>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-4 rounded-2xl border border-input bg-background p-2 shadow-md">
            <GradientButton
              Icon={PersonStandingIcon}
              variant="green"
              onClick={() => resetChatId()}
            >
              New Chat
            </GradientButton>
            {shareLink ? <CopyLinkPopover link={shareLink} /> : null}
          </PopoverContent>
        </Popover>
      ) : null}
      <motion.div
        animate={{
          opacity: personas && personas.length > 0 ? 0 : 1,
          width: `${
            personas && personas.length > 0
              ? 100
              : calculateProgressBarWidth(aiState.messages?.length) * 100
          }%`,
        }}
        transition={{
          opacity: { delay: 2, duration: 0.5 },
        }}
        className="absolute top-0 z-40 h-2 rounded-full bg-green-500"
      />

      {personas && personas.length > 0 ? (
        <div className="sticky top-0 w-full p-2">
          <div className="relative mx-auto flex w-full items-center justify-center border-b pb-2">
            <GradientButton
              Icon={PersonStandingIcon}
              className={"absolute left-0 m-8 max-md:hidden"}
              variant="green"
              onClick={() => resetChatId()}
            >
              New Chat
            </GradientButton>

            {personas.map((archetype: any, i: number) => {
              const variant = mapUrlBackgroundColorParamToVariant({
                url: archetype.pictureURL,
              });
              return (
                <PersonaAvatarPopover
                  key={i}
                  {...{ archetype: archetype, variant: variant }}
                />
              );
            })}
            {shareLink ? (
              <CopyLinkPopover
                link={shareLink}
                className="absolute right-0 m-8 max-md:hidden"
              />
            ) : null}
          </div>
        </div>
      ) : null}

      <div
        className="h-full flex-1 overflow-hidden"
        ref={scrollContainerRef}
        id={"scroll-container-bounds"}
      >
        <ScrollAreaPrimitive.Root
          className={cn("relative overflow-hidden")}
          style={{
            height: containerHeight,
            width: "100%",
          }}
        >
          <ScrollAreaPrimitive.Viewport
            className="h-full w-full rounded-[inherit]"
            ref={scrollAreaRef}
          >
            <div
              className={cn(
                "pointer-events-none absolute top-0 z-50 h-20 w-full bg-gradient-to-b from-white via-slate-50/75 to-transparent transition-opacity duration-300 ease-out",
                scrollAreaState.is.atTop ? "opacity-0" : "opacity-100",
              )}
            />
            {/* 120px is the height of the input and suggestions */}
            <div className="mb-[25vh] flex flex-col gap-2 overflow-hidden p-4 font-mono text-sm">
              <AssistantMessage
                message={`Describe your product or service, and I can create a user persona.`}
              />
              {messages.map((message: any) => (
                <div key={message.id}>{message.display}</div>
              ))}
            </div>
            <div ref={scrollBottomRef} />
          </ScrollAreaPrimitive.Viewport>
          <ScrollBar />
          <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
      </div>
      <CommandUserInput
        className={"absolute bottom-0 z-10 m-2 w-[calc(100%-16px)]"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onSubmit={async (e) => {
          e.preventDefault();
          submitIfUserSubscribed(input);
        }}
        keyBinds={keyBinds}
        inputClassName={cn("bg-terminal placeholder:text-terminal-foreground ")}
      >
        {suggestedMessages && suggestedMessages.length > 0 ? (
          <div className="absolute bottom-16 ml-2 flex flex-row space-x-2">
            {suggestedMessages.map((message: string, index: number) => {
              return (
                <div
                  key={index}
                  className="cursor-pointer rounded-sm bg-gray-100 p-2 text-sm shadow-sm hover:bg-green-200"
                  onClick={async () => {
                    submitIfUserSubscribed(message);
                  }}
                >
                  {message}
                </div>
              );
            })}
          </div>
        ) : null}
      </CommandUserInput>
      <div className="pointer-events-none absolute bottom-0 h-20 w-full bg-gradient-to-t from-white via-slate-50/75 to-transparent" />
    </section>
  );
}
