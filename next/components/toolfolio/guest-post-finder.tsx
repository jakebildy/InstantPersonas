"use client";
import api from "@/service/api.service";
import { IconAwardFilled, IconDownload, IconMail } from "@tabler/icons-react";
import axios from "axios";
import { LockClosedIcon } from "@heroicons/react/20/solid";

import { useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

export function GuestPostFinderTool({
  input,
  isSubscribed,
  noInput,
}: {
  input: string;
  isSubscribed: boolean;
  noInput: boolean;
}) {
  const [loading, setIsLoading] = useState(false);

  const [easyToSubmitResults, setEasyToSubmitResults] = useState<any[]>([]);
  const [harderToSubmitResults, setHardToSubmitResults] = useState<any[]>([]);

  const [selectedType, setSelectedType] = useState("easyToSubmit");
  const results =
    selectedType === "easyToSubmit"
      ? // remove all where the displayLink is duplicate
        easyToSubmitResults.length === 0
        ? []
        : easyToSubmitResults.filter(
            (v, i, a) =>
              a.findIndex(
                (t) =>
                  t.displayLink &&
                  v.displayLink &&
                  t.displayLink === v.displayLink,
              ) === i,
          )
      : harderToSubmitResults.filter(
          (v, i, a) =>
            a.findIndex(
              (t) =>
                t.displayLink &&
                v.displayLink &&
                t.displayLink === v.displayLink,
            ) === i,
        );

  return (
    <div>
      {loading ? (
        "Looking for guest post opportunities, this will take a minute..."
      ) : harderToSubmitResults.length > 0 &&
        easyToSubmitResults.length === 0 ? (
        "We didn't find any easy guest post opportunities for this persona. Try refining your search!"
      ) : easyToSubmitResults.length > 0 ? (
        <div className="mb-5">
          <button
            className={
              selectedType === "easyToSubmit"
                ? "mr-4 border-2 border-transparent border-b-green-500 p-2 text-sm font-bold text-green-500"
                : "mr-4 border-2 border-transparent p-2 text-sm font-bold text-gray-400"
            }
            onClick={() => {
              setSelectedType("easyToSubmit");
            }}
          >
            Easy to Submit
          </button>
          <button
            className={
              selectedType === "harderToSubmit"
                ? "mr-4 border-2 border-transparent border-b-green-500 p-2 text-sm font-bold text-green-500"
                : "mr-4 border-2 border-transparent p-2 text-sm font-bold text-gray-400"
            }
            onClick={() => {
              if (!isSubscribed) {
                alert(
                  "Unlock hundreds of high quality guest post opportunities by starting your free trial.",
                );
              } else {
                setSelectedType("harderToSubmit");
              }
            }}
          >
            <div className="flex flex-row">
              Harder to Submit
              {!isSubscribed ? (
                <LockClosedIcon className="ml-1 h-4 text-gray-400" />
              ) : (
                ""
              )}
            </div>
          </button>

          <ul className="pl-2 pt-4">
            <button
              className="mb-2 flex flex-row text-sm font-bold text-blue-500"
              onClick={() => {
                const csv = results
                  .map((results) => {
                    return `${results.displayLink.replaceAll(
                      ",",
                      "",
                    )},${results.title.replaceAll(
                      ",",
                      "",
                    )},${results.snippet.replaceAll(",", "")},${
                      results.emails
                        ? results.emails
                            .map((email: any) => email.value)
                            .join(",")
                        : ""
                    }`;
                  })
                  .join("\n");

                //   add a new row of headers before
                const headers = "Website,Title,Snippet,Emails";
                const csvWithHeaders = headers + "\n" + csv;
                const blob = new Blob([csvWithHeaders], { type: "text/csv" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "guest-post-opportunities.csv";
                a.click();
                window.URL.revokeObjectURL(url);
              }}
            >
              <IconDownload style={{ height: "20px" }} /> Download as CSV
            </button>

            {results.map((result) => (
              <li
                className="rounded-md border bg-white p-5 text-blue-500"
                key={result.formattedUrl}
              >
                <div className="text-sm text-black">{result.displayLink}</div>
                <a target="_blank" href={result.formattedUrl}>
                  {result.title}
                </a>

                <div className="text-xs text-black">{result.snippet}</div>
                <div>
                  {result.emails ? (
                    // map email .value  for each email display here
                    result.emails.slice(0, 5).map((email: any) => {
                      return (
                        <a
                          target="_blank"
                          key={email.value}
                          href={"mailto:" + email.value}
                        >
                          <span className="flex flex-row">
                            <EnvelopeIcon className="mr-2 mt-1 h-4" />{" "}
                            {email.value}
                          </span>
                        </a>
                      );
                    })
                  ) : (
                    <div />
                  )}
                </div>
                <div className="text-sm font-bold text-gray-400">
                  <a
                    className="flex flex-row"
                    target="_blank"
                    href={
                      "https://ahrefs.com/website-authority-checker/?input=" +
                      result.formattedUrl
                    }
                  >
                    <IconAwardFilled className="mt-0.5 h-4" /> Check DR
                  </a>
                </div>

                {/* <div>{result.phones}</div> */}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="text-center">
        {easyToSubmitResults.length > 0 && !isSubscribed
          ? "Sign up to get 10x more results, get deep audience insights, and more!"
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
            if (easyToSubmitResults.length > 0 && !isSubscribed) {
              // go to signup
              window.open("https://www.instantpersonas.com/", "_blank");
            } else {
              setIsLoading(true);

              //   api guest post
              const response = await api.tools.findGuestPostOpportunities(
                input,
                isSubscribed,
              );

              setIsLoading(false);
              setEasyToSubmitResults(response.easyToSubmit);
              setHardToSubmitResults(response.hardToSubmit);
            }
          }}
        >
          {loading
            ? "Searching..."
            : easyToSubmitResults.length > 0
              ? "Find More Opportunities"
              : "Find Guest Post Opportunities"}
        </button>
      </div>
    </div>
  );
}
