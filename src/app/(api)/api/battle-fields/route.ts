import type { NextRequest } from "next/server";
import { BattleFieldSchema } from "@/schemas/battleField";
import { success } from "../response";
import battleFieldService from "./service";

export async function GET(_request: NextRequest) {
  const battleFields = await battleFieldService.getBattleFields();

  return success(battleFields);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newBattleField = BattleFieldSchema.parse(body);

  const result = await battleFieldService.createBattleField(newBattleField);
  return success(result);
}
