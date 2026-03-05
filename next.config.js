/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix for NextAuth v5 beta bundling bug: "o5 is not a constructor"
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2", "@node-rs/bcrypt"],
  },
  // Prevent next-auth from being bundled incorrectly
  serverExternalPackages: ["next-auth"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google profile pictures
      },
    ],
  },
};

module.exports = nextConfig;
