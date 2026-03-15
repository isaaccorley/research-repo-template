import type { Theme } from 'theme-ui';
import { colors } from './colors';
import { fontSizes, fontWeights, fonts, lineHeights } from './fonts';

const theme: Theme = {
  // --- Design Tokens ---
  colors: {
    text: colors.text,
    background: colors.background,
    primary: colors.primary,
    secondary: colors.textSecondary,
    muted: colors.surface,
    accent: colors.accent,
    highlight: colors.highlight,
    // Custom tokens (accessible via sx={{ color: 'blue' }})
    blue: colors.blue,
    surface: colors.surface,
    surfaceLight: colors.surfaceLight,
    border: colors.border,
    subtle: colors.subtle,
    textSecondary: colors.textSecondary,
    textMuted: colors.textMuted,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
  },

  fonts: {
    body: fonts.body,
    heading: fonts.heading,
    monospace: fonts.monospace,
  },

  fontSizes: [...fontSizes],
  fontWeights: {
    ...fontWeights,
    body: fontWeights.regular,
    heading: fontWeights.bold,
  },
  lineHeights,

  space: [0, 4, 8, 16, 24, 32, 48, 64, 96, 128],

  radii: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  borders: {
    thin: `1px solid ${colors.border}`,
    thick: `2px solid ${colors.border}`,
    accent: `2px solid ${colors.accent}`,
  },

  // --- Base HTML Element Styles ---
  // These apply to raw HTML elements rendered from MDX
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'normal',
      color: 'text',
      bg: 'background',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    h1: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      fontSize: 7,
      lineHeight: 'tight',
      mt: 0,
      mb: 4,
    },
    h2: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      fontSize: 6,
      lineHeight: 'tight',
      mt: 0,
      mb: 3,
    },
    h3: {
      fontFamily: 'heading',
      fontWeight: 'medium',
      fontSize: 5,
      lineHeight: 'snug',
      mt: 0,
      mb: 3,
    },
    h4: {
      fontFamily: 'heading',
      fontWeight: 'medium',
      fontSize: 4,
      lineHeight: 'snug',
      mt: 0,
      mb: 2,
    },
    p: {
      fontSize: 3,
      lineHeight: 'normal',
      mt: 0,
      mb: 3,
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    ul: {
      fontSize: 3,
      lineHeight: 'relaxed',
      pl: 5,
      mt: 0,
      mb: 3,
    },
    ol: {
      fontSize: 3,
      lineHeight: 'relaxed',
      pl: 5,
      mt: 0,
      mb: 3,
    },
    li: {
      mb: 1,
    },
    blockquote: {
      borderLeft: 'accent',
      pl: 4,
      ml: 0,
      color: 'textSecondary',
      fontStyle: 'italic',
    },
    // Inline code uses these styles:
    code: {
      fontFamily: 'monospace',
      fontSize: '0.9em',
      bg: 'surface',
      color: 'accent',
      px: 1,
      py: '2px',
      borderRadius: 'sm',
    },
    pre: {
      fontFamily: 'monospace',
      fontSize: 1,
      lineHeight: 'normal',
      bg: 'surface',
      color: 'text',
      p: 4,
      borderRadius: 'md',
      border: 'thin',
      overflow: 'auto',
    },
    hr: {
      // The <hr> element is used as slide separator.
      // It should be invisible — the Deck component uses it as a split marker.
      display: 'none',
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 2,
      mb: 3,
    },
    th: {
      borderBottom: 'thick',
      p: 2,
      textAlign: 'left',
      fontWeight: 'medium',
    },
    td: {
      borderBottom: 'thin',
      p: 2,
    },
  },
};

export default theme;
