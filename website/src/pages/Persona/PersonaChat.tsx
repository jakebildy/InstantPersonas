import Sidebar from "@/components/Sidebar";
import Chat from "@/components/chat";
import UserPersona, {
  EXAMPLE_PERSONA,
  PersonaActions,
} from "@/components/persona";
import { ScrollArea } from "@/components/ui/scroll-area";

export const PersonaChat = () => {
  return (
    <Sidebar currentSelectedPage="Consulting Tools">
      <ScrollArea className="h-screen">
        <div className="flex flex-col">
          <div className="flex-1 flex flex-col">
            <UserPersona {...EXAMPLE_PERSONA} />
            <PersonaActions />
          </div>
          <Chat className="border rounded-lg min-h-[400px]" />
        </div>
      </ScrollArea>
    </Sidebar>
  );
};
