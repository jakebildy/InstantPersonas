import { DocumentDraft } from "@/app/(server)/models/document_draft.model";

export async function POST(req: Request, res: Response) {
  // a user can only get their own documentdrafts, filter by the provided userID in the request

  const body = JSON.parse(await req.text());
  const documentID = body.documentID;

  // check req.body is not empty
  if (!documentID) {
    return Response.json({
      error: "No documentID provided in request body",
    });
  }

  // Get MongoDB DocumentDraft where user matches the provided userID
  const documentDraft = await DocumentDraft.findOneAndUpdate(
    { _id: documentID },
    { $set: { content: body.content, title: body.title } }
  );

  return Response.json({
    result: documentDraft,
  });
}
