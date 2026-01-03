import type { BattleField } from "@/types/schema";
import battleFieldDao from "./dao";

const getBattleFields = async () => {
  return await battleFieldDao.getAll();
};

const createBattleField = async (battleField: BattleField) => {
  const id = await battleFieldDao.create(battleField);
  const newBattleField = await battleFieldDao.getById(id);

  return newBattleField;
};

const battleFieldService = { getBattleFields, createBattleField };
export default battleFieldService;
