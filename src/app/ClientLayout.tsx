"use client";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeIcon from "@mui/icons-material/Home";
import CssBaseline from "@mui/material/CssBaseline";
import Fab from "@mui/material/Fab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { usePathname, useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import AuthGuard from "@/core/client/auth/AuthGuard";
import { QueryProvider } from "@/queries/QueryProvider";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
    },
    secondary: {
      main: "#ec4899",
      light: "#f472b6",
      dark: "#db2777",
    },
    background: {
      default: "#0a0a0a",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#f5f5f5",
      secondary: "#a3a3a3",
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#1a1a1a",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.3)",
          "&:hover": {
            boxShadow: "0 6px 20px 0 rgba(99, 102, 241, 0.4)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#1a1a1a",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "rgba(99, 102, 241, 0.5)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 24px rgba(99, 102, 241, 0.2)",
          },
        },
      },
    },
  },
});

const HomeFab = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";

  return isHome ? null : (
    <Fab
      color="primary"
      aria-label="home"
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1000,
        boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.3)",
        "&:hover": {
          boxShadow: "0 6px 20px 0 rgba(99, 102, 241, 0.4)",
          transform: "scale(1.05)",
        },
        transition: "all 0.3s ease",
      }}
      onClick={() => router.push("/character")}
    >
      <HomeIcon />
    </Fab>
  );
};

const LeaderboardFab = () => {
  const router = useRouter();

  return (
    <Fab
      color="secondary"
      aria-label="leaderboard"
      sx={{
        position: "fixed",
        bottom: 96,
        right: 24,
        zIndex: 1000,
        boxShadow: "0 4px 14px 0 rgba(236, 72, 153, 0.3)",
        "&:hover": {
          boxShadow: "0 6px 20px 0 rgba(236, 72, 153, 0.4)",
          transform: "scale(1.05)",
        },
        transition: "all 0.3s ease",
      }}
      onClick={() => router.push("/leaderboard")}
    >
      <EmojiEventsIcon />
    </Fab>
  );
};

const ClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthGuard>
        <QueryProvider>
          {children}
          <HomeFab />
          <LeaderboardFab />
        </QueryProvider>
      </AuthGuard>
    </ThemeProvider>
  );
};

export default ClientLayout;
