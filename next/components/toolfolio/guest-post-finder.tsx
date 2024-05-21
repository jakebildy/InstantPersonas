"use client";
import api from "@/service/api.service";
import { IconDownload } from "@tabler/icons-react";
import axios from "axios";
import { LockClosedIcon } from "@heroicons/react/20/solid";

import { useState } from "react";

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
                  t.displayLink === v.displayLink
              ) === i
          )
      : harderToSubmitResults.filter(
          (v, i, a) =>
            a.findIndex(
              (t) =>
                t.displayLink &&
                v.displayLink &&
                t.displayLink === v.displayLink
            ) === i
        );

  return (
    <div>
      {loading ? (
        "Looking for guest post opportunities..."
      ) : harderToSubmitResults.length > 0 &&
        easyToSubmitResults.length === 0 ? (
        "We didn't find any easy guest post opportunities for this persona. Try refining your search!"
      ) : easyToSubmitResults.length > 0 ? (
        <div className="mb-5">
          <button
            className={
              selectedType === "easyToSubmit"
                ? " border-b-green-500 mr-4 text-green-500 border-2 border-transparent text-sm p-2 font-bold"
                : "mr-4 text-gray-400 border-2 border-transparent text-sm p-2 font-bold"
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
                ? " border-b-green-500 mr-4 text-green-500 border-2 border-transparent text-sm p-2 font-bold"
                : "mr-4 text-gray-400 border-2 border-transparent text-sm p-2 font-bold"
            }
            onClick={() => {
              if (!isSubscribed) {
                alert(
                  "Unlock hundreds of high quality guest post opportunities by starting your free trial."
                );
              } else {
                setSelectedType("harderToSubmit");
              }
            }}
          >
            <div className="flex flex-row">
              Harder to Submit
              {!isSubscribed ? (
                <LockClosedIcon className=" text-gray-400 h-4 ml-1" />
              ) : (
                ""
              )}
            </div>
          </button>

          <ul className="pt-4 pl-2">
            <button
              className="text-sm font-bold text-blue-500 flex flex-row mb-2"
              onClick={() => {
                const csv = results
                  .map((results) => {
                    return `${results.displayLink.replaceAll(
                      ",",
                      ""
                    )},${results.title.replaceAll(
                      ",",
                      ""
                    )},${results.snippet.replaceAll(",", "")}`;
                  })
                  .join("\n");

                //   add a new row of headers before
                const headers = "Website,Title,Snippet";
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
                className="text-blue-500 border p-5 rounded-md bg-white"
                key={result.formattedUrl}
              >
                <div className="text-black text-sm">{result.displayLink}</div>
                <a target="_blank" href={result.formattedUrl}>
                  {result.title}
                </a>

                <div className="text-black text-xs">{result.snippet}</div>
                <div className=" text-sm font-bold text-green-500">
                  <a
                    target="_blank"
                    href={
                      "https://ahrefs.com/website-authority-checker/?input=" +
                      result.formattedUrl
                    }
                  >
                    Check DR
                  </a>
                </div>
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
              ? "bg-gray-400 text-white font-bold py-2 px-4 rounded-full mb-5"
              : "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-5"
          }
          onClick={async () => {
            if (noInput) return;
            if (easyToSubmitResults.length > 0 && !isSubscribed) {
              // go to signup
              window.open("https://www.instantpersonas.com/", "_blank");
            } else {
              setIsLoading(true);
              console.log(
                "Finding guest post opportunities for persona: ",
                input
              );
              //   api guest post
              const response = await api.tools.findGuestPostOpportunities(
                input,
                isSubscribed
              );
              console.log(response);

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
