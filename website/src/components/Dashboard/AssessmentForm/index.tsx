import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Step,
  cn,
  generateBezierSteps,
  getRandomUniqueValues,
} from "@/lib/utilities";
import { FormProvider, useForm } from "react-hook-form";
import api from "@/services/api.service";
import {
  SurveyQuestion,
  genericQuestions,
  isSurveyQuestionArray,
  isValidAnswer,
} from "./generic-questions";
import { Progress } from "@/components/ui/progress";
import AssessmentQuestion from "./AssessmentQuestion";
import { AnimatePresence, motion } from "framer-motion";
import { useBusiness } from "@/contexts/BusinessContext";
import { tabs } from "@/contexts/BusinessContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// type SurveyResponse = SurveyQuestion & { response: string | number };

function executeSteps(steps: Step[], setProgress: (progress: number) => void) {
  const timeoutIds: NodeJS.Timeout[] = [];
  for (const step of steps) {
    const { delay, progress } = step;
    const timeoutId = setTimeout(() => setProgress(progress), delay);
    timeoutIds.push(timeoutId);
  }

  // Return a function to clear timeouts.
  return () => {
    timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
  };
}

export default function AssessmentFormModal({
  business,
  templatesToGenerate,
  setGenerating,
}: {
  business: string;
  templatesToGenerate: string[];
  setGenerating: Dispatch<SetStateAction<boolean>>;
}) {
  const { createBusiness } = useBusiness();
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState(0);
  const methods = useForm();

  // Framer Motion Variants
  const reveal = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const onSubmit = async (questions: { [x: string]: unknown }) => {
    // Filter out unanswered questions
    const validQuestions = Object.keys(questions)
      .map((response) => {
        const question = response;
        const answer = questions[response];
        if (isValidAnswer(answer)) {
          return { question, answer };
        }
        return null; // Or any other appropriate value if the value is not valid
      })
      .filter((questionObj) => questionObj !== null) as Array<{
      question: string;
      answer: unknown;
    }>;

    const formatQA = validQuestions.map((questionObj) => {
      return `
      Q: ${questionObj.question},
      A: ${questionObj.answer},
    `;
    });
    //! Generate Analyses
    try {
      setGenerating(true);
      const data = await createBusiness(
        business + "\n Assessment: \n" + formatQA.join(" ")
      );
      // Generate the URL params based on the templates to generate
      const urlParams = templatesToGenerate
        .map((templateName: string) => {
          const tab = tabs.find((tab) => tab.name === templateName);
          return tab ? tab.param : null;
        })
        .filter(Boolean)
        .join("&");
      console.log(urlParams);
      window.location.href = `/tools/${data._id}?${urlParams}`;
    } catch (error) {
      console.error("Failed to create business:", error);
      setGenerating(false);
    }
  };
  const onError = (errors: { [x: string]: unknown }, e: unknown) =>
    console.log(errors, e);
  const [AssessmentQuestions, setAssessmentQuestions] = useState<
    SurveyQuestion[]
  >([]);

  useEffect(() => {
    // isCancelled makes sure that the fetch is cancelled if the component is unmounted
    let isCancelled = false;
    async function fetchQuestions() {
      // Fetch Assessment Questions
      setProgress(0); // Loading Progress Bar Reset for each fetch - Should be moved to a custom hook
      setLoading(true); // Loading State Reset for each fetch
      console.log("Thinking of Assessment Questions...");
      let fetchedQuestions = null;
      try {
        fetchedQuestions = await api.business.generateAssessmentQuestions(
          business
        );
      } catch (error) {
        console.error("Failed to Generate Assessment Questions:", error);
      }
      if (!isCancelled) {
        const isValidQuestions = isSurveyQuestionArray(fetchedQuestions); //Validates Questions
        setProgress(100); // Set Progress to 100% - Should be moved to a custom hook

        if (isValidQuestions) {
          setAssessmentQuestions(fetchedQuestions); // Set retrieved questions if valid
        } else {
          console.error("Invalid questions received from server");
          setAssessmentQuestions(getRandomUniqueValues(genericQuestions, 5)); // Set 5 random generic questions if not valid
        }
        setLoading(false); // Set Loading State to false
      }
    }
    if (business) {
      fetchQuestions();
    }
    return () => {
      // isCancelled makes sure that the fetch is cancelled if the component is unmounted
      isCancelled = true;
    };
  }, [business]);

  useEffect(() => {
    // Loading Progress Bar Effect - Should be moved to a custom hook
    // Generate Steps for Progress Bar - "loads up until 95% then is stale until fetch is complete"
    const controlPoints = [0.05, 0.35, 0.795, 0.95];
    const timeInMs = 10000; // 10 seconds
    const finalValue = 100; // Final Value is 95 because controlPoints[3]
    const steps: Step[] = generateBezierSteps(
      timeInMs,
      finalValue,
      controlPoints
    );
    // Arbitrary Loading Animation
    const clearSteps = executeSteps(steps, setProgress);
    return clearSteps;
  }, [loading]);

  return (
    <AlertDialog>
      <DialogContent className="w-full max-w-4xl" alert={true}>
        <DialogHeader className="mb-4">
          <DialogTitle>Business Assessment</DialogTitle>
          <DialogDescription>
            Help us understand your business with a couple
            <span className="italic text-orange-600 "> optional </span>
            questions.
          </DialogDescription>
        </DialogHeader>
        {/* Animate Presence for Loading-Loaded Transition Animation */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              className="text-center"
              key="loader"
              initial="hidden"
              variants={reveal}
              animate="show"
              exit="exit"
            >
              <img
                src={"/loading.gif"}
                style={{ height: "300px" }}
                className="mx-auto"
              />
              <span className="animate-pulse mt-10 mb-6 mx-auto">
                Loading...
              </span>
              <Progress value={progress} className="my-2 h-1" />
            </motion.div>
          ) : (
            <motion.div
              key="assessmentForm"
              initial="hidden"
              variants={reveal}
              animate="show"
              exit="exit"
            >
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
                  {/* Assessment Questions in Scroll Area */}
                  <ScrollArea className="h-[75vh] w-full  rounded-md border p-4">
                    {!loading &&
                      isSurveyQuestionArray(AssessmentQuestions) &&
                      AssessmentQuestions.map(
                        (question: SurveyQuestion, index) => (
                          <AssessmentQuestion
                            question={question}
                            index={index}
                            key={`${index}-${question.category}`}
                          />
                        )
                      )}
                  </ScrollArea>
                  {/* Form Controls - Footer */}
                  <div className="w-full flex justify-between mt-20">
                    <div className="flex">
                      <AlertDialogTrigger>Back</AlertDialogTrigger>
                    </div>
                    <div className="flex gap-8">
                      <button
                        className={cn(
                          "bg-orange-500 hover:bg-orange-600 text-white hover:text-slate-100 active:bg-orange active:text-orange-100 group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none"
                        )}
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </FormProvider>
            </motion.div>
          )}
        </AnimatePresence>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will clear your progress on the Q&A form.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <DialogTrigger className="text-sm px-4">
              <AlertDialogAction>Continue</AlertDialogAction>
            </DialogTrigger>
          </AlertDialogFooter>
        </AlertDialogContent>
      </DialogContent>
    </AlertDialog>
  );
}
