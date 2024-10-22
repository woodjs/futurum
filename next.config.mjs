import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin()
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          'https://futurum-backend-production.up.railway.app/api/:path*', // Proxy to Backend
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // i18n: i18n.i18n,
}

export default withNextIntl(nextConfig)
