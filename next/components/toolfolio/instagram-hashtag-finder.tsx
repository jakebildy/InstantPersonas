"use client";
import api from "@/service/api.service";
import { IconDownload, IconInfoCircleFilled } from "@tabler/icons-react";
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
import InfoTooltip from "../ui/info-tooltip";

export function InstagramHashtagFinderTool({
  input,
  isSubscribed,
  isLoggedIn,
  noInput,
}: {
  input: string;
  isSubscribed: boolean;
  isLoggedIn: boolean;
  noInput: boolean;
}) {
  const [loading, setIsLoading] = useState(false);

  const [hashtagResults, setHashtagResults] = useState<any[]>([]);
  const [hasCompleted, setHasCompleted] = useState(false);

  return (
    <div>
      {loading ? (
        <span className="loading loading01">
          Looking for hashtags - this may take a minute or two <span>.</span>{" "}
          <span>.</span> <span>.</span>
        </span>
      ) : hashtagResults.length === 0 && hasCompleted ? (
        "We didn't find any good hashtags for this persona. Try refining your search!"
      ) : hashtagResults.length > 0 ? (
        <div className="mb-5">
          <ul className="pl-2 pt-4">
            <div className="flex flex-row">
              <button
                className="mb-2 flex flex-row text-sm font-bold text-blue-500"
                onClick={() => {
                  if (!isSubscribed && !isLoggedIn) {
                    window.open(
                      "https://www.instantpersonas.com/register",
                      "_blank",
                    );
                    return;
                  } else if (!isSubscribed) {
                    window.open("https://www.instantpersonas.com/subscription");
                    return;
                  }
                  const csv = hashtagResults
                    .map((result) => {
                      return `#${result.hashtag},${
                        Math.round(result.volume / 1000) === 0
                          ? "<1"
                          : Math.round(result.volume / 1000)
                      }k,${Math.round(result.averageLikesOfTopPosts)}`;
                    })
                    .join("\n");
                  //   add a new row of headers before
                  const headers = "Hashtag,Volume,Average Likes of Top Posts";
                  const csvWithHeaders = headers + "\n" + csv;
                  const blob = new Blob([csvWithHeaders], { type: "text/csv" });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "instagram-hashtag-results.csv";
                  a.click();
                  window.URL.revokeObjectURL(url);
                }}
              >
                <IconDownload style={{ height: "20px" }} /> Download as CSV
                {!isSubscribed ? " (Paid Feature)" : ""}
              </button>
              <button
                className="mb-2 ml-4 flex flex-row text-sm font-bold text-blue-500"
                onClick={() => {
                  const hashtags = hashtagResults
                    .map((result) => `#${result.hashtag}`)
                    .join(" ");
                  navigator.clipboard.writeText(hashtags);
                }}
              >
                Copy all Hashtags
              </button>
            </div>
            {hashtagResults.length === 0 ? null : (
              <div className="w-full">
                <table className="font-inter w-full table-auto border-separate border-spacing-y-1 overflow-scroll text-left md:overflow-auto">
                  <thead className="w-full rounded-lg bg-[#222E3A]/[6%] text-base font-semibold text-white">
                    <tr className="w-full whitespace-nowrap text-sm font-normal text-[#212B36]">
                      <th className="px-2 py-3 text-center">Hashtag</th>
                      <th className="px-2 py-3 text-center">Volume</th>
                      <th className="px-2 py-3 text-center">
                        Average Number of Likes on Top Posts{" "}
                        <InfoTooltip text="This is an estimate. Try to target hashtags that get a similar number of likes to your posts" />
                      </th>
                      {/* <th className="px-2 py-3">Cost Per Click</th>
                      <th className="px-2 py-3">Competition</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {hashtagResults

                      // sort by average likes of top posts
                      .sort(
                        (a, b) =>
                          a.averageLikesOfTopPosts - b.averageLikesOfTopPosts,
                      )
                      .map((hashtag, i) => {
                        return (
                          <InstagramHashtagTableRow
                            key={i}
                            hashtag={hashtag.hashtag}
                            volume={hashtag.volume}
                            averageLikesOfTopPosts={
                              hashtag.averageLikesOfTopPosts
                            }
                            isSubscribed={isSubscribed}
                            isLoggedIn={isLoggedIn}
                            variant={
                              hashtag.averageLikesOfTopPosts < 100
                                ? "green"
                                : hashtag.averageLikesOfTopPosts < 500
                                  ? "blue"
                                  : hashtag.averageLikesOfTopPosts < 1000
                                    ? "yellow"
                                    : hashtag.averageLikesOfTopPosts < 10000
                                      ? "pink"
                                      : "red"
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
        {hashtagResults.length > 0 && !isSubscribed && !isLoggedIn
          ? "Sign up to not miss out on hashtag competitiveness, deeper insights, and get ahead of your competition!"
          : hashtagResults.length > 0 && !isSubscribed
            ? "Start your free trial to not miss out on hashtag competitiveness, deeper insights, and get ahead of your competition!"
            : ""}
        <br />
        <button
          className={
            noInput
              ? "mb-5 rounded-full bg-gray-400 px-4 py-2 font-bold text-white"
              : "mb-5 rounded-full bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          }
          onClick={async () => {
            if (noInput) return;
            if (hashtagResults.length > 0 && !isSubscribed && !isLoggedIn) {
              // go to signup
              window.open("https://www.instantpersonas.com/", "_blank");
            } else if (hashtagResults.length > 0 && !isSubscribed) {
              // go to subscription
              window.open("https://www.instantpersonas.com/subscription");
            } else {
              setIsLoading(true);

              //   api guest post
              const response = await api.tools.findInstagramHashtags(
                input,
                isSubscribed,
              );

              setHasCompleted(true);
              setIsLoading(false);

              setHashtagResults(response.hashtags);
            }
          }}
        >
          {loading
            ? "Searching..."
            : hashtagResults.length > 0
              ? "Find More Hashtags"
              : "Find Instagram Hashtags"}
        </button>
      </div>
    </div>
  );
}

function InstagramHashtagTableRow({
  hashtag,
  volume,
  averageLikesOfTopPosts,
  variant = "blue",
  isSubscribed = true,
  isLoggedIn = true,
}: {
  hashtag: string;
  volume: number;
  averageLikesOfTopPosts: number;
  variant?: ColorVariant;
  isSubscribed?: boolean;
  isLoggedIn?: boolean;
}) {
  const { handleCopy } = useHandleCopy();

  return (
    <tr
      className={cx(
        shadowVariants({
          variant,
          className:
            "cursor-pointer bg-[#f6f8fa] hover:bg-gray-200 hover:shadow-2xl",
        }),
        gradientLightVariants({
          variant,
          className: "bg-gradient-to-r",
        }),
      )}
      onClick={() => {
        if (isSubscribed)
          handleCopy({
            type: "Hashtag",
            text: `#${hashtag}\nVolume:   ${
              Math.round(volume / 1000) === 0 ? "<1" : Math.round(volume / 1000)
            }k\nAverage Likes of Top Posts: ${Math.round(
              averageLikesOfTopPosts,
            )}`,
          });
      }}
    >
      <td className={"px-2 py-2 text-sm font-normal"}>
        <div
          className={badgeVariants({
            variant,
            className: "rounded-lg text-left normal-case",
          })}
        >
          #{hashtag}
        </div>
      </td>
      <td className="px-1 py-4 text-center text-sm font-normal text-[#637381]">
        {Math.round(volume / 1000) === 0 ? "<1" : Math.round(volume / 1000)}k
      </td>
      {/* {!isSubscribed && !isLoggedIn ? (
        <td className="px-1 py-4 text-sm font-normal text-[#637381] text-center">
          <a href="https://instantpersonas.com/register">
            Sign Up to View (3 days FREE)
          </a>
        </td>
      ) : !isSubscribed ? (
        <td className="px-1 py-4 text-sm font-normal text-[#637381] text-center">
          <a href="https://instantpersonas.com/subscription">
            Start Trial to View (3 days FREE)
          </a>
        </td>
      ) : ( */}
      <td className="px-1 py-4 text-center text-sm font-normal text-[#637381]">
        {Math.round(averageLikesOfTopPosts)}
      </td>
      {/* )} */}
    </tr>
  );
}
