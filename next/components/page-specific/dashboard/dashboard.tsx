"use client";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Nav } from "@/components/page-specific/dashboard/nav";
import { useEffect, useState } from "react";
import { InstantPersonas } from "@/components/instantPersonas";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useMediaQuery } from "@/lib/hooks";
import { SEO_LINKS as TOOLS, SIDEBAR_LINKS, SidebarLinkName } from "@/lib/site";
import { usePathname } from "next/navigation";

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
        true
      )}`;
    } else {
      setIsCollapsed(false);
      document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
        false
      )}`;
    }
  }, [canExpandSidebar]);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full border border-border rounded-xl"
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
              true
            )}`;
          }}
          onExpand={() => {
            if (canExpandSidebar) {
              setIsCollapsed(false);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                false
              )}`;
            }
          }}
          className={cn(
            "bg-background",
            isCollapsed
              ? "min-w-[50px] max-w-[80px] transition-all duration-300 ease-in-out"
              : "min-w-[240px] max-w-[350px]",
            !canExpandSidebar && "max-w-[50px]"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <InstantPersonas isCollapsed={isCollapsed} />
          </div>
          <Separator />

          <Nav
            isCollapsed={isCollapsed}
            links={SIDEBAR_LINKS.map((element) => ({
              ...element,
              variant: pathname === element.href ? "default" : "ghost",
            }))}
          />
          <Separator />
          <div
            className={cn(
              "text-slate-300 font-bold  text-xs mt-4",
              isCollapsed ? "text-center" : "ml-5 text-left"
            )}
          >
            {isCollapsed ? "Create" : "Content Creation"}
          </div>
          <Nav
            isCollapsed={isCollapsed}
            links={TOOLS.filter((tool) => tool.section === "Create").map(
              (element) => ({
                ...element,
                variant: pathname === element.href ? "default" : "ghost",
              })
            )}
          />
          <div
            className={cn(
              "text-slate-300 font-bold  text-xs mt-4",
              isCollapsed ? "text-center" : "ml-5 text-left"
            )}
          >
            {isCollapsed ? "Reach" : "Reach Your Audience"}
          </div>
          <Nav
            isCollapsed={isCollapsed}
            links={TOOLS.filter((tool) => tool.section === "Reach").map(
              (element) => ({
                ...element,
                variant: pathname === element.href ? "default" : "ghost",
              })
            )}
          />
        </ResizablePanel>
        <ResizableHandle withHandle disabled={!canExpandSidebar} />
        <ResizablePanel defaultSize={82}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
