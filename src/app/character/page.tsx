"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { Character } from "@/app/core/schema/character";

type CharacterWithMongoId = Character & {
  _id?: unknown;
};

async function fetchCharacters(): Promise<Character[]> {
  const response = await fetch("/api/characters");
  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }
  const data = (await response.json()) as CharacterWithMongoId[];
  // MongoDB에서 반환된 데이터를 Character 타입으로 변환
  return data.map((char) => ({
    ...char,
    id: char._id ? String(char._id) : undefined,
  }));
}

export default function CharacterList() {
  const router = useRouter();
  const {
    data: characters,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
  });

  if (isLoading) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>캐릭터 리스트</h1>
        <p>로딩 중...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>캐릭터 리스트</h1>
        <p>에러가 발생했습니다: {error.message}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>캐릭터 리스트</h1>
        <button
          type="button"
          onClick={() => router.push("/character/create")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          캐릭터 생성
        </button>
      </div>

      {characters && characters.length === 0 ? (
        <p>생성된 캐릭터가 없습니다.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          {characters?.map((character) => {
            const charId = character.id || String(character);
            return (
              <button
                key={charId}
                type="button"
                onClick={() => router.push(`/battle?characterId=${charId}`)}
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: "1rem",
                  cursor: "pointer",
                  transition: "box-shadow 0.2s",
                  backgroundColor: "white",
                  textAlign: "left",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {character.profileImgUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={character.profileImgUrl}
                    alt={character.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      marginBottom: "1rem",
                    }}
                  />
                )}
                <h2>{character.name}</h2>
                <p style={{ color: "#666", marginTop: "0.5rem" }}>
                  {character.ability}
                </p>
                {character.startMessage && (
                  <p
                    style={{
                      color: "#999",
                      marginTop: "0.5rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    "{character.startMessage}"
                  </p>
                )}
              </button>
            );
          })}
        </div>
      )}
    </main>
  );
}
