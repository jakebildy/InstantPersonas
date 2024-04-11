"use server";
import { AI } from "@/app/(server)/action";
import Chat from "@/components/chat";

export default async function ChatPage({
  params,
}: {
  params: { id?: string[] };
}) {
  console.log(params.id?.at(-1));

  return (
    <div className="flex flex-col h-[calc(100vh-58px)] justify-center">
      <div className="flex flex-row">
        {/* {aiState.personas.map((persona: any) => {
          return <PersonaAvatarPopover {...{ archetype: persona }} />;
        })} */}
      </div>
      <Chat className="border rounded-lg min-h-[400px]" />
    </div>
  );
}
