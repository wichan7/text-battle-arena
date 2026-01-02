"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Character } from "@/app/core/schema/character";

async function createCharacter(
  data: Omit<Character, "id" | "createdAt" | "updatedAt">,
): Promise<Character> {
  const response = await fetch("/api/characters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create character");
  }

  return response.json();
}

export default function CreateCharacter() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    ability: "",
    startMessage: "",
    profileImgUrl: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: createCharacter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      router.push("/character");
    },
    onError: (error: Error) => {
      setErrors({ submit: error.message });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // 간단한 유효성 검사
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요";
    }
    if (!formData.ability.trim()) {
      newErrors.ability = "능력을 입력해주세요";
    }
    if (formData.ability.length > 150) {
      newErrors.ability = "능력 설명은 150자 이하여야 합니다";
    }
    if (formData.startMessage && formData.startMessage.length > 50) {
      newErrors.startMessage = "시작 메시지는 50자 이하여야 합니다";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    mutation.mutate({
      name: formData.name.trim(),
      ability: formData.ability.trim(),
      startMessage: formData.startMessage.trim() || undefined,
      profileImgUrl: formData.profileImgUrl.trim() || undefined,
    });
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>캐릭터 생성</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <div>
          <label
            htmlFor="name"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            이름 *
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: errors.name ? "1px solid red" : "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {errors.name && (
            <p
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="ability"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            능력/필살기 * (최대 150자)
          </label>
          <textarea
            id="ability"
            value={formData.ability}
            onChange={(e) =>
              setFormData({ ...formData, ability: e.target.value })
            }
            rows={4}
            maxLength={150}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: errors.ability ? "1px solid red" : "1px solid #ccc",
              borderRadius: "4px",
              resize: "vertical",
            }}
          />
          <p
            style={{
              fontSize: "0.875rem",
              color: "#666",
              marginTop: "0.25rem",
            }}
          >
            {formData.ability.length}/150
          </p>
          {errors.ability && (
            <p
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.ability}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="startMessage"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            시작 메시지 (최대 50자, 선택)
          </label>
          <input
            id="startMessage"
            type="text"
            value={formData.startMessage}
            onChange={(e) =>
              setFormData({ ...formData, startMessage: e.target.value })
            }
            maxLength={50}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: errors.startMessage ? "1px solid red" : "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <p
            style={{
              fontSize: "0.875rem",
              color: "#666",
              marginTop: "0.25rem",
            }}
          >
            {formData.startMessage.length}/50
          </p>
          {errors.startMessage && (
            <p
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.startMessage}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="profileImgUrl"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            프로필 이미지 URL (선택)
          </label>
          <input
            id="profileImgUrl"
            type="url"
            value={formData.profileImgUrl}
            onChange={(e) =>
              setFormData({ ...formData, profileImgUrl: e.target.value })
            }
            placeholder="https://example.com/image.jpg"
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        {errors.submit && (
          <p style={{ color: "red", fontSize: "0.875rem" }}>{errors.submit}</p>
        )}

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#f0f0f0",
              color: "#333",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              flex: 1,
            }}
          >
            취소
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: mutation.isPending ? "#ccc" : "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: mutation.isPending ? "not-allowed" : "pointer",
              flex: 1,
            }}
          >
            {mutation.isPending ? "생성 중..." : "생성"}
          </button>
        </div>
      </form>
    </main>
  );
}
