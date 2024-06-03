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
    <div className="grid w-full h-full rounded-xl border relative shadow-md bg-background z-0">
      <div className="flex gap-2 border-b p-4">
        <PersonStandingIcon className="text-muted-foreground" />
        <span className="font-bold">Confirm Knowledge</span>
      </div>

      <div className="flex flex-col gap-2 p-4 rounded-lg m-2">
        <div
          className={gradientVariants({
            variant: "purple",
            className:
              "flex flex-col gap-1 mb-4 p-4 overflow-auto rounded-lg m-2",
          })}
        >
          <span className="text-black/75 font-semibold">Business</span>
          <span className="text-sm font-medium">{business}</span>
        </div>
        <div
          className={gradientVariants({
            variant: "yellow",
            className:
              "flex flex-col gap-1 mb-4 p-4 overflow-auto rounded-lg m-2",
          })}
        >
          <span className="text-black/75 font-semibold">Target Problem</span>
          <span className="text-sm font-medium">{targetProblem}</span>
        </div>
      </div>
    </div>
  );
}
