"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SWOTAnalysis from "./swot-analysis";
import axios from "axios";
import { useState } from "react";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { useRef } from "react";

type PracticeExam = {
  name: string;
  slug: string;
  category: string;
};

export default function SWOTAnalysisPage() {
  const [canvas, setCanvas] = useState({
    strengths:
      "Skilled employees, strong brand recognition, proprietary technology",
    weaknesses:
      "Outdated technology, lack of skilled employees, weak brand image",
    opportunities: "New markets, emerging technologies, changes in regulations",
    threats:
      "Economic downturns, increased competition, changes in consumer behavior",
  });
  const [description, setDescription] = useState("");
  const [isExample, setIsExample] = useState(true);
  const [loading, setLoading] = useState(false);

  async function generateSWOTAnalysis() {
    setLoading(true);
    try {
      const canvasNew: {
        strengths: string;
        weaknesses: string;
        opportunities: string;
        threats: string;
      } = (
        await axios.post(
          "https://getemailnames.uc.r.appspot.com/api/swot-analysis/generate",
          { description },
        )
      ).data.analysis;
      setCanvas(canvasNew);
      setIsExample(false);
      //scroll down to canvas
      window.scrollTo(0, 500);
      console.log("Canvas generated");
      console.log(canvas);
    } catch (error) {
      console.log("Error generating canvas");
      console.log(error);
    }
    setLoading(false);
  }

  const printRef = useRef<HTMLElement>();
  const handleDownloadImage = async () => {
    const element = printRef.current;
    if (element) {
      htmlToImage.toPng(element).then(function (dataUrl) {
        download(dataUrl, "swot-analysis.png");
      });
    }
  };

  return (
    <section className="bg-white">
      <title>AI SWOT Analysis Generator (Free)</title>
      <meta
        name="description"
        content="Our AI-powered SWOT Analysis Generator helps you evaluate the Strengths, Weaknesses, Opportunities, and Threats of your company or project."
      />
      {/* <meta
        name="description"
        content="Build your marketing knowledge with these practice exams for Meta
        Blueprint certifications. No signup needed. Don't miss these questions!"
      />
      <meta
        property="og:url"
        content="instantpersonas.com/meta-blueprint-practice-exams"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Free Facebook Blueprint Practice Exams"
      />
      <meta
        property="og:description"
        content="Build your marketing knowledge with these practice exams for Meta Blueprint certifications. Don't miss these questions!"
      />
      <meta property="og:image" content="/og/meta_blueprint.png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:domain"
        content="instantpersonas.com/meta-blueprint-practice-exams"
      />
      <meta
        property="twitter:url"
        content="instantpersonas.com/meta-blueprint-practice-exams"
      />
      <meta
        name="twitter:title"
        content="Free Facebook Blueprint Practice Exams"
      />
      <meta
        name="twitter:description"
        content="Build your marketing knowledge with these practice exams for Meta Blueprint certifications. Don't miss these questions!"
      />
      <meta name="twitter:image" content="/og/meta_blueprint.png" /> */}
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto mb-8 max-w-screen-lg text-center lg:mb-16">
          <div
            className="mx-auto max-w-screen-md"
            // display="flex"
            // flexDirection="column"
            // justifyContent="center"
            // alignItems="center"
          >
            {/* Title */}
            <div className="text-center font-jost text-4xl font-bold">
              Instantly Generate a
            </div>
            <div className="mt-2 text-center font-jost text-6xl font-bold">
              <b style={{ color: "#4C3A51" }}>S</b>
              <b style={{ color: "#774360" }}>W</b>
              <b style={{ color: "#B25068" }}>O</b>
              <b style={{ color: "#E7AB79" }}>T</b> Analysis
            </div>

            <span className="font-jost">
              Use our AI-powered tool to create a SWOT Analysis for your company
              based on its description.
            </span>

            <br />
            <br />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=" Enter a brief description of your company"
              className="h-[150px] w-[500px] rounded-md border-2 border-gray-700 bg-gray-100"
            />

            <button
              onClick={() => generateSWOTAnalysis()}
              className="mt-2 w-[500px] rounded-sm bg-black p-2 font-jost font-semibold text-white shadow-sm"
            >
              {loading ? "Generating..." : "Generate SWOT Analysis"}
            </button>
          </div>
          <h2 className="mt-36 text-center font-jost text-5xl font-bold">
            {isExample ? "Example SWOT Analysis" : "Your SWOT Analysis"}
          </h2>
          {!isExample ? (
            <div className="flex flex-auto flex-row justify-center">
              <button
                className="my-[10px] rounded-sm bg-black p-2 font-jost font-semibold text-white"
                type="button"
                onClick={handleDownloadImage}
              >
                🖼 Download as Image
              </button>
              <button
                className="my-[10px] ml-10 rounded-sm bg-gradient-to-r from-blue-500 to-blue-700 p-2 font-jost font-semibold text-white"
                type="button"
                onClick={() => {
                  window.location.href = "https://instantpersonas.com/";
                }}
              >
                🔥 Supercharge My Marketing
              </button>
            </div>
          ) : (
            <div />
          )}
          <div ref={printRef as any}>
            <SWOTAnalysis swotAnalysis={canvas} />
          </div>
          {!isExample ? (
            <div>
              <h2 className="mt-10 text-left font-jost text-5xl font-bold">
                Now ready to create your detailed User Personas?
              </h2>
              <p className="text-left font-jost text-lg">
                Good User Personas are the key to understanding your target
                audience and marketing more successfully.
                <br />
                <button
                  className="my-[10px] rounded-sm bg-gradient-to-r from-blue-500 to-blue-700 p-2 font-jost font-semibold text-white"
                  type="button"
                  onClick={() => {
                    window.location.href = "https://instantpersonas.com/";
                  }}
                >
                  → Create my Personas
                </button>
              </p>
            </div>
          ) : (
            <div></div>
          )}
          <h2 className="mt-10 text-left font-jost text-5xl font-bold">
            What is a SWOT Analysis?
          </h2>
          <p className="text-left font-jost text-lg">
            SWOT analysis is a strategic planning tool used to evaluate the
            Strengths, Weaknesses, Opportunities, and Threats of an organization
            or a project. The acronym &apos;&apos;SWOT&apos;&apos; stands for
            Strengths, Weaknesses, Opportunities, and Threats.
            <br />
            <br />A SWOT analysis helps organizations and individuals to
            identify their internal and external factors that can affect their
            success. It provides a comprehensive understanding of the current
            state of the organization or project, as well as the potential for
            future growth or challenges.
            <br />
            <br /> The strengths and weaknesses refer to the internal factors of
            the organization or project, while opportunities and threats refer
            to external factors that can impact the organization or project.
            <br />
            <br />
            <b>Strengths</b>: These are the internal factors that give the
            organization or project a competitive advantage. These can include
            things like skilled employees, strong brand recognition, or
            proprietary technology.
            <br />
            <br />
            <b>Weaknesses</b>: These are the internal factors that limit the
            organization or project&apos;s ability to achieve its goals. These
            can include things like outdated technology, a lack of skilled
            employees, or a weak brand image.
            <br />
            <br />
            <b>Opportunities</b>: These are external factors that provide the
            organization or project with new opportunities for growth. These can
            include things like new markets, emerging technologies, or changes
            in regulations.
            <br />
            <br />
            <b>Threats</b>: These are external factors that could potentially
            harm the organization or project&apos;s ability to achieve its
            goals. These can include things like economic downturns, increased
            competition, or changes in consumer behavior.
            <br />
            <br />
            By conducting a SWOT analysis, organizations and individuals can
            develop strategies to leverage their strengths, address their
            weaknesses, take advantage of opportunities, and mitigate threats.
          </p>
          <br />
          <br />
          <h2 className="mt-10 text-left font-jost text-5xl font-bold">
            How does this work?
          </h2>
          <p className="text-left font-jost text-lg">
            Our AI-powered SWOT Analysis Generator lets you enter a description
            of your company and generates a SWOT Analysis for you. You can edit
            any of the fields by clicking on them, and download it as an image.
          </p>
        </div>

        <p className="mt-4 text-center font-light text-gray-500 sm:text-xl">
          We help you understand your target audience and market more
          successfully.
        </p>
        <p className="mt-4 text-center font-bold text-black sm:text-xl">
          Learn how to supercharge your marketing by creating detailed personas{" "}
          <a className="text-blue-600" href="https://instantpersonas.com/">
            here
          </a>
          .
        </p>
      </div>
    </section>
  );
}

const ArticleCard = ({
  post,
  category,
  className,
}: {
  post: PracticeExam;
  category?: string;
  className?: string;
}) => {
  return (
    <article
      className={cn(
        "rounded-lg border border-gray-200 bg-white p-6 shadow-md",
        className,
      )}
    >
      <div className="mb-5 flex items-center justify-between text-gray-500">
        <span className="inline-flex items-center rounded-xl bg-green-200 px-2.5 py-0.5 text-xs font-medium text-green-800">
          {category}
        </span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        <Link href={"/meta-blueprint-practice-exams/" + post.slug}>
          {post.name}
        </Link>
      </h2>
      <div className="flex items-center justify-between">
        <Link
          href={"/meta-blueprint-practice-exams/" + post.slug}
          className="text-primary-600 inline-flex items-center font-medium hover:underline"
        >
          Start Practice Exam
          <svg
            className="ml-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
};
