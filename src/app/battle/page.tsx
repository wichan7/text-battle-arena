"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Character } from "@/app/core/schema/character";

type CharacterWithMongoId = Character & {
  _id?: unknown;
};

async function fetchCharacter(id: string): Promise<Character> {
  const response = await fetch(`/api/characters?id=${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch character");
  }
  const data = (await response.json()) as CharacterWithMongoId;
  return {
    ...data,
    id: data._id ? String(data._id) : data.id,
  };
}

export default function Battle() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const characterId = searchParams.get("characterId");
  const [selectedOpponentId, setSelectedOpponentId] = useState<string | null>(
    null,
  );

  const { data: myCharacter, isLoading: isLoadingMy } = useQuery({
    queryKey: ["character", characterId],
    queryFn: () => fetchCharacter(characterId!),
    enabled: !!characterId,
  });

  const { data: allCharacters, isLoading: isLoadingAll } = useQuery({
    queryKey: ["characters"],
    queryFn: async () => {
      const response = await fetch("/api/characters");
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }
      const data = (await response.json()) as CharacterWithMongoId[];
      return data.map((char) => ({
        ...char,
        id: char._id ? String(char._id) : char.id,
      }));
    },
  });

  // 상대 캐릭터 조회
  const { data: opponentCharacter, isLoading: isLoadingOpponent } = useQuery({
    queryKey: ["character", selectedOpponentId],
    queryFn: () => fetchCharacter(selectedOpponentId!),
    enabled: !!selectedOpponentId,
  });

  if (!characterId) {
    return (
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1>배틀</h1>
        <p>캐릭터를 선택해주세요.</p>
        <button
          onClick={() => router.push("/character")}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          캐릭터 리스트로 이동
        </button>
      </main>
    );
  }

  if (isLoadingMy) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>배틀</h1>
        <p>로딩 중...</p>
      </main>
    );
  }

  if (!myCharacter) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>배틀</h1>
        <p>캐릭터를 찾을 수 없습니다.</p>
      </main>
    );
  }

  const availableOpponents = allCharacters?.filter(
    (char) => (char.id || String(char)) !== characterId,
  );

  return (
    <main style={{ padding: "2rem" }}>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>배틀</h1>
        <button
          onClick={() => router.push("/character")}
          style={{ padding: "0.5rem 1rem" }}
        >
          캐릭터 리스트로 이동
        </button>
      </div>

      {!selectedOpponentId ? (
        <div>
          <h2 style={{ marginBottom: "1rem" }}>상대 캐릭터를 선택하세요</h2>
          {isLoadingAll ? (
            <p>로딩 중...</p>
          ) : availableOpponents && availableOpponents.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              {availableOpponents.map((char) => (
                <div
                  key={char.id || String(char)}
                  onClick={() => setSelectedOpponentId(char.id || String(char))}
                  style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    padding: "1rem",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  {char.profileImgUrl && (
                    <img
                      src={char.profileImgUrl}
                      alt={char.name}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        marginBottom: "0.5rem",
                      }}
                    />
                  )}
                  <h3>{char.name}</h3>
                </div>
              ))}
            </div>
          ) : (
            <p>배틀할 상대 캐릭터가 없습니다.</p>
          )}
        </div>
      ) : (
        <div>
          {isLoadingOpponent ? (
            <p>로딩 중...</p>
          ) : opponentCharacter ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
                marginTop: "2rem",
              }}
            >
              {/* 내 캐릭터 */}
              <div
                style={{
                  border: "2px solid #0070f3",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h2 style={{ marginBottom: "1rem", color: "#0070f3" }}>
                  내 캐릭터
                </h2>
                {myCharacter.profileImgUrl && (
                  <img
                    src={myCharacter.profileImgUrl}
                    alt={myCharacter.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      marginBottom: "1rem",
                    }}
                  />
                )}
                <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                  {myCharacter.name}
                </h3>
                <p style={{ color: "#666", marginBottom: "0.5rem" }}>
                  <strong>능력:</strong> {myCharacter.ability}
                </p>
                {myCharacter.startMessage && (
                  <p style={{ color: "#999", fontStyle: "italic" }}>
                    "{myCharacter.startMessage}"
                  </p>
                )}
              </div>

              {/* 상대 캐릭터 */}
              <div
                style={{
                  border: "2px solid #ff6b6b",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h2 style={{ marginBottom: "1rem", color: "#ff6b6b" }}>
                  상대 캐릭터
                </h2>
                {opponentCharacter.profileImgUrl && (
                  <img
                    src={opponentCharacter.profileImgUrl}
                    alt={opponentCharacter.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      marginBottom: "1rem",
                    }}
                  />
                )}
                <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                  {opponentCharacter.name}
                </h3>
                <p style={{ color: "#666", marginBottom: "0.5rem" }}>
                  <strong>능력:</strong> ?
                </p>
                <p style={{ color: "#999", fontStyle: "italic" }}>"?"</p>
              </div>
            </div>
          ) : (
            <p>상대 캐릭터를 찾을 수 없습니다.</p>
          )}

          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <button
              onClick={() => setSelectedOpponentId(null)}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#f0f0f0",
                color: "#333",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "1rem",
              }}
            >
              다른 상대 선택
            </button>
            <button
              onClick={() => {
                // 배틀 시작 로직 (추후 구현)
                alert("배틀 시작 기능은 추후 구현 예정입니다.");
              }}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              배틀 시작
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
