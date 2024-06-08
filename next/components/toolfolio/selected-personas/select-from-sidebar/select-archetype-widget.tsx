import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";
import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { avatarVariants, gradientVariants } from "@/components/variants";
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
  const avatarFallbackName =
    archetype.archetype_name ||
    "Persona Archetype"
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");

  return (
    <motion.div
      className="relative flex h-full min-h-[60px] w-full flex-col rounded-xl border bg-background text-left shadow-md"
      animate={{
        height: open ? detailsBounds.height + 80 : 60,
      }}
      transition={{ duration: 0.5, type: "spring", bounce: 0 }}
    >
      <div className="relative">
        <button
          className="flex w-full items-center justify-between gap-2 rounded-xl text-left"
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
                  (
                    archetype.archetype_name || "Persona Archetype"
                  ).toLocaleLowerCase(),
                  "persona avatar",
                ].join(" ")}
              />
              <AvatarFallback>{avatarFallbackName}</AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "py-2",
                isSelected ? "max-w-[180px]" : "max-w-[200px]",
              )}
            >
              <p className="truncate text-sm font-semibold text-gray-700">
                {archetype.archetype_name}
              </p>
              <p className="text-xs text-gray-500">Click to view details</p>
            </div>
          </div>
        </button>
        <Button
          variant={"outline"}
          className={cn(
            "z-60 absolute right-2 top-1/2 mx-2 h-8 -translate-y-1/2 rounded-lg px-2 text-white transition-colors duration-300 ease-out hover:text-black",
            isSelected ? "bg-green-500" : "bg-blue-700/50",
          )}
          onClick={(e) => {
            e.stopPropagation();
            isSelected ? onDeselect() : onSelect();
            const localSelectedPersonaNames: string[] = JSON.parse(
              localStorage.getItem(
                LOCAL_STORAGE_CONFIG.tools.selectedPersonas,
              ) ?? "[]",
            );
            localStorage.setItem(
              LOCAL_STORAGE_CONFIG.tools.selectedPersonas,
              JSON.stringify(
                localSelectedPersonaNames.filter(
                  (archetype_name) =>
                    archetype_name !== archetype.archetype_name,
                ),
              ),
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
                className: "m-1 flex flex-col rounded-lg p-2",
              })}
            >
              <ul className="grid" ref={detailsRef}>
                {Object.entries(archetype.persona_components).map(
                  ([key, value]) => (
                    <li key={key} className="mb-1 flex flex-col">
                      <span className="text-sm font-semibold text-muted-foreground">
                        {key.replace(/_/g, " ")}
                      </span>
                      <span className="text-xs font-medium">{value}</span>
                    </li>
                  ),
                )}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
