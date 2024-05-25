"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  badgeVariants,
  ColorVariant,
  ColorVariantMap,
  gradientLightVariants,
  gradientVariants,
  shadowVariants,
  tabTriggerVariants,
} from "@/components/variants";
import { cn, IS_TEST_DEV_ENV } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  CopyIcon,
  EyeIcon,
  EyeOffIcon,
  LayoutTemplateIcon,
  PersonStandingIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OG_SOCIAL_PREVIEW_TEMPLATE_TABS } from "./previews";
import { HtmlExportPreview } from "./export/html-export";
import { UploadImage } from "./upload-image-area";
import { Separator } from "@/components/ui/fcs/fcs-separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IMAGE_TEMPLATES } from "./image-template-editor/image-templates";
import { DownloadIcon } from "@radix-ui/react-icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TemplatePreviewSelect from "@/components/download/template-preview-select";
import { b64toBlob } from "./utils";
import { ImageTemplateEditorDialog } from "./image-template-editor/image-template-editor-dialog";
import { readStreamableValue } from "ai/rsc";
import { generateSocialShareCopywriting } from "@/app/(server)/api/(ai-tools)/social-share-preview/action";
import { useHandleCopy } from "@/lib/hooks";
import { cx } from "class-variance-authority";

type Props = {
  input: string;
  isSubscribed: boolean;
  noInput: boolean;
};

export type OGPreviewMetadata = {
  url: string;
  title: string;
  description: string;
  image: string;
};

const OG_PREVIEW_TEST: OGPreviewMetadata = {
  url: "instantpersonas.com",
  title: "Instant Personas | Get Started",
  description:
    "Save hours understanding your customers with our User Persona generator.",
  image: "/test-og-preview.png",
};

