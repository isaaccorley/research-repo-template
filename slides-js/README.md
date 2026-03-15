# Research Decks

Build polished slide decks for conference talks, workshops, and research presentations — without leaving your editor.

Research Decks is a **deck library**. The index page is a browsable catalog of all available decks. Each deck is an MDX file under `pages/decks/`. Pushes to `main` automatically deploy to GitHub Pages.

## Quick Start

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll see the **deck library** — a splash page listing all available presentations. Click any card to open that deck.

## How It Works

### Library Architecture

The project has two types of pages:

1. **Library page** (`pages/index.tsx`) — A splash page that displays all available decks as a card grid. This is the entry point at `/`.
2. **Deck pages** (`pages/decks/*.mdx`) — Individual slide deck presentations. Each MDX file becomes a deck at `/decks/<slug>`.

When you create a new deck, you add an MDX file under `pages/decks/` and register it in the **deck manifest** in `components/DeckLibrary.tsx`. The manifest stores each deck's title, description, author, date, slide count, and tags — all displayed on the library card.

### Slide Format

Each presentation is a single MDX file. Slides are separated by `---` — a Markdown horizontal rule. Everything between two `---` markers is one slide. You can mix plain Markdown (headings, bullets, code fences) with React components for layouts like two-column comparisons or full-viewport live demos.

```mdx
export const meta = {
  title: 'My Talk',
}

<TitleSlide
  title="My Talk"
  subtitle="Conference 2026"
  author="Isaac Corley"
  date="March 2026"
/>

---

# The Problem

- Bullet one
- Bullet two

---

<Embed src="https://example.com/demo" title="Live Demo" clip />
```

The `Deck` component splits on `---` at runtime, handles keyboard navigation, tracks the current slide in the URL hash (`#3` = slide 3), and renders the navigation bar.

## Adding a New Deck

1. **Create the MDX file** — add `pages/decks/my-new-talk.mdx` with your slide content
2. **Register in the manifest** — add an entry to `deckManifest` in `components/DeckLibrary.tsx`:

```typescript
{
  slug: 'my-new-talk',
  title: 'My New Talk',
  description: 'A talk about something interesting.',
  author: 'Isaac Corley',
  date: 'March 2026',
  tags: ['conference', 'deep-learning'],
},
```

3. **Verify** — run `bun run build` to confirm the MDX compiles
4. **Push to main** — the deck automatically appears on the deployed library

## Writing Slides

Everything you'd normally write in Markdown just works: headings, bullet lists, blockquotes, fenced code blocks. When you need more structure, drop in one of the built-in components.

