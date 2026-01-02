import type { Metadata } from "next";
import "./globals.css";
import { SessionGuard } from "./components/SessionGuard";
import { QueryProvider } from "./providers/QueryProvider";

export const metadata: Metadata = {
  title: "텍스트 배틀 아레나",
  description: "캐치프레이즈..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <SessionGuard>{children}</SessionGuard>
        </QueryProvider>
      </body>
    </html>
  );
}
