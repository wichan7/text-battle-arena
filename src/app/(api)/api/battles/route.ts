import type { NextRequest } from "next/server";
import { chat } from "@/core/server/llm/gemini";
import { success } from "../response";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const contents = `${searchParams.get("contents")}`;

  const result = await chat(contents);
  return success(result);
}
