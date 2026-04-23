# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

No test suite is configured.

## Architecture

A single-page birthday surprise app with a strictly sequential reveal flow driven by two boolean state flags in `App.jsx`:

1. **SlideToUnlock** renders first — user slides the thumb to unlock
2. Once `unlockDone` is true, **Typewriter** renders and types out `lines[]`
3. Once `typingDone` is true, a scroll-hint arrow and the **ZoomParallax** section appear

### Critical pattern in SlideToUnlock

All mutable drag state lives in **refs, not useState**. Pointer events fire asynchronously relative to React's render cycle, and reading `useState` values in `pointerup` would capture stale closures. The single `useState(tick)` exists only as a render trigger — it is bumped inside `rAF` to flush ref changes to the DOM. Do not convert any of the drag refs to state.

### Component responsibilities

| File | Purpose |
|---|---|
| `src/App.jsx` | Orchestrates the reveal sequence; holds `unlockDone` / `typingDone` state |
| `src/components/SlideToUnlock.jsx` | Apple-style slider with velocity-based flick detection; self-removes from DOM via `onRemoved` callback after its fade-out animation |
| `src/components/Typewriter.jsx` | Sequentially types `lines[]` via direct DOM mutation on `.tw-line` divs; calls `onComplete` when all lines finish |
| `src/components/ZoomParallax.jsx` | Scroll-driven zoom using framer-motion `useScroll` + `useTransform`; each image gets a distinct scale factor from `SCALE_FACTORS[]` |

### Tooling notes

- **React Compiler** is enabled via `babel-plugin-react-compiler` in `vite.config.js` — this can affect build performance but removes the need for manual `useMemo`/`useCallback` in most cases.
- Images are referenced with relative paths from `src/assets/` (e.g., `../src/assets/IMG_9625.jpg`). Add new photos there and update the `images` array in `App.jsx`.
