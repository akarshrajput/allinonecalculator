/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/calculators',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
