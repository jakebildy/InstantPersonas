/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ["instantpersonas.com", "api.dicebear.com"],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     // Add null-loader to prevent SSR of the `tiptap` package
  //     config.module.rules.push({
  //       test: /@tiptap/,
  //       use: 'null-loader',
  //     },
  //     {
  //       test: /@tiptap\/extension-image/,
  //       use: 'null-loader',
  //     },
  //     {
  //       test: /@tiptap\/extension-resize-image/,
  //       use: 'null-loader',
  //     },
  //     {
  //       test: /tiptap-markdown/,
  //       use: 'null-loader',
  //     });
  //   }

  //   // Add any additional custom Webpack configurations here

  //   return config;
  // },
};

export default nextConfig;
