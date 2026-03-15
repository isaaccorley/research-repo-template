/** @jsxImportSource theme-ui */
import { type ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Slide } from './Slide';
import { SlideNav } from './SlideNav';

/**
 * Isomorphic layout effect: uses useLayoutEffect on the client (to avoid
 * flash of unstyled content) and useEffect on the server (to avoid the
 * SSR warning about useLayoutEffect doing nothing on the server).
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// ---------------------------------------------------------------------------
// Deck props
// ---------------------------------------------------------------------------

/**
 * Props for the Deck component.
 * Used as the wrapper in _app.tsx.
 */
export interface DeckProps {
  /** The MDX-rendered children (the <Component> from _app.tsx). */
  children: ReactNode;
  /** Presentation title shown in the SlideNav footer. */
  title?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Toggle fullscreen mode on the document element.
 */
function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}

/**
 * Assign a `data-slide` attribute to each direct child of `container`,
 * grouping them by `<hr>` elements (rendered as `<hr data-slide-separator>`).
 *
 * Every element before the first separator gets `data-slide="0"`, elements
 * between the first and second separator get `data-slide="1"`, and so on.
 * The separator elements themselves are hidden.
 *
 * Returns the total number of slides found.
 */
function assignSlideIndices(container: HTMLElement): number {
  let slideIndex = 0;
  const children = container.children;

  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement;
    if (child.hasAttribute('data-slide-separator')) {
      // Hide the separator and advance to the next slide group
      child.style.display = 'none';
      slideIndex++;
    } else {
      child.setAttribute('data-slide', String(slideIndex));
    }
  }

  return slideIndex + 1; // total slides = last index + 1
}

/**
 * Show only the elements belonging to `slideIndex` by toggling display.
 * Elements with a different `data-slide` value are hidden.
 */
function showSlide(container: HTMLElement, slideIndex: number): void {
  const children = container.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement;
    if (child.hasAttribute('data-slide-separator')) {
      child.style.display = 'none';
      continue;
    }
    const idx = child.getAttribute('data-slide');
    if (idx === String(slideIndex)) {
      child.style.display = '';
    } else {
      child.style.display = 'none';
    }
  }
}

/**
 * Show all slides (for print mode). Removes display:none from all children.
 */
function showAllSlides(container: HTMLElement): void {
  const children = container.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement;
    if (child.hasAttribute('data-slide-separator')) {
      child.style.display = 'none';
    } else {
      child.style.display = '';
    }
  }
}

// ---------------------------------------------------------------------------
// Deck component
// ---------------------------------------------------------------------------

/**
 * Deck is the core engine of the presentation system.
 *
 * Architecture: MDX v3 with @next/mdx renders all page content as a single
 * function component (`MDXContent`). Its `props.children` is undefined — the
 * actual React element tree is produced only when the component renders.
 * This means we cannot split content into slides by inspecting React
 * elements before rendering.
 *
 * Instead, we use a DOM-based approach that preserves the full React tree:
 *
 * 1. The `hr` element is overridden in `mdx-components.tsx` to render as
 *    `<hr data-slide-separator />` — a marker element.
 * 2. Deck renders all MDX content normally inside a `<Slide>` container.
 * 3. After mount, `useLayoutEffect` scans the container's direct children
 *    for `data-slide-separator` markers, assigns `data-slide="N"` to each
 *    group, and hides everything except the current slide.
 * 4. Navigation simply toggles which group is visible.
 *
 * Because the React tree renders intact (not cloned), all event handlers,
 * theme-ui `sx` styling, and component state work correctly.
 */
export function Deck({ children, title }: DeckProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [printMode, setPrintMode] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [totalSlides, setTotalSlides] = useState(1);

  const contentRef = useRef<HTMLDivElement>(null);

  // Navigate to a specific slide and update the URL hash
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    window.location.hash = `#${index + 1}`; // 1-indexed in URL
  }, []);

  // -----------------------------------------------------------------------
  // Query-param initialisation (print mode, notes mode)
  // -----------------------------------------------------------------------
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPrintMode(params.get('print') === 'true');
    setShowNotes(params.get('notes') === 'true');
  }, []);

  // -----------------------------------------------------------------------
  // Assign slide indices after content renders
  // -----------------------------------------------------------------------
  useIsomorphicLayoutEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const total = assignSlideIndices(container);
    setTotalSlides(total);
  }, [children]);

  // -----------------------------------------------------------------------
  // Show/hide slides based on current slide and mode
  // -----------------------------------------------------------------------
  useIsomorphicLayoutEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    if (printMode) {
      showAllSlides(container);
    } else {
      showSlide(container, currentSlide);
    }
  }, [currentSlide, printMode, children]);

  // -----------------------------------------------------------------------
  // Hash-based slide navigation
  // -----------------------------------------------------------------------

  // Read initial slide from hash on mount
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const slideNum = Number.parseInt(hash, 10);
    if (!Number.isNaN(slideNum) && slideNum >= 1 && slideNum <= totalSlides) {
      setCurrentSlide(slideNum - 1);
    }
  }, [totalSlides]);

  // Listen for hash changes (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const slideNum = Number.parseInt(hash, 10);
      if (!Number.isNaN(slideNum) && slideNum >= 1 && slideNum <= totalSlides) {
        setCurrentSlide(slideNum - 1);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [totalSlides]);

  // -----------------------------------------------------------------------
  // Keyboard navigation
  // -----------------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'Enter':
          e.preventDefault();
          goToSlide(Math.min(currentSlide + 1, totalSlides - 1));
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          goToSlide(Math.max(currentSlide - 1, 0));
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          setShowNotes((prev) => !prev);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalSlides, goToSlide]);

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  // Print mode: render all slides vertically (no Slide wrapper, no nav)
  if (printMode) {
    return (
      <div data-show-notes={showNotes ? 'true' : 'false'}>
        <div
          ref={contentRef}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& > [data-slide]': {
              pageBreakAfter: 'always',
              width: '100vw',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              px: [5, 6, 7],
              py: [5, 6],
              boxSizing: 'border-box',
              '@media print': { pageBreakAfter: 'always' },
            },
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  // Normal mode: render all content, show only the current slide via CSS
  return (
    <div
      data-show-notes={showNotes ? 'true' : 'false'}
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        bg: 'background',
      }}
    >
      <Slide index={currentSlide} total={totalSlides} showNotes={showNotes}>
        <div ref={contentRef}>{children}</div>
      </Slide>

      <SlideNav title={title} current={currentSlide + 1} total={totalSlides} />
    </div>
  );
}
