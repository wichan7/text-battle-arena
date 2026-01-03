"use client";

import MDEditor from "@uiw/react-md-editor";
import { useRouter, useSearchParams } from "next/navigation";
import battleQuery from "@/queries/battleQuery";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const characterId = searchParams.get("characterId");
  const battleId = searchParams.get("battleId");

  const { mutate } = battleQuery.useCreateBattle();
  const battle = battleQuery.useGetBattle(battleId);

  const handleClickBattle = () => {
    if (characterId) {
      mutate(characterId, {
        onSuccess: ({ result }) => {
          router.replace(
            `/battle?characterId=${characterId}&battleId=${result}`,
          );
        },
      });
    }
  };

  return (
    <div>
      <button onClick={handleClickBattle}>do battle</button>
      {battle.data?.result?.battleLogs?.[0] && (
        <div>
          <MDEditor.Markdown
            style={{ padding: 10 }}
            source={battle.data.result.battleLogs[0]}
          />
        </div>
      )}
    </div>
  );
}
