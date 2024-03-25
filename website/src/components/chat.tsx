"use client";
import { cn } from "@/lib/utils";
// import { Message, useChat } from "ai/react";
import { HTMLAttributes, memo, useEffect, useRef, useState } from "react";
import {
  CommandUserInput,
  CommandUserInputKeybind,
} from "@/components/fcs-ui/cli-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExtractField } from "@/lib/types";
import { Message } from "@/services/api.service";
import ProjectAnalysis from "../images/ProjectAnalysis.gif";
import "../App.css";
import { easeInOut, motion } from "framer-motion";
import { Button } from "./ui/button";

interface Props extends HTMLAttributes<HTMLDivElement> {
  messages: Message[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  input: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

type MemoizedComponent = React.MemoExoticComponent<
  (props: MessageComponentProps) => JSX.Element | null
>;

type ComponentLookupTableType = {
  [role in ExtractField<Message, "sender">]: MemoizedComponent;
};

export default function Chat({
  messages,
  className,
  handleSubmit,
  handleInputChange,
  input,
  children,
  loading,
  ...Props
}: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const [minimized, setMinimized] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const [animateHeight, setAnimateHeight] = useState<boolean>(false);

  const keyBinds: CommandUserInputKeybind[] = [
    {
      bindLabel: "Submit", // because this is a form submission, we need to use the "Submit" bindLabel and we don't need to specify an action
      key: "Enter",
      modifier: ["ctrlKey", "metaKey"],
    },
  ];

  useEffect(() => {
    // Set height on initial render
    if (inputRef.current) {
      setHeight(inputRef.current.offsetHeight);
    }

    // Update height when input changes
    const updateHeight = () => {
      if (inputRef.current) {
        if (inputRef.current.offsetHeight + 16 > height) {
          setAnimateHeight(false);
        } else {
          console.log("animate height");
          setAnimateHeight(true);
        }
        setHeight(inputRef.current.offsetHeight);
      }
    };

    // Observe the input element for changes
    const observer = new MutationObserver(updateHeight);
    if (inputRef.current) {
      observer.observe(inputRef.current, {
        childList: true, // Observe direct children changes
        subtree: true, // Observe all descendants
        characterData: true, // Observe text changes
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={cn(
        "m-2 h-[calc(100%-56px)] w-[calc(100%-16px)] relative",
        className
      )}
      {...Props}
    >
      <Button
        className="absolute top-0 max-lg:left-0 lg:right-0 -translate-y-full rounded-b-none rounded-t-md h-fit mx-4 p-1 px-4 hover:px-5 hover:py-1 hover:text-lg transition-all z-50"
        onClick={() => setMinimized((p) => !p)}
      >
        X
      </Button>
      <motion.div
        className={" w-full"}
        animate={{
          height: minimized ? `${height + 16}px` : "100%",
        }}
        transition={{ duration: animateHeight ? 0.5 : 0, ease: easeInOut }}
      >
        <ScrollArea className={"h-[390px]"}>
          {/* 120px is the height of the input and suggestions */}
          <div
            className={cn(
              "font-mono text-sm p-4 flex flex-col gap-2",
              minimized ? "" : "pb-[120px]"
            )}
          >
            {messages.length > 0 && !minimized ? (
              messages.map((message: Message, i) => {
                const Component = componentLookupTable[message.sender];
                return Component ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    key={message._id ?? i}
                    className={cn(
                      "z-10",
                      messages.length == i + 1 ? "pb-4" : ""
                    )}
                  >
                    <Component message={message} />
                  </motion.div>
                ) : null;
              })
            ) : (
              <div
                className={cn(
                  "flex items-center justify-center h-full",
                  minimized ? "hidden" : ""
                )}
              >
                <img
                  src={ProjectAnalysis}
                  alt={"Loading Chat..."}
                  className={"object-contain w-8 h-7"}
                />
              </div>
            )}
          </div>
          <div ref={scrollBottomRef} />
        </ScrollArea>
      </motion.div>
      <CommandUserInput
        className={"bottom-0 absolute w-[calc(100%-16px)] m-2 z-10"}
        value={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        keyBinds={keyBinds}
        inputClassName={cn("bg-terminal placeholder:text-terminal-foreground ")}
        // @ts-ignore
        ref={inputRef}
        loading={loading}
      >
        {children}
      </CommandUserInput>
    </section>
  );
}

interface MessageComponentProps extends HTMLAttributes<HTMLDivElement> {
  message: Message;
}

const PersonaMessage = ({
  message,
  className,
  ...Props
}: MessageComponentProps) => {
  return (
    <div className={cn("flex gap-2 items-center", className)} {...Props}>
      {/* 32px + 16px = 48px ~ image width + gap */}
      <div className="flex items-center h-8 w-8">
        <img
          src={"/instant_personas_logo.png"}
          alt={"Instant Personas Logo"}
          className="object-contain min-w-[32px]"
        />
      </div>
      <p className="flex items-center bg-gray-200 p-2 px-4 rounded-lg text-sm whitespace-pre-wrap">
        {message.text === "..." ? (
          <div className="typing">
            <div className="typing__dot"></div>
            <div className="typing__dot"></div>
            <div className="typing__dot"></div>
          </div>
        ) : message.text.startsWith("[TIKTOKS]: ") ? (
          <div>
            <div className=" flex flex-row">
              {message.text
                .replaceAll("[TIKTOKS]: ", "")
                .split(", ")
                .map((url) => {
                  return (
                    <iframe
                      width="200"
                      height="344"
                      className="p-2"
                      src={url}
                      frameBorder="0"
                      allow="accelerometer; autoplay: false; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  );
                })}
            </div>
          </div>
        ) : (
          message.text
        )}
      </p>
    </div>
  );
};

const UserMessage = ({
  message,
  className,
  ...Props
}: MessageComponentProps) => {
  return (
    <div
      className={cn("flex gap-2 justify-end items-center", className)}
      {...Props}
    >
      <p className="flex items-center bg-blue-100 p-2 px-4 rounded-lg text-sm whitespace-pre-wrap">
        {message.text}
      </p>
    </div>
  );
};

const componentLookupTable: ComponentLookupTableType = {
  user: memo(UserMessage),
  bot: memo(PersonaMessage),
};
