import type { NextRequest } from "next/server";
import { success } from "../response";
import battleService from "./service";

export async function GET(_request: NextRequest) {
  return success(null);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await battleService.createBattle(body.characterId);

  return success(result);
}
