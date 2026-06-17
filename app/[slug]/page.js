import React from 'react';
import Link from 'next/link';
// 💡 경로 꼬임을 완벽하게 방지하기 위해 상대경로 구조로 확실하게 연동
import branchData from '../../data/keywords.json';

// Next.js 빌드 엔진이 요구하는 가장 보편적이고 안전한 Props 기본 타입 명세 적용
export default async function BranchDetail(props) {
  // 1. 컴파일러가 시비 걸지 못하도록 props를 await 처리하여 파라미터 추출
  const resolvedProps = await props;
  const params = await resolvedProps.params;
  const currentSlug = decodeURIComponent(params.slug);

  // 2. 마스터 DB에서 현재 주소와 딱 맞아떨어지는 지점 확인
  const branch = branchData.find((item) => item.slug === currentSlug);

  // 예외 처리: 데이터가 매칭되지 않을 때의 행선지
  if (!branch) {
    return (
      <div style={{ padding: '50px 20px', textAlign: 'center', fontFamily: '"Noto Sans KR", sans-serif' }}>
        <h2 style={{ fontSize: '15px', color: '#1e293b' }}>존재하지 않거나 이전된 센터 페이지입니다.</h2>
        <Link href="/" style={{ color: '#1e40af', fontWeight: 'bold', textDecoration: 'underline' }}>
          🏠 와와학습코칭센터 메인으로 가기
        </Link>
      </div>
    );
  }

  // 💰 [요구사항 2번] 제주 거점 주소 유무에 따른 수강료 요율 차등 분기 연동
  const isJeju = branch.주소 && branch.주소.includes('제주');
  const priceTable = isJeju 
    ? { elementary: '60,000원', middle: '65,000원', high: '75,000원', desc: '제주 거점 프리미엄 교육비 요율 적용' }
    : { elementary: '70,000원', middle: '75,000원', high: '85,000원', desc: '수도권 및 광역 표준 교육비 요율 적용' };

  return (
    <main style={{ padding: '0', maxWidth: '540px', margin: '0 auto', fontFamily: '"Noto Sans KR", sans-serif', color: '#1e293b', backgroundColor: '#ffffff', minHeight: '100vh', boxShadow: '0 0 20px rgba(0,0,0,0.05)', boxSizing: 'border-box' }}>
      
      {/* 고정 탑 헤더 레이아웃 */}
      <div style={{ backgroundColor: '#1e40af', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>🔙</Link>
        <h1 style={{ margin: '0', fontSize: '14px', color: '#ffffff', fontWeight: '800', letterSpacing: '0.5px' }}>
          WAWA LEARNING COACHING CENTER
        </h1>
        <div style={{ width: '20px' }}></div>
      </div>

      {/* [요구사항 3, 4번] 지점 전용 스페셜 마케팅 비주얼 배너 */}
      <div style={{ padding: '35px 20px', backgroundColor: '#f1f5f9', borderBottom: '4px solid #ea580c', textAlign: 'center' }}>
        <span style={{ backgroundColor: '#1e40af', color: '#ffffff', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
          {branch.시도 || '인증'} 거점 공식 지정 센터
        </span>
        <h2 style={{ fontSize: '24px', color: '#1e3a8a', fontWeight: '900', margin: '10px 0 6px 0' }}>
          와와학습코칭센터 {branch.지점명}
        </h2>
        <p style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#475569', fontWeight: '500', lineHeight: '1.4' }}>
          📍 {branch.주소}
        </p>
        <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'inline-block', width: '100%', boxSizing: 'border-box' }}>
          <span style={{ fontSize: '12.5px', color: '#ea580c', fontWeight: 'bold' }}>🎯 완벽 내신 대비 학군 지점:</span>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#0f172a', fontWeight: 'bold', letterSpacing: '-0.3px' }}>
            {branch.타깃학교 || '인근 초중고교 완벽 내신 분석'}
          </p>
        </div>
      </div>

      {/* 학부모 신뢰도 상승 마케팅 스폿 카피 */}
      <div style={{ padding: '30px 20px' }}>
        <h3 style={{ fontSize: '17px', color: '#0f172a', fontWeight: '800', margin: '0 0 16px 0', borderLeft: '4px solid #1e40af', paddingLeft: '8px' }}>
          왜 {branch.지점명} 와와학습코칭학원일까요?
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <strong style={{ color: '#1e40af', fontSize: '14.5px', display: 'block', marginBottom: '4px' }}>1. 무조건 일대일 밀착 개별 지도 및 과외식 수업</strong>
            <span style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5', display: 'block' }}>
              진도만 나가는 판서식 대형 학원과 다릅니다. 우리 아이의 현재 성취도와 이해 속도에 맞춰 질문과 피드백이 실시간으로 오가는 완벽 맞춤형 둥지식 과외 학원입니다.
            </span>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <strong style={{ color: '#ea580c', fontSize: '14.5px', display: 'block', marginBottom: '4px' }}>2. {branch.지점명} 인근 학교 완벽 분석 밀착 기출관리</strong>
            <span style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5', display: 'block' }}>
              인근 <strong>{branch.타깃학교 || '학교별'}</strong>의 최근 중간·기말고사 출제 경향, 수행평가 유형을 철저하게 해부하여 맞춤 기출 피드백 레이아웃을 제공합니다.
            </span>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <strong style={{ color: '#16a34a', fontSize: '14.5px', display: 'block', marginBottom: '4px' }}>3. 단순 문제풀이를 넘어선 '공부9도' 코칭 시스템</strong>
            <span style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5', display: 'block' }}>
              스스로 계획을 세우는 플래너 관리부터 메타인지 학습법까지 지도하여 학원에 의존하지 않고 스스로 성적을 올릴 수 있는 강력한 자기주도학습 성향별 로드맵을 구축합니다.
            </span>
          </div>
        </div>
      </div>

      {/* [요구사항 2번] 수강료 정밀 안내 구역 */}
      <div style={{ padding: '10px 20px 30px 20px' }}>
        <h3 style={{ fontSize: '17px', color: '#0f172a', fontWeight: '800', margin: '0 0 4px 0', borderLeft: '4px solid #1e40af', paddingLeft: '8px' }}>
          정식 교습비(수강료) 안내
        </h3>
        <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '12px' }}>*{priceTable.desc}</span>
        
        <div style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', padding: '10px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }}>
            <div style={{ flex: '1' }}>대상 구분</div>
            <div style={{ flex: '1' }}>정식 등록 교육비(타임 기준)</div>
          </div>
          <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', padding: '12px 10px', fontSize: '13.5px', textAlign: 'center' }}>
            <div style={{ flex: '1', fontWeight: '600', color: '#475569' }}>초등 과정</div>
            <div style={{ flex: '1', fontWeight: 'bold', color: '#0f172a' }}>{priceTable.elementary}</div>
          </div>
          <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', padding: '12px 10px', fontSize: '13.5px', textAlign: 'center' }}>
            <div style={{ flex: '1', fontWeight: '600', color: '#475569' }}>중등 과정</div>
            <div style={{ flex: '1', fontWeight: 'bold', color: '#0f172a' }}>{priceTable.middle}</div>
          </div>
          <div style={{ display: 'flex', padding: '12px 10px', fontSize: '13.5px', textAlign: 'center' }}>
            <div style={{ flex: '1', fontWeight: '600', color: '#475569' }}>고등 과정</div>
            <div style={{ flex: '1', fontWeight: 'bold', color: '#ea580c' }}>{priceTable.high}</div>
          </div>
        </div>
      </div>

      {/* [요구사항 5번 대체] 실시간 접수용 공식 랜딩 연동 모듈 배너 */}
      <div style={{ padding: '30px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
        <h3 style={{ fontSize: '19px', color: '#1e3a8a', fontWeight: '900', margin: '0 0 6px 0' }}>
          📝 {branch.지점명} 실시간 무료 상담 신청
        </h3>
        <p style={{ margin: '0 0 16px 0', fontSize: '12.5px', color: '#64748b', lineHeight: '1.4' }}>
          학부모 전용 안심 채널입니다. 원활한 1:1 예약 배정을 위해<br/>
          아래 공식 접수처를 통해 즉시 상담 예약을 매칭해 드립니다.
        </p>
        
        <a href="https://forms.gle/4XvN7W88p6qZtY8u5" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', padding: '16px', backgroundColor: '#ea580c', color: '#ffffff', textDecoration: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(234,88,12,0.15)', boxSizing: 'border-box' }}>
          와와 {branch.지점명} 1:1 상담 예약하기 (공식 안심 폼) ➔
        </a>
      </div>

      {/* 법적 가이드 지지대 푸터 인프라 */}
      <div style={{ padding: '24px 20px', backgroundColor: '#1e293b', color: '#94a3b8', fontSize: '11.5px', lineHeight: '1.6' }}>
        <p style={{ margin: '0 0 6px 0', color: '#cbd5e1', fontWeight: 'bold' }}>WAWA LEARNING COACHING CENTER</p>
        <p style={{ margin: '0 0 4px 0' }}>공식 지정 등록처: 와와학습코칭센터 {branch.지점명}</p>
        <p style={{ margin: '0 0 4px 0' }}>🏢 센터 주소: {branch.주소}</p>
        <p style={{ margin: '0 0 12px 0', color: '#38bdf8', fontWeight: 'bold' }}>⚖️ 교육지원청 정식 등록번호: {branch.등록번호 || '정식 등록 인증 완료'}</p>
        <p style={{ margin: '0', fontSize: '11px', color: '#64748b' }}>본 사이트는 전국 와와학습코칭센터의 검색 노출 및 온라인 상담 예약을 대행하는 공식 마케팅 웹페이지입니다. 상기 명시된 교습비 요율은 교육지원청 기준 가이드를 준수합니다.</p>
      </div>

    </main>
  );
}