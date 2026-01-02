"use client";

import { useRouter } from "next/navigation";
import characterQuery from "@/queries/characterQuery";

export default function Page() {
  const router = useRouter();
  const { data } = characterQuery.useGetCharacters();

  const goBattlePage = (characterId: string) => {
    router.push(`/battle?${characterId}`);
  };
  const goCreatePage = () => {
    router.push(`/character/create`);
  };

  return (
    <div>
      <button onClick={goCreatePage}>캐릭터 생성</button>
      {data?.result?.map((c) => (
        <div key={c.id}>
          <div>{c.name}</div>
          <button onClick={() => goBattlePage(`${c.id}`)}>배틀</button>
        </div>
      ))}
    </div>
  );
}
