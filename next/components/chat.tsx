"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Message, useChat } from "ai/react";
import {
  HTMLAttributes,
  InputHTMLAttributes,
  memo,
  useRef,
  useState,
} from "react";
import {
  CommandUserInput,
  CommandUserInputKeybind,
} from "@/components/fcs-ui/cli-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { ExtractField } from "@/lib/types";
import { useUIState, useActions } from "ai/rsc";
import { AI } from "@/app/action";
import ReactMarkdown from "react-markdown";

type Props = {
  className?: string;
};

type MemoizedComponent = React.MemoExoticComponent<
  (props: MessageComponentProps) => JSX.Element | null
>;

type ComponentLookupTableType = {
  [role in ExtractField<Message, "role">]: MemoizedComponent;
};

export default function Chat({ className }: Props) {
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useUIState<typeof AI>();
  const [input, setInput] = useState("");
  const { submitUserMessage } = useActions<typeof AI>();

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
        "m-2 h-[calc(100%-56px)] w-[calc(100%-16px)] relative bg-background",
        className
      )}
    >
      <ScrollArea className="h-[calc(100%-56px)]">
        {/* 120px is the height of the input and suggestions */}
        <div className="font-mono text-sm p-4 pb-[120px] flex flex-col gap-2">
          <PersonaMessage
            message={`Describe your product or service, and I can create a user persona.`}
          />
          {
            // View messages in UI state
            messages.map((message: any) =>
              message.role == "user" ? (
                <UserMessage key={message.id} message={message} />
              ) : (
                <div key={message.id}>{message.display}</div>
              )
            )
          }
          {/* {messages.map((message: Message, i) => {
            const Component = componentLookupTable[message.role];
            return Component ? (
              <div
                key={message.id}
                className={cn("z-10", messages.length == i + 1 ? "pb-4" : "")}
              >
                <Component message={message} />
              </div>
            ) : null;
          })} */}
        </div>
        <div ref={scrollBottomRef} />
      </ScrollArea>

      <CommandUserInput
        className={"bottom-0 absolute w-[calc(100%-16px)] m-2"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onSubmit={async (e) => {
          e.preventDefault();
          setInput("");

          // Add user message to UI state
          setMessages((currentMessages: any) => [
            ...currentMessages,
            {
              id: Date.now(),
              display: <UserMessage message={input} />,
            },
          ]);

          // Submit and get response message
          const responseMessage = await submitUserMessage(input, "null_user");
          setMessages((currentMessages: any) => [
            ...currentMessages,
            responseMessage,
          ]);
        }}
        keyBinds={keyBinds}
        inputClassName={cn("bg-terminal placeholder:text-terminal-foreground ")}
      >
        {/* <div className="flex flex-col flex-wrap ">
          <div className="flex gap-4 my-4 overflow-hidden flex-wrap">
            {[
              {
                suggestion: "Change sections to generate",
              },
              {
                suggestion: "Provide more details about the product or service",
              },
              {
                suggestion: "I need a user persona for a product manager",
              },
              {
                suggestion: "What is a user persona?",
              },
            ].map((userAction, i) => (
              <Button
                key={i}
                variant={"secondary"}
                className="text-white bg-gray-400/75 rounded-lg text-xs hover:bg-green-400"
              >
                {userAction.suggestion}
              </Button>
            ))}
          </div>
        </div> */}
      </CommandUserInput>
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

      <p className="flex items-center bg-gray-200 p-2 px-4 rounded-lg text-sm whitespace-pre-wrap">
        <ReactMarkdown className="foo">{message}</ReactMarkdown>
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
      <p className="flex items-center bg-blue-600 text-white p-2 px-4 rounded-lg text-sm whitespace-pre-wrap">
        {message}
      </p>
    </div>
  );
};

const componentLookupTable: ComponentLookupTableType = {
  user: memo(UserMessage),
  assistant: memo(PersonaMessage),
  function: memo(PersonaMessage),
  system: memo(PersonaMessage),
  tool: memo(PersonaMessage),
  data: memo(PersonaMessage),
};
