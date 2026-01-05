import type { Character } from "@/types/schema";

/**
 * 승자 판정을 위한 프롬프트 생성
 * @param battleLog 배틀 로그 텍스트
 * @param challenger 도전자 캐릭터
 * @param defender 방어자 캐릭터
 * @returns 승자 판정 프롬프트
 */
export const generateWinnerPrompt = (
  battleLog: string,
  challenger: Character,
  defender: Character,
) => `
전투 로그 분석하여 승자 판정:

도전자: ${challenger.name}
방어자: ${defender.name}

로그:
${battleLog.slice(-200)}

JSON으로만 응답:
\`\`\`json
{"winner": "${challenger.name}", "reason": "승리 이유"}
\`\`\`
또는
\`\`\`json
{"winner": "${defender.name}", "reason": "승리 이유"}
\`\`\`

중요:
1. winner 필드에는 반드시 "${challenger.name}" 또는 "${defender.name}" 중 정확히 하나만 입력
2. JSON 형식 외의 다른 텍스트는 포함하지 말 것
3. 전투 로그의 내용을 바탕으로 객관적으로 판정
`;
