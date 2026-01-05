"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import battleQuery from "@/queries/battleQuery";

const ContentCopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <title>복사</title>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2" />
  </svg>
);

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const characterId = searchParams.get("characterId");
  const battleId = searchParams.get("battleId");
  const [copySuccess, setCopySuccess] = useState(false);

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

  const handleClickBattle = () => {
    if (characterId) {
      mutate(characterId, {
        onSuccess: ({ result }) => {
          router.replace(`/battle/${result}?characterId=${characterId}`);
        },
      });
    }
  };

  const handleNewBattle = () => {
    if (characterId) {
      mutate(characterId, {
        onSuccess: ({ result }) => {
          router.replace(`/battle/${result}?characterId=${characterId}`);
        },
      });
    }
  };

  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setCopySuccess(true);
    } catch (err) {
      console.error("링크 복사 실패:", err);
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
          <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            <Tooltip title="링크 복사">
              <IconButton
                onClick={handleCopyLink}
                color="primary"
                aria-label="링크 복사"
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
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
            {isPending ? loadingTexts[loadingTextIndex] : "새 배틀 시작"}
          </Button>
        </Paper>
      )}

      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setCopySuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          링크가 복사되었습니다!
        </Alert>
      </Snackbar>
    </Container>
  );
}
