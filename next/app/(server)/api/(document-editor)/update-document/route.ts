import { DocumentDraft } from "@/app/(server)/models/document_draft.model";

export async function POST(req: Request, res: Response) {
  // a user can only get their own documentdrafts, filter by the provided userID in the request

  const url = new URL(req.url);

  const documentID = url.searchParams.get("documentID");

  const body = JSON.parse(await req.text());

  // check req.body is not empty
  if (!body.chat) {
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
