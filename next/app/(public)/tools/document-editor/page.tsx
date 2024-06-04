"use client";
import { PersonaSelectFromHistorySidebar } from "@/components/toolfolio/selected-personas/select-from-sidebar/persona-select-from-history-sidebar";
import { SelectArchetypeWidget } from "@/components/toolfolio/selected-personas/select-from-sidebar/select-archetype-widget";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";
import { PersonaBusinessArchetype } from "@/components/toolfolio/selected-personas/types";
import { useEditor, EditorContent, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { LinkIcon } from "@heroicons/react/20/solid";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { IconH1, IconListNumbers, IconPencil } from "@tabler/icons-react";
import { IconH2 } from "@tabler/icons-react";
import { IconH3 } from "@tabler/icons-react";
import { IconBold } from "@tabler/icons-react";
import { IconItalic } from "@tabler/icons-react";
import { IconUnderline } from "@tabler/icons-react";
import api from "@/service/api.service";
import { motion } from "framer-motion";
import { CodeInput } from "@/components/ui/fcs/code-block";

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

  const [lastTypedTime, setLastTypedTime] = useState(Date.now());
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const handleKeyDown = () => {
      setLastTypedTime(Date.now());
    };
    if (editor) {
      editor.view.dom.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      setShowCommandMenu(false);
      if (editor) {
        editor.view.dom.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [editor, lastTypedTime]);

  // autocomplete function
  function doAutoComplete() {
    setShowCommandMenu(false);
    setIsGenerating(true);
    if (editor) {
      const { state } = editor;

      // get all text before curent selector

      const text = state.doc.toString().trim();

      if (text.length > 0) {
        api.tools.autocomplete(text).then((response) => {
          setIsGenerating(false);
          console.log("response from autocomplete", response);
          editor!.commands.insertContent(response.response);
        });
      }
    }
  }

  // on slash key press, showCommandMenu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        const { state } = editor!;
        //@ts-ignore
        const { $cursor } = state.selection;
        const isLineBlank =
          state.doc
            .textBetween($cursor.before(), $cursor.end(), " ", " ")
            .trim() === "";

        if (isLineBlank) {
          e.preventDefault(); // prevent the slash from being typed
          setShowCommandMenu(true);
        }
      }
    };

    // Attach the event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editor]);

  return (
    <section className="flex-1">
      <div className="flex flex-col items-center h-full w-full bg-gray-100">
        <input
          value={"Untitled Blog"}
          className="text-3xl text-gray-700 text-center pt-10 font-bold bg-gray-100 outline-none mb-2"
        ></input>
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
                      className={
                        editor?.isActive("bold")
                          ? "bg-green-200 hover:bg-green-300 p-2 font-bold"
                          : "hover:bg-gray-200 p-2 font-bold"
                      }
                      onClick={() => {
                        editor!.chain().focus().toggleBold().run();
                      }}
                    >
                      <IconBold className="text-black size-5" />
                    </button>
                    <button
                      className={
                        editor?.isActive("italic")
                          ? "bg-green-200 hover:bg-green-300 p-2 font-bold"
                          : "hover:bg-gray-200 p-2 font-bold"
                      }
                      onClick={() => {
                        editor!.chain().focus().toggleItalic().run();
                      }}
                    >
                      <IconItalic className="text-black size-5" />
                    </button>
                    <button
                      className={
                        editor?.isActive("underline")
                          ? "bg-green-200 hover:bg-green-300 p-2 font-bold"
                          : "hover:bg-gray-200 p-2 font-bold"
                      }
                      onClick={() => {
                        editor!.commands.toggleUnderline();
                      }}
                    >
                      <IconUnderline className="text-black size-5" />
                    </button>

                    <button
                      className={
                        editor?.isActive("heading", { level: 1 })
                          ? "bg-green-200 hover:bg-green-300 p-2 font-bold"
                          : "hover:bg-gray-200 p-2 font-bold"
                      }
                      onClick={() => {
                        editor!.commands.toggleHeading({ level: 1 });
                      }}
                    >
                      <IconH1 className="text-black size-5" />
                    </button>
                    <button
                      className={
                        editor?.isActive("heading", { level: 2 })
                          ? "bg-green-200 hover:bg-green-300 p-2 font-bold"
                          : "hover:bg-gray-200 p-2 font-bold"
                      }
                      onClick={() => {
                        editor!.commands.toggleHeading({ level: 2 });
                      }}
                    >
                      <IconH2 className="text-black size-5" />
                    </button>
                    <button
                      className={
                        editor?.isActive("heading", { level: 3 })
                          ? "bg-green-200 hover:bg-green-300 p-2 font-bold"
                          : "hover:bg-gray-200 p-2 font-bold"
                      }
                      onClick={() => {
                        editor!.commands.toggleHeading({ level: 3 });
                      }}
                    >
                      <IconH3 className="text-black size-5" />
                    </button>

                    <button
                      className="hover:bg-gray-200 p-2"
                      onClick={() => {
                        editor!.commands.toggleLink({
                          href: "https://instantpersonas.com",
                        });
                      }}
                    >
                      <LinkIcon className="text-black size-5" />
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
                      <PhotoIcon className="text-black size-5" />
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
                      <div className=" align-top font-bold">
                        {" "}
                        ⭐️ Create Infographic
                      </div>
                    </button>
                  </div>
                  {/* Autocomplete */}
                  <FloatingMenu
                    // shouldShow={({ editor, view, state, oldState }) => {
                    //   const { $from, to } = state.selection;
                    //   const lineTextAfter = state.doc
                    //     .textBetween(to, $from.end($from.depth), " ", " ")
                    //     .trim();
                    //   return !lineTextAfter.length;
                    // }}
                    editor={editor}
                    tippyOptions={{ duration: 100 }}
                  >
                    {showCommandMenu ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className=" bg-slate-50 w-[300px] rounded-md shadow-sm"
                      >
                        <button
                          className="text-slate-700 font-bold text-xs flex flex-row py-1.5 hover:bg-slate-200 w-[300px]"
                          onClick={doAutoComplete}
                        >
                          <IconPencil className="text-green-600 size-5 ml-2 " />
                          <div className="mt-0.5 ml-2"> Continue Writing</div>
                        </button>
                        <div className="h-0.5 w-full bg-slate-100" />
                        <button
                          className="text-slate-700 font-bold text-xs flex flex-row py-1.5 hover:bg-slate-200 w-[300px]"
                          onClick={doAutoComplete}
                        >
                          <IconListNumbers className="ml-2 text-green-600 size-5" />
                          <div className="mt-0.5 ml-2">Outline Sections</div>
                        </button>
                      </motion.div>
                    ) : (
                      <div className="text-gray-400">
                        {isGenerating
                          ? ""
                          : "Write anything, or press '/' for AI..."}
                      </div>
                    )}
                  </FloatingMenu>
                  {view === "editor" ? (
                    <EditorContent
                      editor={editor}
                      className="h-screen"
                      style={{ width: "800px" }} //TODO: make this resizable
                    />
                  ) : (
                    <CodeInput
                      code={editor!.getHTML()}
                      theme="slack-ochin"
                      className="h-screen "
                      style={{ width: "800px" }}
                    />
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
