import { ExtractField } from "@/lib/types";
import { CoreMessage } from "ai";
import { ReactNode } from "react";
import { SystemErrorMessage } from "./system/system-error-message";
import { AssistantMessageLoading } from "./assistant/message-loading-state";
import { AssistantMessage } from "./assistant/assistant-message";
import { UserMessage } from "./user/user-message";
import { ConfirmKnowledgeCard } from "./assistant/tool-responses/persona-chat/confirm_business_knowledge/confirm-knowledge-card";
import { PersonaAvatarPopover } from "../../../persona-archetype-generic/persona-avatar-popover";
import { InlinePersonaArchetypeList } from "./assistant/tool-responses/persona-chat/create_persona/inline-persona-archetype-list";
import { PersonaChangeDiffCard } from "./assistant/tool-responses/persona-chat/update_persona/persona-change-diff-card";
import { PersonaChangeDiffCardWithWidth } from "./assistant/tool-responses/persona-chat/update_persona/change-card-with-width";
import { VideoContentList } from "./assistant/tool-responses/persona-chat/persona_content_consumption/video-content";
import { ConfirmKnowledgeCardWithMessage } from "./assistant/tool-responses/persona-chat/confirm_business_knowledge/confirm-knowledge-card-with-message";

type AIMessageRoles = ExtractField<CoreMessage, "role">;

type ReactNodeFunction = (props: unknown) => ReactNode;
type ReactNodeMap = { [key: string]: ReactNodeFunction };
type NestedReactNodeMap = { [key: string]: ReactNodeMap | ReactNodeFunction };

/**
 * Use this type to ensure type saftey when defining a map of UI components for different AI message roles. Then cast as const.
 * A map of UI components for different AI message roles.
 *
 * - For the `"tool"` role, the value can be either a `NestedReactNodeMap` or a simple `ReactNodeMap`.
 *    - *This enables easy intuitive access to a tool's multi-step UI components.*
 *
 * - For other roles, the value is a simple `ReactNodeMap`.
 */ type AIComponentUIMap = {
  [key in AIMessageRoles]: key extends "tool"
    ? NestedReactNodeMap
    : ReactNodeMap;
};

export const PERSONA_CHAT_AI_COMPONENT_MAP = {
  user: {
    message: UserMessage,
  },
  system: {
    error: SystemErrorMessage,
  },
  assistant: {
    loading: AssistantMessageLoading,
    message: AssistantMessage,
  },
  tool: {
    confirm_business_knowledge: ConfirmKnowledgeCardWithMessage,
    create_persona: InlinePersonaArchetypeList,
    update_persona: PersonaChangeDiffCardWithWidth,
    persona_content_consumption: VideoContentList,
  },
} as const;
