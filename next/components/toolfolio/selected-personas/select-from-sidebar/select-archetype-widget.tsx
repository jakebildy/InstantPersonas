import {
  avatarVariants,
  gradientVariants,
  mapUrlBackgroundColorParamToVariant,
  PersonaArchetype,
} from "@/components/page-specific/generative-ui/persona-avatar-popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LOCAL_STORAGE_CONFIG } from "@/lib/config/localstorage";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";

export function SelectArchetypeWidget({
  archetype,
  onSelect,
  onDeselect,
  isSelected,
}: {
  archetype: PersonaArchetype;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  // Used for animation to measure the height of the details when expanded
  const [detailsRef, detailsBounds] = useMeasure();
  // Get the variant for the avatar
  const variant = mapUrlBackgroundColorParamToVariant({
    url: archetype.pictureURL,
  });
  // Fallback to initials if no avatar is available
  const avatarFallbackName = archetype.archetype_name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  return (
    <motion.div
      className="flex flex-col w-full h-full text-left rounded-xl border relative shadow-md bg-background min-h-[60px]"
      animate={{
        height: open ? detailsBounds.height + 80 : 60,
      }}
      transition={{ duration: 0.5, type: "spring", bounce: 0 }}
    >
      <div className="relative">
        <button
          className="flex items-center justify-between w-full rounded-xl text-left  gap-2"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="flex gap-2">
            <Avatar
              className={avatarVariants({
                variant,
                size: "sm",
              })}
            >
              <AvatarImage
                src={archetype.pictureURL}
                alt={[
                  archetype.archetype_name.toLocaleLowerCase(),
                  "persona avatar",
                ].join(" ")}
              />
              <AvatarFallback>{avatarFallbackName}</AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "py-2",
                isSelected ? "max-w-[180px]" : "max-w-[200px]"
              )}
            >
              <p className="text-sm font-semibold text-gray-700  truncate ">
                {archetype.archetype_name}
              </p>
              <p className="text-xs text-gray-500">Click to view details</p>
            </div>
          </div>
        </button>
        <Button
          variant={"outline"}
          className={cn(
            "h-8 px-2 mx-2  rounded-lg text-white hover:text-black z-60 transition-colors duration-300 ease-out absolute top-1/2 -translate-y-1/2 right-2",
            isSelected ? "bg-green-500" : "bg-blue-700/50"
          )}
          onClick={(e) => {
            e.stopPropagation();
            isSelected ? onDeselect() : onSelect();
            const localSelectedPersonaNames: string[] = JSON.parse(
              localStorage.getItem(
                LOCAL_STORAGE_CONFIG.tools.selectedPersonas
              ) ?? "[]"
            );
            localStorage.setItem(
              LOCAL_STORAGE_CONFIG.tools.selectedPersonas,
              JSON.stringify(
                localSelectedPersonaNames.filter(
                  (archetype_name) =>
                    archetype_name !== archetype.archetype_name
                )
              )
            );
          }}
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </div>
      <div>
        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: detailsBounds.height + 16 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0 }}
              className={gradientVariants({
                variant,
                className: "flex flex-col p-2 rounded-lg m-1",
              })}
            >
              <ul className="grid" ref={detailsRef}>
                {Object.entries(archetype.persona_components).map(
                  ([key, value]) => (
                    <li key={key} className="flex flex-col mb-1">
                      <span className="text-muted-foreground font-semibold text-sm">
                        {key.replace(/_/g, " ")}
                      </span>
                      <span className="text-xs font-medium">{value}</span>
                    </li>
                  )
                )}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
