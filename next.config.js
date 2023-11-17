/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_API_BASE_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "SECRET123",
    STRIPE_PUBLIC_KEY: "pk_test_51JzttlEWMOZiFav0kLFzWfDPmR6UU0AgDAGti1LXbDOObO31mVZFJy2C8yZ5fs72Dwywn1QJFaq79iF4qoCqea1E00wFJRN5Yu"
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
