const path = require('path');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    includePaths: [path.join(__dirname, 'components')]
  }
}
module.exports = nextConfig
