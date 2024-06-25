"use server";
import { PreventNotAuth } from "@/components/page-specific/prevent-no-auth";
import SidebarLayout from "../client-sidebar-layout";

export default async function Layout({
  chat,
  map,
  editor,
  params,
}: {
  chat: React.ReactNode;
  map: React.ReactNode;
  editor: React.ReactNode;
  params: { id?: string[] };
}) {
  return (
    <>
      <PreventNotAuth />
      <SidebarLayout chat={chat} map={map} editor={editor} />
    </>
  );
}
