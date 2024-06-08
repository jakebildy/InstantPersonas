import { Button } from "@/components/ui/button";
import { ColorVariant, gradientLightVariants } from "@/components/variants";
import { motion } from "framer-motion";
import { PersonStandingIcon } from "lucide-react";

export function StartSurvey({
  variant,
  onStartSurvey,
}: {
  variant: ColorVariant;
  onStartSurvey: () => void;
}) {
  return (
    <motion.div
      className="group flex cursor-pointer flex-col items-center gap-2"
      key="start-container"
    >
      <motion.div key="persona-icon" layoutId="persona-icon">
        <PersonStandingIcon className="size-8 text-muted-foreground transition-colors duration-150 ease-out group-hover:text-green-500" />
      </motion.div>
      <motion.div layoutId="survey-main-button">
        <Button
          variant={"outline"}
          className="h-full w-full rounded-full p-1 hover:scale-100 group-hover:text-primary"
          onClick={onStartSurvey}
        >
          <motion.span
            className={gradientLightVariants({
              variant: variant,
              className:
                "h-10 whitespace-nowrap rounded-full border border-input p-2 px-4 font-semibold text-muted-foreground transition-colors duration-150 ease-out group-hover:bg-green-500 group-hover:text-white",
            })}
          >
            Start Survey!
          </motion.span>
        </Button>
      </motion.div>
    </motion.div>
  );
}
