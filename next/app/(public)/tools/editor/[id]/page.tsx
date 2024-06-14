"use client";
import { PersonaSelectFromHistorySidebar } from "@/components/toolfolio/selected-personas/select-from-sidebar/persona-select-from-history-sidebar";
import { SelectArchetypeWidget } from "@/components/toolfolio/selected-personas/select-from-sidebar/select-archetype-widget";
import { cn, levenshtein } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";
import { PersonaBusinessArchetype } from "@/components/toolfolio/selected-personas/types";
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  mergeAttributes,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { Link as EditorLink } from "@tiptap/extension-link";
import { LinkIcon } from "@heroicons/react/20/solid";
import { PhotoIcon } from "@heroicons/react/24/solid";
import {
  IconChevronLeft,
  IconH1,
  IconListNumbers,
  IconPencil,
} from "@tabler/icons-react";
import {
  IconH2,
  IconH3,
  IconBold,
  IconItalic,
  IconUnderline,
  IconBrandYoutubeFilled,
} from "@tabler/icons-react";
import api from "@/service/api.service";
import { motion } from "framer-motion";
import { CodeInput } from "@/components/ui/fcs/code-block";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GoogleKeywordFinderTool } from "@/components/toolfolio/google-keyword-finder";
import { EmojiReplacer } from "../EmojiReplacer";
import HeadlineAnalysisPopup from "../HeadlineAnalysisPopup";
import Heading from "@tiptap/extension-heading";
import ImageResize from "tiptap-extension-resize-image";
import Youtube from "@tiptap/extension-youtube";
import { Markdown } from "tiptap-markdown";
import { useParams } from "next/navigation";
import { DocumentDraft } from "@/app/(server)/models/document_draft.model";
import { useStytchUser } from "@stytch/nextjs";
import { PersonStandingIcon } from "lucide-react";
import BarLoader from "react-spinners/BarLoader";
import { ColorVariantMap } from "@/components/variants";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { ActivePersonas } from "../ActivePersonas";
import { Label } from "@/components/ui/label";
import NextImage from "next/image";
import { usePersonaChatHistory } from "@/components/context/persona/history-context";
import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
import { PersonaAvatarPopover } from "@/components/persona-archetype-generic/persona-avatar-popover";

// export const runtime = "edge";
export const maxDuration = 300; // 5 minutes

