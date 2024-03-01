import { useState } from "react";
import { TemplateChip } from "./TemplateChip";
import { tabs } from "../../../../contexts/BusinessContext";
import { LoadingButton } from "../../../Button";
import { useUser } from "../../../../contexts/UserContext";
import { cn } from "@/lib/utilities";
import AssessmentFormModal from "@/components/Dashboard/AssessmentForm";
import { Dialog } from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";

export default function PromptArea() {
  const [generating, setGenerating] = useState(false);
  const [templatesToGenerate, setTemplatesToGenerate] = useState<string[]>(
    tabs.map((obj) => obj.name)
  );
  const [businessDescription, setBusinessDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { subscriptionActive } = useUser();
  async function goToGenerate() {
    if (subscriptionActive) {
      setShowModal(true);
    } else {
      console.log("Going to Subscription Page");
      window.location.href = `/subscription`;
    }
  }

  const reveal = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <>
      <form className="flex justify-center">
        <div className=" w-2/3 mb-4 border border-gray-200 rounded-lg bg-gray-50 mt-3 ">
          <div className="flex items-center justify-center px-3 py-2 text-sm ">
            Select analyses to generate:
          </div>
          <div className="flex flex-wrap md:flex-row items-center justify-center px-3 py-2 border-b ">
            {tabs.map((tab) => (
              <TemplateChip
                key={tab.name}
                name={tab.name}
                url={tab.logo}
                setTemplatesToGenerate={setTemplatesToGenerate}
                templatesToGenerate={templatesToGenerate}
              />
            ))}
          </div>
          <div className="px-4 py-2 bg-white rounded-t-lg">
            <label htmlFor="description" className="sr-only">
              Business Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0 "
              placeholder="Enter a short description of the business..."
              required
              value={businessDescription}
              onChange={(e) => setBusinessDescription(e.target.value)}
            ></textarea>
          </div>
          <div
            className="flex items-center justify-center px-3 py-2 border-t "
            data-tooltip-target="tooltip-bottom"
            data-tooltip-placement="bottom"
          >
            <LoadingButton
              type="button"
              loading={generating}
              color="orange"
              className={cn(
                "inline-flex items-center px-4 text-white font-semibold py-2 w-52 rounded-lg bg-orange-500 hover:bg-orange-600",
                subscriptionActive &&
                  (templatesToGenerate.length === 0 ||
                    businessDescription === "")
                  ? "bg-gray-500 hover:bg-gray-700"
                  : ""
              )}
              disabled={
                (templatesToGenerate.length === 0 ||
                  businessDescription === "") &&
                subscriptionActive
              }
              onClick={goToGenerate}
            >
              {!subscriptionActive
                ? "Start Free Trial"
                : templatesToGenerate.length === 0 || businessDescription === ""
                ? "Enter Description"
                : "Generate Analysis"}
            </LoadingButton>
          </div>

          <div className=" text-gray-600 mb-3 text-xs text-center">
            {(!subscriptionActive &&
              "Start your free trial to generate analyses") ||
              (templatesToGenerate.length === 0 &&
                "Select at least one analysis to generate") ||
              (businessDescription === "" &&
                "Enter a description of the business you want to analyze")}
          </div>
        </div>
      </form>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <AnimatePresence mode="wait">
          {showModal && (
            <motion.div
              className="text-center"
              key="loader"
              initial="hidden"
              variants={reveal}
              animate="show"
              exit="exit"
            >
              <AssessmentFormModal
                business={businessDescription}
                templatesToGenerate={templatesToGenerate}
                setGenerating={setGenerating}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog>
    </>
  );
}
