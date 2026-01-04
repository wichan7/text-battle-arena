"use client";

import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import userQuery from "@/queries/userQuery";

export default function Home() {
  const { mutate, isPending } = userQuery.useJoin();
  const router = useRouter();

  const onClickJoin = () => {
    mutate(undefined, {
      onSuccess: () => {
        router.push("/character");
      },
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: 3,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            width: "100%",
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            텍스트 배틀 아레나
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            캐릭터를 생성하고 다른 캐릭터와 배틀을 시작하세요!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={onClickJoin}
            disabled={isPending}
            sx={{ mt: 2, minWidth: 200 }}
          >
            {isPending ? "가입 중..." : "게스트로 시작하기"}
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
