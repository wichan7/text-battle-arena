"use client";

import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import battleQuery from "@/queries/battleQuery";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const characterId = searchParams.get("characterId");

  const { mutate, isPending } = battleQuery.useCreateBattle();

  const handleClickBattle = () => {
    if (characterId) {
      mutate(characterId, {
        onSuccess: ({ result }) => {
          router.replace(`/battle/${result}?characterId=${characterId}`);
        },
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          배틀
        </Typography>
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 8,
          textAlign: "center",
          border: "2px dashed",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          배틀이 시작되지 않았습니다
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          배틀을 시작하려면 아래 버튼을 클릭하세요.
        </Typography>
        <Button
          variant="contained"
          onClick={handleClickBattle}
          disabled={isPending || !characterId}
          size="large"
        >
          {isPending ? "배틀 생성 중..." : "새 배틀 시작"}
        </Button>
      </Paper>
    </Container>
  );
}
