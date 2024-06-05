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
import { IconPlus } from "@tabler/icons-react";

export default function DocumentsPage({}: {}) {
  const documents = [
    "Topical Authority",
    "Blog 2",
    "History of SEO",
    "Meditation",

    "Topical Authority 2 ",
    "Blog 2 2 ",
    "History of SEO 2",
    "Meditation 2",
  ];

  return (
    <section className="flex-1 bg-gray-100">
      <div className="flex flex-col items-center h-full w-full">
        <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
          Documents
        </h1>
        {/* grid of 5 x 5 squares */}
        <div className="grid grid-cols-5 gap-4">
          <div
            onClick={() => {
              // navigate to document editor
              window.open("/tools/document-editor/new", "_self");
            }}
            className="flex flex-col items-center w-full mb-10 gap-2 bg-white rounded-sm border-2 border-slate-400 hover:border-green-600 hover:text-green-600 text-slate-400 hover:shadow-lg"
          >
            <div className="flex flex-row items-center w-full gap-2">
              <div className="w-[200px] h-[300px]">
                <IconPlus size={64} className="mt-[110px] ml-[65px]" />
              </div>
            </div>
          </div>
          {documents.map((doc) => (
            <div className="flex flex-col items-center w-full mb-10 gap-2 bg-white rounded-sm border-2 border-slate-400 hover:border-green-600 hover:shadow-lg">
              <div className="flex flex-row items-center w-full gap-2">
                <div className="w-[200px] h-[300px]">
                  <h2 className="text-center mt-4 text-xs text-slate-400 mb-16 font-bold border-b-2 border-slate-400">
                    {doc}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
