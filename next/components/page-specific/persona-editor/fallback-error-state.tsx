"use client";
import { GradientButton } from "@/components/ui/gradient-button";
import {
  ColorVariant,
  gradientVariants,
  ColorVariantMap,
} from "@/components/variants";
import { SLACK_INVITE_LINK } from "@/lib/site";
import {
  Link,
  PersonStandingIcon,
  RefreshCwIcon,
  SlackIcon,
} from "lucide-react";
import { HTMLAttributes } from "react";
import { useErrorBoundary } from "react-error-boundary";
import BarLoader from "react-spinners/BarLoader";

type props = HTMLAttributes<HTMLDivElement>;

export function EditorFallbackErrorState({
  className,
  variant = "red",
  reason = "Looks like there was an unexpected error when saving the persona.",
  ...Props
}: props & {
  variant?: ColorVariant;
  reason?: string;
}) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="size-full p-4">
      <div
        className={gradientVariants({
          variant: variant,
          className:
            "relative grid h-full w-full grid-cols-3 place-items-center gap-4 overflow-hidden rounded-xl p-4 backdrop-blur-[100px]",
        })}
        {...Props}
      >
        <div />
        <div className="flex h-3/4 flex-col items-center justify-between">
          <PersonStandingIcon className="size-10 text-black opacity-75" />
          <div className="flex flex-col gap-1 text-center">
            <p>Uh oh! Something went wrong.</p>
            <h1 className="text-4xl font-bold">InstantPersonas</h1>
            <p className="text-sm">{reason}</p>
            <div className="flex flex-col gap-1 pt-10 text-left">
              <div className="flex items-center justify-between gap-2">
                <GradientButton
                  variant="purple"
                  className="z-10 mx-auto h-[50px] justify-center"
                  Icon={RefreshCwIcon}
                  onClick={resetBoundary}
                >
                  Reset Editor
                </GradientButton>

                <GradientButton
                  variant="green"
                  className="z-10 mx-auto h-[50px] justify-center"
                  Icon={SlackIcon}
                >
                  <Link href={SLACK_INVITE_LINK}>Let us know in Slack</Link>
                </GradientButton>
              </div>
            </div>
          </div>
          <BarLoader
            color={ColorVariantMap[variant]}
            height={10}
            width={500}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
