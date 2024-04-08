import { PERSONA_TEST_HISTORY } from "./test";

export async function GET() {
  return Response.json({
    results: PERSONA_TEST_HISTORY,
  });
}
