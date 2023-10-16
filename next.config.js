/**@type {import('next').NextConfig} **/
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	compress: true,
	devIndicators: {
		buildActivity: true,
		buildActivityPosition: 'bottom-left',
	},
};

module.exports = nextConfig;
