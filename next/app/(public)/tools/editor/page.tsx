"use client";
import { useEffect, useState } from "react";
import { IconDotsVertical, IconPlus, IconTrash } from "@tabler/icons-react";
import api from "@/service/api.service";
import { useStytchUser } from "@stytch/nextjs";
import { DocumentDraft } from "@/app/(server)/models/document_draft.model";
import { useRouter } from "next/navigation";

export default function DocumentsPage({}: {}) {
  const [documents, setDocuments] = useState<DocumentDraft[]>([]);

  const { user, isInitialized } = useStytchUser();
  const router = useRouter();

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

  //Redirect to login if not logged in
  // useEffect(() => {
  //   if (!user && isInitialized) {
  //     window.location.href = "/login";
  //   }
  // }, [user, isInitialized]);

  return !user ? (
    <div />
  ) : (
    <section className="flex-1 bg-gray-100">
      <div className="flex flex-col items-start h-full w-full ml-4">
        <h1 className="text-xl text-gray-700 text-start pt-10 font-bold">
          Blogs
        </h1>
        <h2 className="text-center text-xs text-slate-400  mb-5">
          More forms of content editing (videos, posts, etc.) coming soon!{" "}
        </h2>
        {/* grid of 5 x 5 squares */}
        <div className="grid grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div
            onClick={async () => {
              // navigate to document editor

              const response = await api.documentEditor.createDocument(
                user.user_id as string
              );
              router.push("/tools/editor/" + response.result._id);
            }}
            className="flex flex-col items-center w-full mb-10 gap-2 bg-white rounded-sm border-[1px] border-spacing-1 border-slate-400 hover:border-green-600 hover:text-green-600 text-slate-400 hover:shadow-lg cursor-pointer"
          >
            <div className="flex flex-row items-center w-full gap-2">
              <div className="w-[200px] h-[300px] flex justify-center">
                <IconPlus size={64} className="mt-[110px]" />
              </div>
            </div>
          </div>
          {documents.map((doc, index) => (
            <div
              key={index}
              onClick={() => {
                router.push("/tools/editor/" + doc._id);
              }}
              onMouseOver={() => {
                router.prefetch("/tools/editor/" + doc._id);
              }}
              className="flex flex-col items-center w-full mb-10 gap-2 bg-white rounded-sm border-[1px] border-spacing-1 border-slate-400 hover:border-green-600 hover:shadow-lg cursor-pointer"
            >
              <div className="flex flex-row items-center w-full gap-2 overflow-clip">
                <div className="w-[200px] h-[300px] bg-gradient-to-b from-slate-50 to-white rounded-t-sm rounded-b-sm">
                  <div className="flex flex-row border-b-[1px] border-slate-400 h-14 bg-white rounded-t-sm">
                    <h2 className="text-start mt-3 text-xs text-slate-700 mb-16 font-bold flex flex-grow ml-2">
                      {doc.title}
                    </h2>
                    <div
                      onClick={(event) => {
                        // prevent outside click
                        event.stopPropagation();
                        api.documentEditor.deleteDocument(doc._id as string);
                        setDocuments(
                          documents.filter((d) => d._id !== doc._id)
                        );
                      }}
                    >
                      <IconTrash
                        size={24}
                        className="text-slate-400 h-8 relative right-1 hover:bg-slate-100 w-8 p-1 mt-1 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="text-[6px] m-4">
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
