'use client';

import React, { useState } from 'react';
import Link from 'next/link';
// 🎯 데이터 파일 위치 매칭
import keywordsData from '../src/data/keywords.json'; 

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('전체');

  // 1. 대형 지역 구분을 위한 분류 로직
  const regions = ['전체', '서울', '경기', '인천', '대전', '충청', '부산', '대구', '경상', '광주', '전라', '강원', '제주'];

  // 2. 검색 및 지역 탭 필터링 마스터 시스템 (순수 JS 문법으로 복원하여 에러 제거)
  const filteredBranches = keywordsData.filter((item) => {
    const regionName = item.지역 || '';
    const branchName = item.지점명 || '';
    
    // 검색어 매칭
    const matchesSearch = regionName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          branchName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 탭 선택 매칭
    if (selectedRegion === '전체') return matchesSearch;
    
    // 세부 도외 분기 처리
    if (selectedRegion === '충청') return matchesSearch && (regionName.includes('충남') || regionName.includes('충북') || regionName.includes('세종'));
    if (selectedRegion === '경상') return matchesSearch && (regionName.includes('경남') || regionName.includes('경북'));
    if (selectedRegion === '전라') return matchesSearch && (regionName.includes('전남') || regionName.includes('전북'));
    
    return matchesSearch && regionName.includes(selectedRegion);
  });

  return (
    <main style={{ padding: '0', maxWidth: '540px', margin: '0 auto', fontFamily: '"Noto Sans KR", sans-serif', color: '#1e293b', backgroundColor: '#ffffff', minHeight: '100vh', boxShadow: '0 0 20px rgba(0,0,0,0.05)' }}>
      
      {/* 랜드마크 헤더 */}
      <div style={{ backgroundColor: '#1e40af', padding: '16px', textAlign: 'center' }}>
        <h1 style={{ margin: '0', fontSize: '15px', color: '#ffffff', fontWeight: '800', letterSpacing: '1px' }}>
          WAWA LEARNING COACHING CENTER
        </h1>
      </div>

      {/* 대문 마케팅 배너 */}
      <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'inline-block', backgroundColor: '#ea580c', color: '#ffffff', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', marginBottom: '12px' }}>
          전국 거점 공식 지점 보유
        </div>
        <h2 style={{ fontSize: '22px', color: '#1e3a8a', fontWeight: '800', margin: '0 0 12px 0', lineHeight: '1.4' }}>
          우리 동네 가장 가까운 <br/>
          <span style={{ color: '#ea580c' }}>와와학습코칭센터</span> 찾기
        </h2>
        <p style={{ color: '#64748b', fontSize: '13px', margin: '0', lineHeight: '1.5' }}>
          전국 어디서나 검증된 1:1 맞춤 코칭 시스템을 만나보세요. <br/>
          아래에서 거주하시는 지역을 선택하거나 검색창에 동네 이름을 입력하세요.
        </p>
      </div>

      {/* 🔍 실시간 우리 동네 지점 검색창 */}
      <div style={{ padding: '20px' }}>
        <div style={{ position: 'relative' }}>
          <input 
            type="text" 
            placeholder="🔍 동네 이름이나 지점명을 입력하세요 (예: 지족동, 노은동, 노형)" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '14px 16px', border: '2px solid #1e3a8a', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', boxShadow: '0 4px 12px rgba(30,58,138,0.05)' }}
          />
        </div>
      </div>

      {/* 🗺️ 대한민국 지역별 필터 탭 */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '0 20px 15px 20px', whiteSpace: 'nowrap', WebkitOverflowScrolling: 'touch' }}>
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 'bold',
              cursor: 'pointer',
              border: selectedRegion === region ? '1px solid #1e3a8a' : '1px solid #e2e8f0',
              backgroundColor: selectedRegion === region ? '#1e3a8a' : '#ffffff',
              color: selectedRegion === region ? '#ffffff' : '#475569',
              transition: 'all 0.2s'
            }}
          >
            {region}
          </button>
        ))}
      </div>

      {/* 🏢 지점 리스트 대량 출력 판넬 */}
      <div style={{ padding: '10px 20px 40px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            검색 결과: <strong style={{ color: '#1e3a8a' }}>{filteredBranches.length}</strong>개 지점
          </span>
          {searchTerm || selectedRegion !== '전체' ? (
            <button 
              onClick={() => { setSearchTerm(''); setSelectedRegion('전체'); }}
              style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              필터 초기화 🔄
            </button>
          ) : null}
        </div>

        {filteredBranches.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredBranches.map((item, idx) => {
              // 🚨 순수 JS 문법으로 변환하여 문법 에러를 완벽 차단
              const targetSlug = item.slug ? String(item.slug) : '';

              return (
                <Link 
                  key={idx} 
                  href={`/${encodeURIComponent(targetSlug)}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '10px', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                    <div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 'bold', color: '#0f172a' }}>
                        {item.시도 || ''} 와와학습코칭센터 {item.지점명 || ''}
                      </h3>
                      <p style={{ margin: '0', fontSize: '12px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '400px' }}>
                        📍 {item.주소 || '공식 등록 지점'}
                      </p>
                    </div>
                    <span style={{ color: '#1e40af', fontSize: '14px', fontWeight: 'bold' }}>➔</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', border: '1px dashed #cbd5e1', borderRadius: '10px', backgroundColor: '#f8fafc' }}>
            <span style={{ fontSize: '30px' }}>🔍</span>
            <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#64748b', fontWeight: 'bold' }}>
              해당 지역의 와와 지점을 찾을 수 없습니다.
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
              동네 명칭을 정확하게 입력하셨는지 확인해 주세요!
            </p>
          </div>
        )}
      </div>

    </main>
  );
}