/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["instantpersonas.com", "api.dicebear.com"],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  functions: {
    "app/(server)/**/*": {
      maxDuration: 5 * 60, // All functions can run for a maximum of 5 mins
    },
  },
};

export default nextConfig;
