import type { NextConfig } from 'next'

const isGithubPages = process.env.GITHUB_PAGES === 'true'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages && process.env.NODE_ENV === 'production' ? '/stew-of-stars' : '',
}

export default nextConfig
