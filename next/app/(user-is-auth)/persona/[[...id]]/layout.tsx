"use server";
import { AI } from "@/app/(server)/action";
import SidebarLayout from "../client-sidebar-layout";
import api from "@/service/api.service";

export default async function Layout({
  chat,
  map,
  params,
}: {
  chat: React.ReactNode;
  map: React.ReactNode;
  params: { id?: string[] };
}) {
  const id = params.id?.at(-1);
  const chatHistory = id ? await api.userPersona.getPersonaChat(id) : null;

  return (
    <AI
    // initialAIState={{
    //   chatId: chatHistory?._id,
    //   messages: chatHistory?.aiState.messages,
    // }}
    >
      <SidebarLayout chat={chat} map={map} />
    </AI>
  );
}
