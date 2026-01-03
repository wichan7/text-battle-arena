"use client";

import CssBaseline from "@mui/material/CssBaseline";
import Fab from "@mui/material/Fab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { usePathname, useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
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
