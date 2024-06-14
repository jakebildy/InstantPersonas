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
        className="relative mb-2 ml-4 mr-[14px] mt-6 flex h-[1px] w-full select-none items-center justify-center border-t border-gray-300/20"
        role="separator"
        aria-label={formattedDate}
        suppressHydrationWarning
      >
        <span
          className="mt-[-1px] select-none text-xs text-gray-500"
          suppressHydrationWarning
        >
          {formattedDate}
        </span>
      </div>
      {/* Message */}
      <div className="relative mt-4 min-h-11 py-0.5 pl-[72px] pr-12">
        <div className="static ml-0 pl-0 indent-0" id="message">
          <div
            className="absolute left-4 top-[calc(4px-0.125rem)] flex size-10 items-center rounded-full"
            aria-hidden="true"
          >
            <Image
              src={"/instant_personas_logo.png"}
              alt={"Instant Personas Logo"}
              width={40}
              height={40}
              priority
              className={"min-w-8 object-contain"}
            />
          </div>

          <h3 className="flex min-h-[22px] items-center gap-2">
            <span
              aria-expanded="false"
              role="button"
              tabIndex={0}
              className="text-base font-semibold leading-5 text-green-500"
            >
              InstantPersonas
            </span>

            <span className="truncate text-xs leading-5 text-gray-500">
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
          <div className="-ml-[72px] overflow-hidden whitespace-break-spaces text-wrap pl-[72px] text-left text-base">
            <span className="hover:underline-blue-800 cursor-pointer text-blue-500 hover:underline">
              {url}
            </span>
          </div>
        </div>
        <div
          className="grid h-fit grid-flow-row overflow-hidden py-0.5"
          id="embed-container"
        >
          <article
            className="grid max-w-[432px] self-start justify-self-auto rounded-sm border-l-4 border-pastel-blue/90 bg-pastel-blue/50"
            id="embed"
          >
            <div className="grid overflow-hidden py-4 pl-2 pr-3">
              <div
                id={"provider"}
                className="col-span-1 min-w-0 text-xs text-gray-500 empty:opacity-0"
              >
                <span>{domain}</span>
              </div>
              <div
                id={"title"}
                className="col-span-1 mt-1 min-w-0 text-base font-semibold text-blue-500 empty:opacity-0"
              >
                <span>{title}</span>
              </div>
              <div
                id={"description"}
                className="col-span-1 mt-1 min-w-0 text-sm text-gray-500 empty:opacity-0"
              >
                <span>{description}</span>
              </div>
              <div
                id={"image-container"}
                className="col-span-1 mt-4 flex min-w-0 flex-col rounded-sm object-fill contain-paint"
              >
                <div className="flex h-full w-full flex-auto flex-row">
                  <div className="relative aspect-[400/209] w-full max-w-[400px] cursor-pointer overflow-hidden rounded-sm">
                    <Image
                      src={image ?? "/tools/no-image-placeholder.svg"}
                      alt="OG Image"
                      className={image ? "" : "object-cover"}
                      fill={true}
                    />
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
