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
import { generateSocialShareCopywriting } from "@/app/(server)/api/(ai-tools)/(google)/social-share-preview/action";
import { useHandleCopy } from "@/lib/hooks";
import { cx } from "class-variance-authority";

type Props = {
  input: string;
  isSubscribed: boolean;
  noInput: boolean;
  detailsInput: string;
  setDetailsInput: React.Dispatch<React.SetStateAction<string>>;
};

export type OGPreviewMetadata = {
  url: string;
  title: string;
  description: string;
  image: string;
};

const OG_PREVIEW_TEST: OGPreviewMetadata = {
  url: "instantpersonas.com",
  title: "InstantPersonas | Get Started",
  description:
    "Save hours understanding your customers with our User Persona generator.",
  image: "/test-og-preview.png",
};

export default function SocialShareTool({
  input,
  isSubscribed,
  noInput,
  detailsInput,
  setDetailsInput,
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

  const titleInputRef = React.useRef<HTMLInputElement>(null);
  const descriptionInputRef = React.useRef<HTMLInputElement>(null);
  const detailsInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <section className="relative flex w-full flex-col justify-center gap-8 p-8">
      <div className="flex w-full flex-1 items-center justify-center">
        <div
          className={cn(
            gradientLightVariants({
              variant,
              className:
                "relative flex h-fit w-full flex-col items-center rounded-lg border p-4 shadow-md",
            }),
          )}
        >
          <Tabs
            defaultValue={OG_SOCIAL_PREVIEW_TEMPLATE_TABS[0].title}
            className="flex w-full flex-col items-center overflow-hidden rounded-md bg-white p-8 shadow-md"
          >
            <div className="mb-4 flex w-full items-center justify-center lg:mb-0">
              <PersonStandingIcon className="text-muted-foreground" />
            </div>

            <div className="hidden w-full place-items-center lg:grid">
              <TabsList className="my-4 h-9 rounded-full">
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
            <div className="flex min-h-[700px] w-full flex-col items-center justify-center gap-8 lg:flex-row lg:items-start">
              <div
                className={cn(
                  gradientLightVariants({
                    variant,
                    className:
                      "flex w-full max-w-2xl flex-col items-center justify-start rounded-lg border shadow-md",
                  }),
                )}
              >
                <form className="flex flex-col gap-2 p-4">
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
                      ref={titleInputRef}
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
                      ref={detailsInputRef}
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
                          className="group peer flex flex-1 gap-2"
                        >
                          <LayoutTemplateIcon className="size-4 text-white group-hover:text-slate-100" />{" "}
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
                  <div className="flex h-full w-full flex-1 flex-col items-center lg:items-start">
                    <div className="grid w-full place-items-center lg:hidden">
                      <TabsList className="my-4 h-9 rounded-full">
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
                            "grid h-full w-full rounded-lg border shadow-md",
                        }),
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
                    <p className="my-4 w-full text-center text-sm text-muted-foreground">
                      {tab.description}
                    </p>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>

      <div className="flex w-full flex-1 items-center justify-center">
        <div
          className={cn(
            gradientLightVariants({
              variant,
              className:
                "relative flex h-fit w-full flex-col items-center gap-2 rounded-lg border p-4 shadow-md",
            }),
          )}
        >
          <div className="flex w-full flex-col items-center gap-2 p-2">
            <label className="text-lg font-bold">
              {isSubscribed
                ? "Enter any extra details"
                : "Describe your customer persona to improve your copy:"}
            </label>
            <h2 className="text-center text-xs text-slate-400">
              Generate and optimize social media share previews for your
              content.
              <br />
              Improve your click-through rates and engagement.
            </h2>
            {isSubscribed ? (
              <PersonaSelectFromHistorySidebar className="right-4 top-4 z-[50] max-xl:my-4 xl:absolute" />
            ) : null}
            <Input
              type="text"
              className="w-1/2"
              placeholder="e.g. a marketing manager"
              onChange={(e) => {
                setDetailsInput(e.target.value);
              }}
              value={detailsInput}
              ref={detailsInputRef}
            />
          </div>

          <OptimizeCopywriting
            {...{
              url,
              title,
              description,
              image,
              input,
              noInput: noInput || title === "" || description === "",
              variant,
            }}
          />
          <div className="flex animate-pulse cursor-help flex-col gap-1 text-center text-xs text-gray-400">
            {noInput ? (
              <span
                onClick={() => detailsInputRef.current?.focus()}
                onMouseOver={() => detailsInputRef.current?.focus()}
              >
                Missing Details to Optimize Copy
              </span>
            ) : null}
            {title === "" ? (
              <span
                onClick={() => titleInputRef.current?.focus()}
                onMouseOver={() => titleInputRef.current?.focus()}
              >
                Missing Image Title
              </span>
            ) : null}
            {description === "" ? (
              <span
                onClick={() => descriptionInputRef.current?.focus()}
                onMouseOver={() => descriptionInputRef.current?.focus()}
              >
                Missing Image Description
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-1 items-center justify-center">
        <div
          className={cn(
            gradientLightVariants({
              variant,
              className:
                "flex h-fit w-full flex-col items-center rounded-lg border p-4 shadow-md",
            }),
          )}
        >
          <div className="p-2">
            <h2 className="text-md font-bold">
              The Open Graph meta tags and Twitter cards tags for your content
            </h2>
          </div>

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
import { PersonaSelectFromHistorySidebar } from "../selected-personas/select-from-sidebar/persona-select-from-history-sidebar";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";
import { PersonaBusinessArchetype } from "../selected-personas/types";

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
    index: number,
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
          "mx-auto mb-5 flex rounded-full px-4 py-2 font-bold text-white",
          loading || noInput
            ? "bg-gray-400"
            : "bg-green-500 hover:bg-green-700",
        )}
        onClick={async () => {
          if (!loading) {
            IS_TEST_DEV_ENV
              ? console.log(
                  "DEV ONLY LOGS:",
                  "Optimizing copywriting for persona: ",
                  input,
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
                    responseString,
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
                },
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
        <div className="flex w-full flex-col items-center overflow-hidden rounded-md bg-white p-8 shadow-md">
          <div className="mb-4 flex w-full items-center justify-center">
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
                        i === TABLE_COLUMNS.length - 1 ? "rounded-r-lg" : "",
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
                        i % Object.keys(ColorVariantMap).length,
                      )}
                    />
                  );
                })}
              </tbody>
            </table>
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
        }),
      )}
    >
      {Object.keys(data).map((column, i) => {
        const value = data[column as keyof TableRowData];

        return (
          <td
            key={i}
            className={cn(
              "p-1 px-1 py-4 text-sm font-normal text-[#637381]",
              i === 0 ? "rounded-l-lg" : "",
              i === TABLE_COLUMNS.length - 1 ? "rounded-r-lg" : "",
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
            <div className="group relative rounded-md p-2 pr-6 hover:bg-white hover:shadow-md">
              <CopyIcon className="absolute right-2 top-2 size-4 text-black opacity-0 group-hover:animate-pulse group-hover:opacity-100" />
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
