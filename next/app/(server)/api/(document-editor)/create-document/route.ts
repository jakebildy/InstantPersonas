import { DocumentDraft } from "@/app/(server)/models/document_draft.model";

export async function POST(req: Request, res: Response) {

  const body = JSON.parse(await req.text());

  // check req.body is not empty
  if (!body.userID) {
    return Response.json({
      error: "No user provided in request body",
    });
  }

  // Create a new DocumentDraft
  const documentDraft = await DocumentDraft.create ({
    title: "Untitled Blog",
    user: body.userID,
    content: " ",
  });

  return Response.json({
    result: documentDraft,
  });
}
