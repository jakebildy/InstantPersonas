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

      <div className="flex flex-col items-center bg-pastel-red/50 text-red-500 border-pastel-red border p-2 px-4 rounded-lg text-sm whitespace-pre-wrap gap-1">
        <div className="flex items-center justify-between gap-4 w-full">
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
