import { ObjectId } from "mongodb";
import { type Character, CharacterSchema } from "@/app/core/schema/character";
import { getCollection } from "../core/db/mongo";

const getAll = async () => {
  const collection = await getCollection("characters");
  const characters = await collection.find({}).toArray();

  const validatedData = characters
    .map((data) => CharacterSchema.safeParse(data))
    .filter((result) => result.success)
    .map((result) => result.data);

  return validatedData;
};

const getById = async (id: string) => {
  const collection = await getCollection("characters");
  const character = await collection.findOne({ _id: new ObjectId(id) });
  const validated = CharacterSchema.safeParse(character);

  return validated.success ? validated.data : null;
};

const create = async (character: Character) => {
  const collection = await getCollection("characters");
  const now = new Date();
  const result = await collection.insertOne({
    ...character,
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

  collection.updateOne(
    { _id: new ObjectId(character.id) },
    { $set: dataToModify },
  );
};

const characterDao = {
  getAll,
  getById,
  create,
  modify,
};
export default characterDao;
