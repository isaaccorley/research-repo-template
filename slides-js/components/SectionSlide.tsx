/** @jsxImportSource theme-ui */
import type { ReactNode } from 'react';

export interface SectionSlideProps {
  /** The big text to display */
  children: ReactNode;
}

/**
 * Big centered text section divider.
 * Use for dramatic statements or topic transitions.
 */
export function SectionSlide({ children }: SectionSlideProps) {
  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
        '& > *': {
          fontSize: [6, 7, 8],
          lineHeight: 'tight',
          fontWeight: 'bold',
          maxWidth: '80%',
        },
      }}
    >
      {children}
    </div>
  );
}
