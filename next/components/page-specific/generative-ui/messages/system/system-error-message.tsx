import { cn } from "@/lib/utils";
import Image from "next/image";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { HTMLAttributes, ReactNode } from "react";

export interface SystemComponentProps extends HTMLAttributes<HTMLDivElement> {
  message: ReactNode;
}

export const SystemErrorMessage = ({
  message,
  className,
  ...Props
}: SystemComponentProps) => {
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

      <div className="flex flex-col items-center gap-1 whitespace-pre-wrap rounded-lg border border-pastel-red bg-pastel-red/50 p-2 px-4 text-sm text-red-500">
        <div className="flex w-full items-center justify-between gap-4">
          <span className="font-jost font-semibold">
            System Error: Message from Instant Personas
          </span>
          <ExclamationTriangleIcon className="text-red-500" />
        </div>
        {message}
      </div>
    </div>
  );
};
