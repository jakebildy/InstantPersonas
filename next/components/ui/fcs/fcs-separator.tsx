import React from "react";
import { Separator as ShadSeperator } from "@/components/ui/separator";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function Separator({ text, ...Props }: SeparatorProps) {
  return (
    <div {...Props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <ShadSeperator />
        </div>
        {text && (
          <div className="relative flex justify-center text-xs uppercase">
            <span className="rounded-lg border border-border bg-background px-2 text-accent-foreground/75 dark:text-muted-foreground">
              {text}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
