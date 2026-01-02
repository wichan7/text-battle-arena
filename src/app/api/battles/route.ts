import type { NextRequest } from "next/server";
import { chat } from "@/app/api/core/llm/gemini";
import { success } from "../utils/response";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const contents = `${searchParams.get("contents")}`;

  const result = await chat(contents);
  return success(result);
}
