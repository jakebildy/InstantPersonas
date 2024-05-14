import React from "react";
import { Button } from "@/components/ui/button";
import { cx } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  ButtonInnerHover,
  ColorVariant,
  gradientLightVariants,
} from "./variants";
import { LucideIcon } from "lucide-react";

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ColorVariant;
  Icon: LucideIcon;
}

export const GradientButton = React.forwardRef<
  HTMLButtonElement,
  GradientButtonProps
>(({ className, variant = "blue", Icon, children, ...props }, ref) => {
  return (
    <Button
      variant={"outline"}
      className={cn(
        "hover:text-primary rounded-full hover:scale-100 h-fit  p-1 shadow-md group",
        className
      )}
      ref={ref}
      {...props}
    >
      <span
        className={cx(
          ButtonInnerHover({ variant: variant }),
          gradientLightVariants({
            variant: variant,
            className: "pl-5 flex items-center gap-2 text-sm",
          })
        )}
      >
        {children}
        <Icon className="text-muted-foreground pb-0.5 size-4 group-hover:text-white transition-colors duration-300 ease-out" />
      </span>
    </Button>
  );
});

GradientButton.displayName = "GradientButton";