export default function DocumentEditor() {
  const [keywordsString, setKeywordsString] = useState<string>("");
  const [detailsInput, setDetailsInput] = useState<string>("");

  const { selectedPersonas, setSelectedPersonas, loading, error, history } =
    usePersonaChatHistory();

  const { isSubscribed } = useInstantPersonasUser();
  const { user, isInitialized } = useStytchUser();

  const [lastTypedTime, setLastTypedTime] = useState(Date.now());
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [view, setView] = useState<"editor" | "html" | "markdown">("editor");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const results = isSubscribed
      ? {
          personas: selectedPersonas.map(
            ({ pictureURL, ...rest }) => rest,
          ) as Omit<PersonaBusinessArchetype, "pictureURL">[],
          details:
            "Blog Title " +
            title +
            " " +
            (editor !== null ? editor!.getText() : ""),
          paid: isSubscribed,
        }
      : "Should be keywords related to the following blog:" + title;

    setKeywordsString(JSON.stringify(results));
  }, [selectedPersonas, title, isSubscribed]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Underline,
      Image,
      EditorLink.configure({
        HTMLAttributes: {
          class: "text-blue-600",
        },
      }),
      EmojiReplacer,
      ImageResize,
      Markdown,
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "text-2xl",
        },
      }),

      Heading.configure({ levels: [1, 2] }).extend({
        levels: [1, 2],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes = {
            1: "text-4xl",
            2: "text-2xl",
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              //@ts-ignore
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      }),
    ],

    content: content,
  });

  //Redirect to login if not logged in
  // useEffect(() => {
  //   if (!user && isInitialized) {
  //     window.location.href = "/login";
  //   }
  // }, [user, isInitialized]);

  useEffect(() => {
    // fetch Documents function is async
    const fetchDocuments = async () => {
      if (!user || !editor) return;
      const response = await api.documentEditor.getDocuments(
        user.user_id as string,
      );

      const document = response.find(
        (doc: DocumentDraft) => doc._id === params.id,
      );

      if (document) {
        setTitle(document.title);

        if (document.content === " ") {
          setContent(
            "<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>",
          );
          editor!.commands.setContent(
            "<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>",
          );
        } else {
          setContent(document.content);
          editor!.commands.setContent(document.content);
        }
      }
    };

    fetchDocuments();
  }, [user, editor]);

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor!.commands.setYoutubeVideo({
        src: url,
        width: 320 || 640,
        height: 180 || 480,
      });
    }
  };

  const addImage = () => {
    const url = prompt("Enter Image URL");
    if (!url) return;
    const alt = prompt("Add the Image's Alt Tag (for SEO)");

    if (url && alt) {
      editor!.commands.setImage({
        src: url,
        alt: alt,
      });
    }
  };

  const addLink = (dofollow: boolean) => {
    const url = prompt("Enter URL");

    if (url) {
      editor!.commands.toggleLink({
        href: url,
        //dofollow
        rel: dofollow ? "dofollow" : "noopener noreferrer nofollow",
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = () => {
      setLastTypedTime(Date.now());
      if (editor) {
        currentTextRef.current = editor.getText();
      }
    };
    if (editor) {
      editor.view.dom.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      setShowCommandMenu(false);

      if (editor) {
        if (title !== "") {
          api.documentEditor.updateDocument(
            editor!.getHTML(),
            title,
            params.id,
          );
        }
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

      const text = state.doc.textBetween(
        0,
        state.selection.$from.end(),
        " ",
        " ",
      );

      if (text.length > 0) {
        api.tools.autocomplete(text).then((response) => {
          setIsGenerating(false);
          console.log("response from autocomplete", response);
          editor!.commands.insertContent(response.response);
        });
      }
    }
  }

  function outlineSections() {
    setShowCommandMenu(false);
    setIsGenerating(true);
    if (editor) {
      if (title !== "Untitled Blog") {
        api.tools.outlineSections(title).then((response) => {
          setIsGenerating(false);
          console.log("response from outline sections", response);

          response.response.split("•").forEach((section: string) => {
            editor!.commands.insertContent(
              "<h2>" +
                (section.startsWith(" ") ? section.replace(" ", "") : section) +
                "</h2>",
            );
          });
        });
      } else {
        alert(
          "To generate an outline, add a title (change from 'Untitled Blog')",
        );
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

  const [showHeadlineAnalysisPopup, setShowHeadlineAnalysisPopup] =
    useState(false);

  async function updateTitle(newTitle: string) {
    setTitle(newTitle);
    await api.documentEditor.updateDocument(
      editor!.getHTML(),
      newTitle,
      params.id,
    );
  }

  let inputRef = useRef<HTMLInputElement>(null);

  const [personaThoughts, setPersonaThoughts] = useState<
    { thought: string; persona: PersonaBusinessArchetype }[]
  >([]);

  const [personaString, setPersonaString] = useState<string>("");
  // UseEffect, whenever no key is typed for 5 seconds, generate persona thoughts

  const currentTextRef = useRef("");
  const lastChangedTextRef = useRef("");

  useEffect(() => {
    const results = isSubscribed
      ? {
          personas: selectedPersonas.map(
            ({ pictureURL, ...rest }) => rest,
          ) as Omit<PersonaBusinessArchetype, "pictureURL">[],
        }
      : detailsInput;

    setPersonaString(JSON.stringify(results));
  }, [selectedPersonas, detailsInput, isSubscribed]);

  // Clear the persona thoughts when the selected personas change
  useEffect(() => {
    setPersonaThoughts([]);
  }, [selectedPersonas]);

  // Effect to set currentText whenever the editor changes
  useEffect(() => {
    if (!editor) return;

    const handleEditorChange = () => {
      currentTextRef.current = editor.getText();
    };
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    const interval = setInterval(() => {
      if (
        Date.now() - lastTypedTime > 5000 &&
        editor &&
        selectedPersonas.length > 0
      ) {
        console.log(
          levenshtein(lastChangedTextRef.current, currentTextRef.current),
        );

        if (
          currentTextRef.current.length > 0 &&
          currentTextRef.current !== lastChangedTextRef.current &&
          levenshtein(currentTextRef.current, lastChangedTextRef.current) > 20
        ) {
          lastChangedTextRef.current = currentTextRef.current;
          api.tools
            .generatePersonaThoughts(currentTextRef.current, personaString)
            .then((response) => {
              // thoughts are returned like this: PersonaName:Thought•PersonaName2:Thought
              const thoughts = response.response.split("•");
              const personaThoughts = thoughts.map((thought: string) => {
                const [personaName, thoughtText] = thought.split(":");
                const persona = selectedPersonas.find(
                  (persona) => persona.archetype_name === personaName,
                );
                return {
                  thought: thoughtText,
                  persona: persona!,
                };
              });

              // filter out undefined personas
              setPersonaThoughts(
                personaThoughts.filter(
                  (thought: {
                    thought: string;
                    persona: PersonaBusinessArchetype;
                  }) => thought.persona,
                ),
              );
            });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [lastTypedTime, editor, selectedPersonas]);

  return !user || !editor ? (
    <div
      className={
        "relative grid h-screen w-screen grid-cols-3 place-items-center gap-4 overflow-hidden bg-white p-4 backdrop-blur-[100px]"
      }
    >
      <div />
      <div className="flex h-3/4 flex-col items-center justify-between">
        <PersonStandingIcon className="size-10 text-black opacity-75" />
        <div className="flex flex-col gap-1 text-center">
          <p></p>
          <h1 className="text-4xl font-bold">Loading Document...</h1>
          <p className="text-sm"></p>
        </div>
        <BarLoader
          color={ColorVariantMap["green"]}
          height={10}
          width={500}
          className="rounded-full"
        />
      </div>
    </div>
  ) : (
    <div>
      <title>{title}</title>
      <div className="fixed top-0 z-50 mb-2 h-20 w-full bg-slate-50">
        <div>
          <a
            href="/tools/editor"
            aria-label="Content Editor"
            className="absolute top-5 z-[100] ml-5 rounded-full p-2 hover:bg-slate-200"
          >
            <IconChevronLeft className="size-8 text-black" />
          </a>
          <input
            // focus ref
            ref={inputRef}
            value={title}
            onChange={(e) => {
              updateTitle(e.target.value);
            }}
            className="absolute top-0 z-50 mb-2 ml-20 mt-4 w-full bg-transparent text-start text-2xl font-bold text-gray-700 outline-none"
          />
        </div>
      </div>
      <div className="fixed left-20 top-12 z-50">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className={"p-2 text-xs hover:bg-green-200"}
              onClick={() => {}}
            >
              Edit
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] min-w-[120px] rounded-md bg-white p-[5px] shadow-md will-change-[opacity,transform]"
              sideOffset={5}
            >
              <DropdownMenu.Item
                onClick={() => {
                  editor!.commands.undo();
                }}
                className="data-[disabled]:text-mauve8 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-slate-800 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-800"
              >
                Undo
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => {
                  editor!.commands.redo();
                }}
                className="data-[disabled]:text-mauve8 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-slate-800 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-800"
              >
                Redo
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className={"p-2 text-xs hover:bg-green-200"}
              onClick={() => {}}
            >
              Insert
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] min-w-[120px] rounded-md bg-white p-[5px] shadow-md will-change-[opacity,transform]"
              sideOffset={5}
            >
              <DropdownMenu.Item
                onClick={addImage}
                className="data-[disabled]:text-mauve8 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-slate-800 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-800"
              >
                Image
              </DropdownMenu.Item>

              <DropdownMenu.Item
                onClick={addYoutubeVideo}
                className="data-[disabled]:text-mauve8 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-slate-800 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-800"
              >
                Video
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => {
                  addLink(true);
                }}
                className="data-[disabled]:text-mauve8 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-slate-800 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-800"
              >
                Dofollow Link
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => {
                  addLink(false);
                }}
                className="data-[disabled]:text-mauve8 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-slate-800 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-800"
              >
                Nofollow Link
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <button
          className="p-2 text-xs hover:bg-green-200"
          onClick={() => setShowHeadlineAnalysisPopup(true)}
        >
          Analyze Headline
        </button>

        <button
          className={
            view === "editor"
              ? "border-b-2 border-green-400 p-2 text-xs text-green-400 hover:bg-green-200"
              : "p-2 text-xs hover:bg-green-200"
          }
          onClick={() => {
            setView(view === "editor" ? "html" : "editor");
          }}
        >
          Content Editor
        </button>
        <button
          className={
            view === "html"
              ? "border-b-2 border-green-400 p-2 text-xs text-green-400 hover:bg-green-200"
              : "p-2 text-xs hover:bg-green-200"
          }
          onClick={() => {
            setView(view === "html" ? "editor" : "html");
          }}
        >
          View HTML
        </button>
        <button
          className={
            view === "markdown"
              ? "border-b-2 border-green-400 p-2 text-xs text-green-400 hover:bg-green-200"
              : "p-2 text-xs hover:bg-green-200"
          }
          onClick={() => {
            setView(view === "markdown" ? "editor" : "markdown");
          }}
        >
          View Markdown
        </button>

        <Link
          className={"p-2 text-xs hover:bg-green-200"}
          href={"/tools/share-preview-optimizer"}
          target="_blank"
        >
          Social Media Preview
        </Link>
      </div>
      {/* The Select Personas Button */}
      {isSubscribed ? (
        <div className="fixed right-10 top-3 z-50">
          <PersonaSelectFromHistorySidebar className="m-4" />
        </div>
      ) : null}

      {view !== "editor" ? (
        <div />
      ) : (
        <div className="fixed top-20 z-40 mb-2 w-full border-b-[1px] border-slate-300 bg-slate-50 pt-2">
          <button
            className={
              editor?.isActive("bold")
                ? "ml-20 bg-green-200 p-2 font-bold hover:bg-green-300"
                : "ml-20 p-2 font-bold hover:bg-gray-200"
            }
            onClick={() => {
              editor!.chain().focus().toggleBold().run();
            }}
          >
            <IconBold className="size-5 text-black" />
          </button>
          <button
            className={
              editor?.isActive("italic")
                ? "bg-green-200 p-2 font-bold hover:bg-green-300"
                : "p-2 font-bold hover:bg-gray-200"
            }
            onClick={() => {
              editor!.chain().focus().toggleItalic().run();
            }}
          >
            <IconItalic className="size-5 text-black" />
          </button>
          <button
            className={
              editor?.isActive("underline")
                ? "bg-green-200 p-2 font-bold hover:bg-green-300"
                : "p-2 font-bold hover:bg-gray-200"
            }
            onClick={() => {
              editor!.commands.toggleUnderline();
            }}
          >
            <IconUnderline className="size-5 text-black" />
          </button>

          <button
            className={
              editor?.isActive("heading", { level: 1 })
                ? "bg-green-200 p-2 font-bold hover:bg-green-300"
                : "p-2 font-bold hover:bg-gray-200"
            }
            onClick={() => {
              editor!.commands.toggleHeading({ level: 1 });
            }}
          >
            <IconH1 className="size-5 text-black" />
          </button>
          <button
            className={
              editor?.isActive("heading", { level: 2 })
                ? "bg-green-200 p-2 font-bold hover:bg-green-300"
                : "p-2 font-bold hover:bg-gray-200"
            }
            onClick={() => {
              editor!.commands.toggleHeading({ level: 2 });
            }}
          >
            <IconH2 className="size-5 text-black" />
          </button>
          <button
            className={
              editor?.isActive("heading", { level: 3 })
                ? "bg-green-200 p-2 font-bold hover:bg-green-300"
                : "p-2 font-bold hover:bg-gray-200"
            }
            onClick={() => {
              editor!.commands.toggleHeading({ level: 3 });
            }}
          >
            <IconH3 className="size-5 text-black" />
          </button>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="p-2 hover:bg-gray-200">
                <LinkIcon className="size-5 text-black" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] min-w-[120px] rounded-md bg-white p-[5px] shadow-md will-change-[opacity,transform]"
                sideOffset={5}
              >
                <DropdownMenu.Item
                  onClick={() => {
                    addLink(true);
                  }}
                  className="data-[disabled]:text-mauve8 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-slate-800 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-800"
                >
                  Dofollow Link
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() => {
                    addLink(false);
                  }}
                  className="data-[disabled]:text-mauve8 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-slate-800 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-800"
                >
                  Nofollow Link
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <button
            className="p-2 hover:bg-gray-200"
            onClick={() => {
              // insert an image
              addImage();
            }}
          >
            <PhotoIcon className="size-5 text-black" />
          </button>
          <button
            id="add"
            onClick={addYoutubeVideo}
            className="p-2 hover:bg-gray-200"
          >
            <IconBrandYoutubeFilled className="size-5 text-black" />
          </button>
        </div>
      )}

      <section className="ml-[-120px] flex-1">
        <HeadlineAnalysisPopup
          headline={title}
          setShowHeadlineAnalysisPopup={setShowHeadlineAnalysisPopup}
          openHeadlineAnalysisPopup={showHeadlineAnalysisPopup}
        />
        <div className="flex h-full w-full flex-col items-center bg-gray-50">
          <div className="flex flex-row">
            <div>
              <div className="flex flex-row justify-between"></div>
              <div className="mb-10 mt-36 flex w-full flex-col items-center gap-2">
                {isSubscribed ? (
                  <section
                    className={cn(
                      "flex flex-col gap-2 rounded-md border border-gray-300 bg-white p-[50px] sm:mr-[20%] sm:w-[60%] lg:mr-[140px] lg:w-[900px]",
                    )}
                  >
                    <div className="rounded-sm bg-white">
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
                            className="w-[300px] rounded-md bg-slate-50 shadow-sm"
                          >
                            <button
                              className="flex w-[300px] flex-row py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
                              onClick={doAutoComplete}
                            >
                              <IconPencil className="ml-2 size-5 text-green-600" />
                              <div className="ml-2 mt-0.5">
                                {" "}
                                Continue Writing
                              </div>
                            </button>
                            <div className="h-0.5 w-full bg-slate-100" />

                            <button
                              className="flex w-[300px] flex-row py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
                              onClick={outlineSections}
                            >
                              <IconListNumbers className="ml-2 size-5 text-green-600" />
                              <div className="ml-2 mt-0.5">
                                Outline Sections
                              </div>
                            </button>

                            {/* <button
                              className="text-slate-700 font-bold text-xs flex flex-row py-1.5 hover:bg-slate-200 w-[300px]"
                              onClick={doAutoComplete}
                            >
                              <IconChartInfographic className="ml-2 text-green-600 size-5" />
                              <div className="mt-0.5 ml-2">
                                Create Infographic
                              </div>
                            </button> */}
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
                          className="ml-[20px] h-full w-[calc(90%-50px)]"
                        />
                      ) : view === "markdown" ? (
                        <ScrollArea className="order-1 w-full overflow-hidden rounded-md bg-white p-2 text-xs text-black/70 shadow-md transition-all duration-200 ease-out peer-hover:opacity-25 lg:max-w-none">
                          <CodeInput
                            // add \n after each line
                            code={editor!.storage.markdown.getMarkdown()}
                            theme="slack-ochin"
                            className="h-screen"
                            style={{ width: "800px" }}
                          />
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      ) : (
                        <ScrollArea className="order-1 w-full overflow-hidden rounded-md bg-white p-2 text-xs text-black/70 shadow-md transition-all duration-200 ease-out peer-hover:opacity-25 lg:max-w-none">
                          {
                            <CodeInput
                              // add \n after each line
                              code={editor!.getHTML().replace(/>/g, ">\n")}
                              theme="slack-ochin"
                              className="h-screen"
                              style={{ width: "800px" }}
                            />
                          }
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      )}
                    </div>
                  </section>
                ) : null}
              </div>
            </div>

            <div className="fixed right-2 top-10 ml-[20px] mt-24 h-full w-[340px] rounded-md border border-gray-300 bg-white p-2">
              <ActivePersonas selectedPersonas={selectedPersonas} />

              {/* Persona Thoughts */}
              <div className="h-[300px] rounded-md border-2 border-slate-300 bg-white">
                <ScrollArea className="z-50 order-1 h-[290px] w-full overflow-hidden rounded-md bg-white p-2 text-xs text-black/70 transition-all duration-200 ease-out peer-hover:opacity-25 lg:max-w-none">
                  {personaThoughts.length === 0 ? (
                    <div className="flex flex-row">
                      <div className="mr-2 flex h-8 w-8 items-center">
                        <NextImage
                          src={"/instant_personas_logo.png"}
                          alt={"Instant Personas Logo"}
                          width={32}
                          height={32}
                          priority
                          className={cn("min-w-8 object-contain")}
                        />
                      </div>
                      <div className="flex items-center whitespace-pre-wrap rounded-lg bg-gray-200 p-2 px-4 text-sm">
                        Select some personas, and you will see their thoughts
                        here as you write.
                      </div>
                    </div>
                  ) : (
                    personaThoughts.map((thought, i) => (
                      <div key={i} className="flex flex-row p-2">
                        {selectedPersonas.length > 0 ? (
                          <PersonaAvatarPopover
                            allowManage={false}
                            {...{
                              archetype: thought.persona,
                              variant: mapUrlBackgroundColorParamToVariant({
                                url: thought.persona.pictureURL,
                              }),
                            }}
                            size={"sm"}
                          />
                        ) : null}
                        <div className="flex items-center whitespace-pre-wrap rounded-lg bg-gray-200 p-2 px-4 text-sm">
                          {thought.thought}
                        </div>
                      </div>
                    ))
                  )}
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>

              <div className="h-0.5 w-full bg-gray-100" />
              <Label>Google Keywords (US Searches)</Label>
              <br></br>
              <ScrollArea className="z-50 order-1 h-[600px] w-full overflow-hidden rounded-md bg-white p-2 text-xs text-black/70 transition-all duration-200 ease-out peer-hover:opacity-25 lg:max-w-none">
                <GoogleKeywordFinderTool
                  input={keywordsString}
                  isSubscribed={isSubscribed}
                  noInput={selectedPersonas.length === 0 && detailsInput === ""}
                  isSidebar={true}
                  blog={
                    title + " " + (editor !== null ? editor!.getText() : "")
                  }
                />
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
