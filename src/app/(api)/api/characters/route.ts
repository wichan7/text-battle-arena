import type { NextRequest } from "next/server";
import { CharacterSchema } from "@/schemas/character";
import { success } from "../response";
import characterService from "./service";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-user-id");
  const characters = await characterService.getCharactersByUserId(`${userId}`);

  return success(characters);
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
