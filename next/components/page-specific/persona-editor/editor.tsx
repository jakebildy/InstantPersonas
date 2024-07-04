"use client";
import { Separator } from "@/components/ui/fcs/fcs-separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonStandingIcon } from "lucide-react";
import { HTMLAttributes } from "react";
import {
  avatarVariants,
  ButtonInnerHover,
  gradientLightVariants,
  gradientVariants,
} from "@/components/variants";
import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";
import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
import { cn, IS_TEST_DEV_ENV } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { cx } from "class-variance-authority";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { usePersonaEditor } from "@/components/context/persona/persona-editor-context";
import { EditorTextField } from "./editor-text-field";
import { EditorFallbackState } from "./fallback-loading-state";
import { EditorSaveChangesDialogContent } from "./editor-save-changes-dialog/content";
import { isEditorStateValid, useEditorState } from "./useEditorState";

type props = HTMLAttributes<HTMLDivElement>;

export function PersonaEditor({ ...Props }: props) {
  const state = useEditorState();

  if (!isEditorStateValid(state)) {
    return <EditorFallbackState {...Props} reason={state.fallbackReason} />;
  }

  const { archetype, changedArchetype, editorChanges } = state;

  return (
    <Dialog>
      <div className="relative flex flex-col">
        <ArchetypeEditorToolbar />
        <ArchetypeEditor
          archetype={archetype}
          changedArchetype={changedArchetype}
          {...Props}
        />
      </div>
      <EditorSaveChangesDialogContent archetypeChanges={editorChanges} />
    </Dialog>
  );
}

function ArchetypeEditorToolbar() {
  const { selectedPersonaIDInEditor, unsavedPersonas, revertPersonaChanges } =
    usePersonaEditor();

  if (!selectedPersonaIDInEditor || unsavedPersonas.length === 0)
    return <div className="flex min-h-12 justify-between py-2" />;

  return (
    <div className="flex min-h-12 justify-between py-2">
      {/* Unsaved Personas Indicator */}
      <span className="text-xs text-red-500">
        {unsavedPersonas.length} unsaved personas
      </span>
      <div className="z-10 flex items-center justify-end gap-2">
        {/* Revert Selected Button */}
        <Button
          variant={"outline"}
          className={
            "group h-fit w-fit rounded-full p-0.5 shadow-md hover:scale-100"
          }
          onClick={() => revertPersonaChanges(selectedPersonaIDInEditor)}
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
        {/* Save All Trigger */}
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
    </div>
  );
}

function ArchetypeEditor({
  archetype,
  changedArchetype,
  className,
  ...Props
}: props & {
  archetype: PersonaArchetype;
  changedArchetype: PersonaArchetype;
}) {
  const { editPersonaInEditor } = usePersonaEditor();

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
    <div
      className={cn(
        "relative grid h-full w-full flex-1 overflow-clip rounded-xl border bg-background shadow-md",
        className,
      )}
      {...Props}
    >
      {IS_TEST_DEV_ENV && (
        <Button
          onClick={() =>
            editPersonaInEditor({
              field: "persona_components." + "Motivations",
              value: "test",
            })
          }
        >
          test
        </Button>
      )}

      <PersonStandingIcon className="absolute right-0 top-0 m-6 text-muted-foreground" />
      {/* Avatar + Archetype Name Editor */}
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
            alt={[archetype_name.toLocaleLowerCase(), "persona avatar"].join(
              " ",
            )}
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
        {/* Persona Components Editor */}
        <ul className="grid gap-4">
          {Object.entries(persona_components).map(([key, value]) => (
            <EditorTextField
              key={key + archetype_name}
              id={key}
              value={
                changedArchetype.persona_components[
                  key as keyof PersonaArchetype["persona_components"]
                ] || value
              }
              onChange={(changedValue) => {
                editPersonaInEditor({
                  field: "persona_components." + key,
                  value: changedValue,
                });
                console.log("changedValue: ", changedValue);
              }}
              label={key.replace(/_/g, " ")}
              initialValue={value}
              variant={variant}
            />
          ))}
        </ul>
        <Separator text="insights" className="mb-4" />
        {/* Persona Insights Editor */}
        <ul className="grid w-full grid-cols-2 gap-4">
          {Object.entries(insights).map(([key, value]) => (
            <EditorTextField
              key={key + archetype_name}
              id={key}
              value={
                changedArchetype.insights[
                  key as keyof PersonaArchetype["insights"]
                ] || ""
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
  );
}
