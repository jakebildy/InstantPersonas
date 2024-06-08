"use server";
import Chat from "@/components/page-specific/generative-ui/chat";

export default async function ChatPage({
  params,
}: {
  params: { id?: string[] };
}) {
  return (
    <div className="flex h-full flex-1 flex-col justify-center">
      <Chat className="h-full min-h-[400px] flex-1 rounded-lg border" />
    </div>
  );
}
