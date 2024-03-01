import { useEffect, useState } from "react";
import { Button, LoadingButton } from "../../components/Button";
import Sidebar from "../../components/Sidebar";
import { useBusiness } from "../../contexts/BusinessContext";
// import api from "../../services/api.service";
import { useParams } from "react-router-dom";
import { BusinessI } from "../../services/api.service";
import { useUser } from "../../contexts/UserContext";
import { tabs } from "../../contexts/BusinessContext.tsx";
import { TemplateChip } from "../../components/Templates/ToolsPage/PromptArea/TemplateChip.tsx";
import { TabTemplateSections } from "../../components/Templates/ToolsPage/TabTemplateSections.tsx";

export default function ToolsPage2() {
  // const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [templatesToGenerate, setTemplatesToGenerate] = useState<string[]>(
    tabs.map((obj) => obj.name)
  );

  const [businessDescription, setBusinessDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  const { subscriptionActive } = useUser();

  const {
    createSWOTAnalysis,
    createPESTELAnalysis,
    createUserPersona,
    createLeanCanvas,
    createValueProposition,
    createPorters5Forces,
    fetchBusinessById,
    setSelectedBusiness,
    selectedBusiness,
  } = useBusiness();

  useEffect(() => {
    async function fetchBusiness() {
      setLoading(true);
      try {
        const business = await fetchBusinessById(id as string);
        setBusinessDescription(business.description);
        setSelectedBusiness(business);

        const urlParams = new URLSearchParams(window.location.search);

        let newTemplatesToGenerate: string[] = [];

        // Loop through the tabs to programmatically check and generate templates
        tabs.forEach((tab) => {
          const isParamTrue = urlParams.get(tab.param.split("=")[0]) === "true";
          if (
            isParamTrue &&
            !business[tab.businessInterface as keyof BusinessI]
          ) {
            newTemplatesToGenerate = [...newTemplatesToGenerate, tab.name];
          }
        });

        if (newTemplatesToGenerate.length > 0) {
          generateAnalyses(business, newTemplatesToGenerate);
        }
      } catch (error) {
        console.error("Failed to fetch business:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBusiness();
  }, [id, setSelectedBusiness, fetchBusinessById]);

  async function generateAnalyses(
    business: BusinessI,
    newTemplatesToGenerate: string[]
  ) {
    setGenerating(true);
    console.log("generating");
    if (business) {
      console.log("business exists");
      try {
        if (newTemplatesToGenerate.includes("SWOT Analysis")) {
          createSWOTAnalysis(business);
          console.log("create swot analysis");
        }
        if (newTemplatesToGenerate.includes("PESTEL Analysis")) {
          createPESTELAnalysis(business);
        }
        if (newTemplatesToGenerate.includes("Lean Canvas")) {
          createLeanCanvas(business);
        }
        if (newTemplatesToGenerate.includes("User Persona")) {
          createUserPersona(business);
        }
        if (newTemplatesToGenerate.includes("Value Proposition")) {
          createValueProposition(business);
        }
        if (newTemplatesToGenerate.includes("Porter's 5 Forces")) {
          createPorters5Forces(business);
        }
        setGenerated(true);
      } catch (error) {
        console.error("Failed to generate analyses:", error);
      } finally {
        setGenerating(false);
      }
    }
  }

  if (loading) {
    return (
      <Sidebar currentSelectedPage="Consulting Tools">
        <div className="flex justify-center">
          {/* Pulsing Loading  */}
          <span className="animate-pulse">Loading...</span>
        </div>
      </Sidebar>
    );
  }

  return (
    <>
      <Sidebar currentSelectedPage="Consulting Tools">
        {/* Align to right with padding 30px */}
        <div className="flex items-center justify-center pt-2">
          <Button
            onClick={() => {
              window.location.href = "/persona";
            }}
          >
            New Business
          </Button>
        </div>
        <form className="flex justify-center">
          <div className=" w-2/3 mb-4 border border-gray-200 rounded-lg bg-gray-50 mt-3 ">
            <div className="flex items-center justify-center px-3 py-2 text-sm ">
              Analyses to generate:
            </div>
            <div className="flex flex-wrap md:flex-row items-center justify-center px-3 py-2 border-b ">
              {tabs.map((tab) => (
                <TemplateChip
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
              {/* Tooltip */}
              <div
                id="tooltip-bottom"
                role="tooltip"
                className={
                  businessDescription === "" || templatesToGenerate.length === 0
                    ? "absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-black rounded-lg shadow-sm opacity-0 tooltip "
                    : "opacity-100"
                }
              >
                {templatesToGenerate.length === 0
                  ? "Select at least one analysis to generate"
                  : businessDescription === ""
                  ? "Enter a description of the business you want to analyze"
                  : ""}
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
              <LoadingButton
                type="button"
                loading={generating}
                className="inline-flex items-center px-4 bg-black hover:bg-green-600 text-white font-semibold py-2 w-52 rounded-lg"
                disabled={
                  (templatesToGenerate.length === 0 ||
                    businessDescription === "") &&
                  subscriptionActive
                }
                onClick={async () => {
                  if (subscriptionActive) {
                    if (selectedBusiness) {
                      generateAnalyses(selectedBusiness, templatesToGenerate);
                    }
                  } else {
                    window.location.href = `/subscription`;
                  }
                }}
              >
                {subscriptionActive
                  ? "Regenerate Analysis"
                  : "Start Free Trial"}
              </LoadingButton>
            </div>
          </div>
        </form>
        <main className="flex flex-col items-center min-h-screen w-full p-3">
          {/* Tabs */}
          {<TabTemplateSections templatesToGenerate={templatesToGenerate} />}
        </main>
      </Sidebar>
    </>
  );
}

export function LoadingIcon() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-100 fill-green-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );
}
