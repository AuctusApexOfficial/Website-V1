/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize image domains for Cloudinary
  images: {
    domains: ['res.cloudinary.com', 'hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // Add Vercel-specific optimizations
  experimental: {
    scrollRestoration: true,
    // Remove optimizeCss to fix the 'critters' module error
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://* blob:; media-src 'self' https://res.cloudinary.com; font-src 'self' data:; frame-src 'self' https://earth.google.com https://*.google.com https://calendly.com https://*.calendly.com;",
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  env: {
    CALENDLY_API_KEY: process.env.CALENDLY_API_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
  // Add Vercel-specific configuration
  poweredByHeader: false,
};

export default nextConfig;

