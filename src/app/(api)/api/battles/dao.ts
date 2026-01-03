import { getCollection } from "@/core/server/db/mongo";
import { BattleSchema } from "@/schemas/battle";
import type { Battle } from "@/types/schema";

const getById = async (battleId: string) => {
  const collection = await getCollection("battles");

  const battle = await collection.findOne({ id: battleId });
  console.log(battle);

  const validated = BattleSchema.safeParse(battle);

  return validated.success ? validated.data : null;
};

const create = async (battle: Battle) => {
  const collection = await getCollection("battles");
  const id = crypto.randomUUID();
  const now = new Date();

  await collection.insertOne({
    ...battle,
    id,
    createdAt: now,
    updatedAt: now,
  });

  return id;
};

const battleDao = { getById, create };
export default battleDao;
