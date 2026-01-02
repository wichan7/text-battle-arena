import type { NextRequest } from "next/server";
import { notFound, success } from "../../response";
import characterService from "../service";

export async function GET(
  _request: NextRequest,
  { params }: { params: { characterId: string } },
) {
  const character = await characterService.getCharacterById(params.characterId);
  return character ? success(character) : notFound();
}
