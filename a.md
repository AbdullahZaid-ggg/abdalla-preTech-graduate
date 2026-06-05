# Quiz Arena - Improvements Roadmap

## High Priority (Bugs & UX Issues)
- [x] **Fix light logo** — `display: none` hardcoded inline on hero-light `<img>` overrides the CSS theme toggle
- [x] **Replace `alert()` with toasts** — API error messages use blocking browser dialogs instead of the toast system (`questions.js:201,218`)
- [x] **Fix `timeUp` ref never resetting** — after one quiz finishes, the ref stays `true`, breaking the timer on the next attempt (`QuizScreen.jsx`)
- [x] **Add error boundaries** — any React crash currently = white screen (`src/components/ErrorBoundary.jsx`)
- [x] **Auto-advance on answer** — after selecting an answer, auto-move to next question (`QuizScreen.jsx`)

## Medium Priority (Missing Roadmap Features)
- [x] **Sound toggle / mute button** — add mute button in the Navbar (`src/utils/sound.js`, `Navbar.jsx`, `QuizContext.jsx`)
- [x] **Search/filter history** — filter quiz history by category or date (`HistoryScreen.jsx`)
- [x] **Export history** — download quiz history as JSON (`HistoryScreen.jsx`)
- [x] **True/false question mode** — toggle between multiple-choice and true/false (`QuizContext.jsx`, `CategoryScreen.jsx`, `QuizScreen.jsx`, `questions.js`)
- [x] **Accessibility** — ARIA labels, focus management, screen reader support (`App.jsx`, `QuizScreen.jsx`, `ToastContainer.jsx`)

## Nice-to-Have
- [x] **PWA support** — manifest.json + service worker for offline/installable (`public/manifest.json`, `public/sw.js`, `index.html`, `main.jsx`)
- [x] **React Router** — proper URL-based navigation (back/forward, deep linking) (`src/App.jsx`, `Navbar.jsx`, `ResultsScreen.jsx`, `HomeScreen.jsx`, `QuizScreen.jsx`)
- [x] **Clean up dead code** — remove old `logic/` folder and duplicate `assets/` + empty `oldP/`
- [x] **Add tests** — Vitest + React Testing Library (`src/test/`)
- [x] **Performance** — `React.memo` / `useMemo` to reduce unnecessary re-renders (`Navbar.jsx` + `QuizScreen.jsx` + `HistoryScreen.jsx`)
