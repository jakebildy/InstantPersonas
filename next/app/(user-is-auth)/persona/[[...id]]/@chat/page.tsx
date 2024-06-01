"use server";
import Chat from "@/components/page-specific/generative-ui/chat";

export default async function ChatPage({
  params,
}: {
  params: { id?: string[] };
}) {
  return (
    <div className="flex flex-col flex-1 h-full justify-center">
      <Chat className="border rounded-lg min-h-[400px] h-full flex-1" />
    </div>
  );
}
