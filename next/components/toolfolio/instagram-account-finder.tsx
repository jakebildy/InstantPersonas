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
import { LoadingThreeMin } from "../page-specific/generative-ui/loading";

export function InstagramAccountFinderTool({
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

  const [accountResults, setAccountResults] = useState<any[]>([]);
  const [hasCompleted, setHasCompleted] = useState(false);

  return (
    <div className="text-center">
      {loading ? (
        <span className="loading loading01">
          <LoadingThreeMin
            loadingMessage={
              "Looking for the best accounts - this will take a minute or two..."
            }
          />
          <br></br>
          <br></br>
          Stay on this page!
        </span>
      ) : accountResults.length === 0 && hasCompleted ? (
        "We didn't find any good accounts for this persona. Try refining your search!"
      ) : accountResults.length > 0 ? (
        <div className="mb-5">
          <ul className="pt-4 pl-2">
            <div className="flex flex-row">
              <button
                className="text-sm font-bold text-blue-500 flex flex-row mb-2"
                onClick={() => {
                  if (!isSubscribed && !isLoggedIn) {
                    window.open(
                      "https://www.instantpersonas.com/register",
                      "_blank"
                    );
                    return;
                  } else if (!isSubscribed) {
                    window.open("https://www.instantpersonas.com/subscription");
                    return;
                  }
                  const csv = accountResults
                    .map((result) => {
                      return `@${result.username},${result.fullName.replace(
                        /[\n,]/g,
                        ""
                      )},${result.followersCount},${
                        result.followsCount
                      },${Math.round(
                        result.latestPosts
                          .map((post: any) => post.likesCount)
                          .reduce((a: number, b: number) => a + b) /
                          result.latestPosts.length
                      )},${Math.round(
                        result.latestPosts
                          .map((post: any) => post.commentsCount)
                          .reduce((a: number, b: number) => a + b) /
                          result.latestPosts.length
                      )},${result.biography.replace(/[\n,]/g, "")}`;
                    })
                    .join("\n");
                  //   add a new row of headers before
                  const headers =
                    "Username,Display Name,Followers,Following,Average Likes,Average Comments,Bio";
                  const csvWithHeaders = headers + "\n" + csv;
                  const blob = new Blob([csvWithHeaders], { type: "text/csv" });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "instagram-accounts-results.csv";
                  a.click();
                  window.URL.revokeObjectURL(url);
                }}
              >
                <IconDownload style={{ height: "20px" }} /> Download as CSV
                {!isSubscribed ? " (Paid Feature)" : ""}
              </button>
            </div>
            {accountResults.length === 0 ? null : (
              <div className=" w-full px-2">
                <table className="font-inter w-full table-auto border-separate border-spacing-y-1 overflow-scroll text-left md:overflow-auto">
                  <thead className="w-full rounded-lg bg-[#222E3A]/[6%] text-base font-semibold text-white">
                    <tr className="w-full text-xs font-normal whitespace-nowrap  text-[#212B36]">
                      <th className="px-2 py-3 text-center">Account</th>
                      {/* <th className="px-2 py-3 text-center">Full Name</th> */}
                      <th className="px-2 py-3 text-center">Followers</th>
                      <th className="px-2 py-3 text-center">Following</th>
                      <th className="px-2 py-3 text-center">Avg. Likes</th>
                      <th className="px-2 py-3 text-center">Avg. Comments</th>
                      <th className="px-2 py-3 text-center">Bio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountResults

                      // // sort by average likes of top posts
                      .sort((a, b) => b.followersCount - a.followersCount)
                      .filter((account) => account.latestPosts !== undefined)
                      .map((account, i) => {
                        return (
                          <InstagramAccountTableRow
                            key={i}
                            profilePic={account.profilePicUrlHD}
                            username={account.username}
                            name={account.fullName}
                            followers={account.followersCount}
                            following={account.followsCount}
                            bio={account.biography}
                            isSubscribed={isSubscribed}
                            isLoggedIn={isLoggedIn}
                            averageLikesOfRecentPosts={
                              // avg likesCount of all latestPosts
                              account.latestPosts
                                .map((post: any) => post.likesCount)
                                .reduce((a: number, b: number) => a + b) /
                              account.latestPosts.length
                            }
                            averageCommentsOfRecentPosts={
                              // avg commentsCount of all latestPosts
                              account.latestPosts
                                .map((post: any) => post.commentsCount)
                                .reduce((a: number, b: number) => a + b) /
                              account.latestPosts.length
                            }
                            variant={
                              account.followersCount > 1000000
                                ? "red"
                                : account.followersCount > 100000
                                ? "yellow"
                                : account.followersCount > 10000
                                ? "green"
                                : account.followersCount > 1000
                                ? "blue"
                                : account.followersCount > 100
                                ? "purple"
                                : "pink"
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
        {accountResults.length > 0 && !isSubscribed && !isLoggedIn
          ? "Sign up to not miss out on deeper insights, and get ahead of your competition!"
          : accountResults.length > 0 && !isSubscribed
          ? "Start your free trial to not miss out on deeper insights, and get ahead of your competition!"
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
            if (accountResults.length > 0 && !isSubscribed && !isLoggedIn) {
              // go to signup
              window.open("https://www.instantpersonas.com/", "_blank");
            } else if (accountResults.length > 0 && !isSubscribed) {
              // go to subscription
              window.open("https://www.instantpersonas.com/subscription");
            } else {
              setIsLoading(true);

              //   api guest post
              const response = await api.tools.findInstagramAccounts(
                input,
                isSubscribed
              );

              setHasCompleted(true);
              setIsLoading(false);
              console.log("ACCOUNT, " + response.accounts[0]);
              setAccountResults(response.accounts);
            }
          }}
        >
          {loading
            ? "Searching..."
            : accountResults.length > 0
            ? "Find More Accounts"
            : "Find Instagram Accounts"}
        </button>
      </div>
    </div>
  );
}

function InstagramAccountTableRow({
  name,
  username,
  followers,
  following,
  profilePic,
  bio,
  averageLikesOfRecentPosts,
  averageCommentsOfRecentPosts,
  variant = "blue",
  isSubscribed = true,
  isLoggedIn = true,
}: {
  name: string;
  username: string;
  followers: number;
  following: number;
  profilePic: string;
  bio: string;
  averageLikesOfRecentPosts: number;
  averageCommentsOfRecentPosts: number;
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
            "cursor-pointer bg-[#f6f8fa] hover:shadow-2xl hover:bg-gray-200 ",
        }),
        gradientLightVariants({
          variant,
          className: "bg-gradient-to-r",
        })
      )}
      onClick={() => {
        window.open(`https://www.instagram.com/${username}`);
      }}
    >
      <td className={"px-2 py-2 text-sm font-normal"}>
        <div
          className={badgeVariants({
            variant,
            className: "rounded-lg flex flex-row normal-case",
          })}
        >
          <img
            src={"https://corsproxy.io/?" + profilePic}
            crossOrigin="anonymous"
            alt="profile pic"
            className="w-8 h-8 rounded-full mr-2 border-white border-2 shadow-lg"
          />
          <div className="text-left">
            <b>{name}</b>
            <br></br>@{username}
          </div>
        </div>
      </td>
      {/* <td className="px-1 py-4 text-sm font-normal text-[#637381] text-center">
        {name}
      </td> */}
      <td className="px-1 py-4 text-sm font-normal text-[#637381] text-center">
        {followers}
      </td>
      <td className="px-1 py-4 text-sm font-normal text-[#637381] text-center">
        {following}
      </td>
      <td className="px-1 py-4 text-sm font-normal text-[#637381] text-center">
        {Math.round(averageLikesOfRecentPosts)}
      </td>
      <td className="px-1 py-4 text-sm font-normal text-[#637381] text-center">
        {Math.round(averageCommentsOfRecentPosts)}
      </td>
      <td className="px-1 py-4 text-sm font-normal text-[#637381] text-center">
        {bio}
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
      <td className="px-1 py-4 text-sm font-normal text-[#637381] text-center">
        {/* {Math.round(averageLikesOfTopPosts)} */}
      </td>
      {/* )} */}
    </tr>
  );
}
