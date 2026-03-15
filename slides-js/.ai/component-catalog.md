# Component Catalog

Exhaustive reference for every component in Research Decks, with all prop combinations and usage examples.

For theme token values referenced below, see [theme-tokens.md](./theme-tokens.md).

---

## TitleSlide

Cover/title slide with logo, title, subtitle, author, and date. The title text uses the brand gradient as a text fill.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **(required)** | Main title text — rendered with the brand gradient |
| `subtitle` | `string` | — | Event name or subtitle |
| `author` | `string` | — | Speaker name(s) |
| `date` | `string` | — | Date string |
| `showLogo` | `boolean` | `true` | Show the logo above the title |

### Examples

```mdx
{/* Full props — conference talk */}
<TitleSlide
  title="Building with Spatial SQL"
  subtitle="PyCon 2026"
  author="Jane Smith"
  date="March 2026"
/>
```

```mdx
{/* Minimal — title only */}
<TitleSlide title="Introduction" />
```

```mdx
{/* Without logo — for internal presentations */}
<TitleSlide
  title="Internal Team Update"
  subtitle="Q1 Review"
  showLogo={false}
/>
```

```mdx
{/* Closing slide pattern — repurpose as thank you */}
<TitleSlide
  title="Thank You"
  subtitle="Questions?"
  author="github.com/isaaccorley"
  date="@isaaccorley"
/>
```

```mdx
{/* Title + subtitle only — no author/date */}
<TitleSlide
  title="Spatial Computing at Scale"
  subtitle="Processing billions of data points at scale"
/>
```

### Notes

- The title is rendered at display size (`fontSize: [7, 8]`) with the brand gradient.
- Author and date appear together separated by `|` — if only one is provided, no separator is shown.
- The logo is a `<Logo>` component rendered at `height={48}`.

---

## SectionSlide

Big centered text for section dividers or dramatic statements.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **(required)** | The content to display centered |

### Examples

```mdx
{/* With ## heading — best visual impact */}
<SectionSlide>

## Why Spatial Matters

</SectionSlide>
```

```mdx
{/* With ### heading */}
<SectionSlide>

### The Challenge

</SectionSlide>
```

```mdx
{/* Big number / key metric */}
<SectionSlide>

## 10x Faster

</SectionSlide>
```

```mdx
{/* Plain text (no heading markup) */}
<SectionSlide>

Every record has a location.

</SectionSlide>
```

### Notes

- Content is centered both vertically and horizontally.
- All direct children are rendered at a large responsive font size (`fontSize: [6, 7, 8]`).
- Use `##` headings for the best visual weight.
- Blank lines are required after `<SectionSlide>` and before `</SectionSlide>` for MDX to process Markdown content inside the JSX.

---

## Embed

Full-viewport iframe embed for live demos, maps, and interactive visualizations.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **(required)** | URL to embed in the iframe |
| `title` | `string` | `"Embedded content"` | Accessible title for the iframe |
| `clip` | `boolean` | `false` | Clip the bottom to avoid overlapping the SlideNav bar |

### Examples

```mdx
{/* Basic embed */}
<Embed src="https://example.com/demo" />
```

```mdx
{/* With clip and custom title */}
<Embed
  src="https://example.com/demo"
  title="Interactive Demo"
  clip
/>
```

```mdx
{/* Dashboard embed */}
<Embed
  src="https://example.com/dashboard"
  title="Dashboard"
  clip
/>
```

### Important

- **The Embed goes full-viewport.** It must be the **ONLY content** on its slide — no other text, headings, or components on the same `---` segment.
- Always add a **lead-in slide** before an Embed slide so the audience knows what they're about to see:

```mdx
# Live Demo

Let me show you the interactive visualization...

---

<Embed src="https://example.com/demo" title="Demo" clip />
```

- The `clip` prop reduces the iframe height by 48px (the SlideNav height) so the embedded page's own UI is not obscured by the navigation bar.
- The iframe uses `sandbox="allow-scripts allow-same-origin allow-popups allow-forms"` for security.

---

## Columns

Multi-column grid layout. Each direct child becomes one column.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cols` | `2 \| 3` | `2` | Number of columns |
| `gap` | `number` | `5` (32px) | Gap between columns in theme space units |
| `children` | `ReactNode` | **(required)** | Column content — each direct child is one column |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'` | Vertical alignment of columns |

### Examples

```mdx
{/* Two columns — default */}
<Columns cols={2}>
<div>

## Left Column

Content on the left side.

</div>
<div>

## Right Column

Content on the right side.

</div>
</Columns>
```

```mdx
{/* Three columns */}
<Columns cols={3}>
<div>

### First

Description of the first item.

</div>
<div>

### Second

Description of the second item.

</div>
<div>

### Third

Description of the third item.

</div>
</Columns>
```

