"use client";

import type { PropsWithChildren } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Fab from "@mui/material/Fab";
import { useRouter } from "next/navigation";
import AuthGuard from "@/core/client/auth/AuthGuard";
import { QueryProvider } from "@/queries/QueryProvider";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

const HomeFab = () => {
  const router = useRouter();

  return (
    <Fab
      color="primary"
      aria-label="home"
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1000,
      }}
      onClick={() => router.push("/character")}
    >
      🏠
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
        </QueryProvider>
      </AuthGuard>
    </ThemeProvider>
  );
};

export default ClientLayout;
