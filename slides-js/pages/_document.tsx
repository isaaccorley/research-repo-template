import { Head, Html, Main, NextScript } from 'next/document';

/**
 * The base path for GitHub Pages deployment.
 * Set via PAGES_BASE_PATH env var in CI; empty string for local dev.
 */
const basePath = process.env.PAGES_BASE_PATH || '';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload font files for performance */}
        <link
          rel="preload"
          href={`${basePath}/fonts/SpaceGrotesk-Regular.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={`${basePath}/fonts/SpaceGrotesk-Bold.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={`${basePath}/fonts/JetBrainsMono-Regular.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#141414" />

        {/*
          Font-face declarations are inlined here (rather than in globals.css)
          so they can reference the basePath for GitHub Pages deployment.
          Without this, absolute /fonts/ URLs would break under a subpath.
        */}
        <style
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static font-face declarations with basePath interpolation
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'Space Grotesk';
                src: url('${basePath}/fonts/SpaceGrotesk-Regular.woff2') format('woff2');
                font-weight: 400;
                font-style: normal;
                font-display: swap;
              }
              @font-face {
                font-family: 'Space Grotesk';
                src: url('${basePath}/fonts/SpaceGrotesk-Medium.woff2') format('woff2');
                font-weight: 500;
                font-style: normal;
                font-display: swap;
              }
              @font-face {
                font-family: 'Space Grotesk';
                src: url('${basePath}/fonts/SpaceGrotesk-Bold.woff2') format('woff2');
                font-weight: 700;
                font-style: normal;
                font-display: swap;
              }
              @font-face {
                font-family: 'JetBrains Mono';
                src: url('${basePath}/fonts/JetBrainsMono-Regular.woff2') format('woff2');
                font-weight: 400;
                font-style: normal;
                font-display: swap;
              }
              @font-face {
                font-family: 'JetBrains Mono';
                src: url('${basePath}/fonts/JetBrainsMono-Medium.woff2') format('woff2');
                font-weight: 500;
                font-style: normal;
                font-display: swap;
              }
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
