"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "@/app/core/hooks/useSession";

export default function Home() {
  const { sessionId, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && sessionId) {
      // 세션 ID가 생성되면 캐릭터 리스트 페이지로 이동
      router.push("/character");
    }
  }, [sessionId, isLoading, router]);

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>텍스트 배틀 아레나</h1>
      {isLoading ? (
        <p>세션을 초기화하는 중...</p>
      ) : (
        <p>세션 ID가 생성되었습니다. 잠시 후 이동합니다...</p>
      )}
    </main>
  );
}
