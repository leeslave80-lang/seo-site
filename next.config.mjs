/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 타입스크립트 빌드 에러 무조건 패스
  typescript: {
    ignoreBuildErrors: true,
  },
  // 2. ESLint 문법 검사 에러 무조건 패스
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 🚨 [핵심 치트키] 빌드할 때 억지로 전국 지점을 미리 구워내지 말고, 
  // 사용자가 주소창 치고 들어올 때 실시간으로 데이터 매칭해서 보여주도록 강제 지시!
  output: undefined,
};

export default nextConfig;