import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

// When deploying to GitHub Pages, PAGES_BASE_PATH is set to the repo name
// (e.g. '/research-decks'). During local dev, it's unset so everything
// serves from the root.
const basePath = process.env.PAGES_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable MDX page extensions
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  // Disable React Strict Mode for presentation (double-render causes flash)
  reactStrictMode: false,

  // Output standalone for easy deployment
  output: 'export',

  // GitHub Pages serves the site under a subpath (e.g. /research-decks/)
  basePath,
  assetPrefix: basePath,

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  // MDX options
  options: {
    // Remark plugins
    remarkPlugins: [remarkGfm],
    // Rehype plugins (none needed for Phase 1)
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
