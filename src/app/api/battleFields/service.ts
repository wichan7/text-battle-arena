import type { BattleField } from "@/app/core/schema/battleField";
import battleFieldDao from "./dao";

const getBattleFields = async () => {
  return await battleFieldDao.getAll();
};

const createBattleField = async (battleField: BattleField) => {
  await battleFieldDao.create(battleField);
};

const battleFieldService = { getBattleFields, createBattleField };
export default battleFieldService;
