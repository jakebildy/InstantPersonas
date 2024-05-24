"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  badgeVariants,
  ColorVariant,
  ColorVariantMap,
  gradientLightVariants,
  gradientVariants,
  tabTriggerVariants,
} from "@/components/variants";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
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
import { IMAGE_TEMPLATES } from "./image-templates";
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

type Props = {};

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

export default function SocialShareTool({}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  const [isDownloading, setIsDownloading] = useState(false);
  const [showTemplateSelectModal, setShowTemplateSelectModal] = useState(false);

  const handleResolvedDownload = () => {
    setShowTemplateSelectModal(false);
    setIsDownloading(false);
  };

  const [variant, setVariant] = useState<ColorVariant>("blue");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [editTemplateSectionIsOpen, setEditTemplateSectionIsOpen] =
    useState<boolean>(false);

  useEffect(() => {
    setTitle(OG_PREVIEW_TEST.title);
    setDescription(OG_PREVIEW_TEST.description);
    setUrl(OG_PREVIEW_TEST.url);
    setImage(OG_PREVIEW_TEST.image);
  }, []);

  return (
    <section className="flex flex-col justify-center relative p-8 gap-8 w-full">
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
                    <Dialog
                    // open={true}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant={"blue"}
                          className="flex gap-2 flex-1 peer group"
                          onClick={() => {
                            //? Reset the selected template if the button is clicked again
                            //? Selected Template is used to show edit view in dialog, after which image is updated
                            setSelectedTemplate("");
                          }}
                        >
                          <LayoutTemplateIcon className="group-hover:text-slate-100 text-white size-4" />{" "}
                          Choose Template
                        </Button>
                      </DialogTrigger>
                      <DialogContent
                        className={gradientVariants({
                          variant,
                          className:
                            "w-full max-w-4xl h-full max-h-[90vh] p-4 flex flex-col",
                        })}
                      >
                        <DialogHeader>
                          <DialogTitle>Choose Template</DialogTitle>
                          <DialogDescription>
                            Select a template to use as the image for your
                            social preview.
                          </DialogDescription>
                        </DialogHeader>
                        <div className=" flex-1 max-h-fit overflow-hidden bg-white rounded-md shadow-lg">
                          <ScrollArea className="flex-1 h-full">
                            {
                              //? If a template is selected, show the edit view
                              selectedTemplate ? (
                                showTemplateSelectModal ? (
                                  <TemplatePreviewSelect
                                    className="pt-20 text-center"
                                    header="Choose a template to download your Topical Authority Map."
                                    subHeader="CSV and PNG formats available."
                                    variant={"purple"}
                                    isLoading={isDownloading}
                                    onLoadingChange={setIsDownloading}
                                    onSuccess={(data) => {
                                      handleResolvedDownload();

                                      console.log({
                                        b64Data: data.split("base64,")[1],
                                        contentType:
                                          data
                                            .split("data:")[0]
                                            .replace(";", "") ?? "image/png",
                                      });

                                      const newURL = URL.createObjectURL(
                                        b64toBlob({
                                          b64Data: data.split("base64,")[1],
                                          contentType: data
                                            .split("data:")[0]
                                            .replace(";", ""),
                                        })
                                      );
                                      setImage(newURL);
                                    }}
                                    onError={handleResolvedDownload}
                                    downloadTemplateOptions={[
                                      {
                                        type: "component",
                                        img: {
                                          src:
                                            IMAGE_TEMPLATES.find(
                                              (template, i) => {
                                                template.title ===
                                                  selectedTemplate;
                                              }
                                            )?.image || "/forest.gif",
                                          width: 800,
                                          height: 285,
                                        },
                                        label: "1200 x 600",
                                        width: 1200,
                                        height: 600,
                                        component: IMAGE_TEMPLATES.map(
                                          (template, i) => {
                                            if (
                                              template.title ===
                                              selectedTemplate
                                            ) {
                                              return (
                                                <template.imageTemplate
                                                  variant={variant}
                                                  key={i}
                                                  {...{
                                                    url,
                                                    title,
                                                    description,
                                                    image,
                                                    setImage,
                                                  }}
                                                />
                                              );
                                            }
                                          }
                                        ),
                                      },
                                    ]}
                                  />
                                ) : (
                                  <div className="flex-1 p-2">
                                    {IMAGE_TEMPLATES.map((template, i) => {
                                      if (template.title === selectedTemplate) {
                                        return (
                                          <template.preview
                                            variant={variant}
                                            size="md"
                                            key={i}
                                            {...{
                                              url,
                                              title,
                                              description,
                                              image,
                                              setImage,
                                            }}
                                          />
                                        );
                                      }
                                    })}

                                    <form className="flex flex-col p-4 gap-2 ">
                                      <Collapsible
                                        open={editTemplateSectionIsOpen}
                                        onOpenChange={
                                          setEditTemplateSectionIsOpen
                                        }
                                      >
                                        <CollapsibleTrigger className="group">
                                          <div className="text-left flex gap-2 justify-between transition-colors duration-200">
                                            <div className="group-hover:animate-pulse">
                                              <h2 className="text-lg font-bold">
                                                Edit Template
                                              </h2>
                                              <p className="text-sm">
                                                Customize how your content
                                                appears on search engines and
                                                social platforms. Modify the
                                                title, description, and image to
                                                optimize visibility and
                                                engagement.{" "}
                                                <span className="text-blue-500 font-bold border-b  border-transparent group-hover:border-blue-500 inline-flex gap-2 items-center">
                                                  {editTemplateSectionIsOpen
                                                    ? "Click here to hide"
                                                    : "Click here to show"}
                                                  {!editTemplateSectionIsOpen ? (
                                                    <ArrowDown className="group-hover:animate-pulse size-3" />
                                                  ) : (
                                                    <ArrowUp className="group-hover:animate-pulse size-3" />
                                                  )}
                                                </span>
                                              </p>
                                            </div>
                                            {!editTemplateSectionIsOpen ? (
                                              <EyeOffIcon className="group-hover:animate-pulse" />
                                            ) : (
                                              <EyeIcon className="group-hover:animate-pulse" />
                                            )}
                                          </div>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                          <div>
                                            <Label htmlFor="url">URL</Label>
                                            <Input
                                              id="url"
                                              value={url}
                                              onChange={(e) =>
                                                setUrl(e.target.value)
                                              }
                                            />
                                          </div>
                                          <div>
                                            <Label htmlFor="Title">Title</Label>
                                            <Input
                                              id="Title"
                                              value={title}
                                              onChange={(e) =>
                                                setTitle(e.target.value)
                                              }
                                            />
                                            <span className="text-xs font-medium">
                                              Recommended:{" "}
                                              <span className="font-light">
                                                60 characters
                                              </span>
                                            </span>
                                          </div>
                                          <div>
                                            <Label htmlFor="Description">
                                              Description
                                            </Label>
                                            <Input
                                              id="Description"
                                              value={description}
                                              onChange={(e) =>
                                                setDescription(e.target.value)
                                              }
                                            />
                                            <span className="text-xs font-medium">
                                              Recommended:{" "}
                                              <span className="font-light">
                                                160 characters
                                              </span>
                                            </span>
                                          </div>
                                          <ChangeColorSelect
                                            value={variant}
                                            onChange={(newVariant) =>
                                              setVariant(
                                                newVariant as ColorVariant
                                              )
                                            }
                                          />
                                          <div className="flex flex-col gap-1">
                                            <div className="flex items-center justify-between">
                                              <Label htmlFor="Image">
                                                Image
                                              </Label>
                                              <span className="text-xs font-medium">
                                                Recommended:{" "}
                                                <span className="font-light">
                                                  1200 x 630 pixels
                                                </span>
                                              </span>
                                            </div>

                                            <UploadImage
                                              currentImageUrl={image}
                                              onUpload={(newImageUrl) =>
                                                setImage(newImageUrl)
                                              }
                                            />
                                          </div>
                                        </CollapsibleContent>
                                      </Collapsible>

                                      <Separator className="py-2" />
                                      <Button
                                        variant={"blue"}
                                        className="flex gap-2 flex-1 peer group"
                                        onClick={() =>
                                          setShowTemplateSelectModal(true)
                                        }
                                      >
                                        <DownloadIcon className="group-hover:text-slate-100 text-white size-4" />{" "}
                                        Download & Save Template
                                      </Button>
                                    </form>
                                  </div>
                                )
                              ) : (
                                <div className="grid grid-cols-3 gap-4 p-4">
                                  {IMAGE_TEMPLATES.map((template, i) => (
                                    <button
                                      key={i}
                                      className="flex flex-col border  rounded-md overflow-hidden max-w-full p-1 bg-white hover:bg-gray-200 transition-colors duration-200"
                                      onClick={() => {
                                        setSelectedTemplate(template.title);
                                      }}
                                      tabIndex={0}
                                    >
                                      <div className="relative w-full h-36">
                                        <template.preview
                                          size="sm"
                                          variant={variant}
                                          {...{
                                            url,
                                            title,
                                            description,
                                            image,
                                          }}
                                        />
                                      </div>

                                      <div className="flex p-1 items-center space-x-4 ">
                                        <div className="flex flex-col flex-1 min-w-0">
                                          <p className="text-sm font-medium truncate">
                                            {template.title}
                                          </p>
                                          <p className="text-xs text-base-500 text-gray-400">
                                            {template.description}
                                          </p>
                                        </div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              )
                            }
                          </ScrollArea>
                        </div>
                      </DialogContent>
                    </Dialog>
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

function ChangeColorSelect({
  value = "blue",
  onChange,
}: {
  value?: ColorVariant;
  onChange: (value: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"}>Change Color</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="top">
        <DropdownMenuLabel>Select Archetype Color</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={onChange}
          className="flex flex-col items-center"
        >
          {Object.entries(ColorVariantMap).map(([color, hex]) => (
            <DropdownMenuRadioItem
              value={color}
              key={hex}
              className="w-full flex items-center justify-between group cursor-pointer data-[state=checked]:bg-slate-200 hover:bg-slate-100"
            >
              <div
                className={badgeVariants({
                  variant: color as ColorVariant,
                  className: "group-hover:animate-pulse",
                })}
              >
                {color}
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
