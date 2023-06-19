const path = require('path')

/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              includePaths: [path.join(__dirname, 'styles')],
            },
          },
        },
      ],
    });

    return config;
  },
};
