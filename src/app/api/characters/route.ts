import type { NextRequest } from "next/server";
import { notFound, success } from "@/app/api/utils/response";
import { CharacterSchema } from "@/app/core/schema/character";
import characterService from "./service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const character = await characterService.getCharacterById(id);
    return character ? success(character) : notFound();
  } else {
    const characters = await characterService.getCharacters();
    return success(characters);
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validated = CharacterSchema.parse(body);

  const created = await characterService.createCharacter(validated);
  return success(created);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const validated = CharacterSchema.parse(body);

  await characterService.modifyCharacter(validated);
  return success;
}
