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
  message = "",
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <span className="mt-2">{message}</span>

      <div className="w-[600px]">
        <ConfirmKnowledgeCard {...knowledge} />
      </div>
    </div>
  );
}
