"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  HTMLAttributes,
  InputHTMLAttributes,
  memo,
  useEffect,
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
import { useUIState, useActions, useAIState } from "ai/rsc";
import { AI } from "@/app/(server)/action";
import ReactMarkdown from "react-markdown";
import { useStytchUser } from "@stytch/nextjs";
import { PersonaChat } from "@/app/(server)/models/personachat.model";
import { set } from "mongoose";
import {
  mapUrlBackgroundColorParamToVariant,
  PersonaAvatarPopover,
} from "./generative-ui/persona-avatar-popover";
import { PersonStandingIcon } from "lucide-react";
import BarLoader from "react-spinners/BarLoader";
import { Separator } from "./ui/separator";
import { Message } from "@/app/(server)/models/ai-state-type-validators";

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
  const [aiState, setAiState] = useAIState<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();
  const [personas, setPersonas] = useState<any>([]);
  const { submitUserMessage } = useActions<typeof AI>();
  const [input, setInput] = useState("");
  const user = useStytchUser();

  const keyBinds: CommandUserInputKeybind[] = [
    {
      bindLabel: "Submit", // because this is a form submission, we need to use the "Submit" bindLabel and we don't need to specify an action
      key: "Enter",
      modifier: ["ctrlKey", "metaKey"],
    },
  ];

  useEffect(() => {
    if (aiState) {
      setPersonas(aiState.personas);
    }
    console.log(aiState);
  }, [aiState, setPersonas]);

  return (
    <section
      className={cn(
        "m-2 h-[calc(100%-70px)] w-[calc(100%-16px)] relative bg-background box-border overflow-hidden",
        className
      )}
    >
      {personas && personas.length > 0 ? (
        <div className="flex items-center justify-center m-2 w-full mx-auto border-b pb-2 relative">
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
          <PersonStandingIcon className="text-muted-foreground absolute right-0 m-8" />
        </div>
      ) : null}

      <ScrollArea className="h-[calc(100%)]">
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
      </ScrollArea>

      <CommandUserInput
        className={"bottom-0 absolute w-[calc(100%-16px)] m-2 z-10"}
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
          const responseMessage = await submitUserMessage(
            input,
            user.user?.user_id
          );
          setMessages((currentMessages: any) => [
            ...currentMessages,
            responseMessage,
          ]);
        }}
        keyBinds={keyBinds}
        inputClassName={cn("bg-terminal placeholder:text-terminal-foreground ")}
      ></CommandUserInput>
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

const componentLookupTable: ComponentLookupTableType = {
  user: memo(UserMessage),
  assistant: memo(PersonaMessage),
  function: memo(PersonaMessage),
  system: memo(PersonaMessage),
  tool: memo(PersonaMessage),
  data: memo(PersonaMessage),
};
