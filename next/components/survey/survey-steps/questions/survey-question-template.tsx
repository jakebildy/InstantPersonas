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
  finishButtonText?: string;
};

export function SurveyQuestionTemplate({
  children,
  variant,
  onSkipQuestion,
  goBack,
  initialAnimation = false,
  isLastQuestion = false,
  finishButtonText = "Finish Survey!",
}: SurveyQuestionTemplateProps) {
  return (
    <>
      <motion.div layoutId="persona-icon" className="absolute left-4 top-4">
        <PersonStandingIcon className="text-muted-foreground" />
      </motion.div>
      {children}
      {goBack ? (
        <motion.div
          layoutId="survey-back-button"
          className="absolute bottom-2 left-2"
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
            className="h-full w-full rounded-full p-1 hover:scale-100 group-hover:text-primary"
            onClick={goBack}
          >
            <motion.span
              className={gradientLightVariants({
                variant: variant,
                className:
                  "h-10 whitespace-nowrap rounded-full border border-input p-2 px-4 font-semibold text-muted-foreground transition-colors duration-150 ease-out hover:bg-gray-500 hover:text-white",
              })}
            >
              Back
            </motion.span>
          </Button>
        </motion.div>
      ) : null}
      <motion.div
        layoutId="survey-main-button"
        className="absolute bottom-2 right-2"
      >
        <Button
          variant={"outline"}
          className="h-full w-full rounded-full p-1 hover:scale-100 group-hover:text-primary"
          onClick={onSkipQuestion}
        >
          <motion.span
            className={gradientLightVariants({
              variant: variant,
              className:
                "h-10 whitespace-nowrap rounded-full border border-input p-2 px-4 font-semibold text-muted-foreground transition-colors duration-150 ease-out hover:bg-blue-500 hover:text-white",
            })}
          >
            {isLastQuestion ? finishButtonText : "Next Question "}
          </motion.span>
        </Button>
      </motion.div>
    </>
  );
}
