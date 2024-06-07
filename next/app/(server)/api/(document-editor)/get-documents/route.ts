import { DocumentDraft } from "@/app/(server)/models/document_draft.model";
import { initMongoDB } from "@/database/mongodb";
import mongoose from "mongoose";

export async function GET(req: Request) {
  // a user can only get their own document drafts, filter by the provided userID in the request
  const url = new URL(req.url);

  const userID = url.searchParams.get("id");

  mongoose.connection.readyState === 1
    ? console.log("Mongoose Connected")
    : await initMongoDB();

  // Get MongoDB DocumentDrafts where user matches the provided userID
  const documentDrafts = await DocumentDraft.find({ user: userID });

  return Response.json({
    results: documentDrafts,
  });
}
