import { PersonStandingIcon } from "lucide-react";
import { gradientVariants } from "@/components/variants";

export type ConfirmKnowledgeCardProps = {
  business: string;
  targetProblem: string;
};

export function ConfirmKnowledgeCard({
  business,
  targetProblem,
}: ConfirmKnowledgeCardProps) {
  return (
    <div className="relative z-0 grid h-full w-full rounded-xl border bg-background shadow-md">
      <div className="flex gap-2 border-b p-4">
        <PersonStandingIcon className="text-muted-foreground" />
        <span className="font-bold">Confirm Knowledge</span>
      </div>

      <div className="m-2 flex flex-col gap-2 rounded-lg p-4">
        <div
          className={gradientVariants({
            variant: "purple",
            className:
              "m-2 mb-4 flex flex-col gap-1 overflow-auto rounded-lg p-4",
          })}
        >
          <span className="font-semibold text-black/75">Business</span>
          <span className="text-sm font-medium">{business}</span>
        </div>
        <div
          className={gradientVariants({
            variant: "yellow",
            className:
              "m-2 mb-4 flex flex-col gap-1 overflow-auto rounded-lg p-4",
          })}
        >
          <span className="font-semibold text-black/75">Target Problem</span>
          <span className="text-sm font-medium">{targetProblem}</span>
        </div>
      </div>
    </div>
  );
}
