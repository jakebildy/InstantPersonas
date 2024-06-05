"use client";
import { PersonaArchetype } from "@/components/page-specific/generative-ui/persona-avatar-popover";
import { GuestPostFinderTool } from "@/components/toolfolio/guest-post-finder";
import { PersonaSelectFromHistorySidebar } from "@/components/toolfolio/selected-personas/select-from-sidebar/persona-select-from-history-sidebar";
import { SelectArchetypeWidget } from "@/components/toolfolio/selected-personas/select-from-sidebar/select-archetype-widget";
import { useEffect, useState } from "react";
import { ArticleCard, BLOG_POSTS } from "../../blog/page";
import * as SelectPersonaDemoGif from "@/public/tools/persona-select-demo.gif";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";
import { PersonaBusinessArchetype } from "@/components/toolfolio/selected-personas/types";
import { IconDotsVertical, IconPlus, IconTrash } from "@tabler/icons-react";
import api from "@/service/api.service";
import { useStytchUser } from "@stytch/nextjs";
import { DocumentDraft } from "@/app/(server)/models/document_draft.model";

export default function DocumentsPage({}: {}) {
  const [documents, setDocuments] = useState<DocumentDraft[]>([]);

  const { user } = useStytchUser();

  // fetch all documents
  useEffect(() => {
    // fetch Documents function is async
    const fetchDocuments = async () => {
      if (!user) return;
      const response = await api.documentEditor.getDocuments(
        user.user_id as string
      );
      console.log(response);
      setDocuments(response);
    };

    fetchDocuments();
  }, [user]);

  return !user ? (
    <div />
  ) : (
    <section className="flex-1 bg-gray-100">
      <div className="flex flex-col items-start h-full w-full ml-4">
        <h1 className="text-xl text-gray-700 text-start pt-10 font-bold mb-5">
          Documents
        </h1>
        {/* grid of 5 x 5 squares */}
        <div className="grid grid-cols-5 gap-4">
          <div
            onClick={async () => {
              // navigate to document editor

              const response = await api.documentEditor.createDocument(
                user.user_id as string
              );
              window.open(
                "/tools/document-editor/" + response.result._id,
                "_self"
              );
            }}
            className="flex flex-col items-center w-full mb-10 gap-2 bg-white rounded-sm border-2 border-slate-400 hover:border-green-600 hover:text-green-600 text-slate-400 hover:shadow-lg cursor-pointer"
          >
            <div className="flex flex-row items-center w-full gap-2">
              <div className="w-[200px] h-[300px]">
                <IconPlus size={64} className="mt-[110px] ml-[65px]" />
              </div>
            </div>
          </div>
          {documents.map((doc) => (
            <div
              onClick={() => {
                window.open("/tools/document-editor/" + doc._id, "_self");
              }}
              className="flex flex-col items-center w-full mb-10 gap-2 bg-white rounded-sm border-2 border-slate-400 hover:border-green-600 hover:shadow-lg cursor-pointer"
            >
              <div className="flex flex-row items-center w-full gap-2 overflow-clip">
                <div className="w-[200px] h-[300px]">
                  <div className="flex flex-row  border-b-2 border-slate-400 h-14">
                    <h2 className="text-center mt-3 text-xs text-slate-700 mb-16 font-bold flex flex-grow ml-2">
                      {doc.title}
                    </h2>
                    <IconTrash
                      size={24}
                      className="text-slate-400 h-8 relativ right-1 hover:bg-slate-100 w-8 p-1 mt-1 rounded-full"
                    />
                  </div>

                  <div className="text-[6px] m-2">
                    {doc.content.split(/<[^>]+>/g).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
