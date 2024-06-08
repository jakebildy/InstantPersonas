import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { OGPreviewMetadata } from "../social-share-tool";
import Image from "next/image";
import {
  MessageSquareMoreIcon,
  RefreshCcwIcon,
  SendIcon,
  ThumbsUpIcon,
} from "lucide-react";

export function LinkedInPreview({
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
        className="relative mb-[0.8rem] flex items-center pl-[1.6rem] pr-[calc(4rem+32px)] pt-3"
      >
        <div className="flex flex-1 overflow-hidden pr-[1.6rem]" id="user-info">
          <div
            className="relatives flex size-12 shrink-0 items-center pt-0.5 -outline-offset-2"
            id="user-avatar"
          >
            <Image
              src={"/instant_personas_logo.png"}
              alt={"Instant Personas Logo"}
              width={48}
              height={48}
              priority
              className={"min-w-8 object-contain"}
            />
          </div>
          <div
            className="relative ml-[0.8rem] flex-1 basis-0 overflow-hidden p-0.5"
            id={"user-metadata"}
          >
            <div className="flex flex-col">
              <span className="hover:underline-blue-800 flex cursor-pointer text-sm font-semibold hover:text-blue-500 hover:underline">
                InstantPersonas
              </span>
              <span className="min-w-0 text-xs text-gray-500">
                787, 298 followers
              </span>

              <span className="flex">
                <span
                  aria-hidden="true"
                  className="flex min-w-0 items-center gap-1 text-[10px] text-gray-500"
                  suppressHydrationWarning
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
            className="absolute right-[0.8rem] top-[0.4rem] flex"
          >
            <button
              className="group relative flex size-8 cursor-pointer select-none items-center justify-center overflow-visible"
              id="mock-twitter-button"
            >
              <div className="absolute inset-2 -m-1 size-6 rounded-full bg-transparent transition-colors duration-200 group-hover:bg-gray-500/10" />
              <DotsHorizontalIcon className="text-muted-foreground transition-colors duration-200 group-hover:text-black" />
            </button>
          </div>
        </div>
      </div>
      <div id={"post-content"} className="ml-2">
        <div className="relative mx-4 max-h-[6rem] max-w-[928px] overflow-hidden">
          <span className="hover:underline-blue-800 cursor-pointer text-sm font-semibold text-blue-600 hover:underline">
            {url}
          </span>
          <br />
          <span className="hover:underline-blue-800 cursor-pointer text-sm font-semibold text-blue-600 hover:underline">
            #instantPersonas
          </span>

          <span className="hover:underline-blue-800 ml-1 cursor-pointer text-sm font-semibold text-blue-600 hover:underline">
            #preview
          </span>
        </div>
      </div>
      <article
        id={"post-media"}
        className="relative mt-[0.8rem] overflow-hidden"
      >
        <div className="relative h-0 max-w-full pt-[53.73%]">
          <div className="absolute left-0 top-0 h-full w-full cursor-pointer -outline-offset-1">
            <div className="relative h-full w-full">
              <Image
                src={image ?? "/tools/no-image-placeholder.svg"}
                alt="OG Image"
                className={image ? "" : "object-cover"}
                fill={true}
              />
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between bg-pastel-blue/25 px-[1.2rem] py-[0.8rem]">
          <div className="flex w-full flex-1 flex-col">
            <div className="max-h-16 overflow-hidden text-ellipsis text-sm">
              <span dir="ltr">{title}</span>
            </div>
            <span className="mt-[0.8rem] overflow-hidden text-ellipsis text-xs text-gray-500">
              {description}
            </span>
          </div>
        </div>
      </article>
      <div id={"social-controls"}>
        <div className="mx-[1.6rem] flex border-b border-gray-300/75 py-[0.8rem]">
          <ul className="flex flex-1">
            <li className="mr-[0.4rem] flex flex-1 list-none items-center">
              <button
                aria-label="1,663 reactions"
                type="button"
                className="group flex items-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="inline-block size-4 bg-no-repeat align-bottom"
                  src="https://static.licdn.com/aero-v1/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
                  alt="like"
                  data-test-reactions-icon-type="LIKE"
                  data-test-reactions-icon-theme="light"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="-ml-[0.4rem] inline-block size-4 bg-no-repeat align-bottom"
                  src="https://static.licdn.com/aero-v1/sc/h/41j9d0423ck1snej32brbuuwg"
                  alt="funny"
                  data-test-reactions-icon-type="ENTERTAINMENT"
                  data-test-reactions-icon-theme="light"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="-ml-[0.4rem] inline-block size-4 bg-no-repeat align-bottom"
                  src="https://static.licdn.com/aero-v1/sc/h/b1dl5jk88euc7e9ri50xy5qo8"
                  alt="celebrate"
                  data-test-reactions-icon-type="PRAISE"
                  data-test-reactions-icon-theme="light"
                />
                <span
                  aria-hidden="true"
                  className="ml-0.5 text-xs text-gray-500"
                >
                  1,663{" "}
                </span>
              </button>
            </li>
            <li className="flex shrink-0 list-none items-center">
              <span className="hover:underline-blue-500 ml-0.5 cursor-pointer text-xs text-gray-500 hover:text-blue-500 hover:underline">
                100 comments
              </span>
              <span className="ml-[0.3rem] mr-[0.2rem] text-[8px] text-gray-500">
                •
              </span>
            </li>
            <li className="mr-[0.4rem] flex shrink-0 list-none items-center">
              <span className="hover:underline-blue-500 ml-0.5 cursor-pointer text-xs text-gray-500 hover:text-blue-500 hover:underline">
                46 reposts
              </span>
            </li>
          </ul>
        </div>
        <div className="item-center grid min-h-10 grid-flow-col gap-[0.4rem] px-[1.6rem] py-[0.4rem]">
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
            <span className="inline-flex flex-1 overflow-visible" key={label}>
              <button className="group flex min-h-12 w-full min-w-0 cursor-pointer items-center justify-center overflow-hidden rounded-sm px-2 py-[10px] align-middle transition-colors duration-200 hover:bg-gray-400/25">
                <div className="flex flex-wrap items-center justify-center">
                  <Icon className="-ml-0.5 mr-1 size-6 text-gray-900/75 outline-current group-hover:text-black" />
                  <span
                    aria-hidden="true"
                    className="text-sm font-semibold text-gray-900/75 group-hover:text-black"
                  >
                    {label}
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

export const LINKEDIN_CONFIG = {
  title: "LinkedIn",
  description: "View LinkedIn preview here.",
  content: LinkedInPreview,
} as const;
