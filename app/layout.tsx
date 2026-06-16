import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🌟 네이버 소유권 확인 코드는 100% 정상 작동하도록 그대로 유지!
export const metadata: Metadata = {
  title: "와와학습코칭센터",
  description: "맞춤형 개별 지도 학원",
  verification: {
    other: {
      "naver-site-verification": "f02be3672f11327086d7cf03a6ed1a622dccc5fc",
    },
  },
};

// 🌟 괄호 충돌이 전혀 없는 정석 구조로 변경했습니다.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}