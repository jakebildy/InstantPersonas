"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { MessageSquareHeartIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { gradientLightVariants, shadowVariants } from "@/components/variants";
import { AnimatePresence } from "framer-motion";
import { delay, IS_TEST_DEV_ENV, labelForValueInRange } from "@/lib/utils";
import { usePostHog } from "posthog-js/react";
import { ColorVariant } from "@/components/variants";
import { LOCAL_STORAGE_CONFIG } from "@/lib/config/localstorage";
import { StartSurvey } from "@/components/survey/survey-steps/start-survey";
import { EndSurvey } from "@/components/survey/survey-steps/end-survey";
import { SurveyQuestionSelectInput } from "@/components/survey/survey-steps/questions/survey-select-input-question";
import { SurveyQuestionSlider } from "@/components/survey/survey-steps/questions/survey-slider-question";
import { SurveyQuestionTextInput } from "@/components/survey/survey-steps/questions/survey-text-input-question";
import { SurveyQuestionTextArea } from "@/components/survey/survey-steps/questions/survey-textarea-question";

//TODO: Convert to Generic UI with Config

const JOB_CHOICES = [
  "Marketing",
  "UX Design",
  "Product Management",
  "Other",
] as const;

const PersonaAdoptionStageAndSatisfactionCorrelationAnalysisSurveyPopup = ({
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

  const replaceValueWithPlaceholderIfDefault = ({
    value,
    answer,
    defaultValue,
  }: {
    value: string;
    answer: string | null;
    defaultValue: string;
  }): string => {
    return answer ? (answer === defaultValue ? value : answer) : value;
  };

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
      <SurveyQuestionSelectInput
        variant={variant}
        title="What is your current job role?"
        choices={JOB_CHOICES}
        onSkipQuestion={() =>
          setSurveyStep(
            surveyAnswers.job === "Other" ||
              !JOB_CHOICES.includes(
                surveyAnswers.job as (typeof JOB_CHOICES)[number], //? Type assertion is safe because we check if the value is in the array
              )
              ? "other_job"
              : "what_stage_do_you_use_personas",
          )
        }
        currentAnswer={surveyAnswers.job || ""}
        onAnswerQuestion={(answer) =>
          setSurveyAnswers((prev) => ({
            ...prev,
            job: answer,
          }))
        }
      />
    ),
    other_job: (
      <SurveyQuestionTextInput
        variant={variant}
        title="What is the name of your job role?"
        onSkipQuestion={() => setSurveyStep("what_stage_do_you_use_personas")}
        goBack={() => setSurveyStep("user_job")}
        currentAnswer={replaceValueWithPlaceholderIfDefault({
          value: "",
          answer: surveyAnswers.job,
          defaultValue: "Other",
        })}
        inputPlaceholder={replaceValueWithPlaceholderIfDefault({
          value: "Other...",
          answer: surveyAnswers.job,
          defaultValue: "Other",
        })}
        onAnswerQuestion={(answer) =>
          setSurveyAnswers((prev) => ({
            ...prev,
            job: answer,
          }))
        }
      />
    ),
    what_stage_do_you_use_personas: (
      <SurveyQuestionSlider
        title="At what stage do you use personas in your work?"
        variant={variant}
        currentAnswer={surveyAnswers.stage_used}
        onSkipQuestion={() => setSurveyStep("user_satisfaction")}
        onAnswerQuestion={(answer) =>
          setSurveyAnswers((prev) => ({
            ...prev,
            stage_used: answer,
          }))
        }
        goBack={() =>
          setSurveyStep(
            surveyAnswers.job === "Other" ||
              !JOB_CHOICES.includes(
                surveyAnswers.job as (typeof JOB_CHOICES)[number],
              ) //? Type assertion is safe because we check if the value is in the array
              ? "other_job"
              : "user_job",
          )
        }
        rangeLabels={["Early", "Mid", "Late"]}
      />
    ),
    user_satisfaction: (
      <SurveyQuestionSlider
        title="How satisfied are you with our product so far?"
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
        rangeLabels={["Very Unsatisfied", "Satisfied", "Very Satisfied"]}
      />
    ),
    misc_feedback: (
      <SurveyQuestionTextArea
        variant={variant}
        title={
          SATISFACTION_HEADERS[
            (surveyAnswers.satisfaction
              ? mapToSatisfactionLevel(parseInt(surveyAnswers.satisfaction))
              : null) || "Unsatisfied"
          ]
        }
        inputPlaceholder={
          SATISFACTION_PLACEHOLDERS[
            (surveyAnswers.satisfaction
              ? mapToSatisfactionLevel(parseInt(surveyAnswers.satisfaction))
              : null) || "Unsatisfied"
          ]
        }
        onSkipQuestion={() => setSurveyStep("end")}
        goBack={() => setSurveyStep("user_satisfaction")}
        currentAnswer={surveyAnswers.misc_feedback || ""}
        onAnswerQuestion={(answer) =>
          setSurveyAnswers((prev) => ({
            ...prev,
            misc_feedback: answer,
          }))
        }
        isLastQuestion={true}
      />
    ),
    end: <EndSurvey variant={variant} />,
  };

  useEffect(() => {
    if (surveyStep === "end") {
      const sendSurveyAnswers = async () => {
        // Format the survey answers before sending
        const finialSurveyAnswers = {
          ...surveyAnswers,
          stage_used: surveyAnswers.stage_used
            ? mapToWorkStage(parseInt(surveyAnswers.stage_used))
            : "unanswered",
          satisfaction: surveyAnswers.satisfaction
            ? mapToSatisfactionLevel(parseInt(surveyAnswers.satisfaction))
            : "unanswered",
        };
        // Send the survey answers to PostHog or log to console in dev mode
        if (IS_TEST_DEV_ENV) {
          console.log(finialSurveyAnswers);
        } else {
          posthog.capture(
            "persona-adoption-stage-and-satisfaction-correlation-analysis-survey_completed",
            finialSurveyAnswers,
          );
          const currentDateFormatted = new Date().toISOString().slice(0, 10);
          // Local storage to prevent showing the feedback dialog again for 60 days (see logic in history list page)
          localStorage.setItem(
            LOCAL_STORAGE_CONFIG.feedback.completed,
            currentDateFormatted,
          );
        }
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
        <Dialog.DialogOverlay className="fixed inset-0 h-screen w-screen bg-black/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={shadowVariants({
            variant: variant,
            className:
              "fixed left-1/2 top-1/2 w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          })}
        >
          <div>
            <div className="flex items-center gap-2">
              <MessageSquareHeartIcon className="text-gray-600" />
              <h2 className="pb-1 text-lg font-bold text-gray-700">
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
                  "relative my-4 grid h-[400px] place-items-center rounded-2xl border shadow-sm",
              })}
            >
              <AnimatePresence mode="wait">
                {SURVEY_STEPS[surveyStep]}
              </AnimatePresence>
            </div>

            <p className="text-center text-sm text-muted-foreground">
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

export default PersonaAdoptionStageAndSatisfactionCorrelationAnalysisSurveyPopup;

/**
 * Maps a numeric score to a satisfaction level
 */
function mapToSatisfactionLevel(score: number | null) {
  const satisfactionConfig = {
    ranges: [
      { min: 0, max: 50, label: "Unsatisfied" },
      { min: 50, max: 80, label: "Satisfied" },
      { min: 80, max: 101, label: "Very Satisfied" }, // Upper bound set to 101 to include 100
    ],
  } as const;
  return labelForValueInRange(score, satisfactionConfig);
}

/**
 * Maps a numeric value to a work stage.
 *
 * @param {number | null} progress - The numeric value indicating the stage of work, ranging from 0 to 100.
 * @returns {string | null} - Returns the stage as "Early", "Early-Mid", "Mid", "Mid-Late", "Late", or null if out of range.
 */
function mapToWorkStage(progress: number | null) {
  const workStageConfig = {
    ranges: [
      { min: 0, max: 20, label: "Early" },
      { min: 20, max: 40, label: "Early-Mid" },
      { min: 40, max: 60, label: "Mid" },
      { min: 60, max: 80, label: "Mid-Late" },
      { min: 80, max: 101, label: "Late" }, // Upper bound set to 101 to include 100
    ],
  } as const;
  return labelForValueInRange(progress, workStageConfig);
}