```mdx
{/* Center-aligned columns */}
<Columns cols={2} align="center">
<div>

Short content that will be vertically centered.

</div>
<div>

This column has more content.

It has multiple paragraphs.

And it will be taller than the left.

</div>
</Columns>
```

```mdx
{/* End-aligned columns */}
<Columns cols={2} align="end">
<div>

Short content aligned to the bottom.

</div>
<div>

This column has more content.

The short column aligns to the bottom edge of this one.

</div>
</Columns>
```

```mdx
{/* Stretch alignment */}
<Columns cols={2} align="stretch">
<div>

Both columns stretch to the same height.

</div>
<div>

Useful for cards or bordered sections.

</div>
</Columns>
```

```mdx
{/* Custom gap */}
<Columns cols={2} gap={7}>
<div>

Wide gap (64px) between columns.

</div>
<div>

More breathing room.

</div>
</Columns>
```

```mdx
{/* Code walkthrough pattern — text + code */}
<Columns cols={2}>
<div>

## How It Works

The query uses `ST_Contains` to find all buildings within a region.

</div>
<div>

```python
df = sedona.sql("""
    SELECT * FROM buildings
    WHERE ST_Contains(region, geometry)
""")
```

</div>
</Columns>
```

### Critical: `<div>` Wrapping Rule

Every column child **MUST** be wrapped in a `<div>` tag. Markdown content inside the `<div>` requires a **blank line** after the opening `<div>` and before the closing `</div>`:

```mdx
{/* ✅ CORRECT — blank lines around Markdown content */}
<Columns cols={2}>
<div>

## This Works

Content here.

</div>
<div>

## This Also Works

More content.

</div>
</Columns>
```

```mdx
{/* ❌ WRONG — missing blank lines, Markdown will not be processed */}
<Columns cols={2}>
<div>
## This Will Break
Content here.
</div>
<div>
## Also Broken
</div>
</Columns>
```

---

## Code Blocks

Syntax-highlighted code using fenced code blocks in Markdown. The `CodeBlock` component is applied automatically — you do not write `<CodeBlock>` directly in MDX.

### How It Works

In MDX, fenced code blocks (triple backticks with a language identifier) are automatically rendered through the `CodeBlock` component via `mdx-components.tsx`. The component uses shiki with a custom syntax theme.

### Props (internal — for reference)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | **(required)** | The code string (passed automatically from MDX) |
| `className` | `string` | — | Language class (MDX passes `"language-python"` etc.) |
| `title` | `string` | — | Optional title shown above the code block |
| `highlight` | `string` | — | Line numbers to highlight (e.g., `"3,5-7"`) |

### Examples

````mdx
```python
from sedona.spark import SedonaContext

sedona = SedonaContext.create(spark)
df = sedona.sql("SELECT * FROM buildings LIMIT 10")
```
````

````mdx
```sql
SELECT name, ST_Area(geometry) AS area
FROM buildings
WHERE ST_Intersects(
  geometry,
  ST_Buffer(ST_Point(-122.4, 37.7), 0.01)
)
ORDER BY area DESC
```
````

````mdx
```typescript
import { Deck } from './components/Deck';
import theme from './theme';

export default function App({ children }) {
  return <Deck title="My Talk">{children}</Deck>;
}
```
````

````mdx
```jsx
<Columns cols={2}>
  <div>Left content</div>
  <div>Right content</div>
</Columns>
```
````

### Supported Languages

Python, SQL, TypeScript, JavaScript, JSX, TSX, Bash, JSON, YAML, Java, Scala, and more — any language supported by shiki.

### Notes

- Code blocks are styled with `bg: 'surface'` (`#1b1b1b`), `borderRadius: 'md'`, and `border: 'thin'`.
- Font is `monospace` (JetBrains Mono) at `fontSize: 1` (14px).
- Syntax colors: purple keywords, blue functions, green strings, yellow numbers. See [theme-tokens.md](./theme-tokens.md) for the full syntax color table.

---

## Logo

Logo component with optional wordmark text.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `number` | `40` | Logo height in pixels (width scales proportionally) |
| `wordmark` | `boolean` | `true` | Show text alongside the logo mark |
| `color` | `string` | — | Override text color (defaults to `text` / white) |

### Examples

```mdx
{/* Default — logo mark + wordmark */}
<Logo />
```

```mdx
{/* Larger logo */}
<Logo height={60} />
```

```mdx
{/* Icon only — no wordmark text */}
<Logo height={30} wordmark={false} />
```

```mdx
{/* Custom color */}
<Logo height={40} color="#9e78f0" />
```

### Notes

- Usually you don't need `<Logo>` directly — `<TitleSlide>` includes it automatically when `showLogo` is `true`.
- Useful in custom slide layouts where you want to place the logo manually.
- The logo mark is a gradient-filled rounded square with "IC" initials.
- The wordmark font size scales proportionally with the `height` prop (`height * 0.5`px).

