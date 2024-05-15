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
      className="flex flex-col items-center gap-2 group cursor-pointer"
      key="start-container"
    >
      <motion.div key="persona-icon" layoutId="persona-icon">
        <PersonStandingIcon className="text-muted-foreground size-8 group-hover:text-green-500 transition-colors duration-150 ease-out" />
      </motion.div>
      <motion.div layoutId="survey-main-button">
        <Button
          variant={"outline"}
          className="group-hover:text-primary rounded-full hover:scale-100 h-full w-full p-1"
          onClick={onStartSurvey}
        >
          <motion.span
            className={gradientLightVariants({
              variant: variant,
              className:
                "whitespace-nowrap rounded-full px-4 border border-input h-10 p-2 group-hover:bg-green-500 group-hover:text-white transition-colors duration-150 ease-out font-semibold text-muted-foreground ",
            })}
          >
            Start Survey!
          </motion.span>
        </Button>
      </motion.div>
    </motion.div>
  );
}
