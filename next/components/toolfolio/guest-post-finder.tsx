"use client";
import api from "@/service/api.service";
import { IconDownload } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";

export function GuestPostFinderTool({ persona }: { persona: string }) {
  const [loading, setIsLoading] = useState(false);

  const [results, setResults] = useState<any[]>([]);

  return (
    <div>
      {results.length > 0 ? (
        <div className="mb-5">
          <ul>
            <button
              className="text-sm font-bold text-blue-500 flex flex-row mb-2"
              onClick={() => {
                const csv = results
                  .map((result) => {
                    return `${result.displayLink.replaceAll(
                      ",",
                      ""
                    )},${result.title.replaceAll(
                      ",",
                      ""
                    )},${result.snippet.replaceAll(",", "")}`;
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

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-5"
        onClick={async () => {
          setIsLoading(true);
          console.log(
            "Finding guest post opportunities for persona: ",
            persona
          );

          //   api guest post
          const response = await api.tools.findGuestPostOpportunities(persona);
          console.log(response);

          setIsLoading(false);
          setResults(response);
        }}
      >
        {loading
          ? "Searching..."
          : results.length > 0
          ? "Find More Opportunities"
          : "Find Guest Post Opportunities"}
      </button>
    </div>
  );
}
