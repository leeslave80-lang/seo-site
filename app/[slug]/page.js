'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import branchData from '@/data/keywords.json';

export default function BranchDetail({ params }) {
  // 1. Next.js 15+ 규격에 맞춘 파라미터 비동기 해제
  const resolvedParams = use(params);
  const currentSlug = decodeURIComponent(resolvedParams.slug);

  // 2. 마스터 데이터에서 현재 슬러그 지점 매칭
  const branch = branchData.find((item) => item.slug === currentSlug);

  // 3. 상담예약 폼 상태 선언
  const [formData, setFormData] = useState({
    studentName: '',
    parentPhone: '',
    schoolName: '',
    dongAddress: '',
    grade: '초등 과정',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // 💰 제주 유무를 판별하여 수강료 요율 자동 차등 분기
  const isJeju = branch.주소.includes('제주');
  const priceTable = isJeju 
    ? { elementary: '60,000원', middle: '65,000원', high: '75,000원', desc: '제주 거점 프리미엄 교육비 요율 적용' }
    : { elementary: '70,000원', middle: '75,000원', high: '85,000원', desc: '수도권 및 광역 표준 교육비 요율 적용' };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 실시간 슬랙 메시지 전송 로직
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const slackText = `🚨 [와와학습코칭센터 실시간 상담 신청] 🚨\n\n` +
                      `🏢 신청지점: 와와학습코칭센터 ${branch.지점명}\n` +
                      `👤 학생이름: ${formData.studentName}\n` +
                      `📱 학부모 연락처: ${formData.parentPhone}\n` +
                      `🏫 학교명: ${formData.schoolName}\n` +
                      `📍 거주하시는 동이름: ${formData.dongAddress}\n` +
                      `🎓 학생 학년: ${formData.grade}\n` +
                      `────────────────────────\n` +
                      `📢 배정된 센터장님은 확인 즉시 학부모님께 해피콜 안내 바랍니다.`;

    try {
      const res = await fetch('/api/slack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: slackText }),
      });

      if (res.ok) {
        alert(`🎉 무료 상담 예약이 정상 접수되었습니다!\n가장 가까운 와와학습코칭센터 ${branch.지점명}에서 신속하게 연락드리겠습니다.`);
        setFormData({ studentName: '', parentPhone: '', schoolName: '', dongAddress: '', grade: '초등 과정' });
      } else {
        alert('서버 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      }
    } catch (err) {
      alert('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ padding: '0', maxWidth: '540px', margin: '0 auto', fontFamily: '"Noto Sans KR", sans-serif', color: '#1e293b', backgroundColor: '#ffffff', minHeight: '100vh', boxShadow: '0 0 20px rgba(0,0,0,0.05)' }}>
      
      {/* 고정 상단 네비게이션 */}
      <div style={{ backgroundColor: '#1e40af', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>🔙</Link>
        <h1 style={{ margin: '0', fontSize: '14px', color: '#ffffff', fontWeight: '800', letterSpacing: '0.5px' }}>
          WAWA LEARNING COACHING CENTER
        </h1>
        <div style={{ width: '20px' }}></div>
      </div>

      {/* 홍보 배너 인프라 */}
      <div style={{ padding: '35px 20px', backgroundColor: '#f1f5f9', borderBottom: '4px solid #ea580c', textAlign: 'center' }}>
        <span style={{ backgroundColor: '#1e40af', color: '#ffffff', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
          {branch.시도} 거점 공식 지정 센터
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
            {branch.타깃학교}
          </p>
        </div>
      </div>

      {/* 특장점 마케팅 카피 판넬 */}
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
              인근 <strong>{branch.타깃학교}</strong>의 최근 3개년 중간·기말고사 출제 경향, 수행평가 유형을 철저하게 해부하여 학교별 맞춤 기출 마킹 레이아웃을 제공합니다.
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

      {/* 수강료 안내 구역 */}
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

      {/* 상담 예약 오렌지 안심 폼 */}
      <div style={{ padding: '30px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '19px', color: '#1e3a8a', fontWeight: '900', margin: '0 0 6px 0' }}>
            📝 {branch.지점명} 실시간 상담예약 신청
          </h3>
          <p style={{ margin: '0', fontSize: '12.5px', color: '#64748b', lineHeight: '1.4' }}>
            학부모 전용 안심 폼입니다. 아래 정보를 기입해 주시면<br/>
            가장 가까운 센터에서 직접 맞춤형 정밀 학습 진단을 도와드립니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>학생 이름</label>
            <input type="text" name="studentName" required value={formData.studentName} onChange={handleChange} placeholder="예: 홍길동" style={{ width: '100%', padding: '11px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13.5px', boxSizing: 'border-box', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>학부모님 연락처</label>
            <input type="tel" name="parentPhone" required value={formData.parentPhone} onChange={handleChange} placeholder="예: 010-1234-5678" style={{ width: '100%', padding: '11px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13.5px', boxSizing: 'border-box', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>학교명</label>
            <input type="text" name="schoolName" required value={formData.schoolName} onChange={handleChange} placeholder="예: 한라중학교" style={{ width: '100%', padding: '11px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13.5px', boxSizing: 'border-box', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>주소 (거주하시는 동이름)</label>
            <input type="text" name="dongAddress" required value={formData.dongAddress} onChange={handleChange} placeholder="예: 노형동 (가까운 지점으로 매칭 및 상담드리겠습니다)" style={{ width: '100%', padding: '11px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13.5px', boxSizing: 'border-box', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>학생 학년</label>
            <select name="grade" value={formData.grade} onChange={handleChange} style={{ width: '100%', padding: '11px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13.5px', backgroundColor: '#ffffff', boxSizing: 'border-box', outline: 'none' }}>
              <option value="초등 과정">초등 과정</option>
              <option value="중학교 1학년">중학교 1학년</option>
              <option value="중학교 2학년">중학교 2학년</option>
              <option value="중학교 3학년">중학교 3학년</option>
              <option value="고등학교 1학년">고등학교 1학년</option>
              <option value="고등학교 2학년">고등학교 2학년</option>
              <option value="고등학교 3학년">고등학교 3학년</option>
            </select>
          </div>

          <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '15px', backgroundColor: '#ea580c', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', transition: 'background-color 0.2s', boxShadow: '0 4px 6px rgba(234,88,12,0.15)' }}>
            {isSubmitting ? '전송 중... 🚀' : `와와 ${branch.지점명}에 무료 상담 신청하기 ➔`}
          </button>
        </form>
      </div>

      {/* 법적 가이드 푸터 */}
      <div style={{ padding: '24px 20px', backgroundColor: '#1e293b', color: '#94a3b8', fontSize: '11.5px', lineHeight: '1.6' }}>
        <p style={{ margin: '0 0 6px 0', color: '#cbd5e1', fontWeight: 'bold' }}>WAWA LEARNING COACHING CENTER</p>
        <p style={{ margin: '0 0 4px 0' }}>공식 지정 등록처: 와와학습코칭센터 {branch.지점명}</p>
        <p style={{ margin: '0 0 4px 0' }}>🏢 센터 주소: {branch.주소}</p>
        <p style={{ margin: '0 0 12px 0', color: '#38bdf8', fontWeight: 'bold' }}>⚖️ 교육지원청 정식 등록번호: {branch.등록번호}</p>
        <p style={{ margin: '0', fontSize: '11px', color: '#64748b' }}>본 사이트는 전국 와와학습코칭센터의 검색 노출 및 온라인 상담 예약을 대행하는 공식 마케팅 웹페이지입니다. 상기 명시된 교습비 요율은 교육지원청 기준 가이드를 준수합니다.</p>
      </div>

    </main>
  );
}