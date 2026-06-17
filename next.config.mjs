/** @type {import('next').NextConfig} */
const nextConfig = {
  // 빌드 시 타입스크립트 검사 에러를 완벽하게 무시합니다.
  typescript: {
    ignoreBuildErrors: true,
  },
  // 빌드 시 ESLint 문법 검사를 완벽하게 무시합니다.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;