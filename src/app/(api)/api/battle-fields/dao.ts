import { getCollection } from "@/core/server/db/mongo";
import { BattleFieldSchema } from "@/schemas/battleField";
import type { BattleField } from "@/types/schema";

const create = async (battleField: Omit<BattleField, "id">) => {
  const collection = await getCollection("battleFields");
  const id = crypto.randomUUID();
  const now = new Date();

  await collection.insertOne({
    ...battleField,
    id,
    createdAt: now,
    updatedAt: now,
  });

  return id;
};

const getById = async (id: string) => {
  const collection = await getCollection("battleFields");

  const battleField = await collection.findOne({ id });
  const validated = BattleFieldSchema.safeParse(battleField);

  return validated.success ? validated.data : null;
};

const getRandom = async () => {
  const collection = await getCollection("battleFields");

  const randomBattleFields = await collection
    .aggregate([{ $sample: { size: 1 } }])
    .toArray();

  if (randomBattleFields.length === 0) return null;

  const battleField = randomBattleFields[0];
  const validated = BattleFieldSchema.safeParse(battleField);

  return validated.success ? validated.data : null;
};

const getAll = async () => {
  const collection = await getCollection("battleFields");
  const battleFields = await collection.find({}).toArray();

  const validatedData = battleFields
    .map((data) => BattleFieldSchema.safeParse(data))
    .filter((result) => result.success)
    .map((result) => result.data);

  return validatedData;
};

const battleFieldDao = { create, getById, getRandom, getAll };
export default battleFieldDao;
