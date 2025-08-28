import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@ark-ui/react'],
  },

  async redirects() {
    return [
      { source: '/',
        destination: '/docs/overview/introduction',
        permanent: false
      },
      {
        source: '/docs',
        destination: '/docs/overview/introduction',
        permanent: false,
      },
      // {
      //   source: '/:framework/docs/:slug*',
      //   destination: '/docs/:slug*',
      //   permanent: false,
      // },
    ]
  },

  // // Log compiling issues/performance
  // webpack(config) {
  //   config.infrastructureLogging = {
  //     level: 'log',
  //     debug: /webpack\.cache|PackFileCacheStrategy/,
  //   };
  //   return config;
  // },

  /* config options here */
  
};

export default nextConfig;
