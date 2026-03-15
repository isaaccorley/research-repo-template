/** @jsxImportSource theme-ui */
import type { ReactNode } from 'react';

export interface SlideProps {
  /** The slide content (one group from splitChildren) */
  children: ReactNode;
  /** Zero-indexed slide number */
  index: number;
  /** Total number of slides */
  total: number;
  /** Whether to show speaker notes */
  showNotes: boolean;
}

/**
 * Individual slide wrapper that provides consistent full-viewport layout.
 * Centers content vertically and provides responsive padding.
 */
export function Slide({ children }: SlideProps) {
  return (
    <div
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: [5, 6, 7], // Responsive horizontal padding: 32px / 48px / 64px
        py: [5, 6], // Responsive vertical padding: 32px / 48px
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
}
