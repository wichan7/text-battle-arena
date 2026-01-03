import type { NextRequest } from "next/server";
import { notFound, success } from "../../response";
import characterService from "../service";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ characterId: string }> },
) {
  const { characterId } = await params;
  const character = await characterService.getCharacterById(characterId);
  return character ? success(character) : notFound();
}
