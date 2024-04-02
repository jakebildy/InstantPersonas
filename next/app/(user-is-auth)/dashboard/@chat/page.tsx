"use client";
import Chat from "@/components/chat";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-58px)] justify-center">
      <Chat className="border rounded-lg min-h-[400px]" />
    </div>
  );
}
