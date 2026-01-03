import type { NextRequest } from "next/server";
import { notFound, success } from "../../response";
import battleService from "../service";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ battleId: string }> },
) {
  const { battleId } = await params;
  const battle = await battleService.getBattleById(battleId);
  return battle ? success(battle) : notFound();
}
