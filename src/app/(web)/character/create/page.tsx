"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const [error, setError] = useState<string | null>(null);

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
    reValidateMode: "onChange",
  });

  const onSubmit = (data: CreateFormValues) => {
    setError(null);
    mutate(data, {
      onSuccess: () => {
        router.push("/character");
      },
      onError: (err: unknown) => {
        setError(
          err instanceof Error ? err.message : "캐릭터 생성에 실패했습니다.",
        );
      },
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          새 캐릭터 생성
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* 캐릭터 이름 */}
            <TextField
              {...register("name")}
              label="이름"
              placeholder="캐릭터 이름을 입력하세요"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              required
            />

            {/* 능력 설명 */}
            <TextField
              {...register("ability")}
              label="능력"
              placeholder="능력 설명을 입력하세요"
              fullWidth
              multiline
              rows={4}
              error={!!errors.ability}
              helperText={errors.ability?.message}
              required
            />

            {/* 필살기 정보 */}
            <Typography variant="h6" gutterBottom>
              필살기 정보
            </Typography>
            <TextField
              {...register("ultName")}
              label="필살기 이름"
              placeholder="필살기 이름을 입력하세요"
              required
              fullWidth
              error={!!errors.ultName}
              helperText={errors.ultName?.message}
            />
            <TextField
              {...register("ultAbility")}
              label="필살기 능력"
              placeholder="필살기 능력을 입력하세요"
              required
              fullWidth
              error={!!errors.ultAbility}
              helperText={errors.ultAbility?.message}
            />

            {/* 시작 대사 */}
            <TextField
              {...register("startMessage")}
              label="시작 대사"
              placeholder="게임 시작 시 대사"
              fullWidth
              error={!!errors.startMessage}
              helperText={errors.startMessage?.message}
            />

            {/* 버튼 */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => router.back()}
                disabled={isPending}
              >
                취소
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isPending}
                startIcon={isPending ? <CircularProgress size={20} /> : null}
              >
                {isPending ? "생성 중..." : "캐릭터 생성하기"}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
