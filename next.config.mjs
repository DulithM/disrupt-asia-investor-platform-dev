/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Add experimental features for better compatibility
  experimental: {
    // Enable React 19 features
    reactCompiler: true,
  },
  // Ensure proper build configuration
  generateBuildId: () => 'build',
}

export default nextConfig
