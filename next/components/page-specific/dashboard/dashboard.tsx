"use client";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { InstantPersonas } from "@/components/instantPersonas";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useMediaQuery } from "@/lib/hooks";
import {
  SEO_LINKS as TOOLS,
  SIDEBAR_LINKS,
  UNDERSTAND_TOOLS,
} from "@/lib/site";
import { usePathname } from "next/navigation";
import CollapsibleNavSection from "./collapsible-nav-section";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const defaultLayout = [265, 440, 655];
  const navCollapsedSize = 4;
  const canExpandSidebar = useMediaQuery("(min-width: 1025px)");
  const pathname = usePathname();

  // Expanded Sidebar needs to be at least 205px and has constraint of 20% of the screen
  // 205 * 5 = 1025px
  useEffect(() => {
    if (!canExpandSidebar) {
      setIsCollapsed(true);
      document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
        true,
      )}`;
    } else {
      setIsCollapsed(false);
      document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
        false,
      )}`;
    }
  }, [canExpandSidebar]);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full rounded-xl border border-border"
      >
        {/* Sidebar */}
        <ResizablePanel
          defaultSize={18}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={18}
          maxSize={canExpandSidebar ? 25 : 18}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true,
            )}`;
          }}
          onExpand={() => {
            if (canExpandSidebar) {
              setIsCollapsed(false);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                false,
              )}`;
            }
          }}
          className={cn(
            "bg-background",
            isCollapsed
              ? "min-w-[50px] max-w-[80px] transition-all duration-300 ease-in-out"
              : "min-w-[240px] max-w-[350px]",
            !canExpandSidebar && "max-w-[50px]",
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2",
            )}
          >
            <InstantPersonas isCollapsed={isCollapsed} />
          </div>
          <Separator />
          <CollapsibleNavSection
            title={{
              collapsed: "Learn",
              expanded: "Understand Your Audience",
            }}
            links={{
              isCollapsed,
              links: UNDERSTAND_TOOLS.map((element) => ({
                ...element,
                variant: pathname === element.href ? "default" : "ghost",
              })),
            }}
          />

          <Separator />

          <CollapsibleNavSection
            title={{
              collapsed: "Account",
              expanded: "My Account",
            }}
            links={{
              isCollapsed,
              links: SIDEBAR_LINKS.map((element) => ({
                ...element,
                variant: pathname === element.href ? "default" : "ghost",
              })),
            }}
          />

          <CollapsibleNavSection
            title={{
              collapsed: "Reach",
              expanded: "Reach Your Audience",
            }}
            links={{
              isCollapsed,
              links: TOOLS.filter((tool) => tool.section === "Reach").map(
                (element) => ({
                  ...element,
                  variant: pathname === element.href ? "default" : "ghost",
                }),
              ),
            }}
          />
          <CollapsibleNavSection
            title={{
              collapsed: "Other",
              expanded: "Other Tools",
            }}
            links={{
              isCollapsed,
              links: TOOLS.filter((tool) => tool.section === "Other Tools").map(
                (element) => ({
                  ...element,
                  variant: pathname === element.href ? "default" : "ghost",
                }),
              ),
            }}
            defaultCollapsed={false}
          />
        </ResizablePanel>
        <ResizableHandle withHandle disabled={!canExpandSidebar} />
        <ResizablePanel defaultSize={82}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
