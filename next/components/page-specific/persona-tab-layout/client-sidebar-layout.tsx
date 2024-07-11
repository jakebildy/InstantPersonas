"use client";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PreventMobile } from "@/components/page-specific/prevent-mobile";
import { Button } from "@/components/ui/button";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import {
  PersonaChatTabs,
  usePersonaChat,
} from "@/components/context/persona/chat-context";
import { GradientButton } from "@/components/ui/gradient-button";
import { PersonStandingIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function SidebarLayout({
  chat,
  map,
  editor,
  lab,
}: {
  chat: React.ReactNode;
  map: React.ReactNode;
  editor: React.ReactNode;
  lab: React.ReactNode;
}) {
  const {
    personas,
    messages,
    resetChatId,
    chatId,
    path,
    activeTab,
    setActiveTab,
  } = usePersonaChat();
  const isNewChat = messages.length === 0;
  const shouldAnimate = isNewChat || !path.previous?.startsWith("/persona");

  return (
    <Tabs
      defaultValue="personaChat"
      value={activeTab}
      onValueChange={(tab) => setActiveTab(tab as PersonaChatTabs)}
    >
      {/* Main Header | 58px */}
      <div className="box-border flex max-h-11 items-center justify-between px-4 py-2">
        <h1 className="text-xl font-bold">Persona Creator</h1>

        <AnimatePresence>
          {personas && personas.length > 0 ? (
            <>
              <TabsList className="ml-auto bg-gray-200 font-jost">
                <TabsTrigger
                  value="personaChat"
                  className="min-w-0 text-zinc-600 dark:text-zinc-200"
                >
                  Persona Chat
                </TabsTrigger>
                {/* <TabsTrigger value="map" className="text-zinc-600 dark:text-zinc-200">
            Map
          </TabsTrigger> */}
                <TabsTrigger
                  value="editor"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Editor
                </TabsTrigger>
                <TabsTrigger
                  value="lab"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Lab
                </TabsTrigger>
              </TabsList>
              <div />
            </>
          ) : isNewChat ? null : (
            <motion.div
              initial={{ opacity: 0, rotateX: 90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: 90 }}
            >
              <GradientButton
                Icon={PersonStandingIcon}
                variant="green"
                innerClassName="max-h-8 text-xs"
                onClick={() => resetChatId()}
              >
                New Chat
              </GradientButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Separator />
      <AnimatePresence initial={shouldAnimate}>
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.9, rotateY: 5 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
          }}
          exit={{ y: 20, opacity: 0, scale: 0.9, rotateY: 5 }}
          transition={{ type: "spring", duration: 1 }}
          key={"persona"}
        >
          <ScrollArea className="h-[calc(100vh-44px)]">
            <div className="flex h-[calc(100vh-44px)] flex-col">
              <TabsContent value="personaChat" className="m-0 h-full flex-1">
                {chat}
              </TabsContent>
              <TabsContent value="map" className="m-0 h-full flex-1">
                {map}
              </TabsContent>
              <TabsContent value="editor" className="m-0 h-full flex-1">
                {editor}
              </TabsContent>
              <TabsContent value="lab" className="m-0 h-full flex-1">
                {lab}
              </TabsContent>
            </div>
          </ScrollArea>
        </motion.div>
      </AnimatePresence>
      {/*//! This stops the user from using the app on mobile devices */}
      <PreventMobile />
    </Tabs>
  );
}