---

## SpeakerNotes

Hidden presenter notes. Not visible to the audience — only shown when notes mode is active (`?notes=true` in the URL or press **N** key).

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **(required)** | The notes content |

### Examples

```mdx
{/* Basic notes with bullet points */}
Some slide content here.

<SpeakerNotes>
- Remember to mention the 10x performance improvement
- Talk about the benchmark results
- Estimated time: 2 minutes
</SpeakerNotes>
```

```mdx
{/* Notes with transition cue */}
# Architecture Overview

Our system has three layers...

<SpeakerNotes>
- Walk through each layer
- Transition: "Let me show you how this works in practice..."
</SpeakerNotes>
```

```mdx
{/* Demo notes */}
# Live Demo

<SpeakerNotes>
- Open demo application
- Walk through the interface
- Show key features
- Highlight results
</SpeakerNotes>
```

### Notes

- Place at the **END** of a slide's content, before the `---` separator.
- Notes appear as a fixed panel at the bottom of the viewport (above the SlideNav bar) with a semi-transparent dark background.
- Always hidden in print mode (`@media print`).
- Content can include Markdown — it's rendered as `ReactNode`.

---

## Diagram

Wrapper for inline SVG diagrams that provides theme-aware CSS custom properties.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **(required)** | SVG content (JSX SVG elements) |
| `title` | `string` | — | Accessible caption shown above the diagram |
| `width` | `string \| number` | `'100%'` | Width constraint |
| `height` | `string \| number` | `'auto'` | Height constraint |

### CSS Variables

Inside `<Diagram>`, these CSS custom properties are available for SVG elements:

| Variable | Theme Token | Value |
|----------|------------|-------|
| `--diagram-primary` | `primary` | `#6612c5` |
| `--diagram-accent` | `accent` | `#9e78f0` |
| `--diagram-blue` | `blue` | `#0957c3` |
| `--diagram-text` | `text` | `#FFFFFF` |
| `--diagram-muted` | `textMuted` | `#737373` |
| `--diagram-border` | `border` | `#323232` |
| `--diagram-surface` | `surface` | `#1b1b1b` |

### Examples

```mdx
{/* Basic diagram with boxes and arrows */}
<Diagram title="Data Pipeline">
  <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--diagram-border)" />
      </marker>
    </defs>

    <rect x="20" y="60" width="160" height="80" rx="8"
          fill="var(--diagram-surface)" stroke="var(--diagram-accent)" strokeWidth="2" />
    <text x="100" y="105" textAnchor="middle" fill="var(--diagram-text)" fontSize="14">
      Data Lake
    </text>

    <line x1="180" y1="100" x2="260" y2="100"
          stroke="var(--diagram-border)" strokeWidth="2" markerEnd="url(#arrow)" />

    <rect x="260" y="60" width="160" height="80" rx="8"
          fill="var(--diagram-surface)" stroke="var(--diagram-primary)" strokeWidth="2" />
    <text x="340" y="105" textAnchor="middle" fill="var(--diagram-text)" fontSize="14">
      Sedona
    </text>

    <line x1="420" y1="100" x2="500" y2="100"
          stroke="var(--diagram-border)" strokeWidth="2" markerEnd="url(#arrow)" />

    <rect x="500" y="60" width="160" height="80" rx="8"
          fill="var(--diagram-surface)" stroke="var(--diagram-blue)" strokeWidth="2" />
    <text x="580" y="105" textAnchor="middle" fill="var(--diagram-text)" fontSize="14">
      Tiles API
    </text>
  </svg>
</Diagram>
```

```mdx
{/* Diagram with width constraint */}
<Diagram title="Simple Flow" width="600px">
  <svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="20" width="120" height="60" rx="8"
          fill="var(--diagram-surface)" stroke="var(--diagram-accent)" strokeWidth="2" />
    <text x="70" y="55" textAnchor="middle" fill="var(--diagram-text)" fontSize="14">
      Input
    </text>

    <rect x="270" y="20" width="120" height="60" rx="8"
          fill="var(--diagram-surface)" stroke="var(--diagram-primary)" strokeWidth="2" />
    <text x="330" y="55" textAnchor="middle" fill="var(--diagram-text)" fontSize="14">
      Output
    </text>
  </svg>
</Diagram>
```

### Notes

- The `<Diagram>` renders as a `<figure>` element. The `title` prop renders as a `<figcaption>`.
- SVGs inside `<Diagram>` get `width: 100%` and `height: auto` automatically.
- The `<text>` elements inside SVG inherit `fontFamily: body` (Space Grotesk).
- Always use `var(--diagram-*)` variables instead of hardcoded colors so diagrams match the theme.
- Define arrow markers in a `<defs>` block inside your `<svg>`.
