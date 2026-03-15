# Theme Design Tokens

Complete reference of all theme design tokens available in the Research Decks system.
Use these tokens with the Theme-UI `sx` prop to style elements consistently.

## Colors

| Token | Value | Description |
|-------|-------|-------------|
| `text` | `#FFFFFF` | Primary text color (white) |
| `background` | `#141414` | Page/slide background (near-black) |
| `primary` | `#6612c5` | Purple (brand primary) |
| `secondary` | `#a3a3a3` | Secondary text (maps to `textSecondary`) |
| `muted` | `#1b1b1b` | Muted background (maps to `surface`) |
| `accent` | `#9e78f0` | Light purple — links, highlights |
| `highlight` | `#9e78f0` | Same as accent |
| `blue` | `#0957c3` | Blue (brand secondary) |
| `surface` | `#1b1b1b` | Card/code block background |
| `surfaceLight` | `#222222` | Elevated surface background |
| `border` | `#323232` | Border/divider color |
| `subtle` | `#383838` | Subtle border variant |
| `textSecondary` | `#a3a3a3` | Subtitle/caption text |
| `textMuted` | `#737373` | De-emphasized text |
| `success` | `#4ade80` | Green (semantic) |
| `warning` | `#fbbf24` | Yellow (semantic) |
| `error` | `#f87171` | Red (semantic) |

### Brand Gradient

```
linear-gradient(261deg, #9e78f0 0%, #0957c3 100%)
```

Used on TitleSlide heading text as a gradient fill.

## Font Families

| Token | Value |
|-------|-------|
| `body` | `"Space Grotesk", system-ui, -apple-system, sans-serif` |
| `heading` | `"Space Grotesk", system-ui, -apple-system, sans-serif` |
| `monospace` | `"JetBrains Mono", "Fira Code", "Cascadia Code", monospace` |

## Font Sizes

| Index | Value | Pixel Equivalent | Usage |
|-------|-------|-----------------|-------|
| 0 | `0.75rem` | 12px | Caption, tiny labels |
| 1 | `0.875rem` | 14px | Small text, code blocks |
| 2 | `1rem` | 16px | Body text |
| 3 | `1.25rem` | 20px | Large body (default `<p>` in slides) |
| 4 | `1.5rem` | 24px | H4 heading |
| 5 | `2rem` | 32px | H3 heading |
| 6 | `2.5rem` | 40px | H2 heading |
| 7 | `3.5rem` | 56px | H1 heading |
| 8 | `5rem` | 80px | Display (title slide) |

## Font Weights

| Token | Value |
|-------|-------|
| `regular` / `body` | 400 |
| `medium` | 500 |
| `bold` / `heading` | 700 |

## Line Heights

| Token | Value |
|-------|-------|
| `tight` | 1.1 |
| `snug` | 1.25 |
| `normal` | 1.5 |
| `relaxed` | 1.75 |

## Space Scale

Used for `p`, `m`, `gap`, and other spacing properties.

| Index | Value |
|-------|-------|
| 0 | 0px |
| 1 | 4px |
| 2 | 8px |
| 3 | 16px |
| 4 | 24px |
| 5 | 32px |
| 6 | 48px |
| 7 | 64px |
| 8 | 96px |
| 9 | 128px |

## Border Radii

| Token | Value |
|-------|-------|
| `none` | 0 |
| `sm` | 4px |
| `md` | 8px |
| `lg` | 12px |
| `xl` | 16px |
| `full` | 9999px |

## Named Borders

| Token | Value |
|-------|-------|
| `thin` | `1px solid #323232` |
| `thick` | `2px solid #323232` |
| `accent` | `2px solid #9e78f0` |

## Syntax Highlighting Colors

From `theme/syntax.ts` — applied automatically to fenced code blocks.

| Token Type | Color | Hex |
|-----------|-------|-----|
| Keywords | Accent purple | `#9e78f0` |
| Functions | Light blue | `#60a5fa` |
| Classes/Types | Brand blue | `#0957c3` |
| Strings | Green | `#4ade80` |
| Numbers | Warm yellow | `#fbbf24` |
| Comments | Gray (italic) | `#5c5c5c` |
| Variables | Default text | `#e0e0e0` |
| Operators | Muted gray | `#a3a3a3` |
| Decorators | Orange | `#f97316` |
| SQL keywords | Purple (bold) | `#9e78f0` |

## Diagram CSS Variables

Available inside `<Diagram>` for SVG styling:

| Variable | Resolved Color | Hex |
|----------|---------------|-----|
| `--diagram-primary` | `primary` | `#6612c5` |
| `--diagram-accent` | `accent` | `#9e78f0` |
| `--diagram-blue` | `blue` | `#0957c3` |
| `--diagram-text` | `text` | `#FFFFFF` |
| `--diagram-muted` | `textMuted` | `#737373` |
| `--diagram-border` | `border` | `#323232` |
| `--diagram-surface` | `surface` | `#1b1b1b` |

## Usage with `sx` Prop

Theme-UI's `sx` prop lets you reference tokens by name:

```tsx
<div sx={{ color: 'accent', bg: 'surface', fontSize: 3, p: 4, borderRadius: 'md', border: 'thin' }}>
  Styled content
</div>
```

- **Color tokens** → `color`, `bg`, `borderColor`
- **Space indices** → `p`, `m`, `px`, `py`, `mx`, `my`, `gap`
- **Font size indices** → `fontSize`
- **Font family tokens** → `fontFamily`
- **Font weight tokens** → `fontWeight`
- **Line height tokens** → `lineHeight`
- **Border radii tokens** → `borderRadius`
- **Named borders** → `border`, `borderTop`, `borderBottom`, etc.
