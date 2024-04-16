"use server";
import Chat from "@/components/chat";
import api from "@/service/api.service";

export default async function ChatPage({
  params,
}: {
  params: { id?: string[] };
}) {
  const id = params.id?.at(-1);
  const chatHistory = id ? await api.userPersona.getPersonaChat(id) : null;

  return (
    <div className="flex flex-col h-[calc(100vh-58px)] justify-center">
      {/* <div className="flex flex-row">
        <ChatAvatars />
      </div> */}
      <Chat className="border rounded-lg min-h-[400px]" history={chatHistory} />
    </div>
  );
}
