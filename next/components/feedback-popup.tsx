"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import {
  LaughIcon,
  MessageSquareHeartIcon,
  PersonStandingIcon,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { gradientLightVariants, shadowVariants } from "@/components/variants";
import { AnimatePresence, motion } from "framer-motion";
import { cn, delay } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { usePostHog } from "posthog-js/react";
import { ColorVariant } from "./generative-ui/persona-avatar-popover";
import { LOCAL_STORAGE_CONFIG } from "@/lib/config/localstorage";

const JOB_CHOICES = ["Marketing", "UX Design", "Product Management", "Other"];

const FeedbackPopup = ({
  variant = "blue",
  openFeedbackPopup,
  setOpenFeedbackPopup,
}: {
  variant?: ColorVariant;
  openFeedbackPopup: boolean;
  setOpenFeedbackPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const posthog = usePostHog();
  const [surveyStep, setSurveyStep] = useState("start");

  const [surveyAnswers, setSurveyAnswers] = useState<{
    [key: string]: string | null;
  }>({
    job: null,
  });

  const SURVEY_STEPS: {
    [key: string]: JSX.Element;
  } = {
    start: (
      <StartSurvey
        variant={variant}
        onStartSurvey={() => setSurveyStep("user_job")}
      />
    ),
    user_job: (
      <UserJobSurvey
        variant={variant}
        onSkipQuestion={() =>
          setSurveyStep(
            surveyAnswers.job === "Other" ||
              !JOB_CHOICES.includes(surveyAnswers.job || "")
              ? "other_job"
              : "what_stage_do_you_use_personas"
          )
        }
        currentAnswer={surveyAnswers.job}
        onAnswerQuestion={(answer) =>
          setSurveyAnswers((prev) => ({
            ...prev,
            job: answer,
          }))
        }
      />
    ),
    other_job: (
      <OtherJob
        variant={variant}
        onSkipQuestion={() => setSurveyStep("what_stage_do_you_use_personas")}
        goBack={() => setSurveyStep("user_job")}
        currentAnswer={surveyAnswers.job}
        onAnswerQuestion={(answer) =>
          setSurveyAnswers((prev) => ({
            ...prev,
            job: answer,
          }))
        }
      />
    ),
    what_stage_do_you_use_personas: (
      <WhatStageDoYouUsePersonas
        variant={variant}
        onSkipQuestion={() => setSurveyStep("user_satisfaction")}
        goBack={() =>
          setSurveyStep(
            surveyAnswers.job === "Other" ||
              !JOB_CHOICES.includes(surveyAnswers.job || "")
              ? "other_job"
              : "user_job"
          )
        }
        currentAnswer={surveyAnswers.stage_used}
        onAnswerQuestion={(answer) =>
          setSurveyAnswers((prev) => ({
            ...prev,
            stage_used: answer,
          }))
        }
      />
    ),
    user_satisfaction: (
      <UserSatisfaction
        variant={variant}
        onSkipQuestion={() => setSurveyStep("misc_feedback")}
        goBack={() => setSurveyStep("what_stage_do_you_use_personas")}
        currentAnswer={surveyAnswers.satisfaction}
        onAnswerQuestion={(answer) =>
          setSurveyAnswers((prev) => ({
            ...prev,
            satisfaction: answer,
          }))
        }
      />
    ),
    misc_feedback: (
      <MiscFeedback
        variant={variant}
        satisfactionLevel={
          surveyAnswers.satisfaction
            ? mapToSatisfactionLevel(parseInt(surveyAnswers.satisfaction))
            : null
        }
        onSkipQuestion={() => setSurveyStep("end")}
        goBack={() => setSurveyStep("user_satisfaction")}
        currentAnswer={surveyAnswers.misc_feedback}
        onAnswerQuestion={(answer) =>
          setSurveyAnswers((prev) => ({
            ...prev,
            misc_feedback: answer,
          }))
        }
      />
    ),
    end: <EndSurvey variant={variant} />,
  };

  useEffect(() => {
    if (surveyStep === "end") {
      const sendSurveyAnswers = async () => {
        const finialSurveyAnswers = {
          ...surveyAnswers,
          stage_used: surveyAnswers.stage_used
            ? mapToWorkStage(parseInt(surveyAnswers.stage_used))
            : "unanswered",
          satisfaction: surveyAnswers.satisfaction
            ? mapToSatisfactionLevel(parseInt(surveyAnswers.satisfaction))
            : "unanswered",
        };
        posthog.capture("survey_completed", finialSurveyAnswers);
        const currentDateFormatted = new Date().toISOString().slice(0, 10);
        localStorage.setItem(
          LOCAL_STORAGE_CONFIG.feedback.completed,
          currentDateFormatted
        );
        await delay(2500);

        setOpenFeedbackPopup(false);
        await delay(1000);

        setSurveyStep("start");
      };
      sendSurveyAnswers();
    }
  }, [posthog, setOpenFeedbackPopup, surveyAnswers, surveyStep]);

  return (
    <Dialog.Root open={openFeedbackPopup} onOpenChange={setOpenFeedbackPopup}>
      <Dialog.Portal>
        <Dialog.DialogOverlay className="w-screen h-screen fixed inset-0 bg-black/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={shadowVariants({
            variant: variant,
            className:
              "bg-white rounded-2xl shadow-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl p-6 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          })}
        >
          <div>
            <div className="flex items-center gap-2">
              <MessageSquareHeartIcon className="text-gray-600" />
              <h2 className="text-lg font-bold text-gray-700 pb-1">
                We&apos;d love to hear your feedback!
              </h2>
            </div>
            <p className="text-sm text-gray-600">
              Help us improve by sharing your thoughts in a{" "}
              <i className="underline">quick 2 min survey</i>.
            </p>

            <div
              className={gradientLightVariants({
                variant: variant,
                className:
                  "h-[400px] grid place-items-center  border rounded-2xl shadow-sm my-4 relative",
              })}
            >
              <AnimatePresence mode="wait">
                {SURVEY_STEPS[surveyStep]}
              </AnimatePresence>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              We appreciate your time and feedback. Thank you!
            </p>
          </div>
          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FeedbackPopup;

function mapToSatisfactionLevel(number: number | null) {
  if (number === null) {
    return null;
  }

  if (number >= 0 && number < 50) {
    return "Unsatisfied";
  } else if (number >= 50 && number < 80) {
    return "Satisfied";
  } else if (number >= 80 && number <= 100) {
    return "Very Satisfied";
  } else {
    return null;
  }
}

function mapToWorkStage(number: number | null): string | null {
  if (number === null) {
    return null;
  }

  if (number >= 0 && number < 20) {
    return "Early";
  } else if (number >= 20 && number < 40) {
    return "Early-Mid";
  } else if (number >= 40 && number < 60) {
    return "Mid";
  } else if (number >= 60 && number < 80) {
    return "Mid-Late";
  } else if (number >= 80 && number <= 100) {
    return "Late";
  } else {
    return null; // Handle values outside the range 0-100
  }
}

function StartSurvey({
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

function UserJobSurvey({
  variant,
  currentAnswer,
  onSkipQuestion,
  onAnswerQuestion,
}: {
  variant: ColorVariant;
  currentAnswer: string | null;
  onSkipQuestion: () => void;
  onAnswerQuestion: (answer: string) => void;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer"
      key="job-survey-container"
    >
      <motion.div layoutId="persona-icon" className="absolute top-4 left-4">
        <PersonStandingIcon className="text-muted-foreground" />
      </motion.div>
      <motion.h3
        className="text-lg font-semibold text-gray-800 text-center p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5 }}
      >
        What is your current job role?
      </motion.h3>
      <motion.div className="grid grid-cols-2 gap-4">
        <AnimatePresence>
          {JOB_CHOICES.map((job, i) => (
            <motion.div
              key={job}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -200 }}
              transition={{ delay: 0.5 + (i + 1) * 0.25, ease: "easeOut" }}
              className="col-span-1 w-full"
              layoutId={"job-" + job}
            >
              <Button
                variant={"outline"}
                className={cn(
                  "w-full",
                  currentAnswer === job ||
                    (job === "Other" &&
                      currentAnswer &&
                      !JOB_CHOICES.includes(currentAnswer))
                    ? "bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
                    : ""
                )}
                onClick={() =>
                  onAnswerQuestion(currentAnswer === job ? "" : job)
                }
              >
                {job}
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
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
            Next Question
          </motion.span>
        </Button>
      </motion.div>
    </motion.div>
  );
}

function OtherJob({
  variant,
  currentAnswer,
  onSkipQuestion,
  onAnswerQuestion,
  goBack,
}: {
  variant: ColorVariant;
  currentAnswer: string | null;
  onSkipQuestion: () => void;
  goBack: () => void;
  onAnswerQuestion: (answer: string) => void;
}) {
  const replaceValueWithPlaceholderIfDefault = (value: string) =>
    currentAnswer ? (currentAnswer === "Other" ? value : currentAnswer) : value;

  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer"
      key="other-job-container"
    >
      <motion.div layoutId="persona-icon" className="absolute top-4 left-4">
        <PersonStandingIcon className="text-muted-foreground" />
      </motion.div>
      <motion.h3
        className="text-lg font-semibold text-gray-800 text-center p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5 }}
      >
        What is the name of your job role?
      </motion.h3>
      <motion.div
        className={gradientLightVariants({
          variant: variant,
          className: "col-span-1 w-full  border border-input rounded-md p-2",
        })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.75, ease: "easeOut" }}
      >
        <Input
          placeholder={replaceValueWithPlaceholderIfDefault("Other...")}
          value={replaceValueWithPlaceholderIfDefault("")}
          onChange={(e) => onAnswerQuestion(e.target.value)}
        />
      </motion.div>
      <motion.div
        layoutId="survey-back-button"
        className="absolute left-2 bottom-2"
        initial={{ opacity: 0, y: 20 }}
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
            Next Question
          </motion.span>
        </Button>
      </motion.div>
    </motion.div>
  );
}

function WhatStageDoYouUsePersonas({
  variant,
  currentAnswer,
  onSkipQuestion,
  onAnswerQuestion,
  goBack,
}: {
  variant: ColorVariant;
  currentAnswer: string | null;
  onSkipQuestion: () => void;
  goBack: () => void;
  onAnswerQuestion: (answer: string) => void;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer"
      key="other-job-container"
    >
      <motion.div layoutId="persona-icon" className="absolute top-4 left-4">
        <PersonStandingIcon className="text-muted-foreground" />
      </motion.div>
      <motion.h3
        className="text-lg font-semibold text-gray-800 text-center p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5 }}
      >
        At what stage do you use personas in your work?
      </motion.h3>
      <div className="flex flex-col  w-full">
        <motion.div
          className={gradientLightVariants({
            variant: variant,
            className: "col-span-1 w-full  border border-input rounded-md p-2",
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.75, ease: "easeOut" }}
        >
          <SliderPrimitive.Root
            className="relative flex w-full touch-none select-none items-center"
            defaultValue={[parseInt(currentAnswer || "0")]}
            max={100}
            step={1}
            onValueChange={(e) => onAnswerQuestion(e[0].toString())}
          >
            <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
              <SliderPrimitive.Range className="absolute h-full bg-blue-500" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-blue-500 bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
          </SliderPrimitive.Root>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.75, ease: "easeOut" }}
          className="flex py-2"
        >
          <span className="text-xs text-gray-600">Early</span>
          <span className="flex-1 text-xs text-center text-gray-600">Mid</span>
          <span className="text-xs text-gray-600">Late</span>
        </motion.div>
      </div>
      <motion.div
        layoutId="survey-back-button"
        className="absolute left-2 bottom-2"
        initial={{ opacity: 0, y: 20 }}
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
            Next Question
          </motion.span>
        </Button>
      </motion.div>
    </motion.div>
  );
}

function UserSatisfaction({
  variant,
  currentAnswer,
  onSkipQuestion,
  onAnswerQuestion,
  goBack,
}: {
  variant: ColorVariant;
  currentAnswer: string | null;
  onSkipQuestion: () => void;
  goBack: () => void;
  onAnswerQuestion: (answer: string) => void;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer"
      key="other-job-container"
    >
      <motion.div layoutId="persona-icon" className="absolute top-4 left-4">
        <PersonStandingIcon className="text-muted-foreground" />
      </motion.div>
      <motion.h3
        className="text-lg font-semibold text-gray-800 text-center p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5 }}
      >
        How satisfied are you with our product so far?
      </motion.h3>
      <div className="flex flex-col  w-full">
        <motion.div
          className={gradientLightVariants({
            variant: variant,
            className: "col-span-1 w-full  border border-input rounded-md p-2",
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.75, ease: "easeOut" }}
        >
          <SliderPrimitive.Root
            className="relative flex w-full touch-none select-none items-center"
            defaultValue={[parseInt(currentAnswer || "0")]}
            max={100}
            step={1}
            onValueChange={(e) => onAnswerQuestion(e[0].toString())}
          >
            <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
              <SliderPrimitive.Range className="absolute h-full bg-blue-500" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-blue-500 bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
          </SliderPrimitive.Root>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.75, ease: "easeOut" }}
          className="flex py-2 pointer-events-none"
        >
          <span className="text-xs text-gray-600 select-none pointer-events-none">
            Very Unsatisfied
          </span>
          <span className="flex-1 text-xs text-center text-gray-600 select-none pointer-events-none">
            Satisfied
          </span>
          <span className="text-xs text-gray-600 select-none pointer-events-none">
            Very Satisfied
          </span>
        </motion.div>
      </div>
      <motion.div
        layoutId="survey-back-button"
        className="absolute left-2 bottom-2"
        initial={{ opacity: 0, y: 20 }}
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
            Next Question
          </motion.span>
        </Button>
      </motion.div>
    </motion.div>
  );
}

function MiscFeedback({
  variant,
  satisfactionLevel,
  currentAnswer,
  onSkipQuestion,
  onAnswerQuestion,
  goBack,
}: {
  satisfactionLevel: "Unsatisfied" | "Satisfied" | "Very Satisfied" | null;
  variant: ColorVariant;
  currentAnswer: string | null;
  onSkipQuestion: () => void;
  goBack: () => void;
  onAnswerQuestion: (answer: string) => void;
}) {
  const SATISFACTION_HEADERS = {
    Unsatisfied:
      "We're sorry to hear that. How can we better meet your expectations?",
    Satisfied:
      "Thank you for your feedback! What aspects of our product do you appreciate?",
    "Very Satisfied":
      "We're thrilled to hear that you love our product! What features or aspects stand out to you the most?",
  };

  const SATISFACTION_PLACEHOLDERS = {
    Unsatisfied: "Please share your feedback and suggestions here...",
    Satisfied:
      "We'd love to hear more about what you appreciate about our product...",
    "Very Satisfied":
      "Feel free to tell us what you love the most about our product...",
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer p-4"
      key="other-job-container"
    >
      <motion.div layoutId="persona-icon" className="absolute top-4 left-4">
        <PersonStandingIcon className="text-muted-foreground" />
      </motion.div>
      <motion.h3
        className="text-md font-semibold text-gray-800 text-center p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5 }}
      >
        {SATISFACTION_HEADERS[satisfactionLevel || "Unsatisfied"]}
      </motion.h3>

      <motion.div
        className={gradientLightVariants({
          variant: variant,
          className: "col-span-1 w-full  border border-input rounded-md p-2",
        })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.75, ease: "easeOut" }}
      >
        <Textarea
          placeholder={
            SATISFACTION_PLACEHOLDERS[satisfactionLevel || "Unsatisfied"]
          }
          value={currentAnswer || ""}
          onChange={(e) => onAnswerQuestion(e.target.value)}
          className="h-[150px] max-h-[150px] resize-none"
        />
      </motion.div>

      <motion.div
        layoutId="survey-back-button"
        className="absolute left-2 bottom-2"
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
            Finish Survey!
          </motion.span>
        </Button>
      </motion.div>
    </motion.div>
  );
}

function EndSurvey({ variant }: { variant: ColorVariant }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <LaughIcon className="text-green-500" />
        <h2 className="text-lg font-bold text-gray-700">
          Thank you for your feedback!
        </h2>
      </div>
      <p className="text-sm text-gray-600">
        Your feedback is valuable to us. We appreciate your time.
      </p>
    </motion.div>
  );
}
