import { cn } from "@/lib/utils";
import { MessageComponentProps } from "../types";

export const UserMessage = ({
  message,
  className,
  ...Props
}: MessageComponentProps) => {
  return (
    <div
      className={cn("flex items-center justify-end gap-2", className)}
      {...Props}
    >
      <p className="flex items-center whitespace-pre-wrap rounded-lg bg-blue-600 p-2 px-4 text-sm text-white">
        {message}
      </p>
    </div>
  );
};
