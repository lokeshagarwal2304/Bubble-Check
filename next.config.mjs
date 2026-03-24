/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable React Strict Mode to prevent double rendering in development
  reactStrictMode: false,

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  // Turbopack is the default dev engine in Next.js 16
  // optimizePackageImports handles tree-shaking for heavy UI libraries automatically
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
}

export default nextConfig
