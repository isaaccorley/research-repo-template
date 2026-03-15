import type { ThemeRegistration } from 'shiki';

/**
 * Custom syntax highlighting theme for shiki.
 * Purple/blue palette derived from the brand colors.
 */
export const syntaxTheme: ThemeRegistration = {
  name: 'research-decks',
  type: 'dark',
  colors: {
    // Editor colors
    'editor.background': '#1b1b1b',
    'editor.foreground': '#e0e0e0',
    'editorLineNumber.foreground': '#4a4a4a',
    'editorCursor.foreground': '#9e78f0',
    'editor.selectionBackground': '#6612c540',
    'editor.lineHighlightBackground': '#ffffff08',
  },
  tokenColors: [
    // Comments
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: {
        foreground: '#5c5c5c',
        fontStyle: 'italic',
      },
    },
    // Strings
    {
      scope: ['string', 'string.quoted', 'string.template'],
      settings: {
        foreground: '#4ade80', // green — high contrast on dark bg
      },
    },
    // Numbers
    {
      scope: ['constant.numeric'],
      settings: {
        foreground: '#fbbf24', // warm yellow
      },
    },
    // Keywords (import, from, def, class, return, etc.)
    {
      scope: [
        'keyword',
        'keyword.control',
        'keyword.operator.new',
        'storage.type',
        'storage.modifier',
      ],
      settings: {
        foreground: '#9e78f0', // accent purple
      },
    },
    // Built-in types and language constants
    {
      scope: ['constant.language', 'support.type.builtin', 'variable.language'],
      settings: {
        foreground: '#9e78f0',
      },
    },
    // Functions and methods
    {
      scope: ['entity.name.function', 'support.function', 'meta.function-call'],
      settings: {
        foreground: '#60a5fa', // light blue
      },
    },
    // Classes and types
    {
      scope: [
        'entity.name.type',
        'entity.name.class',
        'support.class',
        'entity.other.inherited-class',
      ],
      settings: {
        foreground: '#0957c3', // brand blue
      },
    },
    // Variables and parameters
    {
      scope: ['variable', 'variable.parameter', 'variable.other'],
      settings: {
        foreground: '#e0e0e0', // default text
      },
    },
    // Operators and punctuation
    {
      scope: ['keyword.operator', 'punctuation', 'punctuation.separator', 'punctuation.terminator'],
      settings: {
        foreground: '#a3a3a3', // muted
      },
    },
    // Decorators / annotations
    {
      scope: ['meta.decorator', 'punctuation.decorator'],
      settings: {
        foreground: '#f97316', // orange for decorators
      },
    },
    // SQL keywords
    {
      scope: ['keyword.other.DML.sql', 'keyword.other.DDL.sql', 'keyword.other.sql'],
      settings: {
        foreground: '#9e78f0',
        fontStyle: 'bold',
      },
    },
    // SQL functions
    {
      scope: ['support.function.sql'],
      settings: {
        foreground: '#60a5fa',
      },
    },
    // Tags (JSX/HTML)
    {
      scope: ['entity.name.tag', 'punctuation.definition.tag'],
      settings: {
        foreground: '#9e78f0',
      },
    },
    // Attributes (JSX/HTML)
    {
      scope: ['entity.other.attribute-name'],
      settings: {
        foreground: '#60a5fa',
      },
    },
    // Regex
    {
      scope: ['string.regexp'],
      settings: {
        foreground: '#f87171',
      },
    },
    // Markdown headings (for MDX)
    {
      scope: ['markup.heading', 'entity.name.section'],
      settings: {
        foreground: '#9e78f0',
        fontStyle: 'bold',
      },
    },
    // Markdown bold/italic
    {
      scope: ['markup.bold'],
      settings: {
        fontStyle: 'bold',
      },
    },
    {
      scope: ['markup.italic'],
      settings: {
        fontStyle: 'italic',
      },
    },
  ],
};

/**
 * Highlight code using shiki with the custom theme.
 * Dynamically imports shiki to avoid SSR bundle bloat.
 *
 * @param code - The source code string
 * @param lang - The language identifier (e.g., 'python', 'sql', 'typescript')
 * @returns HTML string of the highlighted code
 */
export async function highlightCode(code: string, lang: string): Promise<string> {
  const { codeToHtml } = await import('shiki');
  return codeToHtml(code, {
    lang: lang || 'text',
    theme: syntaxTheme,
  });
}
