"use client";
import { usePersonaChatHistory } from "@/components/context/persona/history-context";
import GradientScroll from "./gradient-scroll";
import { PersonaChatType } from "@/app/(server)/models/personachat.model";
import { cn, timeAgo } from "@/lib/utils";
import { gradientVariants } from "@/components/variants";
import {
  ArrowLeft,
  BanIcon,
  EditIcon,
  Loader,
  LucideIcon,
  PersonStandingIcon,
  SaveIcon,
} from "lucide-react";
import {
  ArrowTopRightIcon,
  CalendarIcon,
  ChatBubbleIcon,
  MagicWandIcon,
  StopwatchIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

import Link from "next/link";
import { PersonaBadge } from "@/components/persona-archetype-generic/persona-badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { use, useEffect, useState } from "react";
import { PopupSection } from "@/components/popups/template/popup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GradientButton } from "@/components/ui/gradient-button";
import { IconCloudUpload } from "@tabler/icons-react";
import api from "@/service/api.service";
import { revalidatePath } from "next/cache";
import { set } from "lodash";

type Props = {};

export default function ChatHistory({}: Props) {
  const { history, loading, error } = usePersonaChatHistory();

  if (loading || !history || !history[0]?.aiState) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full min-h-[600px] flex-1 flex-col">
      <GradientScroll>
        <div className="flex flex-col gap-2 overflow-hidden p-4 font-mono text-sm">
          {history.map((chat, i) => (
            <ChatGroup chat={chat} key={i} index={i + 1} />
          ))}
        </div>
      </GradientScroll>
    </div>
  );
}

