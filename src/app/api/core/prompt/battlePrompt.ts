import type { BattleField } from "@/app/core/schema/battleField";
import type { Character } from "@/app/core/schema/character";

export const genBattlePrompt = (
  character1: Character,
  character2: Character,
  battleField: BattleField,
) => `
전투가 시작될 때 가장 먼저 전장 설명을 출력하고 그 다음에 캐릭터 1과 캐릭터 2의 정보에 작성된 글에 적혀 있는 캐릭터 별 전투시작 문구를 한 줄 한 줄 순서의 상관없이 출력할거야. 
두 캐릭터의 작성된 설명과 전장을 기반으로 대결을 시키고 대결의 내용을 출력해줘.

대결의 내용은 전지적 3인칭 시점으로 작성하고 대결 중간중간 HP바를 텍스트로 출력하여 현재 HP가 얼마나 남았는지 알 수 있게 해줘.
전장이란 캐릭터가 대결을 하는 무대야. 전장의 특성에 따라 캐릭터가 자신의 능력이 증폭될 수도 아니면 불리해질 수도 있어. 두 캐릭터 간의 상성 차이도 전장이 어디냐에 따라서 바뀔 수도 있는 특별한 요소야.
필살기는 대결 중 캐릭터가 사용하는 기술이야. 전투 시작 후 후반부에 두 캐릭터 중 하나가 사용하게 만들어줘. 참고로 낮은 확률로 둘 다 사용할 수도 있고 둘 다 사용 안 할 수도 있어. 필살기 설명에 작성된 글을 기반으로 하여 이모티콘을 사용하지 않고 아스키 아트를 제작하여 대결 중간에 출력하게 만들어줘. 참고로 필살기를 사용한다고 해서 무조건 이기지는 않고 아주 낮은 확률로 쓰지 않은 쪽이 이기는 경우도 만들어줘.
전투 흐름은 한 문단씩 하게 만들거야. 그 상황에 맞춰 체력이 줄어든 캐릭터의 체력바를 텍스트로 출력하게 만들어줘. 그리고 줄어든 수치를 숫자로 표시해줘. 그리고 필살기를 사용한 문단이 출력되면 필살기를 아스키 아트로 표현하여 출력해줘.

캐릭터 설정은 다음과 같아
캐릭터 1 (자신이 작성한 캐릭터)
이름 : ${character1.name}
설명 : ${character1.ability}
필살기명 : 없음
필살기 설명 : 없음
전투시작시 문구 : ${character1.startMessage}

캐릭터 2 (다른 사용자가 작성한 캐릭터)
이름 : ${character2.name}
설명 : ${character2.ability}
필살기명 : 없음
필살기 설명 : 없음
전투시작시 문구 : ${character2.startMessage}

전장 (캐릭터가 싸우는 무대)
전장이름 : ${battleField.name}
전장설명 : ${battleField.description}
`;
