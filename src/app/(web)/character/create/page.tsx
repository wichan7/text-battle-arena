"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type z from "zod";
import characterQuery from "@/queries/characterQuery";
import { CharacterSchema } from "@/schemas/character";

const createFormSchema = CharacterSchema.pick({
  name: true,
  ability: true,
  ultName: true,
  ultAbility: true,
  startMessage: true,
});

type CreateFormValues = z.infer<typeof createFormSchema>;

export default function CreateCharacterPage() {
  const router = useRouter();
  const { mutate, isPending } = characterQuery.useCreateCharacter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormValues>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: "",
      ability: "",
    },
  });

  const onSubmit = (data: CreateFormValues) => {
    mutate(data, {
      onSuccess: () => {
        alert("캐릭터가 생성되었습니다!");
        router.push("/character");
      },
      onError: () => {
        alert("생성 실패: ");
      },
    });
  };

  return (
    <div>
      <h1>새 캐릭터 생성</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 캐릭터 이름 */}
        <div>
          <label>이름 (최대 20자)</label>
          <input {...register("name")} placeholder="캐릭터 이름을 입력하세요" />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        {/* 능력 설명 */}
        <div>
          <label>능력 (최대 150자)</label>
          <textarea
            {...register("ability")}
            placeholder="능력 설명을 입력하세요"
          />
          {errors.ability && <p>{errors.ability.message}</p>}
        </div>

        {/* 궁극기 정보 (Optional 섹션) */}
        <div>
          <div>
            <label>궁극기 이름</label>
            <input {...register("ultName")} />
          </div>
          <div>
            <label>궁극기 능력</label>
            <input {...register("ultAbility")} />
          </div>
        </div>

        {/* 시작 대사 */}
        <div>
          <label>시작 대사</label>
          <input
            {...register("startMessage")}
            placeholder="게임 시작 시 대사"
          />
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? "생성 중..." : "캐릭터 생성하기"}
        </button>
      </form>
    </div>
  );
}
