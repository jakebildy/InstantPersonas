const path = require("path");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["api.dicebear.com"],
  },
  webpack: (config, { isServer }) => {
    // Polyfill for Node.js core modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      os: require.resolve("os-browserify/browser"),
      zlib: require.resolve("browserify-zlib"),
      stream: require.resolve("stream-browserify"),
    };

    // Return the modified config
    return config;
  },
};
