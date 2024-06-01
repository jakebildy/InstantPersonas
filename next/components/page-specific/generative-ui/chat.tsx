"use client";
import Image from "next/image";
import { cn, IS_TEST_DEV_ENV } from "@/lib/utils";
import { HTMLAttributes, memo, use, useEffect, useRef, useState } from "react";
import {
  CommandUserInput,
  CommandUserInputKeybind,
} from "@/components/ui/fcs/cli-input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ExtractField } from "@/lib/types";
import { useUIState, useActions, useAIState } from "ai/rsc";
import { AI } from "@/app/(server)/action";
import ReactMarkdown from "react-markdown";
import { PersonaAvatarPopover } from "./persona-avatar-popover";
import { PersonStandingIcon } from "lucide-react";
import BarLoader from "react-spinners/BarLoader";
import { Message } from "@/app/(server)/models/ai-state-type-validators";
import { useRouter } from "next/navigation";
import SubscriptionPopup from "@/components/popups/subscription-popup";
import { mapUrlBackgroundColorParamToVariant } from "./persona-avatar-popover/utils";
import CopyLinkPopover from "@/components/ui/copy-link-popover";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";
import useMeasure from "react-use-measure";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { motion } from "framer-motion";
import { usePersonaChat } from "@/components/context/persona/chat-context";

type Props = {
  className?: string;
};

