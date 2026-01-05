import { DEFAULT_ELO, updateElo } from "@/core/server/elo/eloCalculator";
import { extractWinner } from "@/core/server/llm/battleResultParser";
import { chat } from "@/core/server/llm/gemini";
import { generateBattlePrompt } from "@/core/server/prompt/battlePrompt";
import { generateWinnerPrompt } from "@/core/server/prompt/winnerPrompt";
import battleFieldDao from "../battle-fields/dao";
import characterDao from "../characters/dao";
import battleDao from "./dao";

const getBattleById = async (battleId: string) => {
  const battle = await battleDao.getById(battleId);
  return battle;
};

const createBattle = async (userId: string, challengerId: string) => {
  const challenger = await characterDao.getById(challengerId);
  const challengerElo = challenger?.elo ?? DEFAULT_ELO;
  const defender = await characterDao.getByClosestElo(
    challengerElo,
    challengerId,
  );
  const battleField = await battleFieldDao.getRandom();

  if (!challenger || !defender || !battleField) {
    return null;
  }

  // 1. 배틀 시뮬레이션 생성
  const battlePrompt = generateBattlePrompt(challenger, defender, battleField);
  const battleLog = await chat(battlePrompt);

  if (!battleLog) {
    return null;
  }

  // 2. 승자 판정 (별도 LLM 호출)
  const winnerPrompt = generateWinnerPrompt(battleLog, challenger, defender);
  const winnerResult = await chat(winnerPrompt);
  const winner = winnerResult
    ? extractWinner(winnerResult, challenger.name, defender.name)
    : null;

  let winnerId: string | null = null;

  // 3. 승자가 결정된 경우 ELO 업데이트
  if (winner === "challenger" || winner === "defender") {
    const challengerElo = challenger.elo ?? DEFAULT_ELO;
    const defenderElo = defender.elo ?? DEFAULT_ELO;

    const { newWinnerElo, newLoserElo } =
      winner === "challenger"
        ? updateElo(challengerElo, defenderElo)
        : updateElo(defenderElo, challengerElo);

    // 승자 ID 설정
    winnerId = winner === "challenger" ? challenger.id! : defender.id!;

    // ELO 및 통계 업데이트
    await characterDao.updateBattleStats(
      challenger.id!,
      winner === "challenger",
      winner === "challenger" ? newWinnerElo : newLoserElo,
    );
    await characterDao.updateBattleStats(
      defender.id!,
      winner === "defender",
      winner === "defender" ? newWinnerElo : newLoserElo,
    );
  }

  // 4. 배틀 생성 (배틀 로그만 저장, JSON 제외)
  return await battleDao.create({
    challengerId: challenger.id!,
    defenderId: defender.id!,
    battleLogs: [battleLog],
    winnerId,
    createdBy: userId,
    updatedBy: userId,
  });
};

const battleService = { getBattleById, createBattle };
export default battleService;
