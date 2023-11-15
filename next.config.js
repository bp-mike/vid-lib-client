/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_API_BASE_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "SECRET123",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
