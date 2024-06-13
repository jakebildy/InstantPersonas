import { usePersonaChatHistory } from "@/components/context/persona/history-context";
import { SelectArchetypeWidget } from "@/components/toolfolio/selected-personas/select-from-sidebar/select-archetype-widget";
import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";
import GradientScroll from "./gradient-scroll";
import { cn } from "@/lib/utils";
import { PersonaWidget } from "./persona-widget";

type Props = {};

export default function PersonaHistory({}: Props) {
  const { history, loading, error } = usePersonaChatHistory();

  return (
    <GradientScroll>
      <div className="flex flex-col gap-2 overflow-hidden p-4 font-mono text-sm">
        {history.map((chat, i) =>
          chat.aiState.personas === undefined ||
          chat.aiState.personas.length === 0 ? null : (
            <PersonaGroup
              personas={chat.aiState.personas}
              id={chat._id || undefined}
              key={i}
            />
          ),
        )}
      </div>
    </GradientScroll>
  );
}

function PersonaGroup({
  personas,
  id,
}: {
  personas: PersonaArchetype[];
  id?: string;
}) {
  // Checking if all personas are selected based on deep equality
  // const allPersonasInChatSelected = personas.every((persona) =>
  //   selectedPersonas.some((selectedPersona) =>
  //     isEqual(selectedPersona, persona),
  //   ),
  // );
  const allPersonasInChatSelected = false;

  if (!id) return null;

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl border bg-white/50 p-2 transition-colors duration-150 ease-out",
        allPersonasInChatSelected
          ? "border-green-400 bg-green-100"
          : "border-black/10 bg-white/50",
      )}
    >
      {personas.map((persona, i) => {
        // Determining if the current persona is selected based on deep equality

        return <PersonaWidget archetype={persona} id={id} key={i} />;
      })}
    </div>
  );
}
