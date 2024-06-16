"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { gradientLightVariants } from "@/components/variants";
import { cn, delay } from "@/lib/utils";
import { MessageSquareHeartIcon } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import { AnimatePresence, motion } from "framer-motion";
import { IS_TEST_DEV_ENV } from "@/lib/utils";
import { SurveyCard } from "@/components/survey/cards/survey-card";
import PersonaAdoptionStageAndSatisfactionCorrelationAnalysisSurveyPopup from "@/components/popups/feedback-survey/persona-adoption-stage-and-satisfaction-correlation-analysis-survey";

export default function FeedbackPage() {
  const [miscFeedback, setMiscFeedback] = useState<string>("");
  const posthog = usePostHog();
  const [showWorkFlowSurvey, setShowWorkFlowSurvey] = useState<boolean>(false);

  useEffect(() => {
    console.log(miscFeedback);
  }, [miscFeedback]);

  return (
    <section className="flex flex-col items-center gap-10 px-4 py-14 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-gray-900">
          Feedback Center
        </h1>
        <span className="max-w-lg text-sm leading-6 text-gray-700">
          We are always looking to improve our product. Help us out by answering
          some surveys, or by providing feedback!
        </span>
      </div>
      <div className="grid w-full max-w-4xl grid-cols-2 gap-4">
        <MiscFeedbackForum className="col-span-2" />
        <SurveyCard
          title={"WorkFlow Survey"}
          description={
            "This survey helps us understand what type of tools are most useful!"
          }
          onTakeSurvey={() => setShowWorkFlowSurvey(true)}
          questions={[
            "What's your job role?",
            "When do you use personas in your work flow?",
            "How satisfied are you with the product?",
          ]}
          variant={"blue"}
          surveyTimeInMins={2}
        />
        {/* <SurveyCard
          title={"First Impressions Survey"}
          description={
            "This survey helps us improve our product and iterate on new ideas!"
          }
          onTakeSurvey={function (): void {
            throw new Error("Function not implemented.");
          }}
          questions={[
            "What was your first impression of the product?",
            "How likely are you to recommend the product to a friend?",
            "How satisfied are you with the product?",
          ]}
          variant={"green"}
          surveyTimeInMins={2}
        /> */}
      </div>
      <PersonaAdoptionStageAndSatisfactionCorrelationAnalysisSurveyPopup
        openFeedbackPopup={showWorkFlowSurvey}
        setOpenFeedbackPopup={setShowWorkFlowSurvey}
      />
    </section>
  );
}

function MiscFeedbackForum({
  className,
  ...Props
}: HTMLAttributes<HTMLDivElement>) {
  const [miscFeedback, setMiscFeedback] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const posthog = usePostHog();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = async () => {
    //? Send feedback to the server
    try {
      if (!miscFeedback) {
        textAreaRef.current?.focus();
        return;
      }
      if (isSubmitting) return;
      setSuccess(false);
      setError(null);
      setIsSubmitting(true);
      const feedback = {
        misc_feedback: miscFeedback,
      };
      IS_TEST_DEV_ENV
        ? console.log(feedback)
        : posthog.capture("feedback_form_completed", {
            misc_feedback: feedback,
          });
      await delay(2500);
      setMiscFeedback("");
      setIsSubmitting(false);
      setSuccess(true);
      await delay(4000);
      setSuccess(false);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      setSuccess(false);
      setError("An error occurred. Please try again later.");
      await delay(8000);
      setError(null);
    }
  };

  const onCancel = () => {
    setMiscFeedback("");
  };

  return (
    <div
      className={cn(
        "group flex w-full flex-col items-center gap-2 rounded-lg border border-input bg-white p-1 pb-2",
        className,
      )}
      {...Props}
    >
      <div className="relative w-full">
        <div className="absolute right-0 top-0 p-4">
          <MessageSquareHeartIcon className="size-8 text-gray-300 transition-colors duration-300 ease-out group-hover:text-green-400" />
          <span className="sr-only">Benefits</span>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4">
          <AnimatePresence>
            {isSubmitting ? (
              <motion.div
                key="message-sending-loader"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <BarLoader
                  color="#36d7b7"
                  height={10}
                  width={500}
                  className="rounded-full"
                />
                <span className="sr-only">Sending Message</span>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <Textarea
          className="flex min-h-[400px] flex-col items-center gap-2 rounded-lg border border-input bg-white p-4 pr-14 focus-visible:ring-green-500"
          placeholder="Send us Feedback..."
          value={miscFeedback}
          onChange={(e) => setMiscFeedback(e.target.value)}
          ref={textAreaRef}
          disabled={isSubmitting}
        />
        <p
          className={cn(
            "absolute bottom-2 left-1/2 z-10 -translate-x-1/2 cursor-default text-center text-sm text-muted-foreground/50 transition-colors duration-300 ease-out hover:text-muted-foreground",
            error ? "text-pastel-red hover:text-red-500" : "",
          )}
        >
          {error ? error : "We appreciate your feedback!"}
        </p>
      </div>
      <div className="flex w-full flex-wrap items-start justify-between gap-2 max-sm:flex-col sm:items-center">
        <Button
          variant={"outline"}
          className="h-fit rounded-full p-1 shadow-sm hover:scale-100 hover:text-primary"
          onClick={onCancel}
        >
          <span
            className={gradientLightVariants({
              variant: "red",
              className:
                "h-10 whitespace-nowrap rounded-full border border-input p-2 px-4 font-semibold text-muted-foreground transition-colors duration-300 ease-out hover:bg-red-500 hover:text-white",
            })}
          >
            Cancel
          </span>
        </Button>
        <Button
          variant={"outline"}
          className="h-fit rounded-full p-1 shadow-sm transition-all duration-300 hover:border-green-500 hover:text-primary"
          onClick={onSubmit}
        >
          <span
            className={
              "h-10 whitespace-nowrap rounded-full border border-input bg-gradient-to-b from-green-500 to-green-500 p-2 px-4 font-semibold text-white transition-all duration-300 ease-out hover:bg-gradient-to-b hover:from-green-500 hover:to-green-400 sm:px-10"
            }
          >
            {isSubmitting
              ? "Submitting..."
              : success
                ? "Feedback Sent!"
                : !miscFeedback
                  ? "Write us some feedback!"
                  : "Send!"}
          </span>
        </Button>
      </div>
    </div>
  );
}
