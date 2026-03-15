/** @jsxImportSource theme-ui */

export interface LogoProps {
  /** Height of the logo in pixels. Width scales proportionally. Default: 40 */
  height?: number;
  /** Show the wordmark text alongside the logo. Default: true */
  wordmark?: boolean;
  /** Override color (defaults to white) */
  color?: string;
}

/**
 * Logo component.
 * Renders a logo mark with optional wordmark text.
 */
export function Logo({ height = 40, wordmark = true, color }: LogoProps) {
  return (
    <div sx={{ display: 'flex', alignItems: 'center', gap: 2, height }}>
      {/* Placeholder logo mark */}
      <svg
        width={height}
        height={height}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Logo"
      >
        <rect width="40" height="40" rx="8" fill="url(#logo-gradient)" />
        <defs>
          <linearGradient
            id="logo-gradient"
            x1="40"
            y1="0"
            x2="0"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9e78f0" />
            <stop offset="1" stopColor="#0957c3" />
          </linearGradient>
        </defs>
        <text
          x="20"
          y="27"
          textAnchor="middle"
          fill="white"
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="700"
          fontSize="18"
        >
          IC
        </text>
      </svg>

      {/* Wordmark */}
      {wordmark && (
        <span
          sx={{
            fontFamily: 'heading',
            fontWeight: 'bold',
            fontSize: `${height * 0.5}px`,
            color: color ?? 'text',
            letterSpacing: '-0.02em',
          }}
        >
          Isaac Corley
        </span>
      )}
    </div>
  );
}
