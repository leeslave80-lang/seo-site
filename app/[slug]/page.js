import { notFound } from 'next/navigation';
import keywordsData from '../../data/keywords.json';
// 🌟 [1] 네이버 검색 로봇용 최적화 간판 (이것 때문에 주말 내내 고생하셨던 그 코드!)
export async function generateMetadata({ params }) {
  const { slug } = params;
  const decodeSlug = slug ? decodeURIComponent(slug) : "와와학습코칭센터";

  return {
    title: `${decodeSlug} | 공식 안내 기지`,
    description: `${decodeSlug} 맞춤형 1:1 개별 지도 및 코칭 서비스를 제공합니다.`,
    openGraph: {
      title: decodeSlug,
      description: "1:1 개별 밀착 맞춤 코칭 및 무료 상담 신청하기",
    },
  };
}

// 🌟 [2] 철거되었던 상훈님의 진짜 화려한 10만 개 본문 엔진 복구!
export default function ProgressSEOPage({ params }) {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);

  // 190개 지역 json 데이터 중에서 현재 주소에 맞는 진짜 마케팅 데이터를 매칭합니다.
  const matchedData = keywordsData.find((item) => item.slug === decodedSlug);

  // 혹시라도 데이터가 없는 엉뚱한 주소로 들어오면 404 처리를 해줍니다.
  if (!matchedData) {
    return notFound();
  }

  // 상훈님이 예쁘게 디자인하셨던 홍보용 본문 화면 구조입니다.
  return (
    <main style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', lineHeight: '1.6' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>
          {matchedData.수식어 || "추천 학원 안내"}
        </span>
        <h1 style={{ fontSize: '32px', color: '#1e3a8a', marginTop: '16px', fontWeight: '8px' }}>
          {matchedData.지역} {matchedData.과목} 전문 교육 기지
        </h1>
        <p style={{ color: '#4b5563', fontSize: '18px', marginTop: '12px' }}>
          우리 아이 맞춤형 1:1 밀착 개별 지도 및 학습 코칭 센터
        </p>
      </div>

      <section style={{ backgroundColor: '#f8fafc', padding: '30px', borderRadius: '16px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ fontSize: '20px', color: '#1e3a8a', marginBottom: '16px' }}>🎯 맞춤형 학습 포인트</h2>
        <ul style={{ paddingLeft: '20px', margin: '0' }}>
          <li style={{ marginBottom: '10px' }}>{matchedData.지역} 학생들의 학교별 내신 경향을 100% 완벽 분석 및 밀착 대비</li>
          <li style={{ marginBottom: '10px' }}>단순 주입식 암기가 아닌, 취약점을 정확하게 파고드는 체계적인 {matchedData.과목} 맞춤 코칭</li>
          <li>기초부터 심화까지 학생의 현재 이해도에 맞춘 1:1 속도 조절 지도 서비스</li>
        </ul>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <a 
          href="tel:010-0000-0000" 
          style={{ display: 'inline-block', backgroundColor: '#2563eb', color: '#ffffff', padding: '16px 32px', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}
        >
          📞 {matchedData.지역} 1:1 무료 학습 진단 상담 신청하기
        </a>
      </div>
    </main>
  );
}