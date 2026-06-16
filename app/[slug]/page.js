// 🌟 절대 에러 안 나는 안전 가드 버전 메타데이터 함수
export async function generateMetadata({ params }) {
  try {
    const { slug } = params;
    if (!slug) return { title: "와와학습코칭센터" };

    const decodeSlug = decodeURIComponent(slug);
    const parts = decodeSlug.split('-');
    
    // 주소창 글자가 몇 개든 상관없이 안전하게 매칭
    const dongName = parts[0] || "우리동네";
    const subject = parts[1] || "전문";
    const academyName = parts[2] || "학원";

    return {
      title: `${dongName} ${subject} ${academyName} - 맞춤 코칭 안내`,
      description: `${dongName}에서 가장 신뢰받는 교육 파트너! 1:1 개별 맞춤 코칭을 제공합니다.`,
      openGraph: {
        title: `${dongName} ${subject} ${academyName}`,
        description: `${dongName} 1:1 개별 밀착 맞춤 코칭 및 무료 상담 신청하기`,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
            width: 800,
            height: 600,
            alt: `${dongName} 학원 안내`,
          },
        ],
      },
    };
  } catch (error) {
    // 혹시라도 글자가 깨지거나 에러가 나면 기본 간판을 띄워서 서버 다운을 막습니다.
    return {
      title: "와와학습코칭센터 공식 안내 페이지",
      description: "전국 각 지역별 맞춤형 1:1 개별 지도 및 코칭 서비스를 제공합니다.",
    };
  }
}