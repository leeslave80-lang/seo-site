import { redirect } from 'next/navigation';

export default function HomePage() {
  // 메인 주소로 들어오는 모든 사람(과 네이버 로봇)을 
  // 우리가 완벽하게 만들어 둔 진짜 상세 페이지로 강제 순간이동 시킵니다!
  redirect('/남가좌동-영어-개별지도학원');
}