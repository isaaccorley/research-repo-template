# Research Decks — AI Instructions

## Project Overview

This is a **Next.js + MDX slide deck system** with a dark purple/blue theme.

- The **library splash page** lives at `pages/index.tsx` and displays a grid of all available decks
- Deck presentations are MDX files under `pages/decks/` (e.g. `pages/decks/my-talk.mdx`)
- The deck manifest in `components/DeckLibrary.tsx` registers each deck with metadata (title, description, tags, etc.)
- Built with **Theme-UI** for styling (design tokens via `sx` prop)
- Keyboard navigation: arrow keys, Space, Enter
- PDF export: append `?print=true` to the URL
- Speaker notes: append `?notes=true` or press **N**

## How Slides Work

The entire presentation is a single MDX file. Slides are separated by `---` (horizontal rule in Markdown, becomes `<hr>` which the Deck component splits on). Everything between two `---` markers is one slide — text, code, JSX components, anything.

Every deck must export metadata at the top:

```mdx
export const meta = {
  title: 'My Presentation Title',
}
```

Navigation keys: →/↓/Space/Enter (next), ←/↑ (prev), N (toggle notes), F (fullscreen).
URL hash tracks the current slide: `#3` = slide 3.

## Quick Start: Scaffold a New Deck

Replace the contents of `pages/index.mdx` with a new presentation:

```mdx
export const meta = {
  title: 'My Talk Title',
}

<TitleSlide
  title="My Talk Title"
  subtitle="Conference Name 2026"
  author="Isaac Corley"
  date="March 2026"
/>

---

# First Content Slide

- Point one
- Point two

---

<TitleSlide
  title="Thank You"
  subtitle="Questions?"
/>
```

Run `bun run build` to verify the MDX compiles. Run `bun run dev` to preview locally.

## Available Components

### TitleSlide

Cover/title slide with logo, title, subtitle, author, and date. The title uses a gradient text fill.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **(required)** | Main title text |
| `subtitle` | `string` | — | Event name or subtitle |
| `author` | `string` | — | Speaker name(s) |
| `date` | `string` | — | Date string |
| `showLogo` | `boolean` | `true` | Show logo |

```mdx
<TitleSlide
  title="Deep Learning for Remote Sensing"
  subtitle="CVPR 2026"
  author="Isaac Corley"
  date="March 2026"
/>
```

### SectionSlide

Big centered text for section dividers or dramatic statements.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **(required)** | Content to display centered |

```mdx
<SectionSlide>

## Why This Matters

</SectionSlide>
```

Use `##` headings for best visual impact. Blank lines are required after `<SectionSlide>` and before `</SectionSlide>`.

### Embed

Full-viewport iframe for live demos, maps, interactive visualizations.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **(required)** | URL to embed |
| `title` | `string` | `"Embedded content"` | Accessible title |
| `clip` | `boolean` | `false` | Clip bottom to avoid overlapping nav bar |

```mdx
<Embed
  src="https://example.com/demo"
  title="Interactive Demo"
  clip
/>
```

**Important:** The Embed goes full-viewport. It must be the **ONLY content** on its slide. Add a lead-in slide before it.

### Columns

Multi-column grid layout. Each direct child becomes one column.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cols` | `2 \| 3` | `2` | Number of columns |
| `gap` | `number` | `5` (32px) | Gap in theme space units |
| `children` | `ReactNode` | **(required)** | Column content |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'` | Vertical alignment |

```mdx
<Columns cols={2}>
<div>

## Left Column

Content here.

</div>
<div>

## Right Column

More content.

</div>
</Columns>
```

**Critical rule:** Each column MUST be wrapped in a `<div>`. Markdown inside requires a **blank line** after the opening `<div>` and before the closing `</div>`.

### Code Blocks

Use standard Markdown fenced code blocks with a language identifier. The `CodeBlock` component is applied automatically — do not use `<CodeBlock>` directly.

````mdx
```python
import torch
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Linear(256, 10),
)
```
````

Supported languages: Python, SQL, TypeScript, JavaScript, JSX, TSX, Bash, JSON, YAML, Java, Scala, and more.

The code is syntax-highlighted with the custom theme (purple keywords, blue functions, green strings, yellow numbers).

### SpeakerNotes

Hidden presenter notes. Only shown when notes mode is active (`?notes=true` or N key).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **(required)** | Notes content |

```mdx
Some visible slide content here.

<SpeakerNotes>
- Remember to mention the 10x performance improvement
- Transition: "Let me show you how this works in practice..."
</SpeakerNotes>
```

Place at the **end** of a slide's content, before the `---` separator.

### Logo

Logo component. Usually not needed directly — `TitleSlide` includes it.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `number` | `40` | Logo height in pixels |
| `wordmark` | `boolean` | `true` | Show text |
| `color` | `string` | — | Override text color |

```mdx
<Logo height={60} />
```

### Diagram

