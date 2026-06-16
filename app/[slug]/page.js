import fs from 'fs';
import path from 'path';

// 1. 데이터 가져오기
function getKeywordsData() {
  const filePath = path.join(process.cwd(), 'data', 'keywords.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
}

// 2. 검색엔진용 메타 태그 생성 (상훈님 한글 데이터 매칭 완료)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).trim();
  const data = getKeywordsData();
  
  // 주소창의 slug와 데이터 안의 slug를 비교
  const match = data.find((item) => String(item.slug).trim() === decodedSlug);

  if (!match) {
    return { title: '페이지를 찾을 수 없습니다' };
  }

  return {
    title: `${match.지역} ${match.과목} 전문 ${match.수식어} - 맞춤형 개별지도 추천`,
    description: `${match.지역} 지역 ${match.과목} 전문 ${match.수식어}입니다. 학생 성향에 맞춘 철저한 학습 코칭과 성적 향상 솔루션을 제공합니다. 지금 확인해 보세요.`,
  };
}

// 3. 실제 화면을 그려주는 함수 (상훈님 한글 데이터 매칭 완료)
export default async function Page({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).trim();
  const data = getKeywordsData();
  
  const match = data.find((item) => String(item.slug).trim() === decodedSlug);

  if (!match) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl font-bold">존재하지 않는 페이지이거나 준비 중인 지역입니다.</h1>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 text-gray-800">
      {/* 상단 지역 표시 */}
      <div className="mb-6 text-sm text-blue-600 font-semibold">
        교육 전문 안내 📍 {match.지역}
      </div>

      {/* 메인 타이틀 */}
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        {match.지역} {match.과목} 전문 {match.수식어}
      </h1>

      {/* 홍보 본문 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-900 border-b pb-2">🎯 {match.지역} 학생들을 위한 맞춤 수업 안내</h2>
        <p className="leading-relaxed text-gray-600 mb-4">
          안녕하세요! {match.지역}에서 가장 신뢰받는 교육 파트너, <strong className="text-blue-600">{match.수식어}</strong>입니다. 
          우리 아이들이 {match.과목} 과목에서 유독 어려움을 겪거나 공부 습관을 잡지 못해 고민이 많으셨나요?
        </p>
        <p className="leading-relaxed text-gray-600 mb-4">
          공부는 무조건 열심히 하는 것보다 <strong>'어떻게'</strong> 하느냐가 훨씬 중요합니다. 
          {match.수식어}에서는 단순한 주입식 암기 수업이 아닌, 학생 개개인의 성향과 현재 진도 레벨을 정밀 진단하여 완벽히 밀착 마크하는 1:1 개별 맞춤 코칭을 제공합니다.
        </p>
      </div>

      {/* 특장점 안내 */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-gray-900">✨ 왜 {match.수식어} 인가요?</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="mr-2 text-green-500">✔</span>
            <span><strong>철저한 자기주도학습 지도:</strong> 스스로 계획을 세우고 공부하는 힘을 기릅니다.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">✔</span>
            <span><strong>{match.지역} 내 학교별 내신 완벽 분석:</strong> 주변 학교들의 출제 경향을 완벽 파악하여 대비합니다.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">✔</span>
            <span><strong>취약한 {match.과목} 완벽 보완:</strong> 구멍 난 기초부터 심화 서술형 문제까지 빈틈없이 해결합니다.</span>
          </li>
        </ul>
      </div>

      {/* 하단 상담 신청 버튼 */}
      <div className="mt-12 rounded-xl bg-blue-50 p-6 text-center">
        <h4 className="text-md font-bold text-blue-900 mb-2">지금 바로 {match.지역} 전문 코칭 매니저와 상의하세요!</h4>
        <p className="text-sm text-blue-700 mb-4">우리 아이의 성적 역전 시나리오가 시작됩니다. (상담/진단 테스트 무료)</p>
        <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition">
          📞 교육 문의 및 무료 상담 신청하기
        </button>
      </div>
    </main>
  );
}
// 네이버 검색 로봇이 읽어갈 사이트 정보 (OG 태그)
export async function generateMetadata({ params }) {
  const { slug } = params;
  
  // 주소창의 긴 글자(slug)에서 동 이름을 예쁘게 추출합니다.
  // 예: "남가좌동-영어-와와학습코칭센터" -> "남가좌동"
  const decodeSlug = decodeURIComponent(slug);
  const dongName = decodeSlug.split('-')[0] || "우리동네";
  const subject = decodeSlug.split('-')[1] || "전문";
  const academyName = decodeSlug.split('-')[2] || "학원";

  return {
    title: `${dongName} ${subject} 전문 ${academyName} - 맞춤 코칭 안내`,
    description: `${dongName}에서 가장 신뢰받는 교육 파트너! ${dongName} 학생들을 위한 1:1 개별 맞춤 코칭을 제공합니다.`,
    openGraph: {
      title: `${dongName} ${subject} 전문 ${academyName}`,
      description: `${dongName} 1:1 개별 밀착 맞춤 코칭 및 무료 상담 신청하기`,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80', // 임시 교육용 썸네일 이미지 주소
          width: 800,
          height: 600,
          alt: `${dongName} 학원 안내`,
        },
      ],
    },
  };
}