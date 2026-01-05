/**
 * ELO 레이팅 계산 유틸리티
 * 표준 ELO 공식 사용 (K-factor: 32)
 */

const K_FACTOR = 32;

/**
 * 예상 승률 계산
 * @param playerElo 플레이어 ELO
 * @param opponentElo 상대 ELO
 * @returns 예상 승률 (0~1)
 */
function calculateExpectedScore(
  playerElo: number,
  opponentElo: number,
): number {
  return 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
}

/**
 * ELO 업데이트 (승/패만 처리)
 * @param winnerElo 승자 ELO
 * @param loserElo 패자 ELO
 * @returns 업데이트된 ELO 값
 */
export function updateElo(
  winnerElo: number,
  loserElo: number,
): { newWinnerElo: number; newLoserElo: number } {
  const winnerExpected = calculateExpectedScore(winnerElo, loserElo);
  const loserExpected = calculateExpectedScore(loserElo, winnerElo);

  // 승자는 1점, 패자는 0점
  const winnerActualScore = 1;
  const loserActualScore = 0;

  // ELO 변화량 계산
  const winnerEloChange = K_FACTOR * (winnerActualScore - winnerExpected);
  const loserEloChange = K_FACTOR * (loserActualScore - loserExpected);

  // 새로운 ELO 계산
  const newWinnerElo = Math.round(winnerElo + winnerEloChange);
  const newLoserElo = Math.round(loserElo + loserEloChange);

  return {
    newWinnerElo,
    newLoserElo,
  };
}
