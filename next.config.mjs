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
  async redirects() {
    return [
      {
        source: '/questionnaire',
        destination: 'https://questionnaire-official.vercel.app', // URL of your questionnaire on Vercel
        permanent: true, // This is a 301 permanent redirect
      },
    ];
  },
}

export default nextConfig
