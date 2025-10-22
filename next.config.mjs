/** @type {import('next').NextConfig} */
const cspHeader = `
  default-src 'self';
  script-src 
    'self' 
    'unsafe-eval' 
    'unsafe-inline' 
    https://static.cloudflareinsights.com 
    https://challenges.cloudflare.com;
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  frame-src https://challenges.cloudflare.com;
  connect-src 
    'self' 
    https://cloudflareinsights.com 
    https://*.cloudflareinsights.com 
    https://challenges.cloudflare.com;
  upgrade-insecure-requests;
`;
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // experimental: {
  //  cacheComponents: true
  // },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      }
    ]
  }
}

export default nextConfig