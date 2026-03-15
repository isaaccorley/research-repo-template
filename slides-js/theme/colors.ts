/**
 * Brand color palette.
 * Purple/blue dark theme.
 * Used by Theme-UI theme object and syntax highlighting.
 */
export const colors = {
  // Core brand
  primary: '#6612c5',
  accent: '#9e78f0',
  blue: '#0957c3',

  // Gradient
  gradient: 'linear-gradient(261deg, #9e78f0 0%, #0957c3 100%)',

  // Background scale (dark theme)
  background: '#141414',
  surface: '#1b1b1b',
  surfaceLight: '#222222',

  // Text scale
  text: '#FFFFFF',
  textSecondary: '#a3a3a3',
  textMuted: '#737373',

  // Borders
  border: '#323232',
  subtle: '#383838',

  // Semantic
  highlight: '#9e78f0',
  success: '#4ade80',
  warning: '#fbbf24',
  error: '#f87171',
} as const;

export type ColorToken = keyof typeof colors;
