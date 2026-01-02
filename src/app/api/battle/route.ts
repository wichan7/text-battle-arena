import { type NextRequest, NextResponse } from "next/server";
import { chat } from "@/app/api/core/llm/gemini";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const contents = `${searchParams.get("contents")}`;

  const result = await chat(contents);
  return NextResponse.json(result);
}
