"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { PersonaEditor } from "@/components/page-specific/persona-editor/editor";
import useMeasure from "react-use-measure";
import { useScrollAreaState } from "@/lib/hooks";
import { ErrorBoundary } from "react-error-boundary";
import { usePersonaEditor } from "@/components/context/persona/persona-editor-context";
import { EditorFallbackNoSelectedState } from "@/components/page-specific/persona-editor/fallback-noselection-state";
import { EditorPersonaHeader } from "@/components/page-specific/persona-editor/editor-header";
import { EditorFallbackErrorState } from "@/components/page-specific/persona-editor/fallback-error-state";

export default function EditorPage() {
  const {
    selectedPersonaIDInEditor,
    setSelectedPersonaIDInEditor,
    selectedPersonaInEditorIsDirty,
    unsavedPersonas,
    resetEditorState,
  } = usePersonaEditor();

  const [scrollAreaBoundsRef, scrollAreaBounds] = useMeasure();

  const [scrollRef, scrollState] = useScrollAreaState();

  return (
    <ErrorBoundary
      fallback={<EditorFallbackErrorState />}
      onReset={(details) => {
        resetEditorState();
      }}
    >
      <div className="flex h-full flex-1 flex-col justify-center font-jost">
        <div className="relative m-2 box-border flex h-[calc(100%-70px)] min-h-[400px] w-[calc(100%-16px)] flex-1 flex-col gap-4 overflow-auto rounded-lg border bg-background p-2">
          <EditorPersonaHeader
            selected={selectedPersonaIDInEditor ?? ""}
            setSelected={setSelectedPersonaIDInEditor}
            hasFirstChange={selectedPersonaInEditorIsDirty}
            personasWithChanges={unsavedPersonas}
          />
          <div
            className="grid h-full place-items-center"
            ref={scrollAreaBoundsRef}
            id="scroll-area-bounds"
          >
            {selectedPersonaIDInEditor ? (
              <ScrollArea
                className="h-full w-full flex-1 rounded-xl"
                ref={scrollRef}
              >
                <PersonaEditor
                  key={selectedPersonaIDInEditor}
                  className="overflow-y-auto"
                  style={{ height: scrollAreaBounds.height }}
                />
              </ScrollArea>
            ) : (
              <EditorFallbackNoSelectedState />
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
