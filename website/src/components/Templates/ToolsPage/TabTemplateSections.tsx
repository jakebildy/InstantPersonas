import { useState } from "react";
import { BusinessTemplateTab, tabs } from "../../../contexts/BusinessContext";
import download from "downloadjs";
import React from "react";
import { useBusiness } from "../../../contexts/BusinessContext";
import { LoadingIcon } from "../../../pages/Dashboard/ToolsPage2";
import LeanCanvas from "../Templates/LeanCanvas";
import PESTELAnalysis from "../Templates/PESTELAnalysis";
import SWOTAnalysis from "../Templates/SWOTAnalysis";
import UserPersona from "../Templates/UserPersona";
import * as htmlToImage from "html-to-image";
import { cn } from "../../../lib/utilities.ts";
import * as Tooltip from "@radix-ui/react-tooltip";
import { BusinessI } from "../../../services/api.service.ts";
import ValueProposition from "../Templates/ValueProposition.tsx";
import Porters5Forces from "../Templates/Porters5Forces.tsx";

export function TabTemplateSections({
  templatesToGenerate,
}: {
  templatesToGenerate: string[];
}) {
  //get the first tab index where templatesToGenerate[0] equals tabs.name
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [changes, setChanges] = useState(false);
  const {
    loading,
    selectedBusiness,
    updateBusiness,
    createSWOTAnalysis,
    createPESTELAnalysis,
    createUserPersona,
    createLeanCanvas,
    createValueProposition,
    createPorters5Forces,
  } = useBusiness();

  const printRef = React.useRef(null);

  function TemplateArea() {
    interface TabData {
      check: () => boolean;
      loading: boolean;
      create: (business: BusinessI) => void | Promise<BusinessI>;
      component: JSX.Element;
    }

    const tabDataMapping: { [key: string]: TabData } = {
      "SWOT Analysis": {
        check: () => selectedBusiness?.swotAnalysis === undefined,
        loading: loading.SWOTAnalysis,
        create: (business: BusinessI) => createSWOTAnalysis(business),
        component: <SWOTAnalysis setChanges={setChanges} />,
      },
      "PESTEL Analysis": {
        check: () => selectedBusiness?.pestelAnalysis === undefined,
        loading: loading.PESTELAnalysis,
        create: (business: BusinessI) => createPESTELAnalysis(business),
        component: <PESTELAnalysis setChanges={setChanges} />,
      },
      "User Persona": {
        check: () => selectedBusiness?.userPersona === undefined,
        loading: loading.UserPersona,
        create: (business: BusinessI) => createUserPersona(business),
        component: (
          <div className="justify-center mx-auto" style={{ width: "960px" }}>
            <UserPersona setChanges={setChanges} />
          </div>
        ),
      },
      "Lean Canvas": {
        check: () => selectedBusiness?.leanCanvas === undefined,
        loading: loading.LeanCanvas,
        create: (business: BusinessI) => createLeanCanvas(business),
        component: <LeanCanvas setChanges={setChanges} />,
      },
      "Value Proposition": {
        check: () => selectedBusiness?.valueProposition === undefined,
        loading: false,
        create: (business: BusinessI) => createValueProposition(business),
        component: <ValueProposition setChanges={setChanges} />,
      },
      "Porter's 5 Forces": {
        check: () => selectedBusiness?.porters5Forces === undefined,
        loading: false,
        create: (business: BusinessI) => createPorters5Forces(business),
        component: <Porters5Forces setChanges={setChanges} />,
      },
    };

    const currentTab =
      tabDataMapping[selectedTab.name as keyof typeof tabDataMapping];

    return (
      <div ref={printRef} className="pb-8">
        {currentTab?.check() ? (
          <div className={"flex justify-center"}>
            {currentTab.loading ? (
              <div className="text-center">
                <img
                  src={"/loading.gif"}
                  style={{ height: "300px" }}
                  className="mx-auto"
                />
                <span className="animate-pulse mt-10 mb-6 mx-auto">
                  Loading...
                </span>
              </div>
            ) : (
              <button
                className="bg-black hover:bg-orange-600 text-white font-semibold py-2 w-52 rounded-lg mt-10"
                onClick={() => {
                  if (selectedBusiness) {
                    currentTab.create(selectedBusiness);
                  }
                }}
              >
                Generate {selectedTab.name}
              </button>
            )}
          </div>
        ) : (
          currentTab?.component || <div />
        )}
      </div>
    );
  }

  const isLoading = (tab: BusinessTemplateTab): boolean =>
    loading[tab.loadingInterface];
  const isSelected = (tab: BusinessTemplateTab): boolean =>
    tab.name === selectedTab.name;
  const isDisabled = (tab: BusinessTemplateTab): boolean =>
    isLoading(tab) && templatesToGenerate.indexOf(tab.name) !== -1;

  return (
    <>
      <div className="sm:hidden w-full mt-10">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-none focus:ring-none focus:border-gray-300"
          value={selectedTab.name}
          onChange={(event) => {
            setSelectedTab(
              tabs[tabs.findIndex((tab) => tab.name === event.target.value)]
            );
          }}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>

        <TemplateArea />
      </div>

      <div className="mt-10 w-full hidden sm:block xl:px-10">
        <nav
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow w-2/3 lg:justify-center mx-auto xl:w-full"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <Tooltip.Provider key={tab.name}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={() => setSelectedTab(tab)}
                    key={tab.name}
                    disabled={isLoading(tab)}
                    className={cn(
                      isDisabled(tab)
                        ? "text-gray-400 hover:text-gray-400 cursor-not-allowed"
                        : isSelected(tab)
                        ? "text-gray-900"
                        : "text-gray-500 hover:text-gray-700",
                      tabIdx === 0 ? "rounded-l-lg" : "",
                      tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                      "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                    )}
                    aria-current={isSelected(tab) ? "page" : undefined}
                  >
                    <div className="flex justify-center xl:justify-start items-start w-full">
                      {isLoading(tab) ? (
                        <LoadingIcon />
                      ) : (
                        <img
                          src={tab.logo}
                          className="h-[30px] w-[30px] mt-0.5"
                        />
                      )}
                      <span className="ml-5 self-center hidden xl:block">
                        <b>{tab.name}</b>
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className={cn(
                        isSelected(tab) ? "bg-black" : "bg-transparent",
                        "absolute inset-x-0 bottom-0 h-0.5"
                      )}
                    />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className="bg-gray-50 px-4 py-1 rounded-lg shadow block xl:hidden">
                    {tab.name}
                    <Tooltip.Arrow className="mb-2 fill-gray-300 " />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          ))}
        </nav>
        <TemplateArea />
      </div>
      {selectedBusiness &&
      isTabDataUndefined(selectedBusiness, selectedTab.name) ? (
        <div />
      ) : (
        <div className={"flex justify-center"}>
          <button
            onClick={() => {
              setChanges(false);
              if (selectedBusiness) {
                console.log("Save Started");
                // console.log("selected business", selectedBusiness);
                updateBusiness(selectedBusiness);
              }
            }}
            className={
              changes
                ? "bg-black hover:bg-orange-600 text-white font-semibold py-2 w-52 rounded-lg mt-5"
                : "bg-gray-200 hover:gray-200 text-white font-semibold py-2 w-52 rounded-lg mt-5"
            }
          >
            Save Changes
          </button>

          <button
            onClick={() => {
              const element = printRef.current;
              if (!element) return console.error("😭 No element to print");
              htmlToImage.toPng(element).then(function (dataUrl: any) {
                download(dataUrl, selectedTab.name + ".png");
              });
            }}
            className={
              "bg-black hover:bg-orange-600 text-white font-semibold py-2 w-52 rounded-lg mt-5 ml-3"
            }
          >
            Download Template
          </button>
        </div>
      )}
    </>
  );
}

// Function to check if a given tab's data is undefined
function isTabDataUndefined(
  selectedBusiness: BusinessI,
  tabName: string
): boolean {
  const tabDataMapping: { [key: string]: any } = {}; // Use 'any' here temporarily
  tabs.forEach((tab) => {
    tabDataMapping[tab.name] = tab.businessInterface;
  });

  const businessInterface = tabDataMapping[tabName];

  if (
    businessInterface &&
    typeof businessInterface === "string" &&
    businessInterface in selectedBusiness
  ) {
    return selectedBusiness[businessInterface as keyof BusinessI] === undefined;
  }
  return true;
}
