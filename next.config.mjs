/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚨 타입스크립트 빌드 검사? 꺼라.
  typescript: {
    ignoreBuildErrors: true,
  },
  // 🚨 ESLint 문법 검사? 꺼라.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;