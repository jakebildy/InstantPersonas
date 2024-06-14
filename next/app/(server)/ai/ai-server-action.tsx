import "server-only";

import { initMongoDB } from "@/app/(server)/mongodb";
import { PERSONA_CHAT_AI } from "./persona-chat-ai";

initMongoDB();

export const maxDuration = 300;

export const AI = PERSONA_CHAT_AI;
