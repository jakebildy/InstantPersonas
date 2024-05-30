"use client";
import api from "@/service/api.service";
import { IconDownload } from "@tabler/icons-react";
import axios from "axios";
import { LockClosedIcon } from "@heroicons/react/20/solid";

import { useEffect, useState } from "react";
import { BentoGrid, BentoGridDiv } from "../ui/aceternity/bento_box";
import ReactSpeedometer from "react-d3-speedometer";
import { calculateReadability } from "@/util/util";

export function HeadlineAnalyzerTool({
  headline,
  input,
  isSubscribed,
  noInput,
}: {
  headline: string;
  input: string;
  isSubscribed: boolean;
  noInput: boolean;
}) {
  const [loading, setIsLoading] = useState(false);
  const [hasReturnedAnalysis, setHasReturnedAnalysis] = useState(false);
  // const [numSyllables, setNumSyllables] = useState(0);
  const [engagingness, setEngagingness] = useState(0);
  const [skimmability, setSkimmability] = useState(false);
  const [clarity, setClarity] = useState(0);
  const [powerWordsIncluded, setPowerWordsIncluded] = useState([]);
  const [serpData, setSerpData] = useState([]);
  const [difficultyScore, setDifficultyScore] = useState(0);

  useEffect(() => {
    setHasReturnedAnalysis(false);
  }, [headline]);

  function calculateHeadlineScore() {
    return Math.round(
      (1 - Math.abs(55 - headline.length) / 55) * 100 -
        (skimmability === false ? 10 : 0) -
        (8 - clarity * 2) -
        (8 - engagingness * 2) -
        (powerWordsIncluded.length === 0 ||
        (powerWordsIncluded.length === 1 &&
          (powerWordsIncluded[0] == "" || powerWordsIncluded[0] == "none"))
          ? 10
          : 0)
    );
  }

  return (
    <div>
      {!hasReturnedAnalysis && !loading ? (
        ""
      ) : loading ? (
        "Analyzing headline..."
      ) : (
        <div className="mb-5">
          {" "}
          <BentoGrid className="max-w-4xl mx-auto">
            <BentoGridDiv>
              <b>Headline Score</b>
              <div className="ml-4">
                <ReactSpeedometer
                  value={calculateHeadlineScore()}
                  minValue={0}
                  maxValue={100}
                  width={230}
                  height={140}
                />
              </div>
              <div className="text-slate-600 text-xs">
                Our analysis of the strength of your headline. Takes into
                account character count, skimmability, clarity, if there are any
                power words and engagingness.
              </div>
            </BentoGridDiv>
            <BentoGridDiv>
              <b>Character Count</b>
              <div className="flex flex-row h-[100px]">
                <div className="text-6xl text-green-600 font-bold">
                  {headline.length}
                </div>
              </div>
              <div className="text-slate-600 text-xs">
                Headlines around 50-60 characters long tend to perform the best
                on Google. More than 60 characters and they get cut off.
              </div>
            </BentoGridDiv>
            <BentoGridDiv>
              <b>Difficulty Score</b>
              {/* Average the estimated page rank for the (last four search results * 0.5 +  0.5* pagerank * Headline Score) */}
              <ReactSpeedometer
                value={difficultyScore}
                minValue={0}
                maxValue={100}
                width={230}
                height={140}
                // change the colors around so its green then a light greenish yellow  then yellow than orange then red if its high
                segmentColors={[
                  "#008000",
                  "#ADFF2F",
                  "#FFFF00",
                  "#FFA500",
                  "#FF0000",
                ]}
              />
              <div className="text-slate-600 text-xs">
                Our own metric that estimates how difficult this title will be
                to get in the first page of results on Google. Scored from 1-100
                (where 1 is easy and 100 is impossible).
              </div>
            </BentoGridDiv>
            <BentoGridDiv className="md:col-span-1">
              <b>Power Words</b>
              {powerWordsIncluded.length === 0 ||
              (powerWordsIncluded.length === 1 &&
                (powerWordsIncluded[0] == "" ||
                  powerWordsIncluded[0] == "none")) ? (
                <div>
                  <div className="text-slate-600 text-xs mb-2">
                    Great headlines include one power word. Try including one of
                    these words:
                  </div>
                  <a
                    href="/power-words/"
                    target="_blank"
                    className="text-blue-600 text-xl"
                  >
                    Click to view power words
                  </a>
                </div>
              ) : (
                <div>
                  You're using the power word(s){" "}
                  <b>
                    {powerWordsIncluded.map((word) => (
                      <div>
                        <b>{word}</b>
                      </div>
                    ))}
                  </b>
                  Great job.
                </div>
              )}

              <div className="text-slate-600 text-xs">
                Power words can trigger emotions, curiousity, and distinguish
                your content from others. Some examples include:
                &apos;&apos;free&apos;&apos;, &apos;&apos;new&apos;&apos; and
                &apos;&apos;proven&apos;&apos;.
              </div>
            </BentoGridDiv>

            {/* <BentoGridDiv>
              <b>Readability</b>
              <b className="text-green-600 text-2xl">
                {calculateReadability(
                  headline.split(" ").length,
                  1,
                  numSyllables
                )}
              </b>
              <div className="text-slate-600 text-xs">
                The reading level of your headline. The average adult reads at
                an 8th grade level. If your niche is more technical, you may
                want to aim for a higher grade level.
              </div>
            </BentoGridDiv> */}
            <BentoGridDiv>
              <b>Skimmability</b>

              {skimmability ? (
                <b className="text-green-600 text-2xl">Skimmable</b>
              ) : (
                <b className="text-red-600 text-2xl">Not Skimmable</b>
              )}

              <div className="text-slate-600 text-xs">
                Is the keyword or topic found in the first or last three words?
              </div>
            </BentoGridDiv>
            <BentoGridDiv>
              <b>Clarity and Engagingness</b>
              <div>
                <div
                  className="flex flex-row h-[80px] bg-gray-200"
                  style={{
                    height: "10px",
                    borderRadius: "25px",
                  }}
                >
                  <div
                    className={
                      clarity == 1
                        ? "bg-red-600"
                        : clarity == 2
                        ? "bg-yellow-600"
                        : clarity == 3
                        ? "bg-green-600"
                        : "bg-green-600"
                    }
                    style={{
                      width: `${clarity * 25}%`,
                      height: "10px",
                      borderRadius: "25px",
                    }}
                  />
                </div>
                {clarity == 1 ? (
                  <b className="text-red-600 text-xl">Not Clear</b>
                ) : clarity == 2 ? (
                  <b className="text-yellow-600 text-xl">Somewhat Clear</b>
                ) : clarity == 3 ? (
                  <b className="text-green-600 text-xl">Clear</b>
                ) : (
                  <b className="text-green-600 text-xl">Extremely Clear</b>
                )}{" "}
              </div>

              <div className="pt-[10px]">
                <div
                  className="flex flex-row h-[20px] bg-gray-200 "
                  style={{
                    height: "10px",
                    borderRadius: "25px",
                  }}
                >
                  <div
                    className={
                      engagingness == 1
                        ? "bg-red-600"
                        : engagingness == 2
                        ? "bg-yellow-600"
                        : engagingness == 3
                        ? "bg-green-600"
                        : "bg-green-600"
                    }
                    style={{
                      width: `${engagingness * 25}%`,
                      height: "10px",
                      borderRadius: "25px",
                    }}
                  />
                </div>

                {engagingness == 1 ? (
                  <b className="text-red-600 text-xl">Not Engaging</b>
                ) : engagingness == 2 ? (
                  <b className="text-yellow-600 text-xl">Somewhat Engaging</b>
                ) : engagingness == 3 ? (
                  <b className="text-green-600 text-xl">Engaging</b>
                ) : (
                  <b className="text-green-600 text-xl">Extremely Engaging</b>
                )}
              </div>
              <div className="text-slate-600 text-xs">
                How clear and engaging your headline is. The clearer and more
                engaging, the more likely it is to be clicked on. These are
                estimations powered by AI.
              </div>
            </BentoGridDiv>
            {/* <BentoGridDiv>
              <b>Relevance to Persona(s)</b>

              {!isSubscribed && <div>Start your Free Trial to Unlock This</div>}
            </BentoGridDiv> */}
            <BentoGridDiv className="md:col-span-3 md:row-span-4">
              <b>Search Engine Results Page (SERP)</b>
              <div className="text-slate-600 text-xs">
                The search engine results page for your headline. This is what
                people see when they search for your headline on Google.
              </div>
              {serpData.map((result: any, i) => (
                <div className="flex flex-row border-b border-gray-200">
                  <div className="mr-4 ml-2 text-green-600 font-bold text-2xl">
                    #{i + 1}
                  </div>
                  <div className="mb-2">
                    <div className="text-xs text-gray-700">{result.url}</div>
                    <div className="text-[#1A0EAB] text-lg">{result.title}</div>
                    <div className="text-xs">{result.description}</div>
                  </div>
                  {/* divider */}
                </div>
              ))}
            </BentoGridDiv>
          </BentoGrid>
        </div>
      )}

      <div className="text-center">
        {!isSubscribed && hasReturnedAnalysis
          ? "Sign up to understand your audience better and increase conversions!"
          : ""}
        <br />
        <button
          className={
            noInput
              ? "bg-gray-400 text-white font-bold py-2 px-4 rounded-full mb-5 mt-2"
              : "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-5 mt-2"
          }
          onClick={async () => {
            setIsLoading(true);
            console.log(
              "Finding guest post opportunities for persona: ",
              input
            );

            const response = await api.tools.analyzeHeadline(
              headline,
              isSubscribed
            );
            // console.log(response);

            // setNumSyllables(response.syllables);
            setEngagingness(response.engagingness); // 1-4
            setClarity(response.clarity); // 1-4
            setSkimmability(response.skimmability); // true or false
            setIsLoading(false);
            setHasReturnedAnalysis(true);
            setPowerWordsIncluded(response.powerWordsIncluded);
            setSerpData(response.serpData);
            setDifficultyScore(response.difficultyScore);
          }}
        >
          {loading ? "Analyzing..." : "Analyze Headline"}
        </button>
      </div>
    </div>
  );
}
