import React from 'react';
import Link from 'next/link';
import branchData from '@/data/keywords.json';
import BranchDetailClient from './BranchDetailClient';

// 1. Next.js 15 규격에 맞춰 서버 컴포넌트 단에서 params를 비동기(Promise)로 안전하게 수신
export default async function BranchPage({ params }) {
  const resolvedParams = await params;
  const currentSlug = decodeURIComponent(resolvedParams.slug);

  // 2. 마스터 데이터에서 현재 슬러그 지점 매칭
  const branch = branchData.find((item) => item.slug === currentSlug);

  // 예외 처리: 일치하는 지점이 없을 때
  if (!branch) {
    return (
      <div style={{ padding: '50px 20px', textAlign: 'center', fontFamily: '"Noto Sans KR", sans-serif' }}>
        <h2 style={{ fontSize: '16px', color: '#1e293b' }}>존재하지 않거나 이전된 센터 페이지입니다.</h2>
        <Link href="/" style={{ color: '#1e40af', fontWeight: 'bold', textDecoration: 'underline', display: 'inline-block', marginTop: '12px' }}>
          🏠 와와학습코칭센터 메인으로 가기
        </Link>
      </div>
    );
  }

  // 3. 복잡한 폼 상태 관리를 위해 클라이언트 영역으로 안전하게 데이터 가이드 패스
  return <BranchDetailClient branch={branch} />;
}