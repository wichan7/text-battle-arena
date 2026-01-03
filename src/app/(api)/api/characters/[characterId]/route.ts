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

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ characterId: string }> },
) {
  const { characterId } = await params;
  const deleted = await characterService.deleteCharacter(characterId);
  return deleted ? success(null) : notFound();
}
