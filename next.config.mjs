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
        destination: 'https://nestjs-boilerplate-test.herokuapp.com/api/:path*', // Proxy to Backend
      },
    ]
  },
  // i18n: i18n.i18n,
}

export default withNextIntl(nextConfig)
