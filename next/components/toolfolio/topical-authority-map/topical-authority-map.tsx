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
      data: { title: category, color: categoryColors.get(category) },
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
          stroke: categoryColors.get(categories[categoryIndex - 1]),
          strokeWidth: 8,
        },
      };
    }),
  ];
}

// This gets a unique color for each category
const categoryColors = new Map<string, string>();
// @ts-ignore
const categories = [...new Set(TABLE_DUMMY_DATA.map((row) => row[0]))];
categories.forEach((category, i) => {
  categoryColors.set(
    category,
    Object.values(ColorVariantMap)[i % Object.values(ColorVariantMap).length]
  );
});

export function TopicalAuthorityMap() {
  return (
    <div className="mb-10">
      <div
        style={{ width: "80vw", height: "80vh" }}
        className=" borderborder-gray-300"
      >
        <ReactFlow
          nodes={mapTableToNodes(TABLE_DUMMY_DATA)}
          edges={mapTableToEdges(TABLE_DUMMY_DATA)}
          nodeTypes={nodeTypes}
        >
          <Background
            variant={BackgroundVariant.Cross}
            className="bg-white"
            gap={12}
            size={1}
          />
        </ReactFlow>
      </div>
      <div className="mt-24 m-10 overflow-hidden">
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
            {TABLE_DUMMY_DATA.map((row, i) => {
              return (
                <tr
                  key={i}
                  className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl"
                >
                  <td className={"px-2 py-2 text-sm font-normal"}>
                    <div
                      className="rounded-lg p-2"
                      style={{
                        backgroundColor: categoryColors.get(row[0]),
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
