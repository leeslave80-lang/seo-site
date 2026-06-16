// 파일 맨 밑에 추가할 네이버 로봇용 OG 태그 세팅
export async function generateMetadata({ params }) {
  const { slug } = params;
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
          url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
          width: 800,
          height: 600,
          alt: `${dongName} 학원 안내`,
        },
      ],
    },
  };
}