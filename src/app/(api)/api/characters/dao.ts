import { CharacterSchema } from "@/schemas/character";
import type { Character } from "@/types/schema";
import { getCollection } from "../../../../core/server/db/mongo";

const getAll = async (params?: { userId?: string }) => {
  const collection = await getCollection("characters");
  const query = params?.userId ? { createdBy: params.userId } : {};

  const characters = await collection.find(query).toArray();

  const validatedData = characters
    .map((data) => CharacterSchema.safeParse(data))
    .filter((result) => result.success)
    .map((result) => result.data);

  return validatedData;
};

const getById = async (id: string) => {
  const collection = await getCollection("characters");

  const character = await collection.findOne({ id });
  const validated = CharacterSchema.safeParse(character);

  return validated.success ? validated.data : null;
};

const getRandom = async (excludeId: string) => {
  const collection = await getCollection("characters");

  const randomCharacters = await collection
    .aggregate([
      { $match: { id: { $ne: excludeId } } },
      { $sample: { size: 1 } },
    ])
    .toArray();

  if (randomCharacters.length === 0) return null;

  const character = randomCharacters[0];
  const validated = CharacterSchema.safeParse(character);

  return validated.success ? validated.data : null;
};

const create = async (character: Omit<Character, "id">) => {
  const collection = await getCollection("characters");
  const id = crypto.randomUUID();
  const now = new Date();

  const result = await collection.insertOne({
    ...character,
    id,
    createdAt: now,
    updatedAt: now,
  });

  return result.insertedId.toString();
};

const modify = async (character: Partial<Character>) => {
  const collection = await getCollection("characters");
  const now = new Date();
  const { id: _, createdAt: __, createdBy: ___, ...dataToModify } = character;
  dataToModify.updatedAt = now;

  collection.updateOne({ id: character.id }, { $set: dataToModify });
};

const characterDao = {
  getAll,
  getById,
  getRandom,
  create,
  modify,
};
export default characterDao;
