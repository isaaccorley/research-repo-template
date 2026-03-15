/**
 * Font family definitions.
 * Space Grotesk for body/heading, JetBrains Mono for code.
 */
export const fonts = {
  body: '"Space Grotesk", system-ui, -apple-system, sans-serif',
  heading: '"Space Grotesk", system-ui, -apple-system, sans-serif',
  monospace: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
} as const;

export const fontSizes = [
  '0.75rem', // 0: 12px (caption)
  '0.875rem', // 1: 14px (small)
  '1rem', // 2: 16px (body)
  '1.25rem', // 3: 20px (large body)
  '1.5rem', // 4: 24px (h4)
  '2rem', // 5: 32px (h3)
  '2.5rem', // 6: 40px (h2)
  '3.5rem', // 7: 56px (h1)
  '5rem', // 8: 80px (display)
] as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  bold: 700,
} as const;

export const lineHeights = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.75,
} as const;