function ChatGroup({ chat, index }: { chat: PersonaChatType; index: number }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteState, setDeleteState] = useState<
    "idle" | "active" | "confirmed"
  >("idle");
  const [deleteTimer, setDeleteTimer] = useState<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (chat._id) {
      if (deleteState === "confirmed") {
        api.userPersona.deletePersonaChat(chat._id); // Delete chat when confirmed
        if (timer) clearInterval(timer); // Clear the interval to stop the countdown
      } else if (deleteState === "active") {
        setCountdown(5); // Initialize countdown to 5 seconds
        timer = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown && prevCountdown > 1) {
              return prevCountdown - 1; // Decrement countdown
            } else {
              if (timer) clearInterval(timer); // Stop countdown when it reaches 0
              setDeleteState("idle"); // Reset delete state to idle
              return null;
            }
          });
        }, 1000); // Interval of 1 second
        setDeleteTimer(timer);
      }
    }

    // Cleanup interval on component unmount or when dependencies change
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [chat._id, deleteState]);

  if (!chat.aiState.personas || !chat._id) return null;

  return (
    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
      <div
        role="link"
        onClick={() => router.push(`/persona/${chat._id}`)}
        className={cn(
          "group flex flex-col gap-2 overflow-hidden rounded-xl border border-dashed border-black/10 bg-white/75 font-jost shadow-sm transition-all duration-500 ease-out hover:scale-[102%] hover:bg-white hover:shadow-xl",
        )}
      >
        <div className="relative flex w-full flex-1 flex-col gap-1 p-2">
          <div className="flex items-start justify-between gap-2 max-sm:flex-col">
            <button
              className="flex w-full items-center gap-2 font-semibold"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setEditDialogOpen(true);
              }}
              tabIndex={0}
            >
              <div className="grid size-6 place-items-center rounded-full border border-black/10 bg-white/50 max-sm:hidden">
                <span className="text-xs">{index}</span>
              </div>
              <span>{chat.aiState.threadMetadata?.title ?? "New Chat"}</span>

              <div
                className={cn(
                  "z-[60] flex h-6 min-w-0 items-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r p-1 px-2 text-xs shadow-sm transition-all duration-300 ease-out hover:-translate-x-2 hover:scale-105 hover:px-4 hover:shadow-md",
                  "translate-x-2 opacity-0 delay-100 group-hover:translate-x-0 group-hover:opacity-100",
                )}
              >
                <span className="sr-only">Edit Chat Title</span>
                <EditIcon className="size-3" />
              </div>
            </button>
            <span className="whitespace-pre-wrap text-wrap text-xs sm:text-right">
              {chat.aiState.threadMetadata?.description ?? "Start Conversing"}
            </span>
          </div>
          <div className="flex items-start justify-between gap-2 pt-2 max-md:flex-col">
            <div className="flex flex-wrap gap-1 md:ml-8 md:min-w-96">
              {chat.aiState.personas.length > 0 ? (
                chat.aiState.personas.map((persona, i) => (
                  <PersonaBadge archetype={persona} key={i} />
                ))
              ) : (
                <button
                  tabIndex={0}
                  className={gradientVariants({
                    variant: "purple",
                    className:
                      "flex h-6 min-w-0 items-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r p-1 px-2 text-xs shadow-sm transition-all duration-300 ease-out hover:-translate-x-2 hover:scale-105 hover:px-4 hover:shadow-md",
                  })}
                >
                  <span>Start Generating Personas</span>
                  <MagicWandIcon className="size-3" />
                </button>
              )}
            </div>
            <div
              className={
                "mt-1 flex w-fit items-center justify-between gap-1 rounded-2xl bg-gray-400/10 py-1 pl-1 pr-2"
              }
            >
              <PersonStandingIcon className="size-4" />
              <span className="text-xs">{chat.aiState.personas.length}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-2 border-t border-dashed border-black/10 p-2 max-md:flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 px-2 text-xs">
              <ChatBubbleIcon className="size-3" />
              <span className="min-w-0 whitespace-nowrap">{`${chat.aiState.messages.length} Messages`}</span>
            </div>
            {chat.createdAt ? (
              <div className="flex items-center gap-2 px-2 text-xs">
                <CalendarIcon className="size-3" />
                <span className="min-w-0 whitespace-nowrap">{`Created ${timeAgo(new Date(chat.createdAt))}`}</span>
              </div>
            ) : null}
            {chat.updatedAt ? (
              <div className="flex items-center gap-2 px-2 text-xs">
                <StopwatchIcon className="size-3" />
                <span className="min-w-0 whitespace-nowrap">{`Last Updated ${timeAgo(new Date(chat.updatedAt))}`}</span>
              </div>
            ) : null}
          </div>

          <div className="flex min-w-[225px] flex-wrap items-center justify-end gap-2">
            <button
              tabIndex={0}
              className={gradientVariants({
                variant: "red",
                className: cn(
                  "z-20 flex h-6 min-w-0 items-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r p-1 px-2 text-xs shadow-sm transition-all duration-300 ease-out hover:-translate-x-2 hover:scale-105 hover:px-4 hover:shadow-md",
                  "translate-x-2 translate-y-6 opacity-0 delay-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100",
                ),
              })}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (deleteState === "confirmed") return;
                if (deleteState === "active") {
                  setDeleteState("confirmed");
                } else {
                  setDeleteState("active");
                }
              }}
            >
              <span>
                {deleteState === "confirmed"
                  ? "Deleting..."
                  : deleteState === "active"
                    ? `Click to Confirm - ${countdown}s`
                    : "Delete Chat"}
              </span>{" "}
              <TrashIcon className="size-3" />
            </button>
            <button
              tabIndex={0}
              className={gradientVariants({
                variant: "blue",
                className:
                  "flex h-6 min-w-0 items-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r p-1 px-2 text-xs shadow-sm transition-all duration-300 ease-out hover:ml-2 hover:-translate-x-2 hover:scale-105 hover:px-4 hover:shadow-md",
              })}
            >
              <span>Open Chat</span>
              <ArrowTopRightIcon className="size-3" />
            </button>
          </div>
        </div>
      </div>
      <EditChatDetailsDialogContent
        chat={chat}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </Dialog>
  );
}

