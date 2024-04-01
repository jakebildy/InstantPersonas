"use client";
import Chat from "@/components/chat";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { PersonStandingIcon } from "lucide-react";
import {
  BanknotesIcon,
  BookmarkIcon,
  FireIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Nav } from "@/components/nav";
import { useEffect, useState } from "react";
import { InstantPersonas } from "@/components/instantPersonas";
import { TooltipProvider } from "@/components/ui/tooltip";
import UserPersona, {
  EXAMPLE_PERSONA,
  PersonaActions,
} from "@/components/persona";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const defaultLayout = [265, 440, 655];
  const navCollapsedSize = 4;

  const canExpandSidebar = useMediaQuery("(min-width: 1025px)");
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
    <main className="grid place-items-center h-screen w-screen">
      <Button asChild>
        <Link href={"/dashboard"}>Dashboard</Link>
      </Button>
    </main>
  );
}
