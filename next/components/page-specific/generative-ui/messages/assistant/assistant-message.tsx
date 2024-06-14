import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { MessageComponentProps } from "../types";
import Image from "next/image";

export const AssistantMessage = ({
  message,
  className,
  ...Props
}: MessageComponentProps) => {
  return (
    <div className={cn("flex gap-2", className)} {...Props}>
      {/* 32px + 16px = 48px ~ image width + gap */}
      <div className="flex h-8 w-8 items-center">
        <Image
          src={"/instant_personas_logo.png"}
          alt={"Instant Personas Logo"}
          width={32}
          height={32}
          priority
          className={cn("min-w-8 object-contain")}
        />
      </div>

      <div className="flex items-center whitespace-pre-wrap rounded-lg bg-gray-200 p-2 px-4 text-sm">
        <ReactMarkdown className="foo">{message}</ReactMarkdown>
      </div>
    </div>
  );
};
