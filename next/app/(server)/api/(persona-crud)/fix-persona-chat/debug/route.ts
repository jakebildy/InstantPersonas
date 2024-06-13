import {
  PersonaChatType,
  PersonaChatTypeValidator,
} from "@/app/(server)/models/personachat.model";
import { isEqual } from "lodash";
import { unValidated_getPersonaChat } from "../../get-persona-chat/action";
import { fixPersonaChatMessageHistoryModel } from "../fix-messages";
import { fixPersonaArchetype } from "../fix-persona-archetype";
import { fixPersonaChatHistory } from "../fix-persona-chat-history";
import { BROKEN_CHAT } from "./test-history";

export async function GET(req: Request) {
  // a user can only get their own persona chats, filter by the provided userID in the request

  const test = {
    archetype_name: "Entrepreneur Emma",
    picture_components: {
      clothing: "button_up",
      glasses: "none",
      hair: "ponytail",
    },
    persona_components: {
      Motivations:
        "Driven to scale her business, seeks efficient and scalable solutions.",
      Painpoints:
        "Limited resources, needs cost-effective yet powerful tools, difficulty in automation of tasks.",
      Preferences_and_Needs:
        "Values customizable solutions that can grow with her business, strong customer support.",
      End_Goal: "To achieve business growth while maintaining lean operations.",
      Mindset_and_Perspective:
        "Cost-conscious but values investment in crucial areas.",
    },
    insights: {
      Enhanced_Interaction_Patterns:
        "Prefers rapid communication channels like chat and email, uses social media for business tips and networking.",
      Strategic_Recommendings:
        "Develop more scalable package options, enhance direct support channels, offer entrepreneurial resources and webinars.",
    },
    pictureURL:
      "https://api.dicebear.com/8.x/notionists/svg?body=variant21&hair=variant39&backgroundColor=c2e4bc",
  };

  // const fixedPersona = fixPersonaArchetype(test);

  const fixedChat = await fixPersonaChatHistory([BROKEN_CHAT]);

  return Response.json({
    fixedChat,
  });

  // const url = new URL(req.url);

  // const id = url.searchParams.get("id");

  // if (!id) throw "Chat ID is not defined";
  // // Get MongoDB PersonaChats where user matches the provided userID

  // const chat = await unValidated_getPersonaChat(id);

  // const chatHasPersonas = chat?.aiState?.personas?.length > 0;
  // const fixedMessage = await fixPersonaChatMessageHistoryModel({
  //   messages: chat.aiState?.messages ?? [],
  //   fixedPersonas: chatHasPersonas
  //     ? chat.aiState.personas
  //         .map((persona: any) => fixPersonaArchetype(persona) ?? undefined)
  //         .filter((persona) => persona !== undefined)
  //     : undefined,
  // });
  // const fixedChatHistory: PersonaChatType = {
  //   ...chat,
  //   aiState: {
  //     ...chat.aiState,
  //     messages: fixedMessage.messages,
  //     chatId: chat._id ?? id,
  //   },
  // };
  // const parseResult = PersonaChatTypeValidator.safeParse(fixedChatHistory);

  // if (parseResult.success) {
  //   if (!isEqual(chat, parseResult.data)) {
  //     return Response.json({
  //       before: chat,
  //       fix: parseResult.data,
  //     });
  //   }
  //   return fixedChatHistory as PersonaChatType;
  // } else {
  //   return Response.json({
  //     error: parseResult.error,
  //     data: chat,
  //   });
  // }
}