Wrapper for inline SVG diagrams with theme-aware CSS custom properties.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **(required)** | SVG content |
| `title` | `string` | — | Accessible caption |
| `width` | `string \| number` | `'100%'` | Width constraint |
| `height` | `string \| number` | `'auto'` | Height constraint |

```mdx
<Diagram title="Data Flow">
  <svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="60" width="150" height="80" rx="8"
          fill="var(--diagram-surface)" stroke="var(--diagram-accent)" strokeWidth="2" />
    <text x="85" y="105" textAnchor="middle" fill="var(--diagram-text)" fontSize="14">
      Source
    </text>
  </svg>
</Diagram>
```

CSS variables available inside `<Diagram>`:
- `--diagram-primary` → `#6612c5`
- `--diagram-accent` → `#9e78f0`
- `--diagram-blue` → `#0957c3`
- `--diagram-text` → `#FFFFFF`
- `--diagram-muted` → `#737373`
- `--diagram-border` → `#323232`
- `--diagram-surface` → `#1b1b1b`

## Component Decision Tree

When deciding which component to use for a slide:

1. **First slide?** → `<TitleSlide>` with title, subtitle, author, date
2. **Last slide?** → `<TitleSlide>` variant with "Thank You"
3. **Big dramatic statement or section divider?** → `<SectionSlide>`
4. **Live web app / map / demo?** → `<Embed>` (give it its own slide)
5. **Comparing two things?** → `<Columns cols={2}>`
6. **Three parallel items?** → `<Columns cols={3}>`
7. **Code + explanation?** → `<Columns cols={2}>` with text in one, code in other
8. **Architecture / flow diagram?** → `<Diagram>` with inline SVG
9. **Just text + bullets?** → Plain Markdown (heading + bullets)
10. **Need code?** → Fenced code block with language tag
11. **Presenter needs private reminders?** → `<SpeakerNotes>` at end of slide

## Slide Patterns

### Code Walkthrough

````mdx
<Columns cols={2}>
<div>

## Step 1: Define the Model

Use PyTorch to build a custom architecture.

</div>
<div>

```python
import torch.nn as nn

class Encoder(nn.Module):
    def __init__(self, in_channels, out_channels):
        super().__init__()
        self.conv = nn.Conv2d(in_channels, out_channels, 3, padding=1)
        self.bn = nn.BatchNorm2d(out_channels)
```

</div>
</Columns>
````

### Comparison

```mdx
<Columns cols={2}>
<div>

### Before

- Manual feature engineering
- Hours of processing
- Limited scalability

</div>
<div>

### After

- End-to-end deep learning
- Minutes of processing
- Scales to global datasets

</div>
</Columns>
```

### Key Metric / Big Statement

```mdx
<SectionSlide>

## 10x Faster

</SectionSlide>
```

### Demo Intro → Embed

```mdx
# Live Demo

Let me show you the interactive visualization...

---

<Embed src="https://example.com/demo" title="Demo" clip />
```

The lead-in slide prepares the audience. The Embed slide is on its own with no other content.

### Closing Slide

```mdx
<TitleSlide
  title="Thank You"
  subtitle="Questions?"
  author="github.com/isaaccorley"
  date="@isaaccorley"
/>
```

## Scaffold Workflow

When generating a complete new deck:

1. **Gather context**: topic, audience (conference / workshop / internal), key message, approximate slide count, any demos to embed.
2. **Generate** `pages/decks/<slug>.mdx`:
   - Start with `export const meta = { title: '...' }`
   - First slide: `<TitleSlide>` with speaker details
   - Section slides to break up topics
   - Code examples using relevant APIs
   - Embed slides for demos (with lead-in slides)
   - Closing `<TitleSlide>` with thank you + links
   - `<SpeakerNotes>` with talking points on key slides
3. **Register** the deck in `components/DeckLibrary.tsx` manifest
4. **Verify**: Run `bun run build` to catch MDX syntax errors.

## Iterate Workflow

When modifying an existing deck:

1. Read the current MDX file
2. Count `---` separators to locate the target slide
3. Make the requested changes
4. Verify with `bun run build`

Common iteration patterns:
- **Add a slide after slide N** → find Nth `---`, add content after it
- **Make slide N a two-column layout** → wrap content in `<Columns>`
- **Add speaker notes to slide N** → add `<SpeakerNotes>` before the `---`
- **Add a code example** → insert fenced code block with language tag
- **Add a demo embed** → create `<Embed>` slide with lead-in

## References

For detailed reference material, see the `.ai/` directory:

- **[.ai/component-catalog.md](.ai/component-catalog.md)** — Exhaustive component reference with every prop combination and usage example
- **[.ai/example-deck.mdx](.ai/example-deck.mdx)** — Complete example deck showing every component and slide pattern in action
- **[.ai/theme-tokens.md](.ai/theme-tokens.md)** — All available colors, fonts, spacing, radii, and syntax highlighting colors for `sx` prop styling
