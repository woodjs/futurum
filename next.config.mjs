import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin()
/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	// i18n: i18n.i18n,
};

export default withNextIntl(nextConfig)
