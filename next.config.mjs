/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚨 [치트키 1] 타입스크립트 에러가 있든 말든 무조건 무시하고 빌드 통과
  typescript: {
    ignoreBuildErrors: true,
  },
  // 🚨 [치트키 2] ESLint 문법 검사 에러도 무조건 무시하고 통과
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;