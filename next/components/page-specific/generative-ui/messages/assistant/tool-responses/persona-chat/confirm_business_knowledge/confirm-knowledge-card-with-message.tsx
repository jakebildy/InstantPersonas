import { PersonStandingIcon } from "lucide-react";
import { gradientVariants } from "@/components/variants";
import {
  ConfirmKnowledgeCard,
  ConfirmKnowledgeCardProps,
} from "./confirm-knowledge-card";

type Props = {
  knowledge: ConfirmKnowledgeCardProps;
  message?: string;
};

export function ConfirmKnowledgeCardWithMessage({
  knowledge,
  message = " Does this cover the business and target problem or is something missing?",
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      {message}
      <div className="w-[600px]">
        <ConfirmKnowledgeCard {...knowledge} />
      </div>
    </div>
  );
}
