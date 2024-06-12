import {
  PersonaAvatarPopover,
  mapUrlBackgroundColorParamToVariant,
} from "@/components/page-specific/generative-ui/persona-avatar-popover";
import { PersonaBusinessArchetype } from "@/components/toolfolio/selected-personas/types";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ScrollAreaScrollbar,
  ScrollAreaThumb,
} from "@radix-ui/react-scroll-area";
import { AnimatePresence, motion } from "framer-motion";

export const ActivePersonas = ({
  selectedPersonas,
}: {
  selectedPersonas: PersonaBusinessArchetype[];
}) => {
  return (
    <div id="active-personas-preview">
      <Label>Active Personas</Label>
      <ScrollArea>
        <div className="flex my-2 border border-green-400 bg-green-100 rounded-lg min-h-[60px] items-center">
          <AnimatePresence mode="popLayout">
            {selectedPersonas && selectedPersonas.length > 0 ? (
              selectedPersonas.map((archetype, i) => {
                const variant = mapUrlBackgroundColorParamToVariant({
                  url: archetype.pictureURL,
                });
                return (
                  <motion.div
                    key={archetype.archetype_name + " active list "}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    layoutId={"persona-icon" + archetype.archetype_name}
                  >
                    <PersonaAvatarPopover
                      allowManage={false}
                      {...{ archetype: archetype, variant: variant }}
                      size={"sm"}
                    />
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex text-xs items-center justify-center w-full h-full text-green-500"
                key="empty-info-text"
              >
                Select a persona to add to the working area
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <ScrollAreaScrollbar
          orientation={"horizontal"}
          className={
            "flex touch-none select-none transition-colors h-2.5 flex-col border-t border-t-transparent p-[1px]"
          }
        >
          <ScrollAreaThumb className="relative flex-1 rounded-full bg-black/25" />
        </ScrollAreaScrollbar>
      </ScrollArea>
    </div>
  );
};
