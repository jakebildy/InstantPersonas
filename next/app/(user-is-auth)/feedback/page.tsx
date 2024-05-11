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
import PersonaAdoptionStageAndSatisfactionCorrelationAnalysisSurveyPopup from "@/components/popups/persona-adoption-stage-and-satisfaction-correlation-analysis-survey";

export default function FeedbackPage() {
  const [miscFeedback, setMiscFeedback] = useState<string>("");
  const posthog = usePostHog();
  const [showWorkFlowSurvey, setShowWorkFlowSurvey] = useState<boolean>(false);

  useEffect(() => {
    console.log(miscFeedback);
  }, [miscFeedback]);

  return (
    <section className="text-center flex flex-col gap-10 items-center py-14 px-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 max-w-4xl">
          Feedback Center
        </h1>
        <span className="text-sm leading-6 text-gray-700 max-w-lg">
          We are always looking to improve our product. Help us out by answering
          some surveys, or by providing feedback!
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 max-w-4xl w-full">
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
        : posthog.capture("survey_completed", {
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
        "flex flex-col items-center p-1 pb-2 border border-input bg-white rounded-lg  w-full group gap-2",
        className
      )}
      {...Props}
    >
      <div className="relative w-full">
        <div className="absolute top-0 right-0 p-4">
          <MessageSquareHeartIcon className="text-gray-300 size-8 group-hover:text-green-400 transition-colors duration-300 ease-out" />
          <span className="sr-only">Benefits</span>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-4">
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
          className="flex flex-col items-center gap-2 p-4 border border-input bg-white rounded-lg focus-visible:ring-green-500 min-h-[400px] pr-14"
          placeholder="Send us Feedback..."
          value={miscFeedback}
          onChange={(e) => setMiscFeedback(e.target.value)}
          ref={textAreaRef}
          disabled={isSubmitting}
        />
        <p
          className={cn(
            "text-sm text-muted-foreground/50 hover:text-muted-foreground text-center absolute bottom-2 left-1/2 -translate-x-1/2 z-10 transition-colors duration-300 ease-out cursor-default",
            error ? "text-pastel-red hover:text-red-500" : ""
          )}
        >
          {error ? error : "We appreciate your feedback!"}
        </p>
      </div>
      <div className="flex max-sm:flex-col flex-wrap gap-2 justify-between items-start sm:items-center w-full">
        <Button
          variant={"outline"}
          className="hover:text-primary rounded-full hover:scale-100 h-fit  p-1 shadow-sm"
          onClick={onCancel}
        >
          <span
            className={gradientLightVariants({
              variant: "red",
              className:
                "whitespace-nowrap rounded-full px-4 border border-input h-10 p-2 hover:bg-red-500 hover:text-white transition-colors duration-300 ease-out font-semibold text-muted-foreground ",
            })}
          >
            Cancel
          </span>
        </Button>
        <Button
          variant={"outline"}
          className="hover:text-primary rounded-full h-fit hover:border-green-500  p-1 shadow-sm transition-all duration-300"
          onClick={onSubmit}
        >
          <span
            className={
              "bg-gradient-to-b whitespace-nowrap rounded-full px-4 sm:px-10 border border-input h-10 p-2  to-green-500 hover:bg-gradient-to-b hover:from-green-500 hover:to-green-400 from-green-500  text-white transition-all duration-300 ease-out font-semibold "
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
