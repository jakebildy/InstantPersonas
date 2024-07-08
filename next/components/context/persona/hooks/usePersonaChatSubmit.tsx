"use client";
import { ClientMessage } from "@/app/(server)/models/persona-ai.model";
import { IS_TEST_DEV_ENV, nanoid } from "@/lib/utils";
import { SystemErrorMessage } from "@/components/page-specific/generative-ui/messages/system/system-error-message";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserMessage } from "@/components/page-specific/generative-ui/messages/user/user-message";
import { AssistantMessage } from "@/components/page-specific/generative-ui/messages/assistant/assistant-message";
import { useCallback } from "react";
import { InstantPersonasUser } from "../../auth/user-context.types";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "@/app/(server)/ai/ai-server-action";
import { useInstantPersonasUser } from "../../auth/user-context";

// Type definitions for props
interface UsePersonaChatSubmitProps {
  chatId: string | null;
  setSuggestedMessages: (messages: any[]) => void;
}

//? Function to create a system error message
const createSystemErrorMessage = (message: JSX.Element): ClientMessage => ({
  id: nanoid(),
  role: "assistant",
  display: <SystemErrorMessage message={message} />,
});

//? Function to create an assistant message
const createAssistantMessage = (message: string): ClientMessage => ({
  id: nanoid(),
  role: "assistant",
  display: <AssistantMessage message={message} />,
});

//? Function to create a user message
const createUserMessage = (message: string): ClientMessage => ({
  id: nanoid(),
  role: "user",
  display: <UserMessage message={message} />,
});

const usePersonaChatSubmit = ({
  chatId,
  setSuggestedMessages,
}: UsePersonaChatSubmitProps) => {
  const { submitPersonaChatUserMessage } = useActions<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();
  const { isSubscribed, user } = useInstantPersonasUser();

  //? Function to handle No subscription error
  const handleSubscriptionError = useCallback(
    (
      setMessages: (
        updateFn: (messages: ClientMessage[]) => ClientMessage[],
      ) => void,
    ) => {
      setMessages((currentMessages: ClientMessage[]) => [
        ...currentMessages,
        createSystemErrorMessage(
          <div className="flex w-full flex-col gap-2">
            <span>
              Oops! It seems you haven&apos;t subscribed yet. To continue,
              please explore our subscription plans.
            </span>
            <Button variant={"outline"} size={"sm"} asChild>
              <Link href="/subscription">View Subscription Plans</Link>
            </Button>
          </div>,
        ),
      ]);
    },
    [],
  );

  //? Function to handle empty message error
  const handleEmptyMessageError = useCallback(
    (
      setMessages: (
        updateFn: (messages: ClientMessage[]) => ClientMessage[],
      ) => void,
    ) => {
      setMessages((currentMessages: ClientMessage[]) => [
        ...currentMessages,
        createAssistantMessage(
          "It appears your message was submitted without content. Please type your message and submit again.",
        ),
      ]);
    },
    [],
  );

  //? Function to handle valid user message
  const handleValidMessage = useCallback(
    async (
      message: string,
      user: InstantPersonasUser | null,
      chatId: string | null,
      setMessages: (
        updateFn: (messages: ClientMessage[]) => ClientMessage[],
      ) => void,
      setSuggestedMessages: (messages: any[]) => void,
    ) => {
      setMessages((currentMessages: ClientMessage[]) => [
        ...currentMessages,
        createUserMessage(message),
      ]);

      // Clear suggested messages
      setSuggestedMessages([]);

      // Submit and get response message
      if (user && chatId) {
        const responseMessage = (await submitPersonaChatUserMessage(
          message,
          user.id,
          chatId,
        )) as ClientMessage;
        setMessages((currentMessages: ClientMessage[]) => [
          ...currentMessages,
          responseMessage,
        ]);
      } else {
        setMessages((currentMessages: ClientMessage[]) => [
          ...currentMessages,
          createSystemErrorMessage(
            <div className="flex w-full flex-col gap-2">
              <span>
                Looks like your session is no longer valid, please log in again!
              </span>
              <Button variant={"outline"} size={"sm"} asChild>
                <Link href="/login">Log in</Link>
              </Button>
            </div>,
          ),
        ]);
      }
    },
    [],
  );

  //? Main submit function to Persona Chat AI
  const handleSubmit = useCallback(
    async (message?: string | null) => {
      const messageIsUndefined = !message || message === null || message === "";

      if (!isSubscribed && !IS_TEST_DEV_ENV) {
        handleSubscriptionError(setMessages);
      } else if (messageIsUndefined) {
        handleEmptyMessageError(setMessages);
      } else {
        await handleValidMessage(
          message,
          user,
          chatId,
          setMessages,
          setSuggestedMessages,
        );
      }
    },
    [
      isSubscribed,
      user,
      chatId,
      setMessages,
      setSuggestedMessages,
      handleSubscriptionError,
      handleEmptyMessageError,
      handleValidMessage,
    ],
  );

  return { handleSubmit };
};

export default usePersonaChatSubmit;
