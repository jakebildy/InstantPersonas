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

import ReactMarkdown from "react-markdown";
import { PersonStandingIcon } from "lucide-react";
import BarLoader from "react-spinners/BarLoader";
import { ClientMessage, Message } from "@/app/(server)/models/persona-ai.model";
import { useRouter } from "next/navigation";
import SubscriptionPopup from "@/components/popups/subscription-popup";
import CopyLinkPopover from "@/components/ui/copy-link-popover";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";
import useMeasure from "react-use-measure";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { motion } from "framer-motion";
import { usePersonaChat } from "@/components/context/persona/chat-context";
import { useScrollAreaState } from "@/lib/hooks";
import { UserMessage } from "./messages/user/user-message";
import { AssistantMessage } from "./messages/assistant/assistant-message";

import { mapUrlBackgroundColorParamToVariant } from "../../persona-archetype-generic/utils";
import { SystemErrorMessage } from "./messages/system/system-error-message";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PersonaAvatarPopover } from "../../persona-archetype-generic/persona-avatar-popover";
import { GradientButton } from "@/components/ui/gradient-button";

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
    submitPersonaChatUserMessage,
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    if (scrollContainerRef.current) {
      setContainerHeight(scrollContainerRef.current.clientHeight);
    }
  }, []);

  const [scrollAreaRef, scrollAreaState] = useScrollAreaState();

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
            <GradientButton
              Icon={PersonStandingIcon}
              className={"absolute left-0 m-8"}
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
                className="absolute right-0 m-8"
              />
            ) : null}
          </div>
        </div>
      ) : null}

      <div
        className="h-full flex-1"
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
                "absolute top-0 w-full h-20 z-50 bg-gradient-to-b from-white via-slate-50/75 to-transparent pointer-events-none transition-opacity duration-300 ease-out",
                scrollAreaState.is.atTop ? "opacity-0" : "opacity-100"
              )}
            />
            {/* 120px is the height of the input and suggestions */}
            <div className="font-mono text-sm p-4 mb-[25vh] flex flex-col gap-2 overflow-hidden">
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
            setMessages((currentMessages: ClientMessage[]) => [
              ...currentMessages,
              {
                id: Date.now(),
                role: "user",
                display: <UserMessage message={input} />,
              },
            ]);

            console.log("RM: input:", input);

            setHiddenSuggestedMessages(aiState.suggestedMessages);

            // Submit and get response message
            console.log("RM: user:", user);
            if (user) {
              console.log("RM: user:", user);
              const responseMessage = await submitPersonaChatUserMessage(
                input,
                user.id,
                chatId
              );
              setMessages((currentMessages: ClientMessage[]) => [
                ...currentMessages,
                responseMessage,
              ]);
            } else {
              setMessages((currentMessages: ClientMessage[]) => [
                ...currentMessages,
                {
                  id: Date.now(),
                  role: "assistant",
                  display: (
                    <SystemErrorMessage
                      message={
                        <div className="flex flex-col w-full gap-2">
                          <span>
                            Looks like your session is no longer valid, please
                            log in again!
                          </span>
                          <Button variant={"outline"} size={"sm"} asChild>
                            <Link href="/login">Log in</Link>
                          </Button>
                        </div>
                      }
                    />
                  ),
                },
              ]);
            }
          }
        }}
        keyBinds={keyBinds}
        inputClassName={cn("bg-terminal placeholder:text-terminal-foreground ")}
      >
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
                        const responseMessage =
                          await submitPersonaChatUserMessage(
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
