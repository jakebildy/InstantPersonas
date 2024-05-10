import { Button } from "@/components/ui/button";
import { ColorVariant, gradientLightVariants } from "@/components/variants";
import { motion } from "framer-motion";
import { PersonStandingIcon } from "lucide-react";

export type SurveyQuestionTemplateProps = {
  children: React.ReactNode;
  variant: ColorVariant;
  onSkipQuestion: () => void;
  goBack?: () => void;
  initialAnimation?: boolean;
  isLastQuestion?: boolean;
};

export function SurveyQuestionTemplate({
  children,
  variant,
  onSkipQuestion,
  goBack,
  initialAnimation = false,
  isLastQuestion = false,
}: SurveyQuestionTemplateProps) {
  return (
    <>
      <motion.div layoutId="persona-icon" className="absolute top-4 left-4">
        <PersonStandingIcon className="text-muted-foreground" />
      </motion.div>
      {children}
      {goBack ? (
        <motion.div
          layoutId="survey-back-button"
          className="absolute left-2 bottom-2"
          initial={
            initialAnimation ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.8, ease: "easeOut" }}
          key="survey-back-button"
        >
          <Button
            variant={"outline"}
            className="group-hover:text-primary rounded-full hover:scale-100 h-full w-full p-1 "
            onClick={goBack}
          >
            <motion.span
              className={gradientLightVariants({
                variant: variant,
                className:
                  "whitespace-nowrap rounded-full px-4 border border-input h-10 p-2 hover:bg-gray-500 hover:text-white transition-colors duration-150 ease-out font-semibold text-muted-foreground ",
              })}
            >
              Back
            </motion.span>
          </Button>
        </motion.div>
      ) : null}
      <motion.div
        layoutId="survey-main-button"
        className="absolute right-2 bottom-2"
      >
        <Button
          variant={"outline"}
          className="group-hover:text-primary rounded-full hover:scale-100 h-full w-full p-1 "
          onClick={onSkipQuestion}
        >
          <motion.span
            className={gradientLightVariants({
              variant: variant,
              className:
                "whitespace-nowrap rounded-full px-4 border border-input h-10 p-2 hover:bg-blue-500 hover:text-white transition-colors duration-150 ease-out font-semibold text-muted-foreground ",
            })}
          >
            {isLastQuestion ? "Finish Survey!" : "Next Question "}
          </motion.span>
        </Button>
      </motion.div>
    </>
  );
}
