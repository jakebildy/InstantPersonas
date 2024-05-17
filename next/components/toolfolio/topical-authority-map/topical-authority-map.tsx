"use client";
import ReactFlow, {
  Background,
  BackgroundVariant,
  MarkerType,
} from "reactflow";

import "reactflow/dist/style.css";
import TopicalLinkNode from "./topical-link-node";
import TopicalSubcategoryNode from "./topical-subcategory-node";
import {
  badgeVariants,
  ColorVariant,
  ColorVariantMap,
  shadowVariants,
  gradientLightVariants,
} from "@/components/variants";
import { Button } from "@/components/ui/button";
import { generateTopicalAuthority } from "@/app/(server)/api/(ai-tools)/topical-authority/action";
import { readStreamableValue } from "ai/rsc";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useHandleCopy } from "@/lib/hooks";
import { string } from "zod";
import { PersonStandingIcon } from "lucide-react";
import { TOPICAL_AUTHORITY_TEST_DATA_DO_NOT_USE_IN_PROD } from "./test-data";
import { cx } from "class-variance-authority";

const nodeTypes = {
  topicalLink: TopicalLinkNode,
  subcategory: TopicalSubcategoryNode,
};

export function mapTableToNodes(data: string[][]) {
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
  noInput,
}: {
  personaString: string;
  userIsSubscribed: boolean;
  noInput: boolean;
}) {
  const [responseData, setResponseData] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);

  function convertToCategoryIndex(category: string) {
    let categories = [...new Set(responseData.map((row) => row[0]))];
    return categories.indexOf(category);
  }

  function getVariantByIndex(
    index: number
  ): keyof typeof ColorVariantMap | undefined {
    const keys = Object.keys(ColorVariantMap) as Array<
      keyof typeof ColorVariantMap
    >;
    return keys[index];
  }

  return (
    <div className="mb-10">
      <Button
        disabled={noInput}
        className={cn(
          "mx-auto flex mb-5 font-bold py-2 px-4 rounded-full text-white",
          loading || noInput ? "bg-gray-400" : "bg-green-500 hover:bg-green-700"
        )}
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
        {!loading
          ? noInput
            ? "Enter Details to Create Topical Authority Map"
            : "Create Topical Authority Map"
          : "Creating..."}
      </Button>

      {responseData.length === 0 ? null : (
        <div className=" border border-gray-300 w-full h-[50vh] rounded-xl relative">
          <PersonStandingIcon className="absolute top-4 right-4 text-muted-foreground" />
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
        </div>
      )}

      {responseData.length === 0 ? null : (
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
                  <TopicalAuthorityTableRow
                    key={i}
                    category={row[0]}
                    subcategory={row[1]}
                    blogTitle={row[2]}
                    variant={getVariantByIndex(
                      convertToCategoryIndex(row[0]) %
                        Object.keys(ColorVariantMap).length
                    )}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function TopicalAuthorityTableRow({
  category,
  subcategory,
  blogTitle,
  variant = "blue",
}: {
  category: string;
  subcategory: string;
  blogTitle: string;
  variant?: ColorVariant;
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
          type: "Blog Topic",
          text: `${category}\n${subcategory}\n${blogTitle}`,
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
          {category}
        </div>
      </td>
      <td className="px-1 py-4 text-sm font-normal text-[#637381]">
        {subcategory}
      </td>
      <td className="px-1 py-4 text-sm font-normal text-[#637381]">
        {blogTitle}
      </td>
    </tr>
  );
}
