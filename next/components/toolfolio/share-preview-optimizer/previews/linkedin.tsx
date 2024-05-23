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
              className={"object-contain min-w-8"}
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
