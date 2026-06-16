'use client';

import { notFound, useParams } from 'next/navigation';
import keywordsData from '../../data/keywords.json';

export default function ProgressSEOPage() {
  const params = useParams();
  const slug = params?.slug;

  if (!slug) return null;

  const decodedSlug = decodeURIComponent(slug);
  const matchedData = keywordsData.find((item) => item.slug === decodedSlug);

  if (!matchedData) {
    return notFound();
  }

  // 🗺️ 네이버 지도 검색창으로 바로 연결되는 안전한 주소 링크 생성
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(matchedData.지역 + " " + (matchedData.수식어 || "와와학습코칭센터"))}`;

  return (
    <main style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', lineHeight: '1.7', color: '#334155', backgroundColor: '#ffffff' }}>
      
      {/* 🏷️ 상단 카테고리 태그 */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <span style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '6px 14px', borderRadius: '50px', fontSize: '13px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
          {matchedData.수식어 || "명품 교육 안내"}
        </span>
      </div>

      {/* ✍️ 메인 타이틀 헤드라인 */}
      <h1 style={{ fontSize: '28px', color: '#0f172a', textAlign: 'center', marginTop: '16px', fontWeight: '800', letterSpacing: '-1px', wordBreak: 'keep-all' }}>
        {matchedData.지역} {matchedData.과목} 학원 선택, <br/>
        <span style={{ color: '#2563eb' }}>결국 와와학습코칭센터인 이유</span>
      </h1>

      <p style={{ textAlign: 'center', color: '#64748b', fontSize: '15px', marginTop: '10px', marginBottom: '30px' }}>
        우리 아이 맞춤형 1:1 밀착 개별 지도 및 자기주도학습 매니징
      </p>

      {/* 🖼️ 1. 홍보 이미지 영역 (공통 배너 혹은 추후 커스텀 이미지 들어갈 자리) */}
      <div style={{ width: '100%', height: '240px', backgroundColor: '#f1f5f9', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '35px', border: '1px dashed #cbd5e1' }}>
        <span style={{ fontSize: '35px', marginBottom: '10px' }}>🏫</span>
        <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold', color: '#475569' }}>와와학습코칭센터 공식 홍보 영역</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>(여기에 메인 홍보 이미지가 배치될 예정입니다)</p>
      </div>

      {/* 📝 2. 세부 내용 스토리텔링 섹션 */}
      <section style={{ marginBottom: '35px' }}>
        <h2 style={{ fontSize: '18px', color: '#0f172a', fontWeight: '700', marginBottom: '12px', borderLeft: '4px solid #2563eb', paddingLeft: '10px' }}>
          💡 주입식 교육은 가라! {matchedData.지역} 맞춤형 코칭
        </h2>
        <p style={{ fontSize: '15px', color: '#475569', wordBreak: 'keep-all', margin: '0 0 15px 0' }}>
          단순히 강사의 진도만 따라가는 일방향 수업은 아이의 진짜 실력이 되지 않습니다. {matchedData.지역} 와와학습코칭센터에서는 학생이 스스로 문제를 해결할 수 있도록 질문하고 이끄는 <strong>1:1 티칭+코칭 융합 시스템</strong>을 제공합니다.
        </p>
        <p style={{ fontSize: '15px', color: '#475569', wordBreak: 'keep-all', margin: '0' }}>
          특히 철저하게 분석된 {matchedData.지역} 인근 학교들의 최신 내신 출제 경향을 바탕으로, 우리 아이의 취약 과목과 단원을 정밀 분석하여 단 하나의 구멍도 없도록 완벽하게 메꿔나갑니다.
        </p>
      </section>

      <section style={{ marginBottom: '35px', backgroundColor: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
        <h2 style={{ fontSize: '17px', color: '#1e3a8a', fontWeight: '700', marginBottom: '14px', marginTop: '0' }}>
          🎯 {matchedData.과목} 성적 향상을 위한 핵심 포인트
        </h2>
        <ul style={{ paddingLeft: '20px', margin: '0', fontSize: '14.5px', color: '#334155' }}>
          <li style={{ marginBottom: '10px' }}><strong>철저한 개별 진도:</strong> 이해하지 못한 채 넘어가는 진도는 무의미! 이해할 때까지 반복 학습</li>
          <li style={{ marginBottom: '10px' }}><strong>둥지형 밀착 지도:</strong> 언제든 질문하고 피드백을 받을 수 있는 몰입형 면학 분위기 조성</li>
          <li><strong>학습 플래너 관리:</strong> {matchedData.과목} 점수뿐만 아니라, 스스로 공부하는 습관을 만드는 플래닝 코칭</li>
        </ul>
      </section>

      {/* 🗺️ 3. 지역별 지도 확인 버튼 섹션 */}
      <section style={{ marginBottom: '40px', textAlign: 'center', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
        <span style={{ fontSize: '24px' }}>📍</span>
        <h3 style={{ fontSize: '16px', color: '#0f172a', margin: '10px 0 6px 0', fontWeight: '700' }}>
          {matchedData.지역} 상세 위치 및 오시는 길
        </h3>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 15px 0' }}>
          우리 동네 와와학습코칭센터의 정확한 위치를 확인해 보세요.
        </p>
        <a 
          href={naverMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#03c75a', color: '#ffffff', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none' }}
        >
          💚 네이버 지도에서 위치 확인하기
        </a>
      </section>

      {/* 📞 4. 하단 고정형 느낌의 무료 상담 전화 버튼 */}
      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <a 
          href="tel:010-0000-0000" 
          style={{ display: 'block', backgroundColor: '#2563eb', color: '#ffffff', padding: '16px 20px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}
        >
          📞 {matchedData.지역} 1:1 무료 학습진단 상담하기
        </a>
      </div>

    </main>
  );
}