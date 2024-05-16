"use client";
import ReactFlow, {
  Background,
  BackgroundVariant,
  MarkerType,
} from "reactflow";

import "reactflow/dist/style.css";
import TopicalLinkNode from "./topical-link-node";
import TopicalSubcategoryNode from "./topical-subcategory-node";
import { ColorVariantMap } from "@/components/variants";
import { Button } from "@/components/ui/button";
import { generateTopicalAuthority } from "@/app/(server)/api/(ai-tools)/topical-authority/action";
import { readStreamableValue } from "ai/rsc";
import { useState } from "react";

const nodeTypes = {
  topicalLink: TopicalLinkNode,
  subcategory: TopicalSubcategoryNode,
};

const TABLE_DUMMY_DATA = [
  [
    "Demographic Analysis",
    "How to Conduct Demographic Analysis",
    "Unveil Hidden Patterns: Master Demographic Analysis Like a Pro!",
  ],
  [
    "Demographic Analysis",
    "Benefits of Demographic Analysis in Marketing",
    "Boost Your Sales Overnight with These Demographic Insights!",
  ],
  [
    "Demographic Analysis",
    "Tools for Demographic Analysis",
    "Top 5 Tools That Can Transform Your Audience Understanding!",
  ],
  [
    "Demographic Analysis",
    "Demographic Trends Shaping 2024",
    "Stay Ahead: Discover the Demographic Trends of 2024!",
  ],
  [
    "Demographic Analysis",
    "Case Studies in Effective Demographic Analysis",
    "Real Success Stories: How Demographic Analysis Pays Off!",
  ],
  [
    "Demographic Analysis",
    "Integrating Demographic Data with CRM",
    "Double Your Impact: Integrate Demographics with CRM Effortlessly!",
  ],
  [
    "Demographic Analysis",
    "Demographic Analysis for Product Development",
    "Design Winning Products with These Demographic Secrets!",
  ],
  [
    "Demographic Analysis",
    "How to Interpret Demographic Data",
    "Decode the Secrets: Become a Wizard in Demographic Data Interpretation!",
  ],
  [
    "Demographic Analysis",
    "Age-specific Marketing Strategies",
    "Age is Just a Number? Not in Marketing! Unlock Age-Specific Strategies!",
  ],
  [
    "Demographic Analysis",
    "Gender-focused Marketing Insights",
    "Why Ignoring Gender-focused Marketing Could Cost You Millions!",
  ],
  [
    "Psychographic Segmentation",
    "Introduction to Psychographic Segmentation",
    "Unlock the Mind: The Power of Psychographic Segmentation Revealed!",
  ],
  [
    "Psychographic Segmentation",
    "Tools for Psychographic Analysis",
    "Transform Your Strategy with These Psychographic Tools!",
  ],
  [
    "Psychographic Segmentation",
    "Using Psychographics to Tailor Content",
    "Content That Converts: Tailoring with Psychographics!",
  ],
  [
    "Psychographic Segmentation",
    "Differences Between Demographics and Psychographics",
    "Demographics vs. Psychographics: What's Best for Your Business?",
  ],
  [
    "Psychographic Segmentation",
    "Psychographics in Digital Marketing",
    "Revolutionize Your Digital Campaigns with Psychographics!",
  ],
  [
    "Psychographic Segmentation",
    "How to Gather Psychographic Data",
    "Gather Psychographic Data Like a Pro: Tips and Tricks!",
  ],
  [
    "Psychographic Segmentation",
    "Analyzing Customer Values and Lifestyles",
    "Know Your Customer: Analyzing Values and Lifestyles for Better Engagement!",
  ],
  [
    "Psychographic Segmentation",
    "Behavioral Insights from Psychographics",
    "Behavioral Secrets: Unlock Insights Through Psychographics!",
  ],
  [
    "Psychographic Segmentation",
    "Psychographics for Niche Marketing",
    "Dominate Your Niche: The Secret Weapon of Psychographic Marketing!",
  ],
  [
    "Psychographic Segmentation",
    "Psychographics for International Markets",
    "Go Global: Use Psychographics to Conquer International Markets!",
  ],
  [
    "Customer Journey Mapping",
    "Basics of Customer Journey Mapping",
    "Map the Magic: The Customer Journey Uncovered!",
  ],
  [
    "Customer Journey Mapping",
    "Key Stages in the Customer Journey",
    "Critical Stages: Your Guide to the Customer Journey!",
  ],
  [
    "Customer Journey Mapping",
    "Tools for Mapping the Customer Journey",
    "The Best Tools to Map Your Customer’s Every Move!",
  ],
  [
    "Customer Journey Mapping",
    "Integrating Touchpoints in Journey Mapping",
    "Maximize Impact: Integrate Touchpoints in Your Journey Mapping!",
  ],
  [
    "Customer Journey Mapping",
    "Using Journey Maps to Improve Customer Experience",
    "Enhance Your CX: Master the Art of Journey Mapping!",
  ],
  [
    "Customer Journey Mapping",
    "Case Studies of Effective Journey Mapping",
    "Learn from the Best: Top Journey Mapping Case Studies!",
  ],
  [
    "Customer Journey Mapping",
    "Personalizing Experiences with Journey Maps",
    "Personalize Like Never Before: Leverage Journey Maps!",
  ],
  [
    "Customer Journey Mapping",
    "Predicting Future Behaviors with Journey Maps",
    "Predict Customer Behavior with Precision Using Journey Maps!",
  ],
  [
    "Customer Journey Mapping",
    "Role of AI in Enhancing Journey Maps",
    "AI and Journey Mapping: A Future-Focused Partnership!",
  ],
  [
    "Customer Journey Mapping",
    "Challenges in Customer Journey Mapping",
    "Overcome These Common Pitfalls in Customer Journey Mapping!",
  ],
];
export function mapTableToNodes(data: string[][]) {
  //@ts-ignore
  const categories = [...new Set(data.map((row) => row[0]))]; // unique categories

  return [
    {
      id: "node-0",
      type: "topicalLink",
      data: { title: "Blog" },
      position: { x: categories.length * 300 - 150, y: -100 },
    },
    // Categories
    ...categories.map((category, i) => ({
      id: `node-${i + 1}`,
      type: "topicalLink",
      data: {
        title: category,
        color:
          Object.values(ColorVariantMap)[
            i % Object.values(ColorVariantMap).length
          ],
      },
      position: { x: i * 600 + 150, y: 100 },
    })),
    // Subcategories
    ...data.map((row, i) => {
      const categoryIndex = categories.indexOf(row[0]) + 1; // find the index of the category
      return {
        id: `node-subcategory-${i}`,
        type: "subcategory",
        data: { title: row[1] },
        position: {
          x: (categoryIndex - 1) * 600 + 150 + (i % 2 === 1 ? -1 : 1) * 150,
          y: 250 + (i % 5) * 150,
        }, // staggered vertical positioning
      };
    }),
  ];
}

