import type { BattleField } from "@/app/types/schema";
import { getCollection } from "@/core/server/db/mongo";
import { BattleFieldSchema } from "@/schemas/battleField";

const create = async (battleField: BattleField) => {
  const collection = await getCollection("battleFields");
  const now = new Date();
  await collection.insertOne({
    ...battleField,
    createdAt: now,
    updatedAt: now,
  });
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

const battleFieldDao = { create, getAll };
export default battleFieldDao;