### Component Reference

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `TitleSlide` | Cover/closing slide with logo and gradient title | `title`, `subtitle`, `author`, `date` |
| `SectionSlide` | Big centered text for section breaks | `children` |
| `Columns` | Multi-column grid layout | `cols` (2 or 3), `gap`, `align` |
| `Embed` | Full-viewport iframe for live demos | `src`, `title`, `clip` |
| `Diagram` | Theme-aware SVG diagram wrapper | `children`, `title`, `width` |
| `SpeakerNotes` | Hidden presenter notes (press **N**) | `children` |
| `Logo` | Logo (auto-included in `TitleSlide`) | `height`, `wordmark` |
| Code blocks | Syntax-highlighted via fenced Markdown | Language tag (e.g. `` ```python ``) |

See [.ai/component-catalog.md](.ai/component-catalog.md) for exhaustive prop tables and examples.

### Common Patterns

**Title slide**

```mdx
<TitleSlide
  title="Deep Learning for Remote Sensing"
  subtitle="CVPR 2026"
  author="Isaac Corley"
  date="March 2026"
/>
```

**Section break**

```mdx
<SectionSlide>

## Why This Matters

</SectionSlide>
```

**Code walkthrough** — text on one side, code on the other:

````mdx
<Columns cols={2}>
<div>

## How It Works

The model uses a ResNet backbone with a custom head.

</div>
<div>

```python
model = ResNet50(pretrained=True)
model.fc = nn.Linear(2048, num_classes)
```

</div>
</Columns>
````

> Each column child **must** be wrapped in `<div>`. Leave a blank line after `<div>` and before `</div>` so MDX processes the Markdown inside.

**Live demo embed** — always use a lead-in slide before an `Embed`:

```mdx
# Live Demo

Let me show you the interactive visualization...

---

<Embed src="https://example.com/demo" title="Demo" clip />
```

**Closing slide**

```mdx
<TitleSlide
  title="Thank You"
  subtitle="Questions?"
  author="github.com/isaaccorley"
  date="@isaaborley"
/>
```

## Building Slides with AI

If you'd rather describe your talk in plain English and let an AI write the MDX, this repo is designed for that too. The `AGENTS.md` file at the repo root gives any AI coding agent everything it needs — component APIs, slide patterns, and step-by-step workflows for scaffolding or iterating on a deck.

### Example prompts

Point your AI agent at the repo and try:

- *"Create a 10-slide deck about self-supervised learning for remote sensing"*
- *"Add a slide comparing ViT vs CNN with a two-column layout"*
- *"Add speaker notes to slides 3 and 5 with talking points"*

The agent reads `AGENTS.md` for instructions and the `.ai/` directory for detailed reference:

| File | Contents |
|------|----------|
| `AGENTS.md` | Entry point — project overview, component APIs, slide patterns, iteration workflow |
| `.ai/component-catalog.md` | Exhaustive component reference with every prop combination |
| `.ai/example-deck.mdx` | Complete example deck demonstrating all components |
| `.ai/theme-tokens.md` | Full color, font, spacing, and syntax highlighting token reference |

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` / `↓` / `Space` / `Enter` | Next slide |
| `←` / `↑` | Previous slide |
| `N` | Toggle speaker notes |
| `F` | Toggle fullscreen |

The URL hash tracks the current slide — `#3` goes to slide 3.

## Presenting

When it's time to present, open the deck in your browser and go full screen. No export step, no PDF conversion — the browser *is* the presentation app.

**Full screen:** Press `F` or use your browser's native fullscreen (F11 / ⌘⇧F). Navigate with arrow keys or Space.

**Speaker notes:** Append `?notes=true` to the URL or press `N`. Notes appear in a panel at the bottom of the viewport, visible only on your screen. Use `<SpeakerNotes>` in your MDX to add talking points, transition cues, or timing reminders.

**PDF export:** Need a PDF for a pre-read or a backup? Append `?print=true` to the URL, then print (⌘P / Ctrl+P) and save as PDF.

## Deployment

Pushes to `main` automatically build and deploy the site to **GitHub Pages** via a GitHub Actions workflow.

The deployment workflow (`.github/workflows/deploy.yml`) runs `bun run build`, uploads the static `out/` directory as a GitHub Pages artifact, and deploys it. No manual steps required.

### First-time setup

After merging, GitHub Pages needs to be enabled on the repo:

1. Go to **Settings → Pages** in the GitHub repo
2. Under **Source**, select **GitHub Actions**
3. The next push to `main` will deploy automatically

## Customization

**Theme** — Colors, fonts, and spacing tokens live in `theme/`. Edit `theme/colors.ts` for brand colors, `theme/fonts.ts` for typefaces, or `theme/syntax.ts` for code highlighting colors.

**Logo** — The logo component is at `components/Logo.tsx`. Replace the SVG with your own logo.

**New components** — Need a layout the built-in components don't cover? Create a component in `components/`, register it in `mdx-components.tsx`, and use it in your MDX without imports.

## Project Structure

```
slides-js/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment workflow
├── pages/
│   ├── index.tsx               # Library splash page
│   ├── decks/
│   │   └── *.mdx               # Individual slide decks
│   ├── _app.tsx                # App wrapper (theme + conditional Deck)
│   └── _document.tsx           # HTML document setup
├── components/
│   ├── Deck.tsx                # Slide splitting, navigation, keyboard handling
│   ├── DeckLibrary.tsx         # Library page component + deck manifest
│   ├── Slide.tsx               # Individual slide container
│   ├── SlideNav.tsx            # Bottom navigation bar
│   ├── TitleSlide.tsx          # Cover/closing slide
│   ├── SectionSlide.tsx        # Section divider
│   ├── Columns.tsx             # Multi-column layout
│   ├── Embed.tsx               # Full-viewport iframe
│   ├── CodeBlock.tsx           # Syntax-highlighted code (auto-applied)
│   ├── Diagram.tsx             # SVG diagram wrapper
│   ├── SpeakerNotes.tsx        # Presenter notes
│   └── Logo.tsx                # Logo
├── theme/
│   ├── index.ts                # Theme-UI theme object
│   ├── colors.ts               # Brand color palette
│   ├── fonts.ts                # Font families, sizes, weights
│   └── syntax.ts               # Code syntax highlighting colors
├── styles/
│   └── globals.css             # Global CSS (font-face declarations)
├── public/
│   ├── fonts/                  # Self-hosted font files
│   └── images/                 # Static images
├── .ai/                        # AI agent reference material
├── AGENTS.md                   # AI agent instructions
├── mdx-components.tsx          # MDX component registry
├── next.config.mjs             # Next.js + MDX configuration
├── package.json                # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server with hot reload |
| `bun run build` | Production build (static export to `out/`) |
| `bun run typecheck` | Run TypeScript type checking |
| `bun run lint` | Lint with Biome |
| `bun run lint:fix` | Autofix lint + format issues |
| `bun run check` | Lint + typecheck (CI gate) |

The project is configured for static export (`output: 'export'` in `next.config.mjs`). After `bun run build`, the `out/` directory contains a self-contained static site you can deploy anywhere — GitHub Pages, S3, Netlify, or just open `out/index.html` locally.

## Tooling

- **Runtime:** [Bun](https://bun.sh) — fast JS runtime and package manager
- **Lint/Format:** [Biome](https://biomejs.dev) — single tool for linting and formatting
- **Types:** TypeScript with `strict: true`

## License

MIT
