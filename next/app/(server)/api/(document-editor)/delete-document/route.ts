import { DocumentDraft } from "@/app/(server)/models/document_draft.model";

export async function DELETE(req: Request, res: Response) {
  // a user can only get their own documentdrafts, filter by the provided userID in the request
  const url = new URL(req.url);

  const documentID = url.searchParams.get("id");
  console.log("Deleting document with ID", documentID)

  // check req.body is not empty
  if (!documentID) {
    return Response.json({
      error: "No id provided in request body",
    });
  }

  // Get MongoDB DocumentDraft where user matches the provided userID
  const documentDraft = await DocumentDraft.findOneAndDelete(
    { _id: documentID }
  );

  return Response.json({
    result: documentDraft,
  });
}
