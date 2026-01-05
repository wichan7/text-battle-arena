"use client";

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DEFAULT_ELO } from "@/core/server/elo/eloCalculator";
import characterQuery from "@/queries/characterQuery";

export default function LeaderboardPage() {
  const { data, isLoading } = characterQuery.useGetLeaderboard();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          리더보드
        </Typography>
      </Box>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : data?.result && data.result.length > 0 ? (
        <Card elevation={3}>
          <CardContent>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      등수
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      캐릭터 이름
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      ELO
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.result.map((character, index) => (
                    <TableRow key={character.id} hover>
                      <TableCell align="center">
                        <Typography variant="h6" color="primary">
                          {index + 1}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {character.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {character.elo ?? DEFAULT_ELO}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      ) : (
        <Card elevation={3}>
          <CardContent>
            <Box
              sx={{
                textAlign: "center",
                py: 8,
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                리더보드 데이터가 없습니다
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
