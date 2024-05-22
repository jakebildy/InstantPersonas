"use client";
import { AuthFallback } from "@/components/context/auth/stytch-auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ColorVariant,
  ColorVariantMap,
  gradientLightVariants,
  gradientVariants,
  tabTriggerVariants,
  textPastelColorVariants,
} from "@/components/variants";
import { cn } from "@/lib/utils";
import {
  BookmarkIcon,
  ChatBubbleIcon,
  DotsHorizontalIcon,
  DownloadIcon,
  HeartIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import {
  MessageSquareMoreIcon,
  PersonStandingIcon,
  RefreshCcwIcon,
  SendIcon,
  ThumbsUp,
  ThumbsUpIcon,
  UploadCloudIcon,
} from "lucide-react";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BarLoader from "react-spinners/BarLoader";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {};

type OGPreviewMetadata = {
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
const OG_SOCIAL_PREVIEW_TEMPLATE_TABS = [
  {
    title: "iMessage",
    description: "View iMessage preview here.",
    content: IMessagePreview,
  },
  {
    title: "X",
    description: "View X preview here.",
    content: XPreview,
  },
  {
    title: "Discord",
    description: "View Discord preview here.",
    content: DiscordPreview,
  },
  {
    title: "LinkedIn",
    description: "View LinkedIn preview here.",
    content: LinkedInPreview,
  },
  {
    title: "Pintrest",
    description: "View Pintrest preview here.",
    content: PintrestPreview,
  },
] as const;

export default function PageTest({}: Props) {
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
    <div className="flex flex-col items-center justify-center h-screen w-screen relative ">
      <section className="flex flex-row items-center justify-center flex-wrap p-8 gap-8 h-full w-full">
        <div
          className={cn(
            gradientLightVariants({
              variant,
              className:
                "flex flex-col w-full items-center border rounded-lg shadow-md max-w-xl",
            })
          )}
        >
          <form className="flex flex-col p-4 gap-2">
            <div>
              <h2 className="text-lg font-bold">Edit</h2>
              <p className="text-sm">
                Customize how your content appears on search engines and social
                platforms. Modify the title, description, and image to optimize
                visibility and engagement.
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
                Recommended: <span className="font-light">60 characters</span>
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
                Recommended: <span className="font-light">160 characters</span>
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

        <div className="flex-1 flex flex-col items-center relative">
          <Tabs
            defaultValue={OG_SOCIAL_PREVIEW_TEMPLATE_TABS[0].title}
            className="w-full max-w-xl"
          >
            <div className="w-full grid place-items-center">
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

            {OG_SOCIAL_PREVIEW_TEMPLATE_TABS.map((tab) => (
              <TabsContent
                value={tab.title}
                key={tab.title + "content"}
                className="w-full"
              >
                <ScrollArea
                  className={cn(
                    gradientLightVariants({
                      variant,
                      className: "grid border rounded-lg shadow-md ",
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

                <p className="text-sm text-muted-foreground text-center my-4">
                  {tab.description}
                </p>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function UploadImage({
  currentImageUrl,
  onUpload,
}: {
  currentImageUrl: string;
  onUpload: (url: string) => void;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const newURL = URL.createObjectURL(file);
      onUpload(newURL);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const inputDisplayText = isDragActive
    ? ">.< Drop the file here..."
    : "Drag or click to upload image";

  return (
    <div>
      <div
        {...getRootProps()}
        className="cursor-pointer border-dashed border h-[200px] grid place-items-center text-xs border-border/50 rounded-md bg-transparent px-3 py-2 hover:border-black/25 hover:shadow-md shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-500"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="relative w-full h-full aspect-[400/209] max-w-[400px]">
            {currentImageUrl ? (
              <Image src={currentImageUrl} alt="OG Image Preview" fill={true} />
            ) : null}
          </div>
          <p className={"text-foreground"}>{inputDisplayText}</p>
        </div>
      </div>
    </div>
  );
}

function IMessagePreview({
  url,
  title,
  description,
  image,
}: OGPreviewMetadata) {
  const now = new Date();

  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="p-4 flex flex-col md:px-5">
      <div className="mb-2 text-sm text-base-500">iMessage</div>
      <div className="mb-3 text-xs text-base-500">Today {formattedTime}</div>
      <div className="ml-auto px-4 py-2 mb-3 text-sm text-white bg-blue-500 rounded-2xl">
        <span>Check out this website!</span>
      </div>
      <div className="flex flex-col border  rounded-2xl overflow-hidden max-w-full">
        <div className="relative w-full h-56">
          {image ? <Image src={image} alt="OG Image" fill={true} /> : null}
        </div>

        <div className="flex p-4 items-center space-x-4 bg-white">
          <div className="flex flex-col flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{title}</p>
            <p className="text-xs text-base-500 text-gray-400 truncate">
              {url}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-3 text-xs text-base-500">Delivered</div>
    </div>
  );
}

function XPreview({ url, title, description, image }: OGPreviewMetadata) {
  const now = new Date();

  // formatted as h:mm PM and MM DD, YYYY
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const formattedDate = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article role="article" className="py-3 px-4">
      <div className="flex gap-2">
        <div className="flex items-center size-10">
          <Image
            src={"/instant_personas_logo.png"}
            alt={"Instant Personas Logo"}
            width={40}
            height={40}
            priority
            className={cn("object-contain min-w-8")}
          />
        </div>
        <div className="flex-1 flex justify-between mb-3">
          <div className="text-sm">
            <div className="flex">
              <span className="font-bold min-w-0">InstantPersonas</span>
              <XVerifiedIcon />
            </div>
            <span className="text-gray-600 min-w-0">@instantpersonas</span>
          </div>
          <div className="ml-2">
            <button
              className="relative overflow-visible size-4 select-none cursor-pointer items-center justify-center flex group"
              id="mock-twitter-button"
            >
              <div className=" absolute -m-1 inset-0 size-6 rounded-full transition-colors duration-200 bg-transparent group-hover:bg-blue-500/10" />
              <DotsHorizontalIcon className="text-muted-foreground group-hover:text-blue-500 transition-colors duration-200 " />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-3">
        <div className="rounded-md overflow-hidden w-full flex flex-col group transition-colors duration-200 hover:bg-slate-500/25 relative p-2">
          <div className="rounded-md border border-slate-500/25 overflow-hidden w-full flex flex-col transition-colors duration-200 group-hover:border-slate-500/50 relative">
            <div className="pb-[52.5%] w-full" />
            <div className="absolute w-full h-full">
              <div className="relative w-full h-full">
                <Image src={image} alt="OG Image" fill={true} />
              </div>
            </div>
          </div>
          <div className="absolute right-3 left-4 bottom-3">
            <span className="bg-black/10 h-5 px-1 py-0.5 rounded-sm pointer-events-none min-w-0 select-none text-xs text-gray-600 ">
              {title}
            </span>
          </div>
        </div>
        <span className="min-w-0 text-xs text-gray-600 w-full">From {url}</span>
      </div>
      <div className="flex my-4 text-sm">
        <time
          dateTime="2024-05-20T22:01:06.000Z"
          className="min-w-0 text-gray-600 "
        >
          {formattedTime} · {formattedDate}
        </time>
        <span className="min-w-0 text-gray-600 px-1">·</span>

        <span className="min-w-0 text-gray-600 ">
          <b>1.2K</b> Views
        </span>
      </div>
      <div className="flex gap-1 px-1 border-y border-gray-600/25 py-2">
        <div className="flex-1 flex items-center">
          <ChatBubbleIcon className="text-gray-600 hover:text-gray-700 cursor-pointer transition-colors duration-200" />
        </div>
        <div className="flex-1 flex items-center">
          <UpdateIcon className="text-gray-600 hover:text-gray-700 cursor-pointer transition-colors duration-200" />
          <span className="text-gray-600 text-xs px-1 select-none">1.2K</span>
        </div>
        <div className="flex-1 flex items-center">
          <HeartIcon className="text-gray-600 hover:text-gray-700 cursor-pointer transition-colors duration-200" />
          <span className="text-gray-600 text-xs px-1 select-none">1.2K</span>
        </div>
        <div className="flex-1 flex items-center">
          <BookmarkIcon className="text-gray-600 hover:text-gray-700 cursor-pointer transition-colors duration-200" />
          <span className="text-gray-600 text-xs px-1 select-none">1.2K</span>
        </div>
        <div className="flex items-center">
          <DownloadIcon className="text-gray-600 hover:text-gray-700 cursor-pointer transition-colors duration-200" />
        </div>
      </div>
    </article>
  );
}

function XVerifiedIcon() {
  return (
    <svg
      viewBox="0 0 22 22"
      aria-label="Verified account"
      role="img"
      style={{
        color: "rgb(29, 155, 240)",
      }}
      className="max-w-5 max-h-5 fill-current align-bottom select-none h-5 w-5 ml-0.5"
    >
      <g>
        <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
      </g>
    </svg>
  );
}

function DiscordPreview({ url, title, description, image }: OGPreviewMetadata) {
  const now = new Date();
  // formatted as h:mm PM and MM DD, YYYY
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const formattedDate = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="pb-10 pt-2">
      <div
        className="items-center  border-t border-gray-300/20 h-[1px] justify-center flex w-full mb-2 ml-4 mr-[14px] mt-6 relative select-none"
        role="separator"
        aria-label={formattedDate}
      >
        <span className="text-xs mt-[-1px] text-gray-500 select-none">
          {formattedDate}
        </span>
      </div>
      {/* Message */}
      <div className="min-h-11 pl-[72px] pr-12 py-0.5 mt-4 relative">
        <div className="static ml-0 pl-0 indent-0" id="message">
          <div
            className="flex items-center size-10 absolute left-4 top-[calc(4px-0.125rem)] rounded-full"
            aria-hidden="true"
          >
            <Image
              src={"/instant_personas_logo.png"}
              alt={"Instant Personas Logo"}
              width={40}
              height={40}
              priority
              className={cn("object-contain min-w-8")}
            />
          </div>

          <h3 className="flex gap-2 items-center min-h-[22px]">
            <span
              aria-expanded="false"
              role="button"
              tabIndex={0}
              className="text-base font-semibold text-green-500 leading-5"
            >
              InstantPersonas
            </span>

            <span className="text-xs text-gray-500 leading-5 truncate">
              <time
                aria-label={"Today at " + formattedTime}
                dateTime={now.toLocaleDateString()}
              >
                <i aria-hidden="true" className="sr-only">
                  {" "}
                  —{" "}
                </i>
                Today at {formattedTime}
              </time>
            </span>
          </h3>
          <div className="pl-[72px] -ml-[72px] text-base text-left overflow-hidden text-wrap whitespace-break-spaces">
            <span className="text-blue-500 hover:underline hover:underline-blue-800 cursor-pointer">
              {url}
            </span>
          </div>
        </div>
        <div
          className="py-0.5 grid grid-flow-row h-fit   overflow-hidden"
          id="embed-container"
        >
          <article
            className="max-w-[432px] self-start justify-self-auto border-l-4 border-pastel-blue/90 bg-pastel-blue/50 grid rounded-sm"
            id="embed"
          >
            <div className="grid overflow-hidden pl-2 pr-3 py-4">
              <div
                id={"provider"}
                className="empty:opacity-0 text-xs col-span-1 min-w-0 text-gray-500"
              >
                <span>
                  {url
                    .split(".")[0]
                    .replace("https://", "")
                    .replace("http://", "")}
                </span>
              </div>
              <div
                id={"title"}
                className="empty:opacity-0 text-base col-span-1 font-semibold text-blue-500 min-w-0 mt-1"
              >
                <span>{title}</span>
              </div>
              <div
                id={"description"}
                className="empty:opacity-0 text-sm col-span-1 min-w-0 text-gray-500 mt-1"
              >
                <span>{description}</span>
              </div>
              <div
                id={"image-container"}
                className="mt-4 flex flex-col min-w-0 col-span-1 rounded-sm contain-paint object-fill"
              >
                <div className="flex flex-row flex-auto w-full h-full">
                  <div className="max-w-[400px] w-full aspect-[400/209] relative overflow-hidden rounded-sm cursor-pointer">
                    <Image src={image} alt="OG Image" fill={true} />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

function LinkedInPreview({
  url,
  title,
  description,
  image,
}: OGPreviewMetadata) {
  const now = new Date();
  // formatted as h:mm PM and MM DD, YYYY
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const formattedDate = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-md">
      <div
        id={"user-header-container"}
        className="pr-[calc(4rem+32px)] pl-[1.6rem] pt-3 mb-[0.8rem] items-center flex relative"
      >
        <div className="pr-[1.6rem] overflow-hidden flex flex-1" id="user-info">
          <div
            className="flex items-center size-12 shrink-0 -outline-offset-2 pt-0.5 relatives"
            id="user-avatar"
          >
            <Image
              src={"/instant_personas_logo.png"}
              alt={"Instant Personas Logo"}
              width={48}
              height={48}
              priority
              className={cn("object-contain min-w-8")}
            />
          </div>
          <div
            className="p-0.5 flex-1 basis-0 ml-[0.8rem] overflow-hidden relative"
            id={"user-metadata"}
          >
            <div className="flex flex-col">
              <span className="flex hover:text-blue-500 hover:underline hover:underline-blue-800 cursor-pointer text-sm font-semibold">
                InstantPersonas
              </span>
              <span className="text-xs min-w-0 text-gray-500">
                787, 298 followers
              </span>

              <span className="flex">
                <span
                  aria-hidden="true"
                  className="flex items-center text-[10px] min-w-0 text-gray-500 gap-1"
                >
                  {formattedTime} <span className="text-[8px]">•</span>{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    data-supported-dps="16x16"
                    fill="currentColor"
                    width="16"
                    height="16"
                    focusable="false"
                    className="size-3"
                  >
                    <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H7v-.19a.51.51 0 01.28-.45l.38-.19a.74.74 0 01.68 0L9 7.5l.38-.7a1 1 0 00.12-.48v-.85a.78.78 0 01.21-.53l1.07-1.09a5 5 0 01-1.54 9z"></path>
                  </svg>
                </span>
                <span className="sr-only">Today</span>
              </span>
            </div>
          </div>
          <div
            id={"control-menu"}
            className="absolute top-[0.4rem] right-[0.8rem] flex"
          >
            <button
              className="relative overflow-visible select-none cursor-pointer items-center justify-center flex group size-8"
              id="mock-twitter-button"
            >
              <div className=" absolute -m-1 inset-2 size-6 rounded-full transition-colors duration-200 bg-transparent group-hover:bg-gray-500/10" />
              <DotsHorizontalIcon className="text-muted-foreground group-hover:text-black transition-colors duration-200 " />
            </button>
          </div>
        </div>
      </div>
      <div id={"post-content"} className="ml-2">
        <div className="mx-4 overflow-hidden max-h-[6rem] relative max-w-[928px]">
          <span className="text-blue-600 font-semibold text-sm hover:underline hover:underline-blue-800 cursor-pointer">
            {url}
          </span>
          <br />
          <span className="text-blue-600 font-semibold text-sm hover:underline hover:underline-blue-800 cursor-pointer">
            #instantPersonas
          </span>

          <span className="ml-1 text-blue-600 font-semibold text-sm hover:underline hover:underline-blue-800 cursor-pointer">
            #preview
          </span>
        </div>
      </div>
      <article
        id={"post-media"}
        className="mt-[0.8rem] overflow-hidden relative"
      >
        <div className="pt-[53.73%] h-0 max-w-full relative">
          <div className="top-0 left-0 absolute w-full h-full -outline-offset-1 cursor-pointer">
            <div className="relative w-full h-full">
              <Image src={image} alt="OG Image" fill={true} />
            </div>
          </div>
        </div>
        <div className="py-[0.8rem] px-[1.2rem] flex items-start justify-between bg-pastel-blue/25">
          <div className="flex-1 w-full flex flex-col">
            <div className=" max-h-16 overflow-hidden text-ellipsis text-sm">
              <span dir="ltr">{title}</span>
            </div>
            <span className="mt-[0.8rem] overflow-hidden text-ellipsis text-xs text-gray-500">
              {description}
            </span>
          </div>
        </div>
      </article>
      <div id={"social-controls"}>
        <div className="border-b border-gray-300/75 py-[0.8rem] mx-[1.6rem] flex">
          <ul className="flex flex-1">
            <li className="flex items-center flex-1 list-none mr-[0.4rem]">
              <button
                aria-label="1,663 reactions"
                type="button"
                className="flex items-center group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className=" align-bottom size-4 inline-block bg-no-repeat "
                  src="https://static.licdn.com/aero-v1/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
                  alt="like"
                  data-test-reactions-icon-type="LIKE"
                  data-test-reactions-icon-theme="light"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className=" align-bottom size-4 inline-block bg-no-repeat -ml-[0.4rem] "
                  src="https://static.licdn.com/aero-v1/sc/h/41j9d0423ck1snej32brbuuwg"
                  alt="funny"
                  data-test-reactions-icon-type="ENTERTAINMENT"
                  data-test-reactions-icon-theme="light"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className=" align-bottom size-4 inline-block bg-no-repeat -ml-[0.4rem] "
                  src="https://static.licdn.com/aero-v1/sc/h/b1dl5jk88euc7e9ri50xy5qo8"
                  alt="celebrate"
                  data-test-reactions-icon-type="PRAISE"
                  data-test-reactions-icon-theme="light"
                />
                <span
                  aria-hidden="true"
                  className="text-xs text-gray-500 ml-0.5"
                >
                  1,663{" "}
                </span>
              </button>
            </li>
            <li className=" flex items-center shrink-0 list-none">
              <span className="text-xs text-gray-500 ml-0.5 hover:text-blue-500 hover:underline hover:underline-blue-500 cursor-pointer">
                100 comments
              </span>
              <span className="text-[8px] text-gray-500 ml-[0.3rem] mr-[0.2rem] ">
                •
              </span>
            </li>
            <li className="mr-[0.4rem] flex items-center shrink-0 list-none">
              <span className="text-xs text-gray-500 ml-0.5 hover:text-blue-500 hover:underline hover:underline-blue-500 cursor-pointer">
                46 reposts
              </span>
            </li>
          </ul>
        </div>
        <div className="gap-[0.4rem] grid grid-flow-col item-center min-h-10 px-[1.6rem] py-[0.4rem]">
          {[
            {
              Icon: ThumbsUpIcon,
              label: "Like",
            },
            {
              Icon: MessageSquareMoreIcon,
              label: "Comment",
            },
            {
              Icon: RefreshCcwIcon,
              label: "Repost",
            },
            {
              Icon: SendIcon,
              label: "Send",
            },
          ].map(({ Icon, label }) => (
            <span className="flex-1 inline-flex overflow-visible" key={label}>
              <button className="cursor-pointer w-full py-[10px] px-2 hover:bg-gray-400/25 rounded-sm min-w-0 flex items-center justify-center transition-colors duration-200 align-middle group overflow-hidden min-h-12">
                <div className="flex-wrap justify-center items-center flex">
                  <Icon className="text-gray-900/75 size-6 group-hover:text-black outline-current -ml-0.5 mr-1" />

                  <span
                    aria-hidden="true"
                    className="text-sm font-semibold text-gray-900/75 group-hover:text-black"
                  >
                    Like
                  </span>
                </div>
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PintrestPreview({
  url,
  title,
  description,
  image,
}: OGPreviewMetadata) {
  const now = new Date();
  // formatted as h:mm PM and MM DD, YYYY
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const formattedDate = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="grid grid-cols-4 p-4 gap-2">
      <div className="col-span-1 flex flex-col gap-2">
        <div className="bg-pastel-blue/50 rounded-md w-full h-80" />
        <div className="bg-pastel-blue/50 rounded-md w-full h-40" />
        <div className="bg-pastel-blue/50 rounded-md w-full h-20" />
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <div className="bg-pastel-blue/50 rounded-md w-full h-20" />
        <div>
          <div className="bg-pastel-blue/50 rounded-md w-full h-40 relative overflow-hidden cursor-pointer">
            <Image src={image} alt="OG Image" fill={true} />
          </div>
          <div className="px-[6px] pt-2 pb-1">
            <div className="mb-2 overflow-hidden cursor-zoom-in flex flex-col">
              <span className="font-semibold text-xs truncate">{title}</span>
              <span className="text-[10px] leading-[10px] max-h-5 truncate">
                {url}
              </span>
            </div>
            <div className="item-center flex flex-row -mx-[3px] group max-h-6 cursor-pointer">
              <div
                className="flex items-center size-6 mx-[3px] rounded-full"
                aria-hidden="true"
              >
                <Image
                  src={"/instant_personas_logo.png"}
                  alt={"Instant Personas Logo"}
                  width={24}
                  height={24}
                  priority
                  className={"object-contain"}
                />
              </div>
              <div className="mx-[3px] mb-0.5 flex items-center">
                <span className="mx-0.5 text-[10px] leading-[10px] max-h-5 group-hover:underline">
                  InstantPersonas
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-pastel-blue/50 rounded-md w-full flex-1" />
      </div>
      <div className="col-span-1 flex flex-col gap-2">
        <div className="bg-pastel-blue/50 rounded-md w-full h-40" />
        <div className="bg-pastel-blue/50 rounded-md w-full h-20" />
        <div className="bg-pastel-blue/50 rounded-md w-full h-80" />
      </div>
    </div>
  );
}

function Preview({ url, title, description, image }: OGPreviewMetadata) {
  const now = new Date();
  // formatted as h:mm PM and MM DD, YYYY
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const formattedDate = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      <div></div>
    </div>
  );
}
