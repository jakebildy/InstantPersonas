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

interface Props extends HTMLAttributes<HTMLDivElement> {
  messages: Message[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  input: string;
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
      <ScrollArea className="h-[calc(100%-56px)]">
        {/* 120px is the height of the input and suggestions */}
        <div className="font-mono text-sm p-4 pb-[120px] flex flex-col gap-2">
          {messages.map((message: Message, i) => {
            const Component = componentLookupTable[message.sender];
            return Component ? (
              <div
                key={i}
                className={cn("-z-10", messages.length == i + 1 ? "pb-4" : "")}
              >
                <Component message={message} />
              </div>
            ) : null;
          })}
        </div>
        <div ref={scrollBottomRef} />
      </ScrollArea>
      <CommandUserInput
        className={"bottom-0 absolute w-[calc(100%-16px)] m-2"}
        value={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        keyBinds={keyBinds}
        inputClassName={cn("bg-terminal placeholder:text-terminal-foreground ")}
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
    <div className={cn("flex gap-2", className)} {...Props}>
      {/* 32px + 16px = 48px ~ image width + gap */}
      <div className="flex items-center h-full w-[calc(32px+16px)]">
        <img
          src={"/instant_personas_logo.png"}
          alt={"Instant Personas Logo"}
          // width={32}
          // height={28}
          // priority
          className={cn("object-contain w-8 h-7")}
        />
      </div>

      <p className="flex items-center bg-gray-200 p-2 px-4 rounded-lg text-sm whitespace-pre-wrap">
        {message.text}
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
    <div className={cn("flex gap-2 justify-end", className)} {...Props}>
      <p className="flex items-center bg-gray-200 p-2 px-4 rounded-lg text-sm whitespace-pre-wrap">
        {message.text}
      </p>
      <div className="flex items-center h-full">
        <img
          src={"/test_avatar.jpg"}
          alt={"User Avatar"}
          // width={32}
          // height={28}
          // priority
          className={cn("object-contain rounded-full w-8 h-7")}
        />
      </div>
    </div>
  );
};

const componentLookupTable: ComponentLookupTableType = {
  user: memo(UserMessage),
  //@ts-ignore
  assistant: memo(PersonaMessage),
  function: memo(PersonaMessage),
  system: memo(PersonaMessage),
  tool: memo(PersonaMessage),
  data: memo(PersonaMessage),
};
