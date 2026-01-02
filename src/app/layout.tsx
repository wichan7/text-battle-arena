import ClientLayout from "./ClientLayout";
import "./globals.css";

import type { Metadata } from "next";

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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