function EditChatDetailsDialogContent({
  chat,
  open,
  onOpenChange,
}: {
  chat: PersonaChatType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  //? Editor State
  const [title, setTitle] = useState(
    chat.aiState.threadMetadata?.title ?? "New Chat",
  );
  const [description, setDescription] = useState(
    chat.aiState.threadMetadata?.description ?? "Start Conversing",
  );
  const [businessDescription, setBusinessDescription] = useState(
    chat.aiState.business ?? "Business Description",
  );
  const [targetProblem, setTargetProblem] = useState(
    chat.aiState.targetProblem ?? "Target Problem",
  );

  //? Saving State
  const [isSaving, setIsSaving] = useState(false);
  const { updateChatInHistory } = usePersonaChatHistory();

  useEffect(() => {
    setTitle(chat.aiState.threadMetadata?.title ?? "New Chat");
    setDescription(
      chat.aiState.threadMetadata?.description ?? "Start Conversing",
    );
    setBusinessDescription(chat.aiState.business ?? "Business Description");
    setTargetProblem(chat.aiState.targetProblem ?? "Target Problem");
    setIsSaving(false);
  }, [chat, open]);

  const saveChatAiStateChanges = async () => {
    if (!chat._id) {
      console.error("Chat ID not found");
      return;
    }
    setIsSaving(true);
    const newChatAiState = {
      ...chat.aiState,
      threadMetadata: {
        title,
        description,
      },
      business: businessDescription,
      targetProblem,
    };

    updateChatInHistory({
      ...chat,
      aiState: newChatAiState,
    });
    setIsSaving(false);
  };

  return (
    <DialogContent className="size-[90%] max-w-none rounded-lg font-jost max-sm:px-2">
      <DialogHeader>
        <div className="flex items-center gap-2 max-sm:px-2">
          <EditIcon className="size-4 max-sm:hidden" />
          <DialogTitle>Edit Chat - {title} </DialogTitle>
        </div>

        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div className="flex size-full flex-col gap-4">
        <PopupSection className="relative flex flex-col gap-2 bg-gray-100">
          <EditIcon className="absolute right-2 top-2 size-4 sm:hidden" />
          <ScrollArea className="h-[70vh] w-full">
            <div className="flex w-full flex-col gap-2 p-4">
              <div className="relative w-full">
                <Label htmlFor="edit-chat-title" className="px-2 text-xs">
                  Chat Title
                </Label>
                <Input
                  type="text"
                  className="w-full rounded-lg border border-black/10 p-2"
                  placeholder={title}
                  value={title}
                  id="edit-chat-title"
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isSaving}
                />
              </div>

              <div className="relative w-full">
                <Label htmlFor="edit-chat-description" className="px-2 text-xs">
                  Chat Description
                </Label>
                <Textarea
                  className="h-[220px] w-full rounded-lg border border-black/10 p-2"
                  placeholder={description}
                  value={description}
                  id="edit-chat-description"
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isSaving}
                />
              </div>

              <div className="relative w-full">
                <Label
                  htmlFor="edit-business-description"
                  className="px-2 text-xs"
                >
                  Business Description
                </Label>
                <Textarea
                  className="h-[220px] w-full rounded-lg border border-black/10 p-2"
                  placeholder={businessDescription}
                  value={businessDescription}
                  id="edit-business-description"
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  disabled={isSaving}
                />
              </div>
              <div className="relative w-full">
                <Label htmlFor="edit-target-problem" className="px-2 text-xs">
                  Target Problem
                </Label>
                <Textarea
                  className="h-[220px] w-full rounded-lg border border-black/10 p-2"
                  placeholder={targetProblem}
                  value={targetProblem}
                  id="edit-target-problem"
                  onChange={(e) => setTargetProblem(e.target.value)}
                  disabled={isSaving}
                />
              </div>
            </div>
          </ScrollArea>
        </PopupSection>
        <div className="flex w-full items-center justify-between">
          <DialogClose asChild>
            <GradientButton Icon={ArrowLeft} variant="red">
              Cancel
            </GradientButton>
          </DialogClose>
          {isSaving ? (
            <GradientButton
              Icon={Loader as LucideIcon}
              variant="purple"
              iconClassName="animate-spin"
            >
              Saving...
            </GradientButton>
          ) : (
            <GradientButton
              Icon={IconCloudUpload as LucideIcon}
              variant="green"
              onClick={async () => {
                await saveChatAiStateChanges();

                onOpenChange(false);
              }}
            >
              Save Changes!
            </GradientButton>
          )}
        </div>
      </div>
    </DialogContent>
  );
}
