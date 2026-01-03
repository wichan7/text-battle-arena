"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import characterQuery from "@/queries/characterQuery";

export default function Page() {
  const router = useRouter();
  const { data, isLoading } = characterQuery.useGetCharacters();
  const { mutate: deleteCharacter } = characterQuery.useDeleteCharacter();

  const goBattlePage = (characterId: string) => {
    router.push(`/battle?characterId=${characterId}`);
  };
  const goCreatePage = () => {
    router.push(`/character/create`);
  };
  const handleDelete = (characterId: string) => {
    if (confirm("정말 이 캐릭터를 삭제하시겠습니까?")) {
      deleteCharacter(characterId);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          내 캐릭터
        </Typography>
        <Button variant="contained" onClick={goCreatePage} size="large">
          캐릭터 생성
        </Button>
      </Box>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : data?.result && data.result.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {data.result.map((c) => (
            <Card elevation={3} key={c.id}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {c.name}
                </Typography>
                {c.ability && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    능력: {c.ability}
                  </Typography>
                )}
                {c.ultName && (
                  <Typography variant="body2" color="text.secondary">
                    궁극기: {c.ultName}
                  </Typography>
                )}
              </CardContent>
              <CardActions sx={{ gap: 1, flexWrap: "wrap" }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => goBattlePage(c.id ?? "")}
                  sx={{ flex: 1, minWidth: 0 }}
                >
                  배틀 시작
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(c.id ?? "")}
                >
                  삭제
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            border: "2px dashed",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            캐릭터가 없습니다
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            첫 번째 캐릭터를 생성해보세요!
          </Typography>
        </Box>
      )}
    </Container>
  );
}
