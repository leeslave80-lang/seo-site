import { redirect } from 'next/navigation';

export default function HomePage() {
  // 메인 주소로 들어오는 네이버 로봇을 100% 안전하게 상세 페이지로 강제 이동시킵니다.
  redirect('/%EB%82%A8%EA%B0%80%EC%A2%8C%EB%8F%99-%EC%98%81%EC%96%B4-%EA%B0%9C%EB%B3%84%EC%A7%80%EB%8F%84%ED%95%99%EC%9B%90');
}