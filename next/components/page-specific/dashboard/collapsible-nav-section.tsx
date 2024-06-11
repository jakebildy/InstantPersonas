"use client";
import React, { useState } from "react";
import { Nav, NavProps } from "./nav";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CaretDownIcon,
} from "@radix-ui/react-icons";

type Props = {
  title: {
    collapsed: string;
    expanded: string;
  };
  links: NavProps;
  defaultCollapsed?: boolean;
};

export default function CollapsibleNavSection({
  title,
  links,
  defaultCollapsed = false,
}: Props) {
  const [sectionIsOpen, setSectionIsOpen] = useState(!defaultCollapsed);

  const sectionContainsActiveLink = links.links.some(
    (link) => link.variant === "default"
  );

  return (
    <Collapsible open={sectionIsOpen} onOpenChange={setSectionIsOpen}>
      <CollapsibleTrigger
        className={cn(
          " font-bold text-xs mt-4 flex items-center w-full  transition-all duration-300 ease-out",
          links.isCollapsed
            ? "text-center justify-center"
            : "ml-5 text-left gap-1",
          sectionIsOpen
            ? "text-slate-600 hover:text-slate-900"
            : "text-slate-300 hover:text-slate-500",

          sectionContainsActiveLink ? "text-green-500 hover:text-green-700" : ""
        )}
      >
        {links.isCollapsed ? title.collapsed : title.expanded}
        <CaretDownIcon
          className={cn(
            "size-4 transition-all duration-300 ease-out",
            sectionIsOpen ? "" : "-rotate-90",
            links.isCollapsed ? "hidden" : ""
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Nav {...links} />
      </CollapsibleContent>
    </Collapsible>
  );
}
