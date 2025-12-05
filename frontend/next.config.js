/** @type {import('next').NextConfig} */

const basePath = process.env.BASE_PATH || ''

const nextConfig = {
  reactStrictMode: true,
  // export as static site for GitHub Pages compatibility
  output: 'export',
  // ensure exported files use trailing slash (helps gh-pages routing)
  trailingSlash: true,
  basePath: basePath,
  assetPrefix: basePath,
  experimental: {
    // stable features for static export
  }
}

module.exports = nextConfig
