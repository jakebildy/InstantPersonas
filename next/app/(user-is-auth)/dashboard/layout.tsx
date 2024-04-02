"use client";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard";

export default function Layout({
  chat,
  map,
}: {
  chat: React.ReactNode;
  map: React.ReactNode;
}) {
  return (
    <main className="bg-zinc-100">
      <DashboardLayout activeTab="Persona Creator">
        <Tabs defaultValue="personaChat">
          {/* Main Header | 58px */}
          <div className="flex items-center px-4 py-2">
            <h1 className="text-xl font-bold">User Personas</h1>
            <TabsList className="ml-auto">
              <TabsTrigger
                value="personaChat"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Persona Chat
              </TabsTrigger>
              <TabsTrigger
                value="map"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Map
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <TabsContent value="personaChat" className="m-0">
            {chat}
          </TabsContent>
          <TabsContent value="map" className="m-0">
            {map}
          </TabsContent>
        </Tabs>
      </DashboardLayout>
    </main>
  );
}
