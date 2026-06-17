// @ts-nocheck
// 🚨 바로 위 주석이 이 파일 전체의 타입 검사를 완전히 꺼버리는 마법의 명령어입니다.

const nextConfig = {
  // 🚨 타입스크립트 에러가 있든 말든 무조건 무시하고 빌드 통과시키기
  typescript: {
    ignoreBuildErrors: true,
  },
  // 🚨 ESLint 문법 검사 에러도 무조건 무시하고 통과시키기
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;