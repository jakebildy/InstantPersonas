import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";
import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  avatarVariants,
  ButtonInnerHover,
  gradientLightVariants,
  gradientVariants,
} from "@/components/variants";
import { LOCAL_STORAGE_CONFIG } from "@/lib/config/localstorage";
import { cn } from "@/lib/utils";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { cx } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import useMeasure from "react-use-measure";

export function PersonaWidget({
  archetype,
  id,
}: {
  archetype: PersonaArchetype;
  id: string;
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
      className="relative flex h-full min-h-[60px] w-full flex-col rounded-xl border bg-background text-left font-jost shadow-md"
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
            <div className={cn("max-w-[200px] py-2")}>
              <p className="truncate text-sm font-semibold text-gray-700">
                {archetype.archetype_name}
              </p>
              <p className="text-xs text-gray-500">Click to view details</p>
            </div>
          </div>
        </button>
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

                <li className="mt-2 flex w-full items-center justify-end">
                  <Link
                    href={`/persona/${id}`}
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                      }),
                      "group h-fit w-fit rounded-full p-0.5 shadow-md hover:scale-100 hover:text-primary",
                    )}
                  >
                    <span
                      className={cx(
                        ButtonInnerHover({ variant }),
                        gradientLightVariants({
                          variant: variant,
                          className: cn(
                            "flex h-6 min-w-0 items-center gap-2 whitespace-nowrap rounded-2xl p-1 px-2 text-xs",
                          ),
                        }),
                      )}
                    >
                      Open Chat <ArrowTopRightIcon className="size-3" />
                    </span>
                  </Link>
                </li>
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
