"use client";
import { cn } from "@/lib/utils";
// import { Message, useChat } from "ai/react";
import { HTMLAttributes, memo, useRef } from "react";
import {
  CommandUserInput,
  CommandUserInputKeybind,
} from "@/components/fcs-ui/cli-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExtractField } from "@/lib/types";
import { Message } from "@/services/api.service";
import ProjectAnalysis from "../images/ProjectAnalysis.gif";
import "../App.css";
import { motion } from "framer-motion";

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
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  const keyBinds: CommandUserInputKeybind[] = [
    {
      bindLabel: "Submit", // because this is a form submission, we need to use the "Submit" bindLabel and we don't need to specify an action
      key: "Enter",
      modifier: ["ctrlKey", "metaKey"],
    },
  ];

  return (
    <section
      className={cn(
        "m-2 h-[calc(100%-56px)] w-[calc(100%-16px)] relative",
        className
      )}
      {...Props}
    >
      <ScrollArea className="h-[390px]">
        {/* 120px is the height of the input and suggestions */}
        <div className="font-mono text-sm p-4 pb-[120px] flex flex-col gap-2">
          {messages.length > 0 ? (
            messages.map((message: Message, i) => {
              const Component = componentLookupTable[message.sender];
              return Component ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  key={message._id ?? i}
                  className={cn("z-10", messages.length == i + 1 ? "pb-4" : "")}
                >
                  <Component message={message} />
                </motion.div>
              ) : null;
            })
          ) : (
            <div className="flex items-center justify-center h-full">
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
      <CommandUserInput
        className={"bottom-0 absolute w-[calc(100%-16px)] m-2 z-10"}
        value={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        keyBinds={keyBinds}
        inputClassName={cn("bg-terminal placeholder:text-terminal-foreground ")}
        // @ts-ignore
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