export function mapTableToEdges(data: string[][]) {
  //@ts-ignore
  const categories = [...new Set(data.map((row) => row[0]))];

  return [
    // Connect Blog to each category
    ...categories.map((category, i) => ({
      id: `e-node-0-node-${i + 1}`,
      source: "node-0",
      target: `node-${i + 1}`,
      animated: false,
      style: { stroke: "#7e7ef8", strokeWidth: 8 },
      type: "smoothstep",
    })),
    // Connect each category to its subcategories
    ...data.flatMap((row, i) => {
      const categoryIndex = categories.indexOf(row[0]) + 1;
      return {
        id: `e-node-${categoryIndex}-node-subcategory-${i}`,
        source: `node-${categoryIndex}`,
        target: `node-subcategory-${i}`,
        animated: false,
        type: "smoothstep",
        style: {
          stroke:
            Object.values(ColorVariantMap)[
              (categoryIndex - 1) % Object.values(ColorVariantMap).length
            ],
          strokeWidth: 8,
        },
      };
    }),
  ];
}

export function TopicalAuthorityMap({
  personaString,
  userIsSubscribed,
}: {
  personaString: string;
  userIsSubscribed: boolean;
}) {
  const [responseData, setResponseData] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);

  function convertToCategoryIndex(category: string) {
    //@ts-ignore
    let categories = [...new Set(responseData.map((row) => row[0]))];
    return categories.indexOf(category);
  }

  return (
    <div className="mb-10">
      <Button
        // align in center
        className={
          loading ? "mx-auto flex mb-4 bg-gray-400" : "mx-auto flex mb-4"
        }
        onClick={async () => {
          if (!loading) {
            const { output } = await generateTopicalAuthority({
              input: personaString,
              paid: true, //TODO: for whatever reason when paid is false, the output doesn't appear to work right
            });
            let responseString = "";

            setLoading(true);

            for await (const delta of readStreamableValue(output)) {
              responseString = `${responseString}${delta}`;

              // if it is a valid array of arrays when separated by commas and newlines, then set the response data
              let potentialData = responseString
                .split("\n")
                .map((row) => row.split(","));

              // remove first row
              potentialData.shift();

              console.log(potentialData);
              // check if all the rows have the same length
              if (
                potentialData.every(
                  (row) =>
                    row.length === potentialData[0].length && row.length === 3
                )
              ) {
                console.log("setting response data");
                setResponseData(potentialData);
              }
            }
            setLoading(false);
          }
        }}
      >
        {!loading ? "Submit" : "Creating..."}
      </Button>

      <div
        style={{ height: "50vh" }}
        className=" border border-gray-300 w-full"
      >
        {responseData.length === 0 ? (
          <div />
        ) : (
          <ReactFlow
            nodes={mapTableToNodes(responseData)}
            edges={mapTableToEdges(responseData)}
            nodeTypes={nodeTypes}
            zoomOnScroll={false}
            elementsSelectable={false}
            defaultViewport={{ x: 400, y: 50, zoom: 0.3 }}
            maxZoom={4}
            minZoom={0.1}
          >
            <Background
              variant={BackgroundVariant.Cross}
              className="bg-transparent"
              gap={12}
              size={1}
            />
          </ReactFlow>
        )}
      </div>
      <div className="m-10 overflow-hidden">
        <table className="font-inter w-full table-auto border-separate border-spacing-y-1 overflow-scroll text-left md:overflow-auto">
          <thead className="w-full rounded-lg bg-[#222E3A]/[6%] text-base font-semibold text-white">
            <tr className="">
              <th className="whitespace-nowrap rounded-l-lg py-3 pl-3 text-sm font-normal text-[#212B36]">
                Unique Topic
              </th>
              <th className="whitespace-nowrap py-3 pl-1 text-sm font-normal text-[#212B36]">
                Sub-Topic
              </th>
              <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36]">
                Blog Title
              </th>
            </tr>
          </thead>
          <tbody>
            {responseData.map((row, i) => {
              return (
                <tr
                  key={i}
                  className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl"
                >
                  <td className={"px-2 py-2 text-sm font-normal"}>
                    <div
                      className="rounded-lg p-2"
                      style={{
                        backgroundColor:
                          Object.values(ColorVariantMap)[
                            convertToCategoryIndex(row[0]) %
                              Object.values(ColorVariantMap).length
                          ],
                      }}
                    >
                      {row[0]}
                    </div>
                  </td>
                  <td className="px-1 py-4 text-sm font-normal text-[#637381]">
                    {row[1]}
                  </td>
                  <td className="px-1 py-4 text-sm font-normal text-[#637381]">
                    {row[2]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//! The following is the code to call the ai function to generate the map
//! Setup setState and personaString input to the function
//  <Button
//    onClick={async () => {
//      const { output } = await generateTopicalAuthority({
//        input: personaString,
//        paid: userIsSubscribed,
//      });

//      for await (const delta of readStreamableValue(output)) {
//        setState((currentGeneration) => `${currentGeneration}${delta}`);
//      }
//    }}
//  >
//    Submit
//  </Button>;
