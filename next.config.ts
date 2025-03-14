import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blocks',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
