/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  // reactStrictMode: true,
  // https://github.com/vercel/next.js/discussions/37614
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // staticPageGenerationTimeout: 300,
  images: {
    domains: ['ipfs.io'],
  },

  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.(png|jpe?g|gif|mp4)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      }
    );

    return config;
  },
};

module.exports = nextConfig;
