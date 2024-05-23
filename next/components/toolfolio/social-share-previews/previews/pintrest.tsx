import { OGPreviewMetadata } from "../social-share-tool";
import Image from "next/image";

export function PintrestPreview({
  url,
  title,
  description,
  image,
}: OGPreviewMetadata) {
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

export const PINTREST_CONFIG = {
  title: "Pintrest",
  description: "View Pintrest preview here.",
  content: PintrestPreview,
} as const;
