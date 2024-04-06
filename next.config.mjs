/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.shutterstock.com",
      "images.unsplash.com",
      "plus.unsplash.com",
    ],
  },
};

export default nextConfig;
