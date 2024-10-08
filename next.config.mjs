/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // disable for react-beautiful-dnd
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
};

export default nextConfig;
