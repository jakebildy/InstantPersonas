import { OGPreviewMetadata } from "../social-share-tool";
import Image from "next/image";

export function IMessagePreview({
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
    <div className="flex flex-col p-4 md:px-5">
      <div className="text-base-500 mb-2 text-sm">iMessage</div>
      <div className="text-base-500 mb-3 text-xs">Today {formattedTime}</div>
      <div className="mb-3 ml-auto rounded-2xl bg-blue-500 px-4 py-2 text-sm text-white">
        <span>Check out this website!</span>
      </div>
      <div className="flex max-w-full flex-col overflow-hidden rounded-2xl border">
        <div className="relative aspect-[1200/600] w-full">
          {image ? (
            <Image
              src={image ?? "/tools/no-image-placeholder.svg"}
              alt="OG Image"
              className={image ? "" : "object-cover"}
              fill={true}
            />
          ) : null}
        </div>

        <div className="flex items-center space-x-4 bg-white p-4">
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="truncate text-sm font-medium">{title}</p>
            <p className="text-base-500 truncate text-xs text-gray-400">
              {url}
            </p>
          </div>
        </div>
      </div>
      <div className="text-base-500 mt-3 text-xs">Delivered</div>
    </div>
  );
}

export const IMESSAGE_CONFIG = {
  title: "iMessage",
  description: "View iMessage preview here.",
  content: IMessagePreview,
} as const;
