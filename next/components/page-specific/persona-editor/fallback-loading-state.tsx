import {
  ColorVariant,
  gradientVariants,
  ColorVariantMap,
} from "@/components/variants";
import { PersonStandingIcon } from "lucide-react";
import { HTMLAttributes } from "react";
import BarLoader from "react-spinners/BarLoader";

type props = HTMLAttributes<HTMLDivElement>;

export function EditorFallbackState({
  className,
  variant = "green",
  reason = "This should only take a few seconds",
  ...Props
}: props & {
  variant?: ColorVariant;
  reason?: string;
}) {
  return (
    <div
      className={gradientVariants({
        variant: variant,
        className:
          "relative grid h-full w-full grid-cols-3 place-items-center gap-4 overflow-hidden p-4 backdrop-blur-[100px]",
      })}
      {...Props}
    >
      <div />
      <div className="flex h-3/4 flex-col items-center justify-between">
        <PersonStandingIcon className="size-10 text-black opacity-75" />
        <div className="flex flex-col gap-1 text-center">
          <p>Loading Editor...</p>
          <h1 className="text-4xl font-bold">InstantPersonas</h1>
          <p className="text-sm">{reason}</p>
        </div>
        <BarLoader
          color={ColorVariantMap[variant]}
          height={10}
          width={500}
          className="rounded-full"
        />
      </div>
    </div>
  );
}
