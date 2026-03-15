/** @jsxImportSource theme-ui */
import { Logo } from './Logo';

export interface SlideNavProps {
  /** Presentation title shown on the left */
  title?: string;
  /** Current slide number (1-indexed for display) */
  current: number;
  /** Total number of slides */
  total: number;
}

/**
 * Bottom navigation bar that displays the presentation title and slide counter.
 * Fixed to the bottom of the viewport, hidden in print mode.
 */
export function SlideNav({ title, current, total }: SlideNavProps) {
  return (
    <div
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 5,
        bg: 'surface',
        borderTop: 'thin',
        fontFamily: 'body',
        fontSize: 0,
        color: 'textMuted',
        zIndex: 100,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        // Hide in print mode
        '@media print': {
          display: 'none',
        },
      }}
    >
      <div sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Logo height={20} wordmark={false} />
        {title && <span>{title}</span>}
      </div>

      <span sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
        SLIDE {current} / {total}
      </span>
    </div>
  );
}
