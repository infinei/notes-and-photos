import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  const msg = name
    ? `Hello ${name}! It's nice to meet you! This is the api!`
    : "Hello from the api! You can tell me your name by putting it in the search params using ?name=YourName";

  return Response.json({ status: 200, body: msg });
}
