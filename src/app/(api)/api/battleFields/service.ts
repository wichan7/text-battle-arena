import type { BattleField } from "@/app/types/schema";
import battleFieldDao from "./dao";

const getBattleFields = async () => {
  return await battleFieldDao.getAll();
};

const createBattleField = async (battleField: BattleField) => {
  await battleFieldDao.create(battleField);
};

const battleFieldService = { getBattleFields, createBattleField };
export default battleFieldService;