export default function Chat({ className }: Props) {
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");
  const { user, isSubscribed } = useInstantPersonasUser();
  const [showSubscriptionPromptDialog, setShowSubscriptionPromptDialog] =
    useState<boolean>(false);
  const [hiddenSuggestedMessages, setHiddenSuggestedMessages] = useState<
    string[]
  >([]);
  const {
    chatId,
    shareLink,
    aiState,
    personas,
    messages,
    setMessages,
    submitUserMessage,
  } = usePersonaChat();

  const keyBinds: CommandUserInputKeybind[] = [
    {
      bindLabel: "Submit", // because this is a form submission, we need to use the "Submit" bindLabel and we don't need to specify an action
      key: "Enter",
      modifier: ["ctrlKey", "metaKey"],
    },
  ];

  const [scrollContainerRef, bounds] = useMeasure();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [scrollAreaIsAtTop, setScrollAreaIsAtTop] = useState(true);

  useEffect(() => {
    const checkScrollTop = () => {
      if (scrollAreaRef.current) {
        setScrollAreaIsAtTop(scrollAreaRef.current.scrollTop === 0);
      }
    };

    // Add event listener
    const currentRef = scrollAreaRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScrollTop);
    }

    // Remove event listener on cleanup
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScrollTop);
      }
    };
  }, [scrollAreaRef]);

  const calculateProgressBarWidth = (numMessages: number) => {
    const a = 0.9;
    const b = -Math.log(0.1) / 8;
    return a * (1 - Math.exp(-b * numMessages));
  };

  if (!aiState) {
    return (
      <section
        className={cn(
          "m-2 h-[calc(100%-70px)] w-[calc(100%-16px)] flex flex-col relative bg-background box-border overflow-hidden",
          className
        )}
      >
        No state{" "}
      </section>
    );
  }

  return (
    <section
      className={cn(
        "m-2 h-[calc(100%-70px)] w-[calc(100%-16px)] flex flex-col relative bg-background box-border overflow-hidden",
        className
      )}
    >
      <SubscriptionPopup
        setOpenSubscriptionPopup={setShowSubscriptionPromptDialog}
        openSubscriptionPopup={
          IS_TEST_DEV_ENV ? false : showSubscriptionPromptDialog
        }
      />

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
        className="absolute top-0 h-2 bg-green-500 rounded-full z-[400]"
      />

      {personas && personas.length > 0 ? (
        <div className="w-full p-2 sticky top-0">
          <div className="flex items-center justify-center w-full mx-auto border-b pb-2 relative">
            <PersonStandingIcon className="text-muted-foreground absolute left-0 m-8" />
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
                className="absolute right-0 m-8"
              />
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="h-full flex-1" ref={scrollContainerRef}>
        <ScrollAreaPrimitive.Root
          className={cn("relative overflow-hidden")}
          style={{
            height: bounds.height,
            width: "100%",
          }}
        >
          <ScrollAreaPrimitive.Viewport
            className="h-full w-full rounded-[inherit]"
            ref={scrollAreaRef}
          >
            <div
              className={cn(
                "absolute top-0 w-full h-20 z-50 bg-gradient-to-b from-white via-slate-50/75 to-transparent pointer-events-none transition-opacity duration-300 ease-out",
                scrollAreaIsAtTop ? "opacity-0" : "opacity-100"
              )}
            />
            {/* 120px is the height of the input and suggestions */}
            <div className="font-mono text-sm p-4 mb-[25vh] flex flex-col gap-2 overflow-hidden">
              <PersonaMessage
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
        className={"bottom-0 absolute w-[calc(100%-16px)] m-2 z-10"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onSubmit={async (e) => {
          e.preventDefault();

          if (!isSubscribed && !IS_TEST_DEV_ENV) {
            setShowSubscriptionPromptDialog(true);
          } else {
            setInput("");
            // Add user message to UI state
            setMessages((currentMessages: any) => [
              ...currentMessages,
              {
                id: Date.now(),
                display: <UserMessage message={input} />,
              },
            ]);

            setHiddenSuggestedMessages(aiState.suggestedMessages);

            // Submit and get response message
            if (user) {
              const responseMessage = await submitUserMessage(
                input,
                user.id,
                chatId
              );
              setMessages((currentMessages: any) => [
                ...currentMessages,
                responseMessage,
              ]);
            }
          }
        }}
        keyBinds={keyBinds}
        inputClassName={cn("bg-terminal placeholder:text-terminal-foreground ")}
      >
        {" "}
        {aiState.suggestedMessages === undefined ||
        aiState.suggestedMessages === hiddenSuggestedMessages ? (
          <div />
        ) : (
          <div className="bottom-16 ml-2 absolute flex flex-row space-x-2">
            {aiState.suggestedMessages.map((message: string, index: number) => {
              return (
                <div
                  key={index}
                  className="bg-gray-100 shadow-sm  rounded-sm p-2 text-sm hover:bg-green-200 cursor-pointer"
                  onClick={async () => {
                    if (!isSubscribed && !IS_TEST_DEV_ENV) {
                      setShowSubscriptionPromptDialog(true);
                    } else {
                      setInput("");
                      // Add user message to UI state
                      setMessages((currentMessages: any) => [
                        ...currentMessages,
                        {
                          id: Date.now(),
                          display: <UserMessage message={message} />,
                        },
                      ]);

                      // Submit and get response message

                      setHiddenSuggestedMessages(aiState.suggestedMessages);

                      if (user) {
                        const responseMessage = await submitUserMessage(
                          message,
                          user.id,
                          chatId
                        );
                        setMessages((currentMessages: any) => [
                          ...currentMessages,
                          responseMessage,
                        ]);
                      }
                    }
                  }}
                >
                  {message}
                </div>
              );
            })}
          </div>
        )}
      </CommandUserInput>
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white via-slate-50/75 to-transparent pointer-events-none" />
    </section>
  );
}

interface MessageComponentProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
}

export const PersonaMessage = ({
  message,
  className,
  ...Props
}: MessageComponentProps) => {
  return (
    <div className={cn("flex gap-2", className)} {...Props}>
      {/* 32px + 16px = 48px ~ image width + gap */}
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
        <ReactMarkdown className="foo">{message}</ReactMarkdown>
      </div>
    </div>
  );
};

export const PersonaInitial = () => {
  return (
    <div className={cn("flex gap-2")}>
      {/* 32px + 16px = 48px ~ image width + gap */}
      <div className="flex items-center h-full w-[calc(32px+16px)]">
        <Image
          src={"/instant_personas_logo.png"}
          alt={"Instant Personas Logo"}
          width={32}
          height={28}
          priority
          className={cn("object-contain")}
        />
      </div>

      <div className="flex items-center bg-gray-200 p-2 px-4 rounded-lg text-sm whitespace-pre-wrap">
        <BarLoader color="#36d7b7" />
      </div>
    </div>
  );
};

export const UserMessage = ({
  message,
  className,
  ...Props
}: MessageComponentProps) => {
  return (
    <div
      className={cn("flex gap-2 justify-end items-center", className)}
      {...Props}
    >
      <p className="flex items-center bg-blue-600 text-white p-2 px-4 rounded-lg text-sm whitespace-pre-wrap">
        {message}
      </p>
    </div>
  );
};
