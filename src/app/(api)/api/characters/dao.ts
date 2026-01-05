import { getCollection } from "@/core/server/db/mongo";
import { DEFAULT_ELO } from "@/core/server/elo/eloCalculator";
import { CharacterSchema } from "@/schemas/character";
import type { Character } from "@/types/schema";

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

  await collection.insertOne({
    ...character,
    wins: character.wins ?? 0,
    losses: character.losses ?? 0,
    elo: character.elo ?? DEFAULT_ELO,
    id,
    createdAt: now,
    updatedAt: now,
  });

  return id;
};

const modify = async (character: Partial<Character>) => {
  const collection = await getCollection("characters");
  const now = new Date();
  const { id: _, createdAt: __, createdBy: ___, ...dataToModify } = character;
  dataToModify.updatedAt = now;

  collection.updateOne({ id: character.id }, { $set: dataToModify });
};

const deleteById = async (id: string) => {
  const collection = await getCollection("characters");
  const result = await collection.deleteOne({ id });
  return result.deletedCount > 0;
};

const updateBattleStats = async (
  characterId: string,
  isWin: boolean,
  newElo: number,
) => {
  const collection = await getCollection("characters");
  const now = new Date();

  const updateQuery: {
    $set: { elo: number; updatedAt: Date };
    $inc: { wins?: number; losses?: number };
  } = {
    $set: {
      elo: newElo,
      updatedAt: now,
    },
    $inc: isWin ? { wins: 1 } : { losses: 1 },
  };

  await collection.updateOne({ id: characterId }, updateQuery);
};

const getByClosestElo = async (challengerElo: number, excludeId: string) => {
  const collection = await getCollection("characters");

  const closestCharacters = await collection
    .aggregate([
      { $match: { id: { $ne: excludeId } } },
      {
        $addFields: {
          // elo가 null이면 DEFAULT_ELO으로 처리
          characterElo: { $ifNull: ["$elo", DEFAULT_ELO] },
          eloDifference: {
            $abs: {
              $subtract: [{ $ifNull: ["$elo", DEFAULT_ELO] }, challengerElo],
            },
          },
        },
      },
      { $sort: { eloDifference: 1 } },
      { $limit: 1 },
    ])
    .toArray();

  if (closestCharacters.length === 0) return null;

  const character = closestCharacters[0];
  const validated = CharacterSchema.safeParse(character);

  return validated.success ? validated.data : null;
};

const getTopByElo = async (limit: number = 5) => {
  const collection = await getCollection("characters");

  const topCharacters = await collection
    .find({})
    .sort({ elo: -1 })
    .limit(limit)
    .toArray();

  const validatedData = topCharacters
    .map((data) => CharacterSchema.safeParse(data))
    .filter((result) => result.success)
    .map((result) => result.data);

  return validatedData;
};

const characterDao = {
  getAll,
  getById,
  getRandom,
  getByClosestElo,
  create,
  modify,
  deleteById,
  updateBattleStats,
  getTopByElo,
};
export default characterDao;
