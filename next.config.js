/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.paysys.kr',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
