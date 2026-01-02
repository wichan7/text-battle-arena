import "./globals.css";

import type { Metadata } from "next";
import { QueryProvider } from "../queries/QueryProvider";

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
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
