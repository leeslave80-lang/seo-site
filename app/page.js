'use client';

import Link from 'next/link';
import keywordsData from '../data/keywords.json';

export default function HomePage() {
  // 🎯 1. 9,000개 데이터 중 '지역명'이 완벽히 똑같은 중복 항목은 하나만 남기고 싹 제거합니다.
  const uniqueData = [];
  const seenRegions = new Set();

  for (const item of keywordsData) {
    if (!seenRegions.has(item.지역)) {
      seenRegions.add(item.지역);
      uniqueData.push(item);
    }
  }

  // 🎯 2. 메인 정문 화면에는 너무 무겁지 않게 깔끔하게 중복 제거된 대표 지역 16개만 딱 보여줍니다.
  const displayList = uniqueData.slice(0, 16);

  return (
    <main style={{ padding: '0', maxWidth: '540px', margin: '0 auto', fontFamily: '"Noto Sans KR", sans-serif', color: '#1e293b', backgroundColor: '#ffffff', minHeight: '100vh', boxShadow: '0 0 20px rgba(0,0,0,0.05)' }}>
      
      {/* 🏛️ 상단 브랜드 탑 바 */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '18px', textAlign: 'center' }}>
        <h2 style={{ margin: '0', fontSize: '16px', color: '#ffffff', fontWeight: '800', letterSpacing: '1.5px' }}>
          WAWA LEARNING COACHING CENTER
        </h2>
      </div>

      {/* 🏷️ 메인 대형 웰컴 배너 */}
      <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <h1 style={{ fontSize: '24px', color: '#1e3a8a', fontWeight: '800', margin: '0 0 12px 0', letterSpacing: '-1px' }}>
          와와학습코칭센터 전국 지점 안내
        </h1>
        <p style={{ color: '#475569', fontSize: '14px', margin: '0', lineHeight: '1.6', wordBreak: 'keep-all' }}>
          우리아이의 진짜 성적, 메타인지 학습 성향 진단부터 과목별 맞춤 커리큘럼 설계까지 — 1:1 맞춤 코칭으로 안내해 드립니다. <br/>
          아래 동네를 선택하시면 해당 지역의 프리미엄 상세 안내 페이지로 즉시 연결됩니다.
        </p>
      </div>

      {/* 🔗 중복 없이 깔끔하게 연결되는 전국 센터 구역 */}
      <div style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', color: '#0f172a', fontWeight: '700', marginBottom: '16px' }}>
          📍 주요 지역 센터 바로가기 (총 {uniqueData.length}개 행정구역 연동 완료)
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {displayList.map((item, index) => (
            <Link 
              key={index} 
              href={`/${encodeURIComponent(item.slug)}`}
              style={{ display: 'block', padding: '14px 10px', textAlign: 'center', backgroundColor: '#f1f5f9', borderRadius: '10px', color: '#1e3a8a', fontWeight: 'bold', fontSize: '13.5px', textDecoration: 'none', border: '1px solid #edf2f7', boxSizing: 'border-box', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {item.지역} 센터 ➔
            </Link>
          ))}
        </div>

        {/* 💡 공홈 스타일로 깔끔하게 정돈된 하단 안내 문구 */}
        <div style={{ marginTop: '30px', padding: '16px', backgroundColor: '#fafafa', borderRadius: '8px', border: '1px solid #edf2f7', fontSize: '12px', color: '#64748b', lineHeight: '1.5', textAlign: 'center' }}>
          💡 본 페이지는 전국 와와학습코칭센터의 지점별 통합 안내 기지입니다. <br/>
          찾으시는 지역 센터를 선택하시면 <strong>1:1 커리큘럼 및 무료 학습 진단</strong>을 실시간으로 신청하실 수 있습니다.
        </div>
      </div>

      {/* 🏢 최하단 저작권 표기 */}
      <div style={{ textAlign: 'center', padding: '30px 20px', fontSize: '11px', color: '#94a3b8', borderTop: '1px solid #f1f5f9', marginTop: '40px' }}>
        <p style={{ margin: '0' }}>© WAWA Learning Coaching Center. All Rights Reserved.</p>
      </div>

    </main>
  );
}