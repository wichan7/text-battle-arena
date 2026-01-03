import { chat } from "@/core/server/llm/gemini";
import { generateBattlePrompt } from "@/core/server/prompt/battlePrompt";
import battleFieldDao from "../battle-fields/dao";
import characterDao from "../characters/dao";
import battleDao from "./dao";

const getBattleById = async (battleId: string) => {
  const battle = await battleDao.getById(battleId);
  return battle;
};

const createBattle = async (userId: string, challengerId: string) => {
  const challenger = await characterDao.getById(challengerId);
  const defender = await characterDao.getRandom(challengerId); // parameter: excludeId
  const battleField = await battleFieldDao.getRandom();

  if (!challenger || !defender || !battleField) {
    return null;
  }
  const prompt = generateBattlePrompt(challenger, defender, battleField);
  const result = await chat(prompt);

  if (result) {
    return await battleDao.create({
      challengerId: challenger.id!,
      defenderId: defender.id!,
      battleLogs: [result],
      createdBy: userId,
      updatedBy: userId,
    });
  }

  return null;
};

const battleService = { getBattleById, createBattle };
export default battleService;
