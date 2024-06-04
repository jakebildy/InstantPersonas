"use client";
import { PersonaSelectFromHistorySidebar } from "@/components/toolfolio/selected-personas/select-from-sidebar/persona-select-from-history-sidebar";
import { SelectArchetypeWidget } from "@/components/toolfolio/selected-personas/select-from-sidebar/select-archetype-widget";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";
import { PersonaBusinessArchetype } from "@/components/toolfolio/selected-personas/types";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { LinkIcon } from "@heroicons/react/20/solid";
import { PhotoIcon } from "@heroicons/react/24/solid";

export const runtime = "edge";
export const maxDuration = 300; // 5 minutes

export default function DocumentEditor({}: {}) {
  const [personaString, setPersonaString] = useState<string>("");
  const [detailsInput, setDetailsInput] = useState<string>("");
  const [selectedPersonas, setSelectedPersonas] = useState<
    PersonaBusinessArchetype[]
  >([]);
  const { isSubscribed } = useInstantPersonasUser();

  const [view, setView] = useState<"editor" | "html">("editor");

  useEffect(() => {
    const results = isSubscribed
      ? {
          personas: selectedPersonas.map(
            ({ pictureURL, ...rest }) => rest
          ) as Omit<PersonaBusinessArchetype, "pictureURL">[],
          details: detailsInput,
          paid: isSubscribed,
        }
      : detailsInput;

    setPersonaString(JSON.stringify(results));
  }, [selectedPersonas, detailsInput, isSubscribed]);

  const editor = useEditor({
    extensions: [StarterKit, Document, Underline, Image, Link],

    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <section className="flex-1">
      <div className="flex flex-col items-center h-full w-full bg-gray-100">
        <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
          Document Editor
        </h1>
        <div className="flex flex-col items-center w-full mb-10 gap-2">
          {isSubscribed ? (
            <PersonaSelectFromHistorySidebar
              selectedPersonas={selectedPersonas}
              setSelectedPersonas={setSelectedPersonas}
              className="xl:absolute top-4 right-4 z-50"
            />
          ) : null}
          {isSubscribed ? (
            <section
              className={cn(
                "border border-gray-300 rounded-md  bg-white p-2 flex flex-col gap-2",
                selectedPersonas.length > 0 ? "w-1/2" : ""
              )}
            >
              {selectedPersonas.length > 0 ? (
                selectedPersonas.map((persona, i) => (
                  <SelectArchetypeWidget
                    key={i}
                    archetype={persona}
                    isSelected={true}
                    onSelect={() => {
                      setSelectedPersonas((prevSelectedPersonas) => [
                        ...prevSelectedPersonas,
                        persona,
                      ]);
                    }}
                    onDeselect={() => {
                      setSelectedPersonas((prevSelectedPersonas) =>
                        prevSelectedPersonas.filter(
                          (activePersona) => activePersona !== persona
                        )
                      );
                    }}
                  />
                ))
              ) : (
                <div className=" rounded-sm  bg-white">
                  <div className="rounded-lg mb-2">
                    <button
                      className={
                        view === "editor"
                          ? "hover:bg-green-200  border-b-2 border-green-400 text-green-400 p-2 text-xs"
                          : "hover:bg-green-200 p-2 text-xs"
                      }
                      onClick={() => {
                        setView(view === "editor" ? "html" : "editor");
                      }}
                    >
                      Document Editor
                    </button>
                    <button
                      className={
                        view === "html"
                          ? "hover:bg-green-200 border-b-2 border-green-400 text-green-400 p-2 text-xs"
                          : "hover:bg-green-200 p-2 text-xs"
                      }
                      onClick={() => {
                        setView(view === "html" ? "editor" : "html");
                      }}
                    >
                      View HTML
                    </button>
                  </div>
                  <div className="mb-2 border-b-2 border-gray-100">
                    <button
                      className="hover:bg-gray-200 p-2 font-bold"
                      onClick={() => {
                        editor!.chain().focus().toggleBold().run();
                      }}
                    >
                      B
                    </button>
                    <button
                      className="hover:bg-gray-200 p-2"
                      onClick={() => {
                        editor!.chain().focus().toggleItalic().run();
                      }}
                    >
                      <i>I</i>
                    </button>
                    <button
                      className="hover:bg-gray-200 p-2"
                      onClick={() => {
                        editor!.commands.toggleUnderline();
                      }}
                    >
                      <u>U</u>
                    </button>

                    <button
                      className="hover:bg-gray-200 p-2"
                      onClick={() => {
                        editor!.commands.toggleHeading({ level: 1 });
                      }}
                    >
                      <b>h1</b>
                    </button>
                    <button
                      className="hover:bg-gray-200 p-2"
                      onClick={() => {
                        editor!.commands.toggleHeading({ level: 2 });
                      }}
                    >
                      <b>h2</b>
                    </button>

                    <button
                      className="hover:bg-gray-200 p-2"
                      onClick={() => {
                        editor!.commands.toggleLink({
                          href: "https://instantpersonas.com",
                        });
                      }}
                    >
                      <LinkIcon className="text-black size-5 pt-2" />
                    </button>

                    <button
                      className="hover:bg-gray-200 p-2"
                      onClick={() => {
                        // insert an image
                        editor!.commands.setImage({
                          src: "https://i.imgur.com/e3lG3KA.png",
                          alt: "A boring example image",
                          title: "An example",
                        });
                      }}
                    >
                      <PhotoIcon className="text-black size-5 pt-2" />
                    </button>

                    <button
                      className="hover:bg-gray-200 p-2"
                      onClick={() => {
                        // insert an image
                        editor!.commands.setImage({
                          src: "https://i.imgur.com/e3lG3KA.png",
                          alt: "A boring example image",
                          title: "An example",
                        });
                      }}
                    >
                      ⭐️ Create Infographic
                    </button>
                  </div>
                  {view === "editor" ? (
                    <EditorContent
                      editor={editor}
                      className="h-screen"
                      style={{ width: "800px" }} //TODO: make this resizable
                    />
                  ) : (
                    <code className="h-screen w-[800px]">
                      {editor?.getHTML()}
                    </code>
                  )}
                </div>
              )}
            </section>
          ) : null}
          <label className="text-sm text-gray-700 my-2">
            {isSubscribed
              ? "Enter any extra details"
              : "Describe your customer persona:"}
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-md w-1/2 p-2"
            placeholder="e.g. a marketing manager"
            onChange={(e) => {
              setDetailsInput(e.target.value);
            }}
            value={detailsInput}
          />
        </div>
      </div>
    </section>
  );
}
