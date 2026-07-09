/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // 完全禁用图片优化，使用原图加载（避免服务器处理延迟）
    unoptimized: true,
  },
  // 实验性功能：优化大页面
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
