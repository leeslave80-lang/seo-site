'use client';

import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <title>와와학습코칭센터 | 전국 지점 통합 안내 기지</title>
        <meta name="description" content="우리아이 진짜 성적, 메타인지 학습 성향 진단부터 과목별 맞춤 커리큘럼 설계까지 — 1:1 맞춤 코칭으로 안내해 드립니다." />
        
        <meta property="og:title" content="와와학습코칭센터 - 우리동네 1:1 맞춤 코칭 학원" />
        <meta property="og:description" content="전국 와와학습코칭센터의 지점별 커리큘럼 안내 및 무료 학습 진단 실시간 신청" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600" />
        <meta property="og:url" content="https://wawacoaching.co.kr/" />
        <meta property="og:type" content="website" />

        {/* 🔍 [네이버 소유주 인증 칩] */}
        <meta name="naver-site-verification" content="f8796f7c10b27dbf81216a695b2c7e0c7104f056" />

        {/* 🔍 [구글 소유주 인증 칩] 상훈님이 발급받으신 진짜 코드로 탑재 완료! */}
        <meta name="google-site-verification" content="kHk0DxVTGG9OB1uHNXiXtDRfCgrrOufrKx9LaMbwooo" />
      </head>
      <body style={{ margin: 0, backgroundColor: '#f3f4f6' }}>
        {children}
      </body>
    </html>
  );
}