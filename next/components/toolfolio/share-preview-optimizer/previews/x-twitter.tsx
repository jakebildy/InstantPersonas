import {
  BookmarkIcon,
  ChatBubbleIcon,
  DotsHorizontalIcon,
  DownloadIcon,
  HeartIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { OGPreviewMetadata } from "../social-share-tool";
import Image from "next/image";
import { GetDomainFromString } from "../utils";

export function XPreview({
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

  const domain = GetDomainFromString(url);

  return (
    <article role="article" className="px-4 py-3">
      <div className="flex gap-2">
        <div className="flex size-10 items-center">
          <Image
            src={"/instant_personas_logo.png"}
            alt={"Instant Personas Logo"}
            width={40}
            height={40}
            priority
            className={"min-w-8 object-contain"}
          />
        </div>
        <div className="mb-3 flex flex-1 justify-between">
          <div className="text-sm">
            <div className="flex">
              <span className="min-w-0 font-bold">InstantPersonas</span>
              <XVerifiedIcon />
            </div>
            <span className="min-w-0 text-gray-600">@instantpersonas</span>
          </div>
          <div className="ml-2">
            <button
              className="group relative flex size-4 cursor-pointer select-none items-center justify-center overflow-visible"
              id="mock-twitter-button"
            >
              <div className="absolute inset-0 -m-1 size-6 rounded-full bg-transparent transition-colors duration-200 group-hover:bg-blue-500/10" />
              <DotsHorizontalIcon className="text-muted-foreground transition-colors duration-200 group-hover:text-blue-500" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-1">
        <div className="group relative flex w-full flex-col overflow-hidden rounded-md p-2 transition-colors duration-200 hover:bg-slate-500/25">
          <div className="relative flex w-full flex-col overflow-hidden rounded-md border border-slate-500/25 transition-colors duration-200 group-hover:border-slate-500/50">
            <div className="w-full pb-[52.5%]" />
            <div className="absolute h-full w-full">
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
          <div className="absolute bottom-3 left-4 right-3">
            <span className="pointer-events-none h-5 min-w-0 select-none rounded-sm bg-black/10 px-1 py-0.5 text-xs text-gray-600">
              {title}
            </span>
          </div>
        </div>
        <span className="w-full min-w-0 text-xs text-gray-600">
          From {domain}
        </span>
      </div>
      <div className="my-4 flex text-sm">
        <time
          dateTime="2024-05-20T22:01:06.000Z"
          className="min-w-0 text-gray-600"
          suppressHydrationWarning
        >
          {formattedTime} · {formattedDate}
        </time>
        <span className="min-w-0 px-1 text-gray-600">·</span>

        <span className="min-w-0 text-gray-600">
          <b>1.2K</b> Views
        </span>
      </div>
      <div className="flex gap-1 border-y border-gray-600/25 px-1 py-2">
        <div className="flex flex-1 items-center">
          <ChatBubbleIcon className="cursor-pointer text-gray-600 transition-colors duration-200 hover:text-gray-700" />
        </div>
        <div className="flex flex-1 items-center">
          <UpdateIcon className="cursor-pointer text-gray-600 transition-colors duration-200 hover:text-gray-700" />
          <span className="select-none px-1 text-xs text-gray-600">1.2K</span>
        </div>
        <div className="flex flex-1 items-center">
          <HeartIcon className="cursor-pointer text-gray-600 transition-colors duration-200 hover:text-gray-700" />
          <span className="select-none px-1 text-xs text-gray-600">1.2K</span>
        </div>
        <div className="flex flex-1 items-center">
          <BookmarkIcon className="cursor-pointer text-gray-600 transition-colors duration-200 hover:text-gray-700" />
          <span className="select-none px-1 text-xs text-gray-600">1.2K</span>
        </div>
        <div className="flex items-center">
          <DownloadIcon className="cursor-pointer text-gray-600 transition-colors duration-200 hover:text-gray-700" />
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
      className="ml-0.5 h-5 max-h-5 w-5 max-w-5 select-none fill-current align-bottom"
    >
      <g>
        <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
      </g>
    </svg>
  );
}

export const X_CONFIG = {
  title: "X",
  description: "View X preview here.",
  content: XPreview,
} as const;
