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
        "text-xl font-bold text-black font-jost",
        isCollapsed
          ? "inline-flex items-center justify-center whitespace-nowrap rounded-md"
          : "flex-1 text-xl font-semibold leading-6",
        className
      )}
    >
      <Link href={"/"} className="flex items-center text-left">
        <Image
          src={"/instant_personas_logo.png"}
          alt={"Instant Personas Logo"}
          width={32}
          height={28}
          priority
          className={cn("object-contain", isCollapsed ? "" : "mr-2")}
        />
        <h1 className={cn(isCollapsed ? "hidden" : "inline-block")}>
          Instant Personas
        </h1>
      </Link>
    </div>
  );
};
