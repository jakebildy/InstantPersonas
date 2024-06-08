import { OGPreviewMetadata } from "../social-share-tool";
import Image from "next/image";

export function PinterestPreview({
  url,
  title,
  description,
  image,
}: OGPreviewMetadata) {
  return (
    <div className="grid grid-cols-5 gap-2 p-4">
      <div className="col-span-1 flex flex-col gap-2">
        <div className="h-80 w-full rounded-md bg-pastel-blue/50" />
        <div className="h-40 w-full rounded-md bg-pastel-blue/50" />
        <div className="h-20 w-full rounded-md bg-pastel-blue/50" />
      </div>
      <div className="col-span-3 flex flex-col gap-2">
        <div className="h-40 w-full rounded-md bg-pastel-blue/50" />
        <div>
          <div className="relative aspect-[2/1] w-full cursor-pointer overflow-hidden rounded-md bg-pastel-blue/50">
            <Image
              src={image ?? "/tools/no-image-placeholder.svg"}
              alt="OG Image"
              className={image ? "" : "object-cover"}
              fill={true}
            />
          </div>
          <div className="px-[6px] pb-1 pt-2">
            <div className="mb-2 flex cursor-zoom-in flex-col overflow-hidden">
              <span className="truncate text-xs font-semibold">{title}</span>
              <span className="max-h-5 truncate text-[10px] leading-[10px]">
                {url}
              </span>
            </div>
            <div className="item-center group -mx-[3px] flex max-h-6 cursor-pointer flex-row">
              <div
                className="mx-[3px] flex size-6 items-center rounded-full"
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
                <span className="mx-0.5 max-h-5 text-[10px] leading-[10px] group-hover:underline">
                  InstantPersonas
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex-1 rounded-md bg-pastel-blue/50" />
      </div>
      <div className="col-span-1 flex flex-col gap-2">
        <div className="h-40 w-full rounded-md bg-pastel-blue/50" />
        <div className="h-20 w-full rounded-md bg-pastel-blue/50" />
        <div className="h-80 w-full rounded-md bg-pastel-blue/50" />
      </div>
    </div>
  );
}

export const PINTEREST_CONFIG = {
  title: "Pinterest",
  description: "View Pinterest preview here.",
  content: PinterestPreview,
} as const;
