import keywordsData from '../data/keywords.json';

export default async function sitemap() {
  const baseUrl = 'https://seo-site-rho.vercel.app';

  // keywords.json에 있는 190개 대량 주소(slug)를 네이버 로봇용 메뉴판 주소로 자동 변환합니다.
  const fields = keywordsData.map((item) => ({
    url: `${baseUrl}/${encodeURIComponent(item.slug)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // 메인 주소도 메뉴판 맨 위에 슬쩍 얹어줍니다.
  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...fields,
  ];
}