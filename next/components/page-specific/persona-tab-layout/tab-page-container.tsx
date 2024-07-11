import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function TabPageContainer({
  children,
  className,
  ...Props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex h-full flex-1 flex-col justify-center font-jost")}
      {...Props}
    >
      <div className="relative m-2 box-border flex h-[calc(100%-70px)] min-h-[400px] w-[calc(100%-16px)] flex-1 flex-col gap-4 overflow-auto rounded-lg border bg-background p-2">
        {children}
      </div>
    </div>
  );
}
