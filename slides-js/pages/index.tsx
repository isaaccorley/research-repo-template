/** @jsxImportSource theme-ui */
import Head from 'next/head';
import { DeckLibrary } from '../components/DeckLibrary';

/**
 * Library splash page — the main entry point for Research Decks.
 * Displays a grid of available deck presentations that users can browse and open.
 */
export default function LibraryPage() {
  return (
    <>
      <Head>
        <title>Research Decks — Library</title>
        <meta
          name="description"
          content="Browse research presentation decks — version controlled, on-brand, and developer-friendly."
        />
      </Head>
      <DeckLibrary />
    </>
  );
}
