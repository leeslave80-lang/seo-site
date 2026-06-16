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

  // 🗺️ 네이버 지도 공식 검색 연동
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(matchedData.지역 + " 와와학습코칭센터")}`;

  return (
    <main style={{ padding: '0', maxWidth: '540px', margin: '0 auto', fontFamily: '"Noto Sans KR", sans-serif', color: '#1e293b', backgroundColor: '#ffffff', minHeight: '100vh', boxShadow: '0 0 20px rgba(0,0,0,0.05)' }}>
      
      {/* 🏛️ 본사 스타일 상단 탑 바 */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px', textAlign: 'center', borderBottom: '3px solid #e2e8f0' }}>
        <h2 style={{ margin: '0', fontSize: '15px', color: '#ffffff', fontWeight: '700', letterSpacing: '1px' }}>
          WAWA LEARNING COACHING CENTER
        </h2>
      </div>

      {/* 🏷️ 메인 비주얼 배너 영역 (공식 이미지/로고 활용 구역) */}
      <div style={{ padding: '30px 20px', textAlign: 'center', backgroundColor: '#f8fafc', backgroundImage: 'linear-gradient(to bottom, #f8fafc, #edf2f7)' }}>
        <span style={{ backgroundColor: '#1e3a8a', color: '#ffffff', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
          {matchedData.수식어 || "공식 인증 점포"}
        </span>
        <h1 style={{ fontSize: '26px', color: '#1e3a8a', marginTop: '16px', fontWeight: '800', lineHeight: '1.4', letterSpacing: '-1px', wordBreak: 'keep-all' }}>
          {matchedData.지역} {matchedData.과목} 학부모가 <br/>
          가장 신뢰하는 <span style={{ color: '#b45309' }}>와와학습코칭학원</span>
        </h1>
        <p style={{ color: '#475569', fontSize: '14px', marginTop: '8px', fontWeight: '400' }}>
          둥지형 밀착 지도 시스템과 자기주도학습의 완벽한 융합
        </p>

        {/* 🖼️ 이미지 공간: 본사 메인 전경 또는 로고 이미지 */}
        <div style={{ marginTop: '20px', width: '100%', height: '200px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #cbd5e1' }}>
          <img 
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80" 
            alt="와와학습코칭센터 공식 수업 전경"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {/* 📝 핵심 가치 세부 문구 */}
        <section style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '18px', color: '#1e3a8a', fontWeight: '700', marginBottom: '10px' }}>
            ✨ 단 한 명을 위한 맞춤형 '둥지형 코칭 시스템'
          </h3>
          <p style={{ fontSize: '14.5px', lineHeight: '1.7', color: '#334155', margin: '0', wordBreak: 'keep-all' }}>
            기존의 판서식 대형 학원처럼 진도만 빼고 끝나는 수업은 아이의 진짜 실력이 될 수 없습니다. 
            <strong>{matchedData.지역} 와와학습코칭센터</strong>는 개별 진단 테스트를 통해 
            아이의 현재 수준과 성향을 정밀 분석한 뒤, {matchedData.과목} 취약 단원을 완벽하게 보완하는 1:1 맞춤형 피드백 수업을 고집합니다.
          </p>
        </section>

        {/* 📊 공식 커리큘럼 안내 그리드 */}
        <section style={{ marginBottom: '30px', backgroundColor: '#f1f5f9', padding: '20px', borderRadius: '8px' }}>
          <h4 style={{ fontSize: '15px', color: '#1e3a8a', fontWeight: '700', margin: '0 0 12px 0' }}>
            📈 {matchedData.지역} 와와만의 3단계 성장 프로세스
          </h4>
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '8px' }}><strong>1. 맞춤형 과목 지도 :</strong> 내신 및 모의고사 철저 대비</div>
            <div style={{ marginBottom: '8px' }}><strong>2. 학습 플래너 관리 :</strong> 스스로 계획하고 실행하는 자기주도력 배양</div>
            <div><strong>3. 1:1 밀착 피드백 :</strong> 오답 노트와 밀착 질의응답을 통한 완벽 습득</div>
          </div>
        </section>

        {/* 🗺️ 지역별 공식 지도 섹션 */}
        <section style={{ marginBottom: '35px', textAlign: 'center', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#fafafa' }}>
          <div style={{ fontSize: '20px', marginBottom: '6px' }}>📍</div>
          <h4 style={{ fontSize: '15px', color: '#1e3a8a', margin: '0 0 4px 0', fontWeight: '700' }}>
            {matchedData.지역} 와와학습코칭학원 위치 확인
          </h4>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0' }}>
            인근 학교별 전용 내신 분석실 및 면학 공간 완비
          </p>
          <a 
            href={naverMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', backgroundColor: '#03c75a', color: '#ffffff', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}
          >
            네이버 지도에서 보기
          </a>
        </section>

        {/* 📞 최하단 다이렉트 문의 연동 버튼 */}
        <div style={{ marginTop: '20px' }}>
          <a 
            href="tel:010-0000-0000" 
            style={{ display: 'block', backgroundColor: '#1e3a8a', color: '#ffffff', padding: '16px', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'center', boxShadow: '0 4px 6px rgba(30, 58, 138, 0.2)' }}
          >
            📞 {matchedData.지역} 센터 무료 학습상담 연결
          </a>
        </div>
      </div>

    </main>
  );
}