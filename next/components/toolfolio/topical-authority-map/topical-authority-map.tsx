"use client";
import ReactFlow, {
  Background,
  BackgroundVariant,
  useEdgesState,
  useNodesState,
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
import { generateTopicalAuthority } from "@/app/(server)/api/(ai-tools)/(document-editor)/topical-authority/action";
import { readStreamableValue } from "ai/rsc";
import { useState } from "react";
import { cn, IS_TEST_DEV_ENV } from "@/lib/utils";
import { useHandleCopy } from "@/lib/hooks";
import { PersonStandingIcon } from "lucide-react";
import {
  TOPICAL_AUTHORITY_TEST_DATA_DO_NOT_USE_IN_PROD,
  TOPICAL_AUTHORITY_TEST_INVALID_DATA_DO_NOT_USE_IN_PROD,
} from "./test-data";
import { cx } from "class-variance-authority";
import { DownloadButton } from "@/components/download/download-btn";
import TemplatePreviewSelect from "@/components/download/template-preview-select";
import * as TopicalAuthorityMapGrayBackgroundPreviewImage from "./topical-authority-map-gray-background-preview.jpeg";
import * as TopicalAuthorityMapTransparentBackgroundPreviewImage from "./topical-authority-map-transparent-background-preview.jpeg";
import * as CSVPreviewImage from "./topical-authority-table-preview.png";

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
  const [isDownloading, setIsDownloading] = useState(false);
  const [showTemplateSelectModal, setShowTemplateSelectModal] = useState(false);

  const handleResolvedDownload = () => {
    setShowTemplateSelectModal(false);
    setIsDownloading(false);
  };

  function convertToCategoryIndex(category: string) {
    let categories = [...new Set(responseData.map((row) => row[0]))];
    return categories.indexOf(category);
  }

  function getVariantByIndex(
    index: number,
  ): keyof typeof ColorVariantMap | undefined {
    const keys = Object.keys(ColorVariantMap) as Array<
      keyof typeof ColorVariantMap
    >;
    return keys[index];
  }

  function handleDownloadCsv() {
    // Convert array of strings to CSV format, escaping double quotes
    const csvContent = responseData
      .map((row) =>
        row.map((item) => `"${item.replace(/"/g, '""')}"`).join(","),
      )
      .join("\r\n");

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a link element to download the blob
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "sample-data.csv"); // Renamed for clarity
    link.style.visibility = "hidden";
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up by removing the link and revoking the object URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Validates and potentially corrects a 2D array of strings, ensuring each sub-array has exactly three elements.
   * If a sub-array has more than three elements, it combines the extra elements into a single string.
   * If a sub-array has fewer than three elements, it removes that sub-array.
   *
   * @param {string[][]} data - The 2D array of strings to validate and correct.
   * @returns {string[][]} - The validated and corrected 2D array of strings.
   */ function validateDataPotentialData(data: string[][]): string[][] {
    const VALID_ROW_LENGTH = 3;
    const everyRowIsValid = data.every(
      (row) => row.length === VALID_ROW_LENGTH,
    );

    if (everyRowIsValid) {
      return data;
    } else {
      return data
        .map((row) => {
          if (row.length === VALID_ROW_LENGTH) {
            return row;
          } else if (row.length > VALID_ROW_LENGTH) {
            //? We presume that the blog title has commas in it, and will join the blog title back together
            const blogTitle = row.slice(2).join(" ");
            row.splice(2, row.length - 2, blogTitle);
            return row;
          } else {
            //? we can presume that something has done wrong with the generation and will remove the row
            return null;
          }
        })
        .filter((row): row is string[] => row !== null);
    }
  }

  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "node-0",
      type: "topicalLink",
      data: { title: "Blog" },
      position: { x: 150, y: -100 },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <div className="mb-10 w-1/2">
      <Button
        disabled={noInput}
        className={cn(
          "mx-auto mb-5 flex rounded-full px-4 py-2 font-bold text-white",
          loading || noInput
            ? "bg-gray-400"
            : "bg-green-500 hover:bg-green-700",
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

              const validatedData = validateDataPotentialData(potentialData);
              setResponseData(validatedData);
              setNodes(mapTableToNodes(validatedData));
              setEdges(mapTableToEdges(validatedData));
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

      {responseData.length <= 0 ? null : (
        <div className="relative h-[50vh] overflow-hidden rounded-xl border border-gray-300">
          <DownloadButton
            variant={"purple"}
            onClick={() => setShowTemplateSelectModal(true)}
            onCancel={handleResolvedDownload}
            loading={isDownloading}
            selectingTemplate={showTemplateSelectModal}
            className="absolute left-4 top-4 z-50"
          />
          <PersonStandingIcon className="absolute right-4 top-4 text-muted-foreground" />
          {responseData.length === 0 ? null : showTemplateSelectModal ? (
            <TemplatePreviewSelect
              className="pt-20 text-center"
              header="Choose a template to download your Topical Authority Map."
              subHeader="CSV and PNG formats available."
              variant={"purple"}
              isLoading={isDownloading}
              onLoadingChange={setIsDownloading}
              onSuccess={handleResolvedDownload}
              onError={handleResolvedDownload}
              downloadTemplateOptions={[
                {
                  type: "component",
                  img: {
                    src: TopicalAuthorityMapGrayBackgroundPreviewImage,
                    width: 800,
                    height: 285,
                  },
                  label: "Topical Authority Map Image - Gray Background",
                  width: 2000,
                  component: (
                    <div className="relative h-[50vh] w-full rounded-xl border border-gray-300 bg-gray-100">
                      <PersonStandingIcon className="absolute right-4 top-4 text-muted-foreground" />
                      <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        zoomOnScroll={false}
                        elementsSelectable={false}
                        fitView={true}
                        fitViewOptions={{
                          padding: 0.1,
                          includeHiddenNodes: true,
                          minZoom: 0.1,
                          maxZoom: 4,
                          duration: 0,
                          nodes: nodes,
                        }}
                        defaultViewport={{
                          zoom: 0.25,
                          x: 50,
                          y: 200,
                        }}
                        maxZoom={4}
                        minZoom={0.1}
                        onInit={(instance) => {
                          IS_TEST_DEV_ENV &&
                            console.log("DEV: map onInit", instance);
                          setTimeout(() => instance.fitView(), 0);
                        }}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                      >
                        <Background
                          variant={BackgroundVariant.Cross}
                          gap={12}
                          size={1}
                        />
                      </ReactFlow>
                    </div>
                  ),
                },
                {
                  type: "component",
                  img: {
                    src: TopicalAuthorityMapTransparentBackgroundPreviewImage,
                    width: 800,
                    height: 285,
                  },
                  label: "Topical Authority Map Image - Transparent Background",
                  width: 2000,
                  component: (
                    <div className="relative h-[50vh] w-full rounded-xl border border-gray-300">
                      <PersonStandingIcon className="absolute right-4 top-4 text-muted-foreground" />
                      <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        zoomOnScroll={false}
                        elementsSelectable={false}
                        fitView={true}
                        fitViewOptions={{
                          padding: 0.1,
                          includeHiddenNodes: true,
                          minZoom: 0.1,
                          maxZoom: 4,
                          duration: 0,
                          nodes: nodes,
                        }}
                        defaultViewport={{
                          zoom: 0.25,
                          x: 50,
                          y: 200,
                        }}
                        maxZoom={4}
                        minZoom={0.1}
                        onInit={(instance) => {
                          IS_TEST_DEV_ENV &&
                            console.log("DEV: map onInit", instance);
                          setTimeout(() => instance.fitView(), 0);
                        }}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                      />
                    </div>
                  ),
                },
                {
                  type: "text",
                  label: "Topical Authority Table -> CSV",
                  img: {
                    src: CSVPreviewImage,
                    width: 400,
                    height: 285,
                  },
                  onDownload: () => {
                    handleDownloadCsv();
                  },
                },
              ]}
            />
          ) : (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              zoomOnScroll={false}
              elementsSelectable={false}
              defaultViewport={{
                zoom: 0.25,
                x: 50,
                y: 200,
              }}
              maxZoom={4}
              minZoom={0.1}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
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
                        Object.keys(ColorVariantMap).length,
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
            "cursor-pointer bg-[#f6f8fa] hover:bg-gray-200 hover:shadow-2xl",
        }),
        gradientLightVariants({
          variant,
          className: "bg-gradient-to-r",
        }),
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
