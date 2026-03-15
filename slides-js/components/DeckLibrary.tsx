/** @jsxImportSource theme-ui */
import Link from 'next/link';
import { colors } from '../theme/colors';
import { Logo } from './Logo';

// ---------------------------------------------------------------------------
// Deck manifest — add new entries here when creating new decks
// ---------------------------------------------------------------------------

/**
 * Metadata for a single deck in the library.
 * Each entry corresponds to an MDX file under pages/decks/.
 */
export interface DeckEntry {
  /** URL slug — must match the filename under pages/decks/ (without extension) */
  slug: string;
  /** Display title shown on the card */
  title: string;
  /** Short description of the deck's content */
  description: string;
  /** Author or team name */
  author: string;
  /** Date string (e.g. "March 2026") */
  date: string;
  /** Tags for categorisation */
  tags: string[];
}

/**
 * Registry of all available decks.
 * Add new entries to this array when creating new presentations.
 * Order determines display order on the library page.
 */
export const deckManifest: DeckEntry[] = [
  {
    slug: 'introducing-research-decks',
    title: 'Introducing Research Decks',
    description:
      'An overview of the Research Decks system — how slides work, available components, keyboard shortcuts, and how to get started.',
    author: 'Isaac Corley',
    date: 'March 2026',
    tags: ['internal', 'tutorial'],
  },
];

// ---------------------------------------------------------------------------
// DeckCard component
// ---------------------------------------------------------------------------

function DeckCard({ deck }: { deck: DeckEntry }) {
  return (
    <Link
      href={`/decks/${deck.slug}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bg: 'surface',
        border: 'thin',
        borderRadius: 'lg',
        p: 5,
        textDecoration: 'none',
        color: 'text',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        '&:hover, &:focus-visible': {
          borderColor: 'accent',
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 24px ${colors.primary}26`,
        },
        '&:focus-visible': {
          outline: `2px solid ${colors.accent}`,
          outlineOffset: '2px',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: colors.gradient,
          opacity: 0,
          transition: 'opacity 0.2s ease',
        },
        '&:hover::before, &:focus-visible::before': {
          opacity: 1,
        },
      }}
    >
      {/* Title */}
      <h3
        sx={{
          fontFamily: 'heading',
          fontWeight: 'bold',
          fontSize: 4,
          lineHeight: 'snug',
          m: 0,
          mb: 2,
        }}
      >
        {deck.title}
      </h3>

      {/* Description */}
      <p
        sx={{
          fontSize: 2,
          lineHeight: 'normal',
          color: 'textSecondary',
          m: 0,
          mb: 4,
          flex: 1,
        }}
      >
        {deck.description}
      </p>

      {/* Tags */}
      <div sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        {deck.tags.map((tag) => (
          <span
            key={tag}
            sx={{
              fontSize: 0,
              fontFamily: 'monospace',
              color: 'accent',
              bg: 'surfaceLight',
              px: 2,
              py: '2px',
              borderRadius: 'sm',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer meta */}
      <div
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: 'thin',
          pt: 3,
          fontSize: 1,
          color: 'textMuted',
        }}
      >
        <span>{deck.author}</span>
        <span>{deck.date}</span>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// DeckLibrary component
// ---------------------------------------------------------------------------

/**
 * Library splash page that displays all available decks as a card grid.
 * Serves as the main entry point for the research-decks application.
 */
export function DeckLibrary() {
  return (
    <div
      sx={{
        minHeight: '100vh',
        bg: 'background',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header
        sx={{
          px: [5, 6, 7],
          pt: [6, 7],
          pb: [5, 6],
        }}
      >
        <Logo height={40} />

        <h1
          sx={{
            fontFamily: 'heading',
            fontWeight: 'bold',
            fontSize: [7, 8],
            lineHeight: 'tight',
            m: 0,
            mt: 5,
            background: colors.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Deck Library
        </h1>

        <p
          sx={{
            fontFamily: 'body',
            fontSize: 3,
            color: 'textSecondary',
            m: 0,
            mt: 3,
            maxWidth: '640px',
            lineHeight: 'normal',
          }}
        >
          Presentation slides as code — version controlled, on-brand, and developer-friendly. Browse
          available decks or create a new one.
        </p>
      </header>

      {/* Deck grid */}
      <main
        sx={{
          px: [5, 6, 7],
          pb: [6, 7],
          flex: 1,
        }}
      >
        <ul
          aria-label="Available decks"
          sx={{
            display: 'grid',
            gridTemplateColumns: ['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)'],
            gap: 5,
            mt: 5,
            listStyle: 'none',
            p: 0,
            m: 0,
          }}
        >
          {deckManifest.map((deck) => (
            <li key={deck.slug}>
              <DeckCard deck={deck} />
            </li>
          ))}
        </ul>

        {/* Empty state hint for when there's only one deck */}
        {deckManifest.length <= 1 && (
          <p
            sx={{
              mt: 6,
              fontSize: 2,
              color: 'textMuted',
              fontFamily: 'body',
              textAlign: 'center',
              lineHeight: 'normal',
            }}
          >
            Add {deckManifest.length === 0 ? '' : 'more '}decks by creating MDX files in{' '}
            <code
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.9em',
                bg: 'surface',
                color: 'accent',
                px: 1,
                py: '2px',
                borderRadius: 'sm',
              }}
            >
              pages/decks/
            </code>{' '}
            and registering them in the deck manifest.
          </p>
        )}
      </main>

      {/* Footer */}
      <footer
        sx={{
          px: [5, 6, 7],
          py: 4,
          borderTop: 'thin',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 0,
          color: 'textMuted',
          fontFamily: 'body',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        <span>Research Decks</span>
        <span>
          {deckManifest.length} {deckManifest.length === 1 ? 'deck' : 'decks'} available
        </span>
      </footer>
    </div>
  );
}
