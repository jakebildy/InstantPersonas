"use server";
import SidebarLayout from "../client-sidebar-layout";
import { getPersonaChat } from "@/app/(server)/api/(persona-crud)/get-persona-chat/function";

export default async function Layout({
  chat,
  map,
  params,
}: {
  chat: React.ReactNode;
  map: React.ReactNode;
  params: { id?: string[] };
}) {
  // const id = params.id?.at(-1);
  // const chatHistory = id ? await getPersonaChat(id) : null;

  return <SidebarLayout chat={chat} map={map} />;
}
