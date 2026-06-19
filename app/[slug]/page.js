'use client';

import React, { useState } from 'react';
import keywordsData from '../../data/keywords.json';

export default function RegionalDetailPage({ params }) {
  const unpackedParams = React.use(params) || {};
  const rawSlug = unpackedParams.slug || '';
  const currentSlug = decodeURIComponent(rawSlug).trim().toLowerCase();
  
  // 1. 현재 주소(슬러그)에 맞는 지역 데이터 매칭 (ex: 제기점, 풍산점 등)
  const pageData = keywordsData.find((item) => {
    if (!currentSlug) return false;
    const centerName = (item.센터명 || '').trim().toLowerCase();
    const branchName = (item.지점명 || '').trim().toLowerCase();
    const regionName = (item.지역 || '').trim().toLowerCase();
    return (
      (centerName && (currentSlug.includes(centerName) || centerName.includes(currentSlug))) ||
      (branchName && (currentSlug.includes(branchName) || branchName.includes(currentSlug))) ||
      (regionName && (currentSlug.includes(regionName) || regionName.includes(currentSlug)))
    );
  }) || {
    지점명: decodeURIComponent(rawSlug).trim() || '우리동네점',
    지역: decodeURIComponent(rawSlug).trim() || '우리 동네',
    과목: '전과목',
  };

  // 🛠️ [핵심 치트키] 상훈님의 황금 키워드와 지역명 실시간 결합 엔진
  const branchName = pageData.지점명 || `${pageData.지역}점`; // ex: 제기점
  const loc = pageData.지역 || '우리 동네'; // ex: 제기동, 풍산동

  // 2. 📍 서울 및 수도권 주요 지점 분기 검사
  const seoulAndSpecialRegions = [
    '서울', '강남', '서초', '송파', '강동', '마포', '용산', '성동', '광진', '동대문', 
    '중랑', '성북', '강북', '도봉', '노원', '은평', '서대문', '양천', '강서', 
    '구로', '금천', '영등포', '동작', '관악', '미금', '동탄목동', '동탄호수', '위례창곡', '영통구청'
  ];
  const isSeoulOrSpecial = seoulAndSpecialRegions.some(region => loc.includes(region));

  // 3. 수강료 분기 매칭
  const feeData = isSeoulOrSpecial 
    ? { type: '서울 및 수도권 센터 표준 요율', elementary: ['140,000', '200,000', '320,000'], middle: ['152,000', '217,000', '347,000'], high: ['175,000', '250,000', '400,000'] }
    : { type: '전국 거점 지역 프리미엄 요율', elementary: ['160,000', '230,000', '370,000'], middle: ['172,000', '247,000', '397,000'], high: ['195,000', '280,000', '450,000'] };

  // 4. 모달 및 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ studentName: '', phone: '', schoolName: '', grade: '', dongName: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMapClick = () => {
    const mapUrl = pageData.네이버지도URL || `https://map.naver.com/v5/search/${encodeURIComponent(loc + ' 와와학습코칭센터')}`;
    window.open(mapUrl, '_blank');
  };

  // 🎯 텔레그램 전송 처리 시스템
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.phone || !formData.schoolName || !formData.grade || !formData.dongName) {
      alert('⚠️ 모든 필수 항목을 입력하거나 선택해 주세요!');
      return;
    }

    setIsSubmitting(true);

    try {
      const TELEGRAM_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN; 
      const CHAT_ID = "7806688994"; 

      const messageText = `🔥 [와와 실시간 상담 신청 알림] 🔥\n\n` +
                          `• 신청 지점/지역: 와와학습코칭센터 ${branchName} (${loc})\n` +
                          `• 희망 과목: ${pageData.과목 || '전과목'}\n` +
                          `----------------------------------------\n` +
                          `👤 학생 이름: ${formData.studentName}\n` +
                          `📞 학부모 연락처: ${formData.phone}\n` +
                          `🏫 학교명: ${formData.schoolName}\n` +
                          `🎓 학생 학년: ${formData.grade}\n` +
                          `📍 거주하시는 동: ${formData.dongName}\n` +
                          `----------------------------------------\n\n` +
                          `상훈님! 타겟 키워드로 유입된 학부모 상담 DB 접수 성공! 🚀`;

      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: messageText })
      });

      if (!response.ok) throw new Error("텔레그램 전송 실패");

      alert(`📝 신청이 성공적으로 접수되었습니다!\n와와학습코칭센터 ${branchName} 담당 원장님이 24시간 이내에 번호(${formData.phone})로 직접 연락을 드리겠습니다.`);
      setIsModalOpen(false);
      setFormData({ studentName: '', phone: '', schoolName: '', grade: '', dongName: '' });
    } catch (error) {
      console.error("텔레그램 오류:", error);
      alert('⚠️ 전송망에 일시적인 지연이 발생했습니다. 잠시 후 다시 시도해 주세요!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ padding: '0', maxWidth: '540px', margin: '0 auto', fontFamily: '"Noto Sans KR", sans-serif', color: '#1e293b', backgroundColor: '#ffffff', minHeight: '100vh', boxShadow: '0 0 20px rgba(0,0,0,0.05)', position: 'relative' }}>
      {/* 🎯 지점명 필수 노출 반영 */}
      <div style={{ backgroundColor: '#1e40af', padding: '12px', textAlign: 'center' }}>
        <h2 style={{ margin: '0', fontSize: '13px', color: '#ffffff', fontWeight: '700', letterSpacing: '0.5px' }}>
          WAWA LEARNING COACHING CENTER | 와와학습코칭센터 {branchName}
        </h2>
      </div>
      
      {/* 🚀 상훈님의 황금 키워드 대량 조합 배치 (네이버 로봇 수집 전용 헤드라인) */}
      <div style={{ padding: '40px 20px 30px 20px', textAlign: 'center', backgroundColor: '#f8fafc' }}>
        <div style={{ display: 'inline-block', backgroundColor: '#1e3a8a', color: '#ffffff', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', marginBottom: '14px' }}>
          와와학습코칭센터 {branchName}
        </div>
        <h1 style={{ fontSize: '22px', color: '#1e3a8a', fontWeight: '800', margin: '0 0 16px 0', lineHeight: '1.45' }}>
          {loc} 영어학원 수학학원 국어학원 영수학원 성적 향상의 핵심, <br/>
          <span style={{ color: '#ea580c' }}>와와학습코칭학원 {branchName}</span>
        </h1>
        <p style={{ color: '#475569', fontSize: '13px', margin: '0', lineHeight: '1.65' }}>
          {loc} 중등영어 중등수학 고등영어 고등수학 완벽 내신 대비! <br/>
          스스로 공부하는 힘을 길러주는 {loc} 소수정예학원 시스템을 만나보세요.
        </p>
      </div>

      <div style={{ position: 'relative', width: '100%' }}>
        <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600" alt="참여형 교실" style={{ width: '100%', height: 'auto', display: 'block' }} />
        <div style={{ position: 'absolute', bottom: '15px', left: '15px', backgroundColor: '#1e3a8a', color: '#ffffff', padding: '6px 12px', fontSize: '11px', fontWeight: 'bold', borderRadius: '4px' }}>
          {branchName} 공부의 주인공이 되는 참여형 교실
        </div>
      </div>

      {/* 🎯 본문 텍스트 내 키워드 자연스럽게 주입 */}
      <div style={{ padding: '35px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ width: '4px', height: '18px', backgroundColor: '#1e3a8a', marginRight: '8px' }}></div>
          <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', margin: '0' }}>
            🚫 일방적인 진도 빼기 학원과 비교를 거부합니다
          </h3>
        </div>
        <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7', margin: '0 0 16px 0' }}>
          칠판만 바라보는 대형 {loc} 영어학원 이나 {loc} 수학학원 수업은 우리 아이에게 맞지 않을 수 있습니다. 
          이해하지 못한 채 넘어가는 진도는 결국 모래성을 쌓는 것과 같습니다.
        </p>
        <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7', margin: '0' }}>
          <strong>와와학습코칭센터 {branchName}</strong>에서는 {loc} 중학생영어 중학생수학 과정부터 {loc} 고등학생영어 고등학생수학 과정까지, 
          강사가 일방적으로 가르치는 것이 아니라 1:1로 마주 앉아 끊임없이 질문하고 피드백을 주고받는 {loc} 영수학원 선두주자다운 참여형 학습 구조를 실현합니다.
        </p>
      </div>

      <div style={{ padding: '0 20px 20px 20px' }}>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px 15px', textAlign: 'center', backgroundColor: '#f8fafc' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '12px' }}><span style={{ fontSize: '24px' }}>🏅</span><span style={{ fontSize: '24px' }}>🎯</span></div>
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#1e3a8a', margin: '0 0 6px 0' }}>소비자가 뽑은 올해의 브랜드 대상 수상</h4>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0', lineHeight: '1.5' }}>
            전국 200여 개 지점에서 입증된 코칭 효과성!<br />
            {loc} 국어학원 및 보습학원을 찾던 학부모님이 와와 {branchName}을 먼저 알아보고 추천하는 이유입니다.
          </p>
        </div>
      </div>

      <div style={{ padding: '30px 20px', backgroundColor: '#ffffff', borderTop: '8px solid #f1f5f9', borderBottom: '8px solid #f1f5f9' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', letterSpacing: '1px' }}>FEE DISCLOSURE</span>
          <h2 style={{ fontSize: '19px', color: '#0f172a', fontWeight: '800', margin: '4px 0 6px 0' }}>투명한 수강료 공시</h2>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0', lineHeight: '1.4' }}>
            교육지원청 등록 기준 공식 금액입니다. <br />
            <strong style={{ color: '#1e3a8a' }}>와와학습코칭학원 {branchName}</strong>은 {feeData.type}을 적용합니다.
          </p>
        </div>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', backgroundColor: '#1e293b', padding: '12px 6px', color: '#ffffff', fontSize: '12.5px', fontWeight: 'bold', textAlign: 'center' }}><div>구분</div><div>주 2회</div><div>주 3회</div><div>주 5회</div></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', padding: '14px 6px', borderBottom: '1px solid #f1f5f9', fontSize: '13px', textAlign: 'center' }}><div style={{ fontWeight: 'bold', color: '#475569', backgroundColor: '#f8fafc', padding: '4px 0', borderRadius: '6px' }}>초등과정</div><div>{feeData.elementary[0]}</div><div>{feeData.elementary[1]}</div><div style={{ color: '#3b82f6', fontWeight: '700' }}>{feeData.elementary[2]}</div></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', padding: '14px 6px', borderBottom: '1px solid #f1f5f9', fontSize: '13px', textAlign: 'center' }}><div style={{ fontWeight: 'bold', color: '#475569', backgroundColor: '#f8fafc', padding: '4px 0', borderRadius: '6px' }}>중등과정</div><div>{feeData.middle[0]}</div><div>{feeData.middle[1]}</div><div style={{ color: '#3b82f6', fontWeight: '700' }}>{feeData.middle[2]}</div></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', padding: '14px 6px', fontSize: '13px', textAlign: 'center' }}><div style={{ fontWeight: 'bold', color: '#475569', backgroundColor: '#f8fafc', padding: '4px 0', borderRadius: '6px' }}>고등과정</div><div>{feeData.high[0]}</div><div>{feeData.high[1]}</div><div style={{ color: '#d97706', fontWeight: '700' }}>{feeData.high[2]}</div></div>
        </div>
      </div>

      <div style={{ padding: '35px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ width: '4px', height: '18px', backgroundColor: '#1e3a8a', marginRight: '8px' }}></div>
          <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', margin: '0' }}>
            🦅 {loc} 소수정예학원 밀착 지도 시스템
          </h3>
        </div>
        <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7', margin: '0 0 20px 0' }}>
          교사가 중앙에서 모든 학생들의 학습 현황과 성향을 실시간으로 분석하고 밀착 케어하는 둥지형 교실입니다.
        </p>
        <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600" alt="둥지형 수업" style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '20px' }} />
      </div>

      <div style={{ padding: '15px 20px 35px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ width: '4px', height: '18px', backgroundColor: '#1e3a8a', marginRight: '8px' }}></div>
          <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', margin: '0' }}>
            🦅 {loc} 인근 학교 완벽 내신 철저 대비
          </h3>
        </div>
        <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7', margin: '0' }}>
          {loc} 중등영어 및 {loc} 고등수학 성적 향상의 핵심은 결국 철저한 학교별 내신 기출 분석입니다. 
          <strong>와와학습코칭학원 {branchName}</strong>는 주변 학교들의 최근 출제 경향을 완벽하게 데이터화하여 지도합니다.
        </p>
      </div>

      <div style={{ padding: '30px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '20px' }}>📍</span>
          <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a', margin: '8px 0 12px 0' }}>
            와와학습코칭학원 {branchName} 오시는 길
          </h4>
          <button onClick={handleMapClick} style={{ backgroundColor: '#00c73c', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '13.5px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,199,60,0.15)' }}>
            네이버 지도에서 정확한 위치 보기
          </button>
        </div>
        <hr style={{ border: '0', height: '1px', backgroundColor: '#e2e8f0', margin: '24px 0' }} />
        <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
          {loc} 무료 학습 성향 진단 신청하기
        </h3>
        <p style={{ fontSize: '12.5px', color: '#475569', margin: '0 0 20px 0' }}>
          와와학습코칭센터 {branchName}만의 1:1 맞춤형 피드백 시스템을 경험해 보세요.
        </p>
        <button onClick={() => setIsModalOpen(true)} style={{ width: '100%', padding: '16px', backgroundColor: '#ea580c', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '15.5px', fontWeight: 'bold', cursor: 'pointer' }}>
          {branchName} 실시간 상담 예약 ➔
        </button>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '400px', padding: '24px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                {branchName} 상담 및 학습진단 신청
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', color: '#94a3b8', cursor: 'pointer' }}>✕</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div><label style={{ display: 'block', fontSize: '12.5px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>학생 이름 *</label><input type="text" name="studentName" value={formData.studentName} onChange={handleInputChange} placeholder="학생 이름을 입력해 주세요" style={{ width: '100%', padding: '11px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' }} required /></div>
              <div><label style={{ display: 'block', fontSize: '12.5px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>학부모님 연락처 *</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="예: 010-1234-5678" style={{ width: '100%', padding: '11px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' }} required /></div>
              <div><label style={{ display: 'block', fontSize: '12.5px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>학교명 *</label><input type="text" name="schoolName" value={formData.schoolName} onChange={handleInputChange} placeholder="예: 갈매초등학교" style={{ width: '100%', padding: '11px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' }} required /></div>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>학년 *</label>
                <select name="grade" value={formData.grade} onChange={handleInputChange} style={{ width: '100%', padding: '11px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: '#ffffff', boxSizing: 'border-box' }} required>
                  <option value="">학년을 선택해 주세요</option>
                  <option value="초등">초등</option>
                  <option value="중등1">중등1</option>
                  <option value="중등2">중등2</option>
                  <option value="중등3">중등3</option>
                  <option value="고등1">고등1</option>
                  <option value="고등2">고등2</option>
                  <option value="고등3">고등3</option>
                </select>
              </div>
              <div><label style={{ display: 'block', fontSize: '12.5px', fontWeight: 'bold', color: '#475569', marginBottom: '2px' }}>거주하시는 동 이름 *</label><span style={{ display: 'block', fontSize: '10.5px', color: '#64748b', marginBottom: '6px' }}>({branchName}에서 가까운 동네로 상담해 드립니다)</span><input type="text" name="dongName" value={formData.dongName} onChange={handleInputChange} placeholder="예: 제기동" style={{ width: '100%', padding: '11px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' }} required /></div>
              <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '14px', backgroundColor: '#1e3a8a', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px', boxShadow: '0 4px 6px rgba(30,58,138,0.15)' }}>
                {isSubmitting ? '🚀 상담 신청 전송 중...' : `🚀 신청서 제출하기`}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}