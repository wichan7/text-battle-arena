import type { NextRequest } from "next/server";
import { CharacterSchema } from "@/schemas/character";
import { notFound, success } from "../response";
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
  const userId = request.headers.get("x-user-id");
  const body = await request.json();
  body.createdBy = userId ?? undefined;
  body.updatedBy = userId ?? undefined;

  const validated = CharacterSchema.parse(body);
  const created = await characterService.createCharacter(validated);

  return success(created);
}

export async function PUT(request: NextRequest) {
  const userId = request.headers.get("x-user-id");
  const body = await request.json();
  body.createdBy = userId ?? undefined;
  body.updatedBy = userId ?? undefined;

  const validated = CharacterSchema.parse(body);
  await characterService.modifyCharacter(validated);

  return success(null);
}
