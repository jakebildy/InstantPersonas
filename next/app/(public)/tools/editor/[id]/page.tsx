"use client";
import { PersonaSelectFromHistorySidebar } from "@/components/toolfolio/selected-personas/select-from-sidebar/persona-select-from-history-sidebar";
import { SelectArchetypeWidget } from "@/components/toolfolio/selected-personas/select-from-sidebar/select-archetype-widget";
import { cn } from "@/lib/utils";
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

export const runtime = "edge";
export const maxDuration = 300; // 5 minutes

export default function DocumentEditor() {
  const [personaString, setPersonaString] = useState<string>("");
  const [detailsInput, setDetailsInput] = useState<string>("");
  const [selectedPersonas, setSelectedPersonas] = useState<
    PersonaBusinessArchetype[]
  >([]);
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
            ({ pictureURL, ...rest }) => rest
          ) as Omit<PersonaBusinessArchetype, "pictureURL">[],
          details:
            "Blog Title " +
            title +
            " " +
            (editor !== null ? editor!.getText() : ""),
          paid: isSubscribed,
        }
      : "Should be keywords related to the following blog:" + title;

    setPersonaString(JSON.stringify(results));
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
        user.user_id as string
      );

      const document = response.find(
        (doc: DocumentDraft) => doc._id === params.id
      );

      if (document) {
        setTitle(document.title);

        if (document.content === " ") {
          setContent(
            "<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>"
          );
          editor!.commands.setContent(
            "<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>"
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
            params.id
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
        " "
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
                "</h2>"
            );
          });
        });
      } else {
        alert(
          "To generate an outline, add a title (change from 'Untitled Blog')"
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
      params.id
    );
  }

  let inputRef = useRef<HTMLInputElement>(null);

  return !user || !editor ? (
    <div
      className={
        "bg-white grid grid-cols-3 place-items-center h-screen w-screen p-4 gap-4 overflow-hidden relative backdrop-blur-[100px]"
      }
    >
      <div />
      <div className="flex flex-col justify-between items-center h-3/4">
        <PersonStandingIcon className="size-10 text-black opacity-75" />
        <div className="text-center flex flex-col gap-1">
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
      <div className=" fixed top-0 w-full h-20 bg-slate-50 mb-2 z-50 ">
        <div>
          <a
            href="/tools/editor"
            aria-label="Content Editor"
            className="absolute top-5 ml-5 z-[100] hover:bg-slate-200 p-2 rounded-full"
          >
            <IconChevronLeft className="text-black size-8" />
          </a>
          <input
            // focus ref
            ref={inputRef}
            value={title}
            onChange={(e) => {
              updateTitle(e.target.value);
            }}
            className="absolute top-0 z-50 ml-20 mt-4 text-2xl text-gray-700 font-bold bg-transparent outline-none mb-2 w-full text-start"
          />
        </div>
      </div>
      <div className="fixed top-12 left-20 z-50">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className={"hover:bg-green-200 p-2 text-xs"}
              onClick={() => {}}
            >
              Edit
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="z-[100] min-w-[120px] bg-white rounded-md p-[5px] shadow-md will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              sideOffset={5}
            >
              <DropdownMenu.Item
                onClick={() => {
                  editor!.commands.undo();
                }}
                className="group text-[13px] leading-none text-slate-800 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-800"
              >
                Undo
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => {
                  editor!.commands.redo();
                }}
                className="group text-[13px] leading-none text-slate-800 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-800"
              >
                Redo
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className={"hover:bg-green-200 p-2 text-xs"}
              onClick={() => {}}
            >
              Insert
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="z-[100] min-w-[120px] bg-white rounded-md p-[5px] shadow-md will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              sideOffset={5}
            >
              <DropdownMenu.Item
                onClick={addImage}
                className="group text-[13px] leading-none text-slate-800 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-800"
              >
                Image
              </DropdownMenu.Item>

              <DropdownMenu.Item
                onClick={addYoutubeVideo}
                className="group text-[13px] leading-none text-slate-800 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-800"
              >
                Video
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => {
                  addLink(true);
                }}
                className="group text-[13px] leading-none text-slate-800 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-800"
              >
                Dofollow Link
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => {
                  addLink(false);
                }}
                className="group text-[13px] leading-none text-slate-800 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-800"
              >
                Nofollow Link
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <Link
          className={"hover:bg-green-200 p-2 text-xs"}
          href={"/tools/share-preview-optimizer"}
          target="_blank"
        >
          Social Media Preview
        </Link>

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
          Content Editor
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
        <button
          className={
            view === "markdown"
              ? "hover:bg-green-200 border-b-2 border-green-400 text-green-400 p-2 text-xs"
              : "hover:bg-green-200 p-2 text-xs"
          }
          onClick={() => {
            setView(view === "markdown" ? "editor" : "markdown");
          }}
        >
          View Markdown
        </button>
      </div>
      <button
        onClick={() => setShowHeadlineAnalysisPopup(true)}
        className="z-50 bg-green-500 text-white p-2 rounded-md h-min w-[200px] text-xs font-bold fixed right-10 top-6"
      >
        Analyze Headline
      </button>

      {view !== "editor" ? (
        <div />
      ) : (
        <div className="fixed z-40 top-20 pt-2 mb-2 w-full bg-slate-50 border-b-[1px] border-slate-300">
          <button
            className={
              editor?.isActive("bold")
                ? "bg-green-200 hover:bg-green-300 p-2 font-bold ml-20"
                : "hover:bg-gray-200 p-2 font-bold ml-20"
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

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="hover:bg-gray-200 p-2">
                <LinkIcon className="text-black size-5" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="z-[100] min-w-[120px] bg-white rounded-md p-[5px] shadow-md will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                sideOffset={5}
              >
                <DropdownMenu.Item
                  onClick={() => {
                    addLink(true);
                  }}
                  className="group text-[13px] leading-none text-slate-800 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-800"
                >
                  Dofollow Link
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() => {
                    addLink(false);
                  }}
                  className="group text-[13px] leading-none text-slate-800 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green-50 data-[highlighted]:text-green-800"
                >
                  Nofollow Link
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <button
            className="hover:bg-gray-200 p-2"
            onClick={() => {
              // insert an image
              addImage();
            }}
          >
            <PhotoIcon className="text-black size-5" />
          </button>
          <button
            id="add"
            onClick={addYoutubeVideo}
            className="hover:bg-gray-200 p-2"
          >
            <IconBrandYoutubeFilled className="text-black size-5" />
          </button>
        </div>
      )}

      <section className="flex-1 ml-[-120px]">
        <HeadlineAnalysisPopup
          headline={title}
          setShowHeadlineAnalysisPopup={setShowHeadlineAnalysisPopup}
          openHeadlineAnalysisPopup={showHeadlineAnalysisPopup}
        />
        <div className="flex flex-col items-center h-full w-full bg-gray-50">
          <div className="flex flex-row">
            <div>
              <div className="flex flex-row justify-between"></div>
              <div className="flex flex-col items-center w-full mb-10 gap-2 mt-36">
                {isSubscribed ? (
                  <section
                    className={cn(
                      "border border-gray-300 rounded-md  bg-white flex flex-col gap-2  p-[50px] sm:w-[60%] sm:mr-[20%] lg:w-[900px] lg:mr-[140px]"
                    )}
                  >
                    <div className=" rounded-sm  bg-white">
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
                              <div className="mt-0.5 ml-2">
                                {" "}
                                Continue Writing
                              </div>
                            </button>
                            <div className="h-0.5 w-full bg-slate-100" />

                            <button
                              className="text-slate-700 font-bold text-xs flex flex-row py-1.5 hover:bg-slate-200 w-[300px]"
                              onClick={outlineSections}
                            >
                              <IconListNumbers className="ml-2 text-green-600 size-5" />
                              <div className="mt-0.5 ml-2">
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
                          className="h-full w-[calc(90%-50px)] ml-[20px]"
                        />
                      ) : view === "markdown" ? (
                        <ScrollArea className="order-1 text-xs text-black/70 peer-hover:opacity-25 transition-all duration-200 ease-out w-full p-2 bg-white rounded-md overflow-hidden shadow-md lg:max-w-none">
                          <CodeInput
                            // add \n after each line
                            code={editor!.storage.markdown.getMarkdown()}
                            theme="slack-ochin"
                            className="h-screen "
                            style={{ width: "800px" }}
                          />
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      ) : (
                        <ScrollArea className="order-1 text-xs text-black/70 peer-hover:opacity-25 transition-all duration-200 ease-out w-full p-2 bg-white rounded-md overflow-hidden shadow-md lg:max-w-none">
                          {
                            <CodeInput
                              // add \n after each line
                              code={editor!.getHTML().replace(/>/g, ">\n")}
                              theme="slack-ochin"
                              className="h-screen "
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

            <div className="fixed top-10 right-2 h-full border border-gray-300 rounded-md  bg-white mt-24 ml-[20px] w-[340px] p-2">
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
                <div />
              )}
              {isSubscribed ? (
                <div className="flex justify-center">
                  <PersonaSelectFromHistorySidebar
                    className="m-4"
                    selectedPersonas={selectedPersonas}
                    setSelectedPersonas={setSelectedPersonas}
                  />
                </div>
              ) : null}
              <div className="h-0.5 w-full bg-gray-100" />
              <b className="ml-2">Google Keywords (US Searches)</b>
              <br></br>
              <ScrollArea className="z-50 order-1 h-[600px] text-xs text-black/70 peer-hover:opacity-25 transition-all duration-200 ease-out w-full p-2 bg-white rounded-md overflow-hidden shadow-md lg:max-w-none">
                <GoogleKeywordFinderTool
                  input={personaString}
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
