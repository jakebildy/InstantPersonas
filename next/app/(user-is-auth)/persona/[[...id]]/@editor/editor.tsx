"use client";
import { Separator } from "@/components/ui/fcs/fcs-separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PersonStandingIcon,
  RefreshCwIcon,
  SaveAll,
  SaveAllIcon,
  SlackIcon,
} from "lucide-react";
import Link from "next/link";
import { HTMLAttributes, use, useEffect, useState } from "react";
import {
  avatarVariants,
  Border600,
  ButtonInnerHover,
  ColorVariant,
  ColorVariantMap,
  gradientLightVariants,
  gradientVariants,
  TextArea600,
  textColorVariants,
} from "@/components/variants";
import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";
import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
import { cn } from "@/lib/utils";
import { usePersonaChat } from "@/components/context/persona/chat-context";
import { Button } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { cx } from "class-variance-authority";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PopupSection } from "@/components/popups/template/popup";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { GradientButton } from "@/components/ui/gradient-button";
import BarLoader from "react-spinners/BarLoader";
import { SLACK_INVITE_LINK } from "@/lib/site";
import { useErrorBoundary } from "react-error-boundary";

type props = HTMLAttributes<HTMLDivElement>;
export function PersonaEditor({ className, ...Props }: props) {
  const {
    personas,
    chatId,
    personaEditorChanges,
    selectedPersonaInEditor,
    editPersonaInEditor,
    unsavedPersonas,
    savePersona,
    saveAllPersonas,
    revertPersonaChanges,
  } = usePersonaChat();

  const [openSaveDialog, setOpenSaveDialog] = useState(false);

  if (!chatId || !selectedPersonaInEditor) {
    return (
      <EditorFallbackState {...Props} reason="Waiting for Selected Persona" />
    );
  }

  const changedArchetype =
    personaEditorChanges[chatId][selectedPersonaInEditor];
  const archetype = personas.find(
    (persona) => persona.archetype_name === selectedPersonaInEditor,
  );
  if (!archetype) {
    return (
      <EditorFallbackState
        {...Props}
        reason={`Waiting For Archetype ${selectedPersonaInEditor}`}
      />
    );
  }
  const { archetype_name, persona_components, insights, pictureURL } =
    archetype;
  const variant = mapUrlBackgroundColorParamToVariant({
    url: pictureURL,
  });
  const avatarFallbackName = archetype_name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  return (
    <Dialog open={openSaveDialog} onOpenChange={setOpenSaveDialog}>
      <div className="relative flex flex-col">
        <div className="flex min-h-12 justify-between py-2">
          {unsavedPersonas.length > 0 ? (
            <>
              <div>
                <span className="text-xs text-red-500">
                  {unsavedPersonas.length} unsaved personas
                </span>
              </div>
              <div className="z-10 flex items-center justify-end gap-2">
                <Button
                  variant={"outline"}
                  className={
                    "group h-fit w-fit rounded-full p-0.5 shadow-md hover:scale-100"
                  }
                  onClick={() => revertPersonaChanges(selectedPersonaInEditor)}
                >
                  <span
                    className={cx(
                      ButtonInnerHover({ variant: "red" }),
                      gradientLightVariants({
                        variant: "red",
                        className: cn(
                          "flex h-6 min-w-0 items-center gap-2 whitespace-nowrap rounded-2xl p-1 px-2 text-xs",
                        ),
                      }),
                    )}
                  >
                    Revert Changes
                  </span>
                </Button>
                <DialogTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={
                      "group h-fit w-fit rounded-full p-0.5 shadow-md hover:scale-100"
                    }
                  >
                    <span
                      className={cx(
                        ButtonInnerHover({ variant: "green" }),
                        gradientLightVariants({
                          variant: "green",
                          className: cn(
                            "flex h-6 min-w-0 items-center gap-2 whitespace-nowrap rounded-2xl p-1 px-2 text-xs",
                          ),
                        }),
                      )}
                    >
                      Apply Edits & Save Changes!{" "}
                      <ArrowTopRightIcon className="size-3" />
                    </span>
                  </Button>
                </DialogTrigger>
              </div>
            </>
          ) : null}
        </div>

        <div
          className={cn(
            "relative grid h-full w-full flex-1 overflow-clip rounded-xl border bg-background shadow-md",
            className,
          )}
          {...Props}
        >
          <PersonStandingIcon className="absolute right-0 top-0 m-6 text-muted-foreground" />

          <div className="flex gap-2 border-b bg-white/75 backdrop-blur-md">
            <Avatar
              className={avatarVariants({
                variant,
                size: "xl",
                interactive: false,
              })}
            >
              <AvatarImage
                src={pictureURL}
                alt={[
                  archetype_name.toLocaleLowerCase(),
                  "persona avatar",
                ].join(" ")}
              />
              <AvatarFallback>{avatarFallbackName}</AvatarFallback>
            </Avatar>

            <div className="my-6 flex flex-col">
              <span className="inline-flex gap-2 text-sm font-semibold text-muted-foreground">
                Archetype
                {changedArchetype.archetype_name !== archetype_name ? (
                  <span
                    className="rounded-lg border border-pastel-red bg-pastel-red/25 px-2 text-[9px] uppercase text-red-500"
                    key={archetype_name}
                  >
                    unsaved changes
                  </span>
                ) : null}
              </span>
              <textarea
                className="h-fit max-h-[100px] min-h-[1.75em] w-[400px] rounded-md border border-border text-base font-bold"
                placeholder={archetype_name}
                value={changedArchetype.archetype_name || archetype_name}
                name="archetype_name"
                id="archetype_name"
                onChange={(e) =>
                  editPersonaInEditor({
                    field: "archetype_name",
                    value: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div
            className={gradientVariants({
              variant,
              className: "m-2 flex flex-col gap-2 rounded-lg p-4",
            })}
          >
            <ul className="grid gap-4">
              {Object.entries(persona_components).map(([key, value]) => (
                <EditTextField
                  key={key + archetype_name}
                  id={key}
                  value={
                    changedArchetype.persona_components[
                      key as keyof PersonaArchetype["persona_components"]
                    ] || value
                  }
                  onChange={(changedValue) =>
                    editPersonaInEditor({
                      field: "persona_components." + key,
                      value: changedValue,
                    })
                  }
                  label={key.replace(/_/g, " ")}
                  initialValue={value}
                  variant={variant}
                />
              ))}
            </ul>
            <Separator text="insights" className="mb-4" />

            <ul className="grid w-full grid-cols-2 gap-4">
              {Object.entries(insights).map(([key, value]) => (
                <EditTextField
                  key={key + archetype_name}
                  id={key}
                  value={
                    changedArchetype.insights[
                      key as keyof PersonaArchetype["insights"]
                    ] || value
                  }
                  onChange={(changedValue) =>
                    editPersonaInEditor({
                      field: "insights." + key,
                      value: changedValue,
                    })
                  }
                  label={key.replace(/_/g, " ")}
                  initialValue={value}
                  variant={variant}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <DialogContent className="w-full sm:max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>Let&apos;s Save Those Changes!</DialogTitle>
          <DialogDescription>
            Please Select the Button Below to Save Your Changes
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-10">
          <PopupSection className="flex h-full gap-2 p-2">
            {personas
              .filter((p) => unsavedPersonas.includes(p.archetype_name))
              .map((archetype: PersonaArchetype, i: number) => {
                const variant = mapUrlBackgroundColorParamToVariant({
                  url: archetype.pictureURL,
                });
                const avatarFallbackName = archetype.archetype_name
                  .split(" ")
                  .map((word) => word.charAt(0))
                  .join("");

                return (
                  <div
                    key={i}
                    className={gradientLightVariants({
                      variant,
                      className:
                        "group grid h-full flex-1 place-items-center rounded-2xl border border-gray-300 bg-gray-100 p-2 shadow-sm transition-all duration-500 ease-out hover:px-6 hover:shadow-lg",
                    })}
                  >
                    <div
                      className={
                        "flex flex-1 flex-col items-center gap-1 transition-all duration-500 ease-out group-hover:scale-105"
                      }
                    >
                      <Avatar
                        className={avatarVariants({ variant, size: "sm" })}
                      >
                        <AvatarImage
                          src={archetype.pictureURL}
                          alt={[
                            archetype.archetype_name.toLocaleLowerCase(),
                            "persona avatar",
                          ].join(" ")}
                        />
                        <AvatarFallback>{avatarFallbackName}</AvatarFallback>
                      </Avatar>
                      <span
                        className={textColorVariants({
                          variant,
                          className:
                            "text-center font-jost text-sm font-semibold",
                        })}
                      >
                        {personaEditorChanges[chatId][archetype.archetype_name]
                          .archetype_name || archetype.archetype_name}
                      </span>
                      <Button
                        variant={"outline"}
                        className={
                          "group h-fit w-fit rounded-full p-0.5 shadow-md hover:scale-100"
                        }
                        onClick={() => savePersona(archetype.archetype_name)}
                      >
                        <span
                          className={cx(
                            ButtonInnerHover({ variant }),
                            gradientLightVariants({
                              variant,
                              className: cn(
                                "flex h-6 min-w-0 items-center gap-2 whitespace-nowrap rounded-2xl p-1 px-2 text-xs",
                              ),
                            }),
                          )}
                        >
                          Click to Save
                        </span>
                      </Button>
                    </div>
                  </div>
                );
              })}
          </PopupSection>
          {unsavedPersonas.length > 1 ? (
            <div className="flex flex-col">
              <Separator text="Or Save All Changes" className="mb-4" />
              <GradientButton
                Icon={SaveAll}
                variant="green"
                onClick={() => saveAllPersonas()}
              >
                Save All Changes
              </GradientButton>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
function EditorFallbackState({
  className,
  variant = "green",
  reason = "This should only take a few seconds",
  ...Props
}: props & {
  variant?: ColorVariant;
  reason?: string;
}) {
  return (
    <div
      className={gradientVariants({
        variant: variant,
        className:
          "relative grid h-full w-full grid-cols-3 place-items-center gap-4 overflow-hidden p-4 backdrop-blur-[100px]",
      })}
      {...Props}
    >
      <div />
      <div className="flex h-3/4 flex-col items-center justify-between">
        <PersonStandingIcon className="size-10 text-black opacity-75" />
        <div className="flex flex-col gap-1 text-center">
          <p>Loading Editor...</p>
          <h1 className="text-4xl font-bold">InstantPersonas</h1>
          <p className="text-sm">{reason}</p>
        </div>
        <BarLoader
          color={ColorVariantMap[variant]}
          height={10}
          width={500}
          className="rounded-full"
        />
      </div>
    </div>
  );
}

export function EditorFallbackErrorState({
  className,
  variant = "red",
  reason = "Looks like there was an unexpected error when saving the persona.",
  ...Props
}: props & {
  variant?: ColorVariant;
  reason?: string;
}) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="size-full p-4">
      <div
        className={gradientVariants({
          variant: variant,
          className:
            "relative grid h-full w-full grid-cols-3 place-items-center gap-4 overflow-hidden rounded-xl p-4 backdrop-blur-[100px]",
        })}
        {...Props}
      >
        <div />
        <div className="flex h-3/4 flex-col items-center justify-between">
          <PersonStandingIcon className="size-10 text-black opacity-75" />
          <div className="flex flex-col gap-1 text-center">
            <p>Uh oh! Something went wrong.</p>
            <h1 className="text-4xl font-bold">InstantPersonas</h1>
            <p className="text-sm">{reason}</p>
            <div className="flex flex-col gap-1 pt-10 text-left">
              <div className="flex items-center justify-between gap-2">
                <GradientButton
                  variant="purple"
                  className="z-10 mx-auto h-[50px] justify-center"
                  Icon={RefreshCwIcon}
                  onClick={resetBoundary}
                >
                  Reset Editor
                </GradientButton>

                <GradientButton
                  variant="green"
                  className="z-10 mx-auto h-[50px] justify-center"
                  Icon={SlackIcon}
                >
                  <Link href={SLACK_INVITE_LINK}>Let us know in Slack</Link>
                </GradientButton>
              </div>
            </div>
          </div>
          <BarLoader
            color={ColorVariantMap[variant]}
            height={10}
            width={500}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

function EditTextField({
  label,
  value,
  onChange,
  id,
  initialValue,
  variant,
}: {
  variant: ColorVariant;
  value: string;
  onChange: (e: string) => void;
  label: string;
  id: string;
  initialValue: string;
}) {
  const isEdited = value !== initialValue;

  return (
    <li className="mb-4 flex flex-col gap-1">
      <span
        className={textColorVariants({
          variant,
          className: "inline-flex gap-2 text-sm font-semibold",
        })}
      >
        {label}{" "}
        {isEdited ? (
          <span className="rounded-lg border border-pastel-red bg-pastel-red/25 px-2 text-[9px] uppercase text-red-500">
            unsaved changes
          </span>
        ) : null}
      </span>
      <textarea
        className={TextArea600({
          variant,
        })}
        placeholder={initialValue}
        value={value}
        name={id}
        id={id}
        onChange={(e) => onChange(e.target.value)}
      />
    </li>
  );
}
