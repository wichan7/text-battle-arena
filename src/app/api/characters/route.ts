import { ObjectId } from "mongodb";
import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getCollection } from "@/app/api/core/db/mongo";
import {
  badRequest,
  internalServerError,
  notFound,
} from "@/app/api/utils/errors";
import { CharacterSchema } from "@/app/core/schema/character";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const collection = await getCollection("characters");

    if (id) {
      try {
        const objectId = new ObjectId(id);
        const character = await collection.findOne({ _id: objectId });
        if (!character) {
          return notFound("Character not found");
        }
        return NextResponse.json(character);
      } catch {
        return badRequest("Invalid character ID format");
      }
    }

    const characters = await collection.find({}).toArray();
    return NextResponse.json(characters);
  } catch (error) {
    console.error("Error fetching characters:", error);
    return internalServerError();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = CharacterSchema.parse(body);

    const now = new Date();
    const dataToInsert = {
      ...validatedData,
      createdAt: now,
      updatedAt: now,
    };

    const collection = await getCollection("characters");

    const result = await collection.insertOne(dataToInsert);

    if (result.insertedId) {
      const newCharacter = await collection.findOne({
        _id: result.insertedId,
      });
      return NextResponse.json(newCharacter, { status: 201 });
    }

    return internalServerError("Failed to create character");
  } catch (error) {
    if (error instanceof ZodError) {
      return badRequest("Validation error", error.issues);
    }
    console.error("Error creating character:", error);
    return internalServerError();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return badRequest("Character ID is required");
    }

    const body = await request.json();

    try {
      const objectId = new ObjectId(id);
      const collection = await getCollection("characters");

      const existingCharacter = await collection.findOne({ _id: objectId });
      if (!existingCharacter) {
        return notFound("Character not found");
      }

      const {
        id: _,
        createdAt: __,
        updatedAt: ___,
        ...bodyWithoutServerFields
      } = body;

      const validatedData = CharacterSchema.parse(bodyWithoutServerFields);

      const dataToUpdate = {
        ...validatedData,
        updatedAt: new Date(),
      };

      const result = await collection.updateOne(
        { _id: objectId },
        { $set: dataToUpdate },
      );

      if (result.matchedCount === 0) {
        return notFound("Character not found");
      }

      const updatedCharacter = await collection.findOne({ _id: objectId });
      return NextResponse.json(updatedCharacter);
    } catch {
      return badRequest("Invalid character ID format");
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return badRequest("Validation error", error.issues);
    }
    console.error("Error updating character:", error);
    return internalServerError();
  }
}
