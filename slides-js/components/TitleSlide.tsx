/** @jsxImportSource theme-ui */
import { Logo } from './Logo';

export interface TitleSlideProps {
  /** Presentation title — large display text */
  title: string;
  /** Subtitle or event name */
  subtitle?: string;
  /** Speaker name(s) */
  author?: string;
  /** Presentation date */
  date?: string;
  /** Show the logo. Default: true */
  showLogo?: boolean;
}

/**
 * Cover/title slide with logo, title, subtitle, author, and date.
 * The title text uses the brand gradient as a text fill.
 */
export function TitleSlide({ title, subtitle, author, date, showLogo = true }: TitleSlideProps) {
  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100%',
        gap: 4,
      }}
    >
      {showLogo && <Logo height={48} />}

      <h1
        sx={{
          fontSize: [7, 8],
          fontWeight: 'bold',
          lineHeight: 'tight',
          m: 0,
          background: 'linear-gradient(261deg, #9e78f0 0%, #0957c3 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p sx={{ fontSize: 4, color: 'textSecondary', m: 0, fontWeight: 'medium' }}>{subtitle}</p>
      )}

      <div sx={{ display: 'flex', gap: 3, alignItems: 'center', color: 'textMuted', fontSize: 2 }}>
        {author && <span>{author}</span>}
        {author && date && <span sx={{ color: 'border' }}>|</span>}
        {date && <span>{date}</span>}
      </div>
    </div>
  );
}