export default function SocialShareTool({
  input,
  isSubscribed,
  noInput,
}: Props) {
  // State management for open-graph metadata
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  const variant = "blue";

  useEffect(() => {
    setTitle(OG_PREVIEW_TEST.title);
    setDescription(OG_PREVIEW_TEST.description);
    setUrl(OG_PREVIEW_TEST.url);
    setImage(OG_PREVIEW_TEST.image);
  }, []);

  return (
    <section className="flex flex-col justify-center relative p-8 gap-8 w-full">
      <OptimizeCopywriting
        {...{
          url,
          title,
          description,
          image,
          input,
          noInput: noInput && title !== "" && description !== "",
          variant,
        }}
      />
      <div className="flex-1 w-full flex items-center justify-center">
        <div
          className={cn(
            gradientLightVariants({
              variant,
              className:
                "flex flex-col w-fit lg:w-full h-fit items-center border rounded-lg shadow-md relative p-4 ",
            })
          )}
        >
          <Tabs
            defaultValue={OG_SOCIAL_PREVIEW_TEMPLATE_TABS[0].title}
            className="w-full flex flex-col items-center p-8 bg-white rounded-md overflow-hidden shadow-md"
          >
            <div className="w-full flex items-center justify-center mb-4 lg:mb-0">
              <PersonStandingIcon className="text-muted-foreground" />
            </div>

            <div className="w-full place-items-center hidden lg:grid">
              <TabsList className="rounded-full h-9 my-4">
                {OG_SOCIAL_PREVIEW_TEMPLATE_TABS.map((tab) => (
                  <TabsTrigger
                    value={tab.title}
                    key={tab.title}
                    className={tabTriggerVariants({ variant })}
                  >
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center  w-full min-h-[700px] ">
              <div
                className={cn(
                  gradientLightVariants({
                    variant,
                    className:
                      "flex flex-col w-full items-center justify-start border rounded-lg shadow-md max-w-2xl",
                  })
                )}
              >
                <form className="flex flex-col p-4 gap-2 ">
                  <div>
                    <h2 className="text-lg font-bold">Edit</h2>
                    <p className="text-sm">
                      Customize how your content appears on search engines and
                      social platforms. Modify the title, description, and image
                      to optimize visibility and engagement.
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="Title">Title</Label>
                    <Input
                      id="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <span className="text-xs font-medium">
                      Recommended:{" "}
                      <span className="font-light">60 characters</span>
                    </span>
                  </div>
                  <div>
                    <Label htmlFor="Description">Description</Label>
                    <Input
                      id="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <span className="text-xs font-medium">
                      Recommended:{" "}
                      <span className="font-light">160 characters</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="Image">Image</Label>
                      <span className="text-xs font-medium">
                        Recommended:{" "}
                        <span className="font-light">1200 x 630 pixels</span>
                      </span>
                    </div>

                    <UploadImage
                      currentImageUrl={image}
                      onUpload={(newImageUrl) => setImage(newImageUrl)}
                    />

                    <Separator text="or" className="py-2" />

                    <ImageTemplateEditorDialog
                      trigger={
                        <Button
                          variant={"blue"}
                          className="flex gap-2 flex-1 peer group"
                        >
                          <LayoutTemplateIcon className="group-hover:text-slate-100 text-white size-4" />{" "}
                          Choose Template
                        </Button>
                      }
                      url={url}
                      title={title}
                      description={description}
                      image={image}
                      setImage={setImage}
                      setTitle={setTitle}
                      setDescription={setDescription}
                      setUrl={setUrl}
                    />
                  </div>
                </form>
              </div>
              {OG_SOCIAL_PREVIEW_TEMPLATE_TABS.map((tab) => (
                <TabsContent
                  value={tab.title}
                  key={tab.title + "content"}
                  className="w-full max-w-xl lg:mt-0"
                >
                  <div className="flex-1 flex flex-col items-center lg:items-start w-full h-full">
                    <div className="w-full place-items-center grid lg:hidden">
                      <TabsList className="rounded-full h-9 my-4">
                        {OG_SOCIAL_PREVIEW_TEMPLATE_TABS.map((tab) => (
                          <TabsTrigger
                            value={tab.title}
                            key={tab.title}
                            className={tabTriggerVariants({ variant })}
                          >
                            {tab.title}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>
                    <ScrollArea
                      className={cn(
                        gradientLightVariants({
                          variant,
                          className:
                            "grid border rounded-lg shadow-md w-full h-full",
                        })
                      )}
                    >
                      <tab.content
                        {...{
                          url,
                          title,
                          description,
                          image,
                        }}
                      />
                    </ScrollArea>
                    <p className="text-sm text-muted-foreground text-center my-4 w-full ">
                      {tab.description}
                    </p>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
      <div className="flex-1 w-full flex items-center justify-center">
        <div
          className={cn(
            gradientLightVariants({
              variant,
              className:
                "flex flex-col w-fit lg:w-full h-fit items-center border rounded-lg shadow-md ",
            })
          )}
        >
          <HtmlExportPreview
            {...{
              url,
              title,
              description,
              image,
            }}
          />
        </div>
      </div>
    </section>
  );
}

import { parse } from "csv-parse";

const TABLE_COLUMNS = [
  "Target Persona",
  "Suggested Title",
  "Suggested Description",
  "Insights",
  "Potential Pitfalls",
] as const;

type TableRowData = { [key in (typeof TABLE_COLUMNS)[number]]: string };

function OptimizeCopywriting({
  url,
  title,
  description,
  image,
  input,
  noInput,
  variant,
}: OGPreviewMetadata & {
  noInput: boolean;
  input: string;
  variant: ColorVariant;
}) {
  // State management for ai response
  const [responseData, setResponseData] = useState<TableRowData[]>([]);
  const [loading, setLoading] = useState(false);

  function getVariantByIndex(
    index: number
  ): keyof typeof ColorVariantMap | undefined {
    const keys = Object.keys(ColorVariantMap) as Array<
      keyof typeof ColorVariantMap
    >;
    return keys[index];
  }

  return (
    <>
      <Button
        disabled={noInput}
        className={cn(
          "mx-auto flex mb-5 font-bold py-2 px-4 rounded-full text-white",
          loading || noInput ? "bg-gray-400" : "bg-green-500 hover:bg-green-700"
        )}
        onClick={async () => {
          if (!loading) {
            IS_TEST_DEV_ENV
              ? console.log(
                  "DEV ONLY LOGS:",
                  "Optimizing copywriting for persona: ",
                  input
                )
              : null;

            const { output } = await generateSocialShareCopywriting({
              personas: input,
              title: title,
              description: description,
              paid: true, //TODO: for whatever reason when paid is false, the output doesn't appear to work right
            });
            let responseString = "";

            setLoading(true);

            for await (const delta of readStreamableValue(output)) {
              responseString = `${responseString}${delta}`;
              IS_TEST_DEV_ENV
                ? console.log(
                    "DEV ONLY LOGS:",
                    "Response String: ",
                    responseString
                  )
                : null;
              parse(
                responseString,
                {
                  delimiter: ":",
                  from_line: 2,
                  columns: TABLE_COLUMNS as unknown as string[],
                },
                function (err, records) {
                  if (err && IS_TEST_DEV_ENV) {
                    console.error("DEV ONLY LOGS:", err);
                  } else {
                    IS_TEST_DEV_ENV
                      ? console.log("DEV ONLY LOGS:", records)
                      : null;
                    setResponseData(records);
                  }
                }
              );
            }
            setLoading(false);
          }
        }}
      >
        {!loading
          ? noInput
            ? "Enter Details to Optimize Copywriting"
            : "Optimize Copywriting"
          : "Creating..."}
      </Button>
      {responseData.length > 0 ? (
        <div className="flex-1 w-full flex items-center justify-center">
          <div
            className={cn(
              gradientLightVariants({
                variant,
                className:
                  "flex flex-col w-fit lg:w-full h-fit items-center border rounded-lg shadow-md relative p-4",
              })
            )}
          >
            <div className="w-full flex flex-col items-center p-8 bg-white rounded-md overflow-hidden shadow-md">
              <div className="w-full flex items-center justify-center mb-4">
                <PersonStandingIcon className="text-muted-foreground" />
              </div>

              <div className="overflow-hidden">
                <table className="font-inter w-full table-auto border-separate border-spacing-y-1 overflow-scroll text-left md:overflow-auto">
                  <thead className="w-full rounded-lg bg-[#222E3A]/[6%] text-base font-semibold text-white">
                    <tr>
                      {TABLE_COLUMNS.map((column, i) => (
                        <th
                          key={i}
                          className={cn(
                            "whitespace-nowrap py-3 pl-1 text-sm font-normal text-[#212B36]",
                            i === 0 ? "rounded-l-lg" : "",
                            i === TABLE_COLUMNS.length - 1 ? "rounded-r-lg" : ""
                          )}
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {responseData.map((row, i) => {
                      return (
                        <TableRow
                          key={i}
                          data={row}
                          variant={getVariantByIndex(
                            i % Object.keys(ColorVariantMap).length
                          )}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function TableRow({
  data,
  variant = "blue",
}: {
  data: TableRowData;
  variant?: ColorVariant;
}) {
  const { handleCopy } = useHandleCopy();

  return (
    <tr
      className={cx(
        shadowVariants({
          variant,
          className: "cursor-pointer bg-[#f6f8fa]",
        }),
        gradientLightVariants({
          variant,
          className: "bg-gradient-to-r",
        })
      )}
    >
      {Object.keys(data).map((column, i) => {
        const value = data[column as keyof TableRowData];

        return (
          <td
            key={i}
            className={cn(
              "px-1 py-4 text-sm font-normal text-[#637381] p-1 ",
              i === 0 ? "rounded-l-lg" : "",
              i === TABLE_COLUMNS.length - 1 ? "rounded-r-lg" : ""
            )}
            role="button"
            tabIndex={0}
            onClick={() =>
              handleCopy({
                type: column,
                text: value,
              })
            }
          >
            <div className=" hover:bg-white p-2 pr-6 rounded-md group relative hover:shadow-md">
              <CopyIcon className="absolute size-4 right-2 top-2 text-black group-hover:animate-pulse opacity-0 group-hover:opacity-100" />
              {i === 0 ? (
                <div
                  className={badgeVariants({
                    variant,
                    className: "rounded-lg text-left normal-case",
                  })}
                >
                  {value}
                </div>
              ) : (
                value
              )}
            </div>
          </td>
        );
      })}
    </tr>
  );
}
