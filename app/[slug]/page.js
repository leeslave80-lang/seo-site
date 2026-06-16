// 🌟 본문 엔진과 절대 충돌하지 않는 초안전 네이버 메타데이터 세팅
export async function generateMetadata({ params }) {
  const { slug } = params;
  
  // 주소창에 들어오는 한글 주소를 안전하게 글자로 변환
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