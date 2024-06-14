import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  isCollapsed?: boolean;
  className?: string;
};

export const InstantPersonas = ({ isCollapsed, className }: Props) => {
  return (
    <div
      className={cn(
        "font-jost text-xl font-bold text-black",
        isCollapsed
          ? "inline-flex items-center justify-center whitespace-nowrap rounded-md"
          : "flex-1 text-xl font-semibold leading-6",
        className,
      )}
    >
      <Link href={"/"} className="flex items-center text-left">
        <div className={cn("h-[32px] w-[32px]", isCollapsed ? "" : "mr-2")}>
          <Image
            src={"/instant_personas_logo.png"}
            alt={"Instant Personas Logo"}
            width={100}
            height={100}
            priority
            className={cn("object-contain", isCollapsed ? "" : "mr-2")}
          />
        </div>
        <h1 className={cn(isCollapsed ? "hidden" : "inline-block")}>
          InstantPersonas
        </h1>
      </Link>
    </div>
  );
};
