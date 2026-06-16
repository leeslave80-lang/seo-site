// 🌟 네이버 검색 로봇이 각 동네별 제목과 썸네일을 긁어가는 핵심 메타데이터 함수
export async function generateMetadata({ params }) {
  const { slug } = params;
  
  // 주소창의 인코딩된 글자(%EB%82%A8...)를 컴퓨터가 읽을 수 있는 한글로 변환합니다.
  const decodeSlug = decodeURIComponent(slug);
  
  // 대시(-) 기호를 기준으로 [남가좌동, 영어, 개별지도학원]을 쪼개서 변수에 담습니다.
  const dongName = decodeSlug.split('-')[0] || "우리동네";
  const subject = decodeSlug.split('-')[1] || "전문";
  const academyName = decodeSlug.split('-')[2] || "학원";

  return {
    // 웹브라우저 탭에 뜨는 진짜 제목
    title: `${dongName} ${subject} 전문 ${academyName} - 맞춤 코칭 안내`,
    description: `${dongName}에서 가장 신뢰받는 교육 파트너! ${dongName} 학생들을 위한 1:1 개별 맞춤 코칭을 제공합니다.`,
    
    // 카카오톡이나 네이버 블로그에 주소 올렸을 때 뜨는 박스(OG 태그)
    openGraph: {
      title: `${dongName} ${subject} 전문 ${academyName}`,
      description: `${dongName} 1:1 개별 밀착 맞춤 코칭 및 무료 상담 신청하기`,
      images: [
        {
          // 썸네일 이미지 주소 (추후 상훈님의 진짜 이미지 주소로 변경 가능합니다!)
          url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
          width: 800,
          height: 600,
          alt: `${dongName} 학원 안내`,
        },
      ],
    },
  };
}