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
  async rewrites() {
    return [
      {
        source: '/questionnaire',
        destination: 'https://questionnaire-official.vercel.app/', // URL of your questionnaire on Vercel
      },
    ];
  },
}

export default nextConfig
