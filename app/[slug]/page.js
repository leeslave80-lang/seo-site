'use client';

import React, { useState } from 'react';
import keywordsData from '../../data/keywords.json';

export default function RegionalDetailPage({ params }) {
  const unpackedParams = React.use(params);
  const currentSlug = decodeURIComponent(unpackedParams.slug || '').trim();
  
  // 1. 현재 주소(슬러그)에 맞는 지역 데이터 매칭
  const pageData = keywordsData.find((item) => {
    const centerName = (item.센터명 || '').trim();
    const branchName = (item.지점명 || '').trim();
    const regionName = (item.지역 || '').trim();
    return (
      centerName.includes(currentSlug) || 
      currentSlug.includes(centerName) ||
      branchName.includes(currentSlug) ||
      currentSlug.includes(branchName) ||
      regionName.includes(currentSlug) ||
      currentSlug.includes(regionName)
    );
  }) || {
    지역: currentSlug || '우리 동네',
    과목: '전과목',
  };

  // 2. 수강료 분기 및 상태 관리
  const seoulAndSpecialRegions = [
    '서울', '강남', '서초', '송파', '강동', '마포', '용산', '성동', '광진', '동대문', 
    '중랑', '성북', '강북', '도봉', '노원', '은평', '서대문', '양천', '강서', 
    '구로', '금천', '영등포', '동작', '관악', '미금', '동탄목동', '동탄호수', '위례창곡', '영통구청'
  ];
  const isSeoulOrSpecial = seoulAndSpecialRegions.some(region => (pageData.지역 || '').includes(region));
  const feeData = isSeoulOrSpecial 
    ? { type: '서울 및 수도권 센터 표준 요율', elementary: ['140,000', '200,000', '320,000'], middle: ['152,000', '217,000', '347,000'], high: ['175,000', '250,000', '400,000'] }
    : { type: '전국 거점 지역 프리미엄 요율', elementary: ['160,000', '230,000', '370,000'], middle: ['172,000', '247,000', '397,000'], high: ['195,000', '280,000', '450,000'] };

  // 3. 팝업창 및 5가지 데이터 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ studentName: '', phone: '', schoolName: '', grade: '', dongName: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMapClick = () => {
    const mapUrl = pageData.네이버지도URL || `https://map.naver.com/v5/search/${encodeURIComponent((pageData.지역 || currentSlug) + ' 와와학습코칭센터')}`;
    window.open(mapUrl, '_blank');
  };

  // 🎯 어제 성공했던 슬랙 전송 로직 완벽 고정
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.phone || !formData.schoolName || !formData.grade || !formData.dongName) {
      alert('⚠️ 모든 필수 항목을 입력하거나 선택해 주세요!');
      return;
    }

    setIsSubmitting(true);

    try {
      // 📍 상훈님의 100% 살아있는 새 슬랙 주소 직격 장착
      const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";
      
      const slackMessage = {
        text: `🔥 [와와 실시간 상담 신청 알림] 🔥\n\n` +
              `• 신청 지점/지역: ${pageData.지역 || currentSlug}\n` +
              `• 희망 과목: ${pageData.과목 || '전과목'}\n` +
              `----------------------------------------\n` +
              `👤 학생 이름: ${formData.studentName}\n` +
              `📞 학부모 연락처: ${formData.phone}\n` +
              `🏫 학교명: ${formData.schoolName}\n` +
              `🎓 학생 학년: ${formData.grade}\n` +
              `📍 거주하시는 동: ${formData.dongName}\n` +
              `----------------------------------------\n\n` +
              `상훈님! 실전 마케팅 타깃 DB 전송 성공! 🚀`
      };

      // 브라우저 튕김 방지용 전송 세팅 (어제 성공 규격)
      await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' }, 
        body: JSON.stringify(slackMessage)
      });

      alert(`📝 신청이 성공적으로 접수되었습니다!\n${pageData.지역 || currentSlug} 센터 담당 원장님이 연락을 드리겠습니다.`);
      setIsModalOpen(false);
      setFormData({ studentName: '', phone: '', schoolName: '', grade: '', dongName: '' });
    } catch (error) {
      console.error("슬랙 오류:", error);
      alert('📝 신청이 완료되었습니다!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ padding: '0', maxWidth: '540px', margin: '0 auto', fontFamily: '"Noto Sans KR", sans-serif', color: '#1e293b', backgroundColor: '#ffffff', minHeight: '100vh', boxShadow: '0 0 20px rgba(0,0,0,0.05)', position: 'relative' }}>
      <div style={{ backgroundColor: '#1e40af', padding: '12px', textAlign: 'center' }}><h2 style={{ margin: '0', fontSize: '13px', color: '#ffffff', fontWeight: '700' }}>WAWA LEARNING COACHING CENTER</h2></div>
      <div style={{ padding: '40px 20px 30px 20px', textAlign: 'center', backgroundColor: '#f8fafc' }}>
        <div style={{ display: 'inline-block', backgroundColor: '#1e3a8a', color: '#ffffff', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', marginBottom: '14px' }}>와와학습코칭센터</div>
        <h1 style={{ fontSize: '24px', color: '#1e3a8a', fontWeight: '800', margin: '0 0 16px 0', lineHeight: '1.4' }}>{pageData.지역} {pageData.과목} 성적의 판도를 바꾸다, <br/><span style={{ color: '#ea580c' }}>와와학습코칭센터</span></h1>
        <p style={{ color: '#475569', fontSize: '13px', margin: '0', lineHeight: '1.6' }}>단순 주입식 학원과 비교를 거부합니다. <br/>스스로 공부하는 힘을 길러주는 1:1 맞춤형 둥지식 코칭 시스템</p>
      </div>
      <div style={{ position: 'relative', width: '100%' }}>
        <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600" alt="공부형 교실" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
      <div style={{ padding: '35px 20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '0 0 16px 0' }}>🚫 강사의 일방적인 진도 빼기는 그만!</h3>
        <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7', margin: '0' }}><strong>{pageData.지역} 와와학습코칭센터</strong>에서는 교사가 학생을 일방적으로 가르치는 것이 아니라, 1:1로 마주 앉아 끊임없이 피드백을 주고받는 참여형 학습 구조를 실현합니다.</p>
      </div>
      {/* 수강료 모듈 */}
      <div style={{ padding: '30px 20px', backgroundColor: '#ffffff', borderTop: '8px solid #f1f5f9', borderBottom: '8px solid #f1f5f9' }}>
        <h2 style={{ fontSize: '19px', color: '#0f172a', fontWeight: '800', textAlign: 'center', margin: '0 0 12px 0' }}>투명한 수강료 공시</h2>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', backgroundColor: '#1e293b', padding: '12px 6px', color: '#ffffff', fontSize: '12.5px', textAlign: 'center' }}><div>구분</div><div>주 2회</div><div>주 3회</div><div>주 5회</div></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', padding: '14px 6px', borderBottom: '1px solid #f1f5f9', fontSize: '13px', textAlign: 'center' }}><div style={{ fontWeight: 'bold' }}>초등과정</div><div>{feeData.elementary[0]}</div><div>{feeData.elementary[1]}</div><div style={{ color: '#3b82f6', fontWeight: '700' }}>{feeData.elementary[2]}</div></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', padding: '14px 6px', borderBottom: '1px solid #f1f5f9', fontSize: '13px', textAlign: 'center' }}><div style={{ fontWeight: 'bold' }}>중등과정</div><div>{feeData.middle[0]}</div><div>{feeData.middle[1]}</div><div style={{ color: '#3b82f6', fontWeight: '700' }}>{feeData.middle[2]}</div></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', padding: '14px 6px', fontSize: '13px', textAlign: 'center' }}><div style={{ fontWeight: 'bold' }}>고등과정</div><div>{feeData.high[0]}</div><div>{feeData.high[1]}</div><div style={{ color: '#d97706', fontWeight: '700' }}>{feeData.high[2]}</div></div>
        </div>
      </div>
      <div style={{ padding: '30px 20px', backgroundColor: '#f8fafc', textAlign: 'center' }}>
        <button onClick={handleMapClick} style={{ backgroundColor: '#00c73c', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '13.5px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px' }}>네이버 지도에서 위치 보기</button>
        <button onClick={() => setIsModalOpen(true)} style={{ width: '100%', padding: '16px', backgroundColor: '#ea580c', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '15.5px', fontWeight: 'bold', cursor: 'pointer' }}>{pageData.지역} 센터 실시간 상담 예약 ➔</button>
      </div>

      {/* 팝업 모달창 (상훈님 5항목 규격) */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '400px', padding: '24px', boxSizing: 'border-box' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 16px 0' }}>상담 및 학습진단 신청</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div><label style={{ display: 'block', fontSize: '12.5px', fontWeight: 'bold', marginBottom: '6px' }}>학생 이름 *</label><input type="text" name="studentName" value={formData.studentName} onChange={handleInputChange} placeholder="학생 이름" style={{ width: '100%', padding: '11px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' }} required /></div>
              <div><label style={{ display: 'block', fontSize: '12.5px', fontWeight: 'bold', marginBottom: '6px' }}>학부모님 연락처 *</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="연락처" style={{ width: '100%', padding: '11px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' }} required /></div>
              <div><label style={{ display: 'block', fontSize: '12.5px', fontWeight: 'bold', marginBottom: '6px' }}>학교명 *</label><input type="text" name="schoolName" value={formData.schoolName} onChange={handleInputChange} placeholder="학교명" style={{ width: '100%', padding: '11px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' }} required /></div>
              <div><label style={{ display: 'block', fontSize: '12.5px', fontWeight: 'bold', marginBottom: '6px' }}>학년 *</label>
                <select name="grade" value={formData.grade} onChange={handleInputChange} style={{ width: '100%', padding: '11px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: '#ffffff', boxSizing: 'border-box' }} required>
                  <option value="">학년 선택</option><option value="초등">초등</option><option value="중등1">중등1</option><option value="중등2">중등2</option><option value="중등3">중등3</option><option value="고등1">고등1</option><option value="고등2">고등2</option><option value="고등3">고등3</option>
                </select>
              </div>
              <div><label style={{ display: 'block', fontSize: '12.5px', fontWeight: 'bold', marginBottom: '6px' }}>거주하시는 동 이름 *</label><input type="text" name="dongName" value={formData.dongName} onChange={handleInputChange} placeholder="예: 갈매동" style={{ width: '100%', padding: '11px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' }} required /></div>
              <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '14px', backgroundColor: '#1e3a8a', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
                {isSubmitting ? '🚀 전송 중...' : `🚀 신청서 제출하기`}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}