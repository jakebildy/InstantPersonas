import { cn } from "@/lib/utils";
import Image from "next/image";
import BarLoader from "react-spinners/BarLoader";

export const AssistantMessageLoading = () => {
  return (
    <div className={cn("flex gap-2")}>
      {/* 32px + 16px = 48px ~ image width + gap */}
      <div className="flex items-center h-full w-[calc(32px+16px)]">
        <Image
          src={"/instant_personas_logo.png"}
          alt={"Instant Personas Logo"}
          width={32}
          height={28}
          priority
          className={cn("object-contain")}
        />
      </div>

      <div className="flex items-center bg-gray-200 p-2 px-4 rounded-lg text-sm whitespace-pre-wrap">
        <BarLoader color="#36d7b7" />
      </div>
    </div>
  );
};
