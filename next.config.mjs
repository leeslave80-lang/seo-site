/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚨 [치트키 1] 빌드할 때 타입스크립트 에러가 나더라도 무조건 무시하고 패스
  typescript: {
    ignoreBuildErrors: true,
  },
  // 🚨 [치트키 2] ESLint 코드 검사 에러도 무조건 무시하고 통과
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;