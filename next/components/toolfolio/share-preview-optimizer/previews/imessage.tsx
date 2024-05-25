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
    <div className="p-4 flex flex-col md:px-5">
      <div className="mb-2 text-sm text-base-500">iMessage</div>
      <div className="mb-3 text-xs text-base-500">Today {formattedTime}</div>
      <div className="ml-auto px-4 py-2 mb-3 text-sm text-white bg-blue-500 rounded-2xl">
        <span>Check out this website!</span>
      </div>
      <div className="flex flex-col border rounded-2xl overflow-hidden max-w-full">
        <div className="relative w-full  aspect-[1200/600]">
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

export const IMESSAGE_CONFIG = {
  title: "iMessage",
  description: "View iMessage preview here.",
  content: IMessagePreview,
} as const;
