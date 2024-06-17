import React from "react";
import { Button } from "@/components/ui/button";
import { cva, cx, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  ButtonInnerHover,
  ColorVariant,
  gradientLightVariants,
} from "../variants";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

export const IconVariants = cva(
  "text-muted-foreground pb-0.5 group-hover:text-white transition-colors duration-300 ease-out",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
        xl: "size-10",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof IconVariants> {
  variant?: ColorVariant;
  iconClassName?: string;
  innerClassName?: string;
  Icon: LucideIcon;
}

/**
 * Renders a customizable gradient button with an icon, supporting multiple color variants and interactive hover effects.
 * Icons from: https://lucide.dev/icons/
 */ export const GradientButton = React.forwardRef<
  HTMLButtonElement,
  GradientButtonProps
>(
  (
    {
      className,
      iconClassName,
      innerClassName,
      variant = "blue",
      size,
      Icon,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        variant={"outline"}
        className={cn(
          "group h-fit rounded-full p-1 shadow-md hover:scale-100 hover:text-primary",
          className,
        )}
        ref={ref}
        {...props}
      >
        <span
          className={cx(
            ButtonInnerHover({ variant: variant }),
            gradientLightVariants({
              variant: variant,
              className: cn(
                "flex w-full items-center justify-center gap-2 pl-5 text-sm",
                innerClassName,
              ),
            }),
          )}
        >
          {children}
          <Icon
            className={IconVariants({
              size,
              className: iconClassName,
            })}
          />
        </span>
      </Button>
    );
  },
);

GradientButton.displayName = "GradientButton";
