import { cn } from "@/lib/utils";
import { MessageComponentProps } from "../types";

export const UserMessage = ({
  message,
  className,
  ...Props
}: MessageComponentProps) => {
  return (
    <div
<<<<<<< HEAD
      className={cn("flex items-center justify-end gap-2", className)}
      {...Props}
    >
      <p className="flex items-center whitespace-pre-wrap rounded-lg bg-blue-600 p-2 px-4 text-sm text-white">
=======
      className={cn("flex gap-2 justify-end items-center", className)}
      {...Props}
    >
      <p className="flex items-center bg-blue-600 text-white p-2 px-4 rounded-lg text-sm whitespace-pre-wrap">
>>>>>>> 9032273 (refactor(generative-ui): message folder structure and imports (fixed issue))
        {message}
      </p>
    </div>
  );
};
