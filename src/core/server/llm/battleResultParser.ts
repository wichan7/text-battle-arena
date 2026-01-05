/**
 * 배틀 로그에서 JSON 형식의 승자 정보 추출
 * @param battleLog 배틀 로그 텍스트 (마크다운 + JSON 포함)
 * @param challengerName 도전자 이름
 * @param defenderName 방어자 이름
 * @returns "challenger" | "defender" | null
 */
export function extractWinner(
  battleLog: string,
  challengerName: string,
  defenderName: string,
): "challenger" | "defender" | null {
  // JSON 코드 블록 추출
  const jsonBlockMatch = battleLog.match(/```json\s*([\s\S]*?)\s*```/i);

  if (jsonBlockMatch) {
    try {
      const jsonText = jsonBlockMatch[1].trim();
      const result = JSON.parse(jsonText);

      if (result.winner) {
        const winnerName = result.winner.trim();

        // 정확한 이름 매칭
        if (winnerName === challengerName) {
          return "challenger";
        }
        if (winnerName === defenderName) {
          return "defender";
        }

        // 대소문자 무시 매칭 (fallback)
        const winnerLower = winnerName.toLowerCase();
        const challengerLower = challengerName.toLowerCase();
        const defenderLower = defenderName.toLowerCase();

        if (winnerLower === challengerLower) {
          return "challenger";
        }
        if (winnerLower === defenderLower) {
          return "defender";
        }
      }
    } catch (error) {
      console.error("JSON 파싱 실패:", error);
    }
  }

  // JSON 블록이 없거나 파싱 실패 시, 일반 코드 블록에서 JSON 찾기
  const codeBlockMatch = battleLog.match(/```\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch) {
    const codeContent = codeBlockMatch[1].trim();
    // JSON 형식인지 확인
    if (codeContent.startsWith("{") && codeContent.includes("winner")) {
      try {
        const result = JSON.parse(codeContent);
        if (result.winner) {
          const winnerName = result.winner.trim();
          if (
            winnerName === challengerName ||
            winnerName.toLowerCase() === challengerName.toLowerCase()
          ) {
            return "challenger";
          }
          if (
            winnerName === defenderName ||
            winnerName.toLowerCase() === defenderName.toLowerCase()
          ) {
            return "defender";
          }
        }
      } catch {
        // JSON 파싱 실패 시 무시
      }
    }
  }

  // JSON을 찾지 못한 경우 null 반환
  return null;
}
