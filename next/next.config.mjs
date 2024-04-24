/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["instantpersonas.com", "api.dicebear.com"],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  target: 'serverless'
};

export default nextConfig;
