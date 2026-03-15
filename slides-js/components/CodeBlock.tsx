/** @jsxImportSource theme-ui */
import { useEffect, useState } from 'react';
import { highlightCode } from '../theme/syntax';

export interface CodeBlockProps {
  /** The code string (from MDX code fences, this comes as children) */
  children: string;
  /** Language for syntax highlighting */
  className?: string; // MDX passes "language-python" etc. as className
  /** Optional title shown above the code block */
  title?: string;
  /** Line numbers to highlight (e.g., "3,5-7") */
  highlight?: string;
}

/**
 * Syntax-highlighted code block using shiki with the custom theme.
 * Used as the MDX override for fenced code blocks.
 */
export function CodeBlock({ children, className, title }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);

  // Extract language from className (MDX passes "language-python")
  const lang = className?.replace('language-', '') ?? 'text';

  // The children from MDX code blocks is the raw code string
  const code = typeof children === 'string' ? children.trim() : '';

  useEffect(() => {
    let cancelled = false;
    highlightCode(code, lang).then((result) => {
      if (!cancelled) {
        setHtml(result);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  return (
    <div
      sx={{
        bg: 'surface',
        borderRadius: 'md',
        border: 'thin',
        overflow: 'hidden',
        my: 3,
        fontSize: 1,
      }}
    >
      {title && (
        <div
          sx={{
            px: 3,
            py: 2,
            borderBottom: 'thin',
            color: 'textMuted',
            fontSize: 0,
            fontFamily: 'monospace',
          }}
        >
          {title}
        </div>
      )}
      {html ? (
        <div
          sx={{
            p: 3,
            overflow: 'auto',
            '& pre': { m: 0, bg: 'transparent', border: 'none', p: 0 },
            '& code': { fontFamily: 'monospace', bg: 'transparent', p: 0, fontSize: 'inherit' },
          }}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki returns pre-sanitized HTML
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre sx={{ p: 3, m: 0 }}>
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
