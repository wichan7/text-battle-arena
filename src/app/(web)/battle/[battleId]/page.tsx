"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import battleQuery from "@/queries/battleQuery";

export default function BattleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const battleId = params.battleId as string;
  const characterId = searchParams.get("characterId");

  const { mutate, isPending } = battleQuery.useCreateBattle();
  const battle = battleQuery.useGetBattle(battleId);

  const handleNewBattle = () => {
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
          배틀 결과
        </Typography>
      </Box>

      {battle.isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : battle.error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          배틀 정보를 불러오는데 실패했습니다.
        </Alert>
      ) : battle.data?.result?.battleLogs?.[0] ? (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={handleNewBattle}
              disabled={isPending || !characterId}
            >
              {isPending ? "배틀 생성 중..." : "새 배틀 시작"}
            </Button>
          </Box>
          <Box
            sx={{
              "& .w-md-editor": {
                backgroundColor: "transparent",
              },
              "& .wmde-markdown": {
                backgroundColor: "transparent",
                color: "#f5f5f5",
              },
              "& .wmde-markdown p": {
                color: "#f5f5f5",
              },
              "& .wmde-markdown h1, & .wmde-markdown h2, & .wmde-markdown h3, & .wmde-markdown h4, & .wmde-markdown h5, & .wmde-markdown h6":
                {
                  color: "#f5f5f5",
                },
              "& .wmde-markdown code": {
                backgroundColor: "#2a2a2a",
                color: "#f5f5f5",
              },
              "& .wmde-markdown pre": {
                backgroundColor: "#2a2a2a",
                color: "#f5f5f5",
              },
              "& .wmde-markdown blockquote": {
                borderLeftColor: "#6366f1",
                color: "#d1d5db",
              },
              "& .wmde-markdown a": {
                color: "#818cf8",
              },
              "& .wmde-markdown strong": {
                color: "#f5f5f5",
              },
              "& .wmde-markdown em": {
                color: "#e5e7eb",
              },
              "& .wmde-markdown ul, & .wmde-markdown ol": {
                color: "#f5f5f5",
              },
              "& .wmde-markdown li": {
                color: "#f5f5f5",
              },
              "& .wmde-markdown table": {
                color: "#f5f5f5",
              },
              "& .wmde-markdown th, & .wmde-markdown td": {
                borderColor: "#404040",
                color: "#f5f5f5",
              },
            }}
          >
            <MDEditor.Markdown
              data-color-mode="dark"
              style={{ padding: 10 }}
              source={battle.data.result.battleLogs[0]}
            />
          </Box>
        </Paper>
      ) : (
        <Alert severity="info" sx={{ mb: 3 }}>
          배틀 로그가 없습니다.
        </Alert>
      )}
    </Container>
  );
}
