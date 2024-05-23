"use client";
import api from "@/service/api.service";
import { IconDownload } from "@tabler/icons-react";
import axios from "axios";
import { LockClosedIcon } from "@heroicons/react/20/solid";

import { useState } from "react";
import {
  ColorVariant,
  ColorVariantMap,
  badgeVariants,
  gradientLightVariants,
  shadowVariants,
} from "../variants";
import { useHandleCopy } from "@/lib/hooks";
import { cx } from "class-variance-authority";

export function GoogleKeywordFinderTool({
  input,
  isSubscribed,
  noInput,
}: {
  input: string;
  isSubscribed: boolean;
  noInput: boolean;
}) {
  const [loading, setIsLoading] = useState(false);

  const [keywordResults, setKeywordResults] = useState<any[]>([]);
  const [hasCompleted, setHasCompleted] = useState(false);

  const [selectedType, setSelectedType] = useState("easyToSubmit");

  return (
    <div>
      {loading ? (
        "Looking for keywords..."
      ) : keywordResults.length === 0 && hasCompleted ? (
        "We didn't find any good keywords for this persona. Try refining your search!"
      ) : keywordResults.length > 0 ? (
        <div className="mb-5">
          <ul className="pt-4 pl-2">
            <button
              className="text-sm font-bold text-blue-500 flex flex-row mb-2"
              onClick={() => {
                const csv = keywordResults
                  .map((result) => {
                    return `${result.keyword},${result.search_volume},${result.cpc},${result.competition}`;
                  })
                  .join("\n");
                //   add a new row of headers before
                const headers = "Keyword,Search Volume,CPC,Competition";
                const csvWithHeaders = headers + "\n" + csv;
                const blob = new Blob([csvWithHeaders], { type: "text/csv" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "google-keyword-results.csv";
                a.click();
                window.URL.revokeObjectURL(url);
              }}
            >
              <IconDownload style={{ height: "20px" }} /> Download as CSV
            </button>
            Data for US Searches 🇺🇸
            {keywordResults.length === 0 ? null : (
              <div className=" w-full">
                <table className="font-inter w-full table-auto border-separate border-spacing-y-1 overflow-scroll text-left md:overflow-auto">
                  <thead className="w-full rounded-lg bg-[#222E3A]/[6%] text-base font-semibold text-white">
                    <tr className="w-full text-sm font-normal whitespace-nowrap  text-[#212B36]">
                      <th className="px-2 py-3">Keyword</th>
                      <th className="px-2 py-3">Search Volume</th>
                      <th className="px-2 py-3">Cost Per Click</th>
                      <th className="px-2 py-3">Competition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywordResults
                      .sort((keywordA, keywordB) => {
                        // sort by competition HIGH -> MEDIUM -> LOW -> unknown / else
                        if (keywordA.competition === "HIGH") {
                          return -1;
                        } else if (keywordA.competition === "MEDIUM") {
                          if (keywordB.competition === "HIGH") {
                            return 1;
                          } else {
                            return -1;
                          }
                        } else if (keywordA.competition === "LOW") {
                          if (
                            keywordB.competition === "HIGH" ||
                            keywordB.competition === "MEDIUM"
                          ) {
                            return 1;
                          } else {
                            return -1;
                          }
                        } else {
                          return 1;
                        }
                      })
                      .map((keyword, i) => {
                        return (
                          <GoogleKeywordTableRow
                            key={i}
                            keyword={keyword.keyword}
                            searchVolume={keyword.search_volume}
                            cpc={keyword.cpc}
                            competition={keyword.competition}
                            isSubscribed={isSubscribed}
                            variant={
                              keyword.competition === "LOW"
                                ? "green"
                                : keyword.competition === "MEDIUM"
                                ? "blue"
                                : keyword.competition === "HIGH"
                                ? "pink"
                                : "purple"
                              // "blue"
                            }
                          />
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </ul>
        </div>
      ) : null}

      <div className="text-center">
        {keywordResults.length > 0 && !isSubscribed
          ? "Sign up to not miss out on keyword search volume, CPC, deeper insights, and get ahead of your competition!"
          : ""}
        <br />
        <button
          className={
            noInput
              ? "bg-gray-400 text-white font-bold py-2 px-4 rounded-full mb-5"
              : "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-5"
          }
          onClick={async () => {
            if (noInput) return;
            if (keywordResults.length > 0 && !isSubscribed) {
              // go to signup
              window.open("https://www.instantpersonas.com/", "_blank");
            } else {
              setIsLoading(true);
              console.log(
                "Finding guest post opportunities for persona: ",
                input
              );
              //   api guest post
              const response = await api.tools.findGoogleKeywords(
                input,
                isSubscribed
              );
              console.log(response);
              setHasCompleted(true);
              setIsLoading(false);
              // sort by search volume
              response.keywords.sort((a: any, b: any) => {
                return b.search_volume - a.search_volume;
              });
              setKeywordResults(response.keywords);
            }
          }}
        >
          {loading
            ? "Searching..."
            : keywordResults.length > 0
            ? "Find More Keywords"
            : "Find Google Keywords"}
        </button>
      </div>
    </div>
  );
}

function GoogleKeywordTableRow({
  keyword,
  searchVolume,
  cpc,
  competition,
  variant = "blue",
  isSubscribed = true,
}: {
  keyword: string;
  searchVolume: number;
  cpc: number;
  competition: number;
  variant?: ColorVariant;
  isSubscribed?: boolean;
}) {
  const { handleCopy } = useHandleCopy();

  return (
    <tr
      className={cx(
        shadowVariants({
          variant,
          className:
            "cursor-pointer bg-[#f6f8fa] hover:shadow-2xl hover:bg-gray-200 ",
        }),
        gradientLightVariants({
          variant,
          className: "bg-gradient-to-r",
        })
      )}
      onClick={() =>
        handleCopy({
          type: "Keyword",
          text: `${keyword}\nSearch Volume: ${searchVolume}\nCPC: ${cpc}\nCompetition: ${competition}`,
        })
      }
    >
      <td className={"px-2 py-2 text-sm font-normal"}>
        <div
          className={badgeVariants({
            variant,
            className: "rounded-lg text-left normal-case",
          })}
        >
          {keyword}
        </div>
      </td>
      {!isSubscribed ? (
        <td className="px-1 py-4 text-sm font-normal text-[#637381]">
          <a href="https://instantpersonas.com/register">
            Sign Up to View (3 days FREE)
          </a>
        </td>
      ) : (
        <td className="px-1 py-4 text-sm font-normal text-[#637381]">
          {searchVolume}
        </td>
      )}

      <td className="px-1 py-4 text-sm font-normal text-[#637381]">{cpc}</td>
      <td className="px-1 py-4 text-sm font-normal text-[#637381]">
        {competition}
      </td>
    </tr>
  );
}
