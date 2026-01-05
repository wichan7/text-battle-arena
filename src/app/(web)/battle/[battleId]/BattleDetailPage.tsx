"use client";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import battleQuery from "@/queries/battleQuery";
import characterQuery from "@/queries/characterQuery";
import { useAuthStore } from "@/stores/useAuthStore";

interface BattleDetailPageProps {
  battleId: string;
}

export default function BattleDetailPage({ battleId }: BattleDetailPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = useAuthStore((state) => state.accessToken);
  const characterId = searchParams.get("characterId");

  const { mutate, isPending } = battleQuery.useCreateBattle();
  const battle = battleQuery.useGetBattle(battleId);

  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const loadingTexts = [
    "배틀 생성 중...",
    "치열한 전투 중...",
    "스킬 준비 중...",
    "공격력 계산 중...",
    "전투 결과 분석 중...",
  ];

  useEffect(() => {
    if (!isPending) {
      setLoadingTextIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setLoadingTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPending]);

  const challengerId = battle.data?.result?.challengerId;
  const defenderId = battle.data?.result?.defenderId;
  const winnerId = battle.data?.result?.winnerId;

  const challenger = characterQuery.useGetCharacter(challengerId || null);
  const defender = characterQuery.useGetCharacter(defenderId || null);

  const handleNewBattle = () => {
    if (!accessToken) {
      router.push("/");
      return;
    }

    if (characterId) {
      mutate(characterId, {
        onSuccess: ({ result }) => {
          router.replace(`/battle/${result}?characterId=${characterId}`);
        },
      });
    }
  };

  const isLoadingCharacters = challenger.isLoading || defender.isLoading;
  const challengerData = challenger.data?.result;
  const defenderData = defender.data?.result;

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

      {/* 캐릭터 정보 카드 */}
      {!battle.isLoading && challengerId && defenderId && (
        <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
          {isLoadingCharacters ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : challengerData && defenderData ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                alignItems: "center",
              }}
            >
              {/* 도전자 */}
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 0" } }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      src={challengerData.profileImgUrl}
                      sx={{
                        width: 48,
                        height: 48,
                      }}
                    >
                      {challengerData.name?.[0] || "?"}
                    </Avatar>
                    <Typography variant="h6" component="h2" fontWeight={500}>
                      {challengerData.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    ELO {challengerData.elo || 1500}
                  </Typography>
                </Box>
              </Box>

              {/* VS */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  px: 2,
                }}
              >
                <Typography
                  variant="body1"
                  component="span"
                  color="text.secondary"
                  fontWeight={500}
                >
                  VS
                </Typography>
              </Box>

              {/* 방어자 */}
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 0" } }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      src={defenderData.profileImgUrl}
                      sx={{
                        width: 48,
                        height: 48,
                      }}
                    >
                      {defenderData.name?.[0] || "?"}
                    </Avatar>
                    <Typography variant="h6" component="h2" fontWeight={500}>
                      {defenderData.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    ELO {defenderData.elo || 1500}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ) : null}
        </Paper>
      )}

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
              {isPending ? loadingTexts[loadingTextIndex] : "새 배틀 시작"}
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

      {/* 승패 정보 */}
      {!battle.isLoading &&
        winnerId &&
        challengerData &&
        defenderData &&
        battle.data?.result?.battleLogs?.[0] && (
          <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {challengerData.name}
                </Typography>
                <Chip
                  label={
                    winnerId === challengerId
                      ? "승리"
                      : winnerId === defenderId
                        ? "패배"
                        : "무승부"
                  }
                  color={winnerId === challengerId ? "success" : "default"}
                  size="small"
                />
                <Typography variant="caption" color="text.secondary">
                  {challengerData.wins || 0}승 {challengerData.losses || 0}패
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {defenderData.name}
                </Typography>
                <Chip
                  label={
                    winnerId === defenderId
                      ? "승리"
                      : winnerId === challengerId
                        ? "패배"
                        : "무승부"
                  }
                  color={winnerId === defenderId ? "success" : "default"}
                  size="small"
                />
                <Typography variant="caption" color="text.secondary">
                  {defenderData.wins || 0}승 {defenderData.losses || 0}패
                </Typography>
              </Box>
            </Box>
          </Paper>
        )}
    </Container>
  );
}
