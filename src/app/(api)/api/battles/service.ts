import { chat } from "@/core/server/llm/gemini";
import { generateBattlePrompt } from "@/core/server/prompt/battlePrompt";
import battleFieldDao from "../battle-fields/dao";
import characterDao from "../characters/dao";

const createBattle = async (challengerId: string) => {
  const challenger = await characterDao.getById(challengerId);
  const defender = await characterDao.getRandom(challengerId); // parameter: excludeId
  const battleField = await battleFieldDao.getRandom();

  if (!challenger || !defender || !battleField) {
    return null;
  }
  const prompt = generateBattlePrompt(challenger, defender, battleField);
  const result = chat(prompt);

  return result;
};

const battleService = { createBattle };
export default battleService;
