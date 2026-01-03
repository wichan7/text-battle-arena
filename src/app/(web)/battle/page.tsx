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
import { useRouter, useSearchParams } from "next/navigation";
import battleQuery from "@/queries/battleQuery";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const characterId = searchParams.get("characterId");
  const battleId = searchParams.get("battleId");

  const { mutate, isPending } = battleQuery.useCreateBattle();
  const battle = battleQuery.useGetBattle(battleId);

  const handleClickBattle = () => {
    if (characterId) {
      mutate(characterId, {
        onSuccess: ({ result }) => {
          router.replace(
            `/battle?characterId=${characterId}&battleId=${result}`,
          );
        },
      });
    }
  };

  const handleNewBattle = () => {
    if (characterId) {
      mutate(characterId, {
        onSuccess: ({ result }) => {
          router.replace(
            `/battle?characterId=${characterId}&battleId=${result}`,
          );
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
        <Button
          variant="contained"
          startIcon={isPending ? <CircularProgress size={20} /> : null}
          onClick={handleClickBattle}
          disabled={isPending || !characterId}
        >
          {isPending ? "배틀 생성 중..." : "새 배틀 시작"}
        </Button>
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
              새 배틀
            </Button>
          </Box>
          <Box
            sx={{
              "& .w-md-editor": {
                backgroundColor: "transparent",
              },
              "& .wmde-markdown": {
                backgroundColor: "transparent",
              },
            }}
          >
            <MDEditor.Markdown
              style={{ padding: 10 }}
              source={battle.data.result.battleLogs[0]}
            />
          </Box>
        </Paper>
      ) : (
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
            배틀 시작하기
          </Button>
        </Paper>
      )}
    </Container>
  );
}
