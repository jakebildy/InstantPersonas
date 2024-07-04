import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";
import { usePersonaChat } from "@/components/context/persona/chat-context";
import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
import {
  gradientLightVariants,
  avatarVariants,
  textColorVariants,
} from "@/components/variants";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { usePersonaEditor } from "@/components/context/persona/persona-editor-context";

export function EditorFallbackNoSelectedState() {
  const { personas } = usePersonaChat();
  const { setSelectedPersonaIDInEditor } = usePersonaEditor();

  return (
    <>
      <div className="relative flex max-w-xl flex-col items-center justify-center gap-2 text-center">
        <motion.div
          initial={{
            opacity: 0,
            x: -120,
            y: -45,
            top: 0,
            position: "absolute",
          }}
          animate={{
            opacity: 1,
            x: -100,
            y: -20,
            top: 0,
            position: "absolute",
          }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <img src="https://i.imgur.com/rboSNI5.png" className="h-10" />
        </motion.div>
        <h2 className="text-xl font-semibold">Persona Editor</h2>
        <p>
          In the persona editor, you can edit the details of a persona
          archetype.
          {/* Add or remove traits, change the name, or update the
          picture. */}
        </p>
        <div className="relative">
          <h3 className="text-md font-semibold">Select Persona to Begin</h3>
          <motion.div
            initial={{
              opacity: 0,
              right: 0,
              bottom: 25,
              translateX: "150%",
              position: "absolute",
            }}
            animate={{
              opacity: 1,
              right: 0,
              bottom: 5,
              translateX: "115%",
              position: "absolute",
            }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <img
              src="https://i.imgur.com/rboSNI5.png"
              className="h-10 scale-x-[-1] transform"
            />
          </motion.div>
        </div>

        <div className="relative flex flex-wrap gap-2 rounded-xl border border-gray-300 bg-gray-100 p-4">
          {personas.map((archetype: PersonaArchetype, i: number) => {
            const variant = mapUrlBackgroundColorParamToVariant({
              url: archetype.pictureURL,
            });
            const avatarFallbackName = archetype.archetype_name
              .split(" ")
              .map((word) => word.charAt(0))
              .join("");

            return (
              <div
                key={i}
                className="group relative size-full min-h-[100px] min-w-[150px] flex-1 p-2 transition-all duration-500 ease-out hover:p-6"
              >
                <button
                  tabIndex={0}
                  onClick={() => setSelectedPersonaIDInEditor(archetype.id)}
                  className={gradientLightVariants({
                    variant,
                    className:
                      "absolute left-1/2 top-1/2 grid size-full -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-gray-300 bg-gray-100 p-2 shadow-sm transition-all duration-500 ease-out group-hover:scale-110 group-hover:shadow-lg",
                  })}
                >
                  <div
                    className={
                      "flex size-full flex-1 flex-col items-center gap-1 transition-all duration-500 ease-out group-hover:scale-105"
                    }
                  >
                    <Avatar className={avatarVariants({ variant, size: "sm" })}>
                      <AvatarImage
                        src={archetype.pictureURL}
                        alt={[
                          archetype.archetype_name.toLocaleLowerCase(),
                          "persona avatar",
                        ].join(" ")}
                      />
                      <AvatarFallback>{avatarFallbackName}</AvatarFallback>
                    </Avatar>
                    <span
                      className={textColorVariants({
                        variant,
                        className: "font-jost text-sm font-semibold",
                      })}
                    >
                      {archetype.archetype_name}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
          <span
            className="absolute right-0 top-0 -translate-x-2 -translate-y-1/2 rotate-0 cursor-pointer rounded-lg border border-gray-300 bg-gray-100 p-1 text-xs text-muted-foreground shadow-md transition-transform duration-500 hover:scale-105 md:translate-x-1/3 md:rotate-12"
            role="button"
            onClick={() =>
              setSelectedPersonaIDInEditor(personas?.at(0)?.id ?? "")
            }
            tabIndex={0}
          >
            Click to Select!
          </span>
        </div>
      </div>
    </>
  );
}
