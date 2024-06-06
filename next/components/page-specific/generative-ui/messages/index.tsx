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
import { SystemDevInfo } from "./system/system-dev-info";
import { create, update } from "lodash";
import { z } from "zod";
import { PersonaArchetypeValidator } from "@/app/(server)/models/persona-ai.model";
import { extractKeysFromZodSchema } from "@/lib/utils";

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
    dev_info: SystemDevInfo,
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

const confirmKnowledgeCardWithMessagePropValidator = z.object({
  knowledge: z.object({
    business: z.string(),
    targetProblem: z.string().optional(),
  }),
  message: z.string().optional(),
});
export const inlinePersonaArchetypeListPropValidator = z.array(
  PersonaArchetypeValidator
);

export const personaChangeDiffCardPropValidator = z.object({
  origin_archetype: PersonaArchetypeValidator,
  updated_archetype: PersonaArchetypeValidator,
  personaIndex: z.number(),
});

export const videoContentListPropValidator = z.array(z.string());

//? Used in `fix-messages.tsx` to update legacy messages to the new format.
//! If not updated chat functionality can break for legacy chat history
export const PERSONA_CHAT_AI_TOOL_ARG_VALIDATORS = {
  confirm_business_knowledge: confirmKnowledgeCardWithMessagePropValidator,
  create_persona: inlinePersonaArchetypeListPropValidator,
  update_persona: personaChangeDiffCardPropValidator,
  persona_content_consumption: videoContentListPropValidator,
};

export const PERSONA_CHAT_AI_TOOL_ARGS = Object.entries(
  PERSONA_CHAT_AI_TOOL_ARG_VALIDATORS
).map(([key, validator]) => {
  const props = extractKeysFromZodSchema(validator);
  return { key, props };
});

export const PERSONA_CHAT_AI_TOOL_ARGS_UNIQUE_DESTRUCTURED =
  PERSONA_CHAT_AI_TOOL_ARGS.map(({ key, props }) => {
    return { [key]: [...new Set(props.flatMap((prop) => prop.split(".")))] };
  }).reduce((acc, current) => {
    return { ...acc, ...current };
  }, {});
