"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  gradientLightVariants,
  tabTriggerVariants,
} from "@/components/variants";
import { cn } from "@/lib/utils";
import { PersonStandingIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OG_SOCIAL_PREVIEW_TEMPLATE_TABS } from "./previews";
import { HtmlExportPreview } from "./export/html-export";
import { UploadImage } from "./upload-image-area";

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
  const variant = "blue";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setTitle(OG_PREVIEW_TEST.title);
    setDescription(OG_PREVIEW_TEST.description);
    setUrl(OG_PREVIEW_TEST.url);
    setImage(OG_PREVIEW_TEST.image);
  }, []);

  return (
    <section className="flex flex-col justify-center relative p-8 gap-8 w-full">
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
          <div className="w-full place-items-center hidden lg:grid">
            <PersonStandingIcon className="text-muted-foreground" />
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
                    <PersonStandingIcon className="text-muted-foreground" />
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
                </div>
                <p className="text-sm text-muted-foreground text-center my-4 ">
                  {tab.description}
                </p>
              </TabsContent>
            ))}
          </div>
        </Tabs>
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
