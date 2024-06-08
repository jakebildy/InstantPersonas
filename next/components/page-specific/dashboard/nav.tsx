"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

type SiteLink = {
  title: string;
  label?: string;
  icon: LucideIcon;
  href: string;
  variant: "default" | "ghost";
};

export interface NavProps {
  isCollapsed: boolean;
  links: SiteLink[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href ? link.href : "#"}
                  className={cn(
                    buttonVariants({ variant: link.variant, size: "icon" }),
                    "h-9 w-9 transition-colors duration-200",
                    link.variant === "default"
                      ? "bg-green-100 text-green-500 hover:text-white"
                      : "text-slate-500 hover:text-slate-900",
                  )}
                >
                  <link.icon className={"h-4 w-4"} />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href={link.href ? link.href : "#"}
              id={link.title}
              className={cn(
                buttonVariants({ variant: link.variant, size: "sm" }),
                link.variant === "default"
                  ? "bg-green-100 text-black hover:text-white"
                  : "text-slate-500",
                "group/item justify-start font-jost font-bold",
              )}
            >
              <link.icon
                className={cn(
                  link.variant === "default"
                    ? "text-green-500 group-hover/item:text-white"
                    : "text-slate-200 group-hover/item:text-slate-500",
                  "mr-2 h-4 w-4 transition-colors duration-200",
                )}
              />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === "default"
                      ? "bg-green-50"
                      : "text-slate-500",
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}
