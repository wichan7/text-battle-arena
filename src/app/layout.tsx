import ClientLayout from "./ClientLayout";
import "./globals.css";

import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-kr",
});

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
      <body className={notoSansKr.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
