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
    <article role="article" className="py-3 px-4">
      <div className="flex gap-2">
        <div className="flex items-center size-10">
          <Image
            src={"/instant_personas_logo.png"}
            alt={"Instant Personas Logo"}
            width={40}
            height={40}
            priority
            className={"object-contain min-w-8"}
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
        <span className="min-w-0 text-xs text-gray-600 w-full">
          From {domain}
        </span>
      </div>
      <div className="flex my-4 text-sm">
        <time
          dateTime="2024-05-20T22:01:06.000Z"
          className="min-w-0 text-gray-600 "
          suppressHydrationWarning
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

export const X_CONFIG = {
  title: "X",
  description: "View X preview here.",
  content: XPreview,
} as const;
