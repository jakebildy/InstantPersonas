import { OGPreviewMetadata } from "../social-share-tool";
import Image from "next/image";

export function DiscordPreview({
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
  const domain = url
    .split(".")[0]
    .replace("https://", "")
    .replace("http://", "");

  return (
    <div className="pb-10 pt-2">
      <div
        className="items-center  border-t border-gray-300/20 h-[1px] justify-center flex w-full mb-2 ml-4 mr-[14px] mt-6 relative select-none"
        role="separator"
        aria-label={formattedDate}
        suppressHydrationWarning
      >
        <span
          className="text-xs mt-[-1px] text-gray-500 select-none"
          suppressHydrationWarning
        >
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
              className={"object-contain min-w-8"}
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
                suppressHydrationWarning
              >
                <i
                  aria-hidden="true"
                  className="sr-only"
                  suppressHydrationWarning
                >
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
                <span>{domain}</span>
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

export const DISCORD_CONFIG = {
  title: "Discord",
  description: "View Discord preview here.",
  content: DiscordPreview,
} as const;
