import ConfirmKnowledgeCard from "@/components/page-specific/generative-ui/messages/assistant/tool-responses/confirm_business_knowledge/confirm-knowledge-card";

import posthog from "posthog-js";
import { AIState, AIStateValidator } from "../models/persona-ai.model";
import {
  mapUrlBackgroundColorParamToVariant,
  PersonaAvatarPopover,
} from "@/components/page-specific/generative-ui/messages/assistant/tool-responses/create_persona/persona-avatar-popover";
import { PersonaChangeDiffCard } from "@/components/page-specific/generative-ui/messages/assistant/tool-responses/update_persona/persona-change-diff-card";
import { UserMessage } from "@/components/page-specific/generative-ui/messages/user/user-message";
import { AssistantMessage } from "@/components/page-specific/generative-ui/messages/assistant/assistant-message";

export const getUIStateFromAIState = (aiState: AIState) => {
  const result = AIStateValidator.safeParse(aiState);

  if (result.success) {
    return aiState.messages
      .filter((message) => message.role !== "system")
      .map((message, index) => ({
        id: `${aiState.chatId}-${index}`,
        display:
          message.role === "function" ? (
            message.name === "confirm_business_knowledge" ? (
              <div>
                Does this cover the business and target problem or is something
                missing?
                <br></br>
                <div className="w-[600px]">
                  <ConfirmKnowledgeCard {...JSON.parse(message.content)} />
                </div>
              </div>
            ) : message.name === "create_persona" ? (
              <div className="flex flex-row">
                {...JSON.parse(message.content).map(
                  (archetype: any, i: number) => {
                    const variant = mapUrlBackgroundColorParamToVariant({
                      url: archetype.pictureURL,
                    });
                    return (
                      <PersonaAvatarPopover
                        key={i}
                        {...{ archetype: archetype, variant: variant }}
                      />
                    );
                  }
                )}
              </div>
            ) : message.name === "update_persona" ? (
              <div className="w-[600px]">
                <PersonaChangeDiffCard
                  origin_archetype={
                    JSON.parse(message.content).origin_archetype
                  }
                  updated_archetype={
                    JSON.parse(message.content).updated_archetype
                  }
                  personaIndex={JSON.parse(message.content).index}
                />
              </div>
            ) : message.name === "persona_content_consumption" ? (
              <div className="flex flex-row flex-wrap">
                {JSON.parse(message.content).map((url: string) => {
                  return (
                    <iframe
                      key={url}
                      width="200"
                      height="344"
                      className="p-2"
                      src={url}
                      frameBorder="0"
                      allow="accelerometer; autoplay: false; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  );
                })}
              </div>
            ) : null
          ) : message.role === "user" ? (
            <UserMessage message={message.content} />
          ) : (
            <AssistantMessage message={message.content} />
          ),
      }));
  } else {
    posthog.capture("error", {
      error: result.error,
    });
    return [];
  }
};
