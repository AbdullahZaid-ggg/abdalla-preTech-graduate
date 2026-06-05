Optimized tool selectionReviewing the project structure and key files now to create a detailed explanation.

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src)

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/package.json)

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/README.md)

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src/App.jsx)

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src/main.jsx)

Gathering the core state logic, utilities, and main screens for a deep explanation.

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src/utils/questions.js)

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src/utils/storage.js)

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src/utils/sound.js)

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src/components/CategoryScreen.jsx)

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src/context/QuizContext.jsx)

Inspecting the quiz flow screens and navigation components next.

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src/components/QuizScreen.jsx)

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src/components/ResultsScreen.jsx)

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src/components/HistoryScreen.jsx)

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src/components/Navbar.jsx)

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src/components/ToastContainer.jsx)

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src/components/QuestionSetsScreen.jsx)

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src/components/QuestionSetEditor.jsx)

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src/utils/db.js)

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src/utils/config.js)

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/src/utils/utils.js)

Collecting static asset and service worker details for completeness.

Read [](file:///c%3A/Users/abdal/Desktop/PreTech-endProject/public/sw.js)

## Project Overview

This project is a React + Vite quiz application named `Z-Fahm`. It mixes:
- a local question bank,
- optional API-based trivia questions,
- timed quiz play,
- history tracking,
- theme switching,
- sound effects,
- custom question set management, and
- offline caching via a service worker.

It is structured as a single-page app using `react-router-dom` with a centralized `QuizContext` state provider.

---

## Key Files and Structure

### package.json
- Dependencies:
  - `react`, `react-dom`, `react-router-dom`
  - `html2canvas` for image export of results
- Dev dependencies:
  - `vite`, `@vitejs/plugin-react`
  - `eslint`, `vitest`, `@testing-library/*`
- Scripts:
  - `dev`, `build`, `preview`
  - `lint`
  - `test`, `test:watch`

---

## Entry Point

### main.jsx
- Bootstraps the app using `createRoot`.
- Wraps the app in:
  - `StrictMode`
  - `HashRouter`
  - `ErrorBoundary`
  - `QuizProvider`
- Imports global CSS:
  - `theme.css`
  - `layout.css`
  - `components.css`
  - `responsive.css`
- Registers a service worker in production.
- Unregisters service workers in development to avoid stale caches.

---

## App Shell and Navigation

### App.jsx
- Renders navigation, routes, footer, loading overlay, and toast container.
- Uses `react-router-dom` routes:
  - `/` → `HomeScreen`
  - `/category` → `CategoryScreen`
  - `/quiz` → `QuizScreen`
  - `/results` → `ResultsScreen`
  - `/history` → `HistoryScreen`
  - `/sets` → `QuestionSetsScreen`
  - `/sets/:setId` → `QuestionSetEditor`
  - `/about`, `/contact`
  - wildcard → `NotFoundScreen`
- Syncs global screen state (`state.screen`) with the current route.
- Adds keyboard shortcuts:
  - `1-4` to choose answer buttons
  - `Enter` to move next/finish
  - `ArrowLeft` / `ArrowRight` to navigate quiz questions
- Scrolls to top on route change.

---

## Global State

### QuizContext.jsx
- Provides app-wide state using `useReducer`.
- Initial state includes:
  - `screen`, `quizQuestions`, `currentQuestionIndex`
  - `score`, `userAnswers`, `streak`
  - `timerRemaining`, `localCategory`, `localDifficulty`
  - `theme`, `loading`, `toasts`, `practiceMode`, `muted`, `questionMode`
- Reducer actions:
  - `SET_LOADING`
  - `ADD_TOAST`, `REMOVE_TOAST`
  - `SET_SCREEN`
  - `LOAD_QUESTIONS`
  - `START_QUIZ`
  - `RESUME_QUIZ`
  - `ANSWER_QUESTION`
  - `NEXT_QUESTION`, `PREV_QUESTION`, `GO_TO_QUESTION`
  - `SHOW_RESULTS`
  - `TICK_TIMER`, `RESET_TIMER`
  - `SET_THEME`
  - `SET_PRACTICE_MODE`, `TOGGLE_MUTED`
  - `SET_QUESTION_MODE`
- Persists theme selection to `localStorage`.
- Sets `data-theme` attributes on `document.documentElement` so CSS can style light/dark themes.

---

## Question Data and API

### questions.js
- Contains `defaultQuestions`, a local dataset of 108 quiz items across categories:
  - Science, IT, Math, General, History, Geography, Nature, Sports, Movies & TV, Food & Health, Space, Art & Literature
- Each question object:
  - `question`
  - `options`
  - `correct` (index)
  - `category`
  - `difficulty`
- Category utilities:
  - `getCategoryCount`
  - `getDifficultyCount`
  - `getTotalCount`
- `loadLocalQuestions(category, difficulty)`
  - Filters questions by category and difficulty
  - Returns a fresh clone of filtered questions
- `convertToTrueFalse(questions)`
  - Converts multiple-choice questions into two-option true/false format
  - Randomly chooses whether the statement is true or false
- `loadApiQuestions(settings, retries)`
  - Fetches trivia from Open Trivia DB
  - Manages session token via `localStorage`
  - Decodes HTML entities
  - Shuffles answers
  - Returns question objects compatible with local quiz flow

---

## Persistent Storage

### storage.js
- Saves state and history to `localStorage`.
- Functions:
  - `saveState`
  - `loadState`
  - `clearState`
  - `saveQuizAttempt`
  - `loadHistory`
  - `deleteQuizAttempt`
  - `clearAllHistory`
- `saveQuizAttempt` stores full attempt details:
  - score, total, percentage
  - source (`api` or `local`)
  - category and difficulty
  - question list and user answers
  - timestamp

---

## Sound Effects

### sound.js
- Uses Web Audio API to synthesize sounds:
  - `playTone`
  - `playCorrect`
  - `playWrong`
  - `playComplete`
  - `playClick`
- Exposes `setMuted` and `isMuted`
- Sound toggles are used by Navbar and quiz interactions.

---

## Shared Helpers

### utils.js
- `shuffleArray(arr)` → Fisher-Yates shuffle
- `decodeHTMLEntities(text)` → decodes escaped HTML from API responses
- `getTodayKey()` → returns ISO date string `YYYY-MM-DD`
- `getPercentage(score, total)` → returns rounded percent

### config.js
- Application constants:
  - `TIMER_DURATION: 10`
  - localStorage keys
  - API base URL

---

## Core Screens

### CategoryScreen.jsx
- Lets user choose a category or "All Topics"
- After selection, prompts for difficulty:
  - easy, medium, hard, all
- Options:
  - practice mode toggle (timer disabled)
  - true/false mode toggle
- Loads questions into state and starts the quiz

### QuizScreen.jsx
This is the main quiz experience:
- Displays:
  - current question
  - progress count
  - difficulty badge
  - timer / practice indicator
  - streak badge
  - score
- Timer logic:
  - decrements state every second unless practice mode is on
  - transition to results when timer reaches zero
- Answer handling:
  - click or keyboard choice
  - disables buttons after answer
  - plays correct/wrong sound
  - updates score and streak
  - saves quiz state to `localStorage`
- Navigation:
  - next/prev buttons
  - dot navigation for jumping to any question
- Animation:
  - question transition animations using local `animState`
- Completion:
  - saves quiz attempt to history
  - launches confetti on 80%+ score
  - transitions to results

### ResultsScreen.jsx
- Shows final score, percentage, and motivational message
- Provides actions:
  - back home
  - retry quiz
  - new quiz
  - export result as image using `html2canvas`
- Displays answer breakdown for every question:
  - question text
  - correct answer
  - green/red icons for correct/incorrect

### HistoryScreen.jsx
- Loads history from `localStorage`
- Filters and searches attempts by category/date/source
- Displays summary stats:
  - total quizzes
  - average score
  - best score
- Groups attempts by date
- Actions:
  - delete a single attempt
  - clear all history
  - export history as JSON
- Shows day-to-day comparison between the latest two dates

---

## Navigation and UI

### Navbar.jsx
- Top navigation with tabs:
  - Home, History, My Sets, About, Contact
- Theme selector:
  - many color/theme variants including `cyber`, `ocean`, `light`, `mint`, etc.
- Sound mute toggle
- Mobile sidebar menu
- Uses `dangerouslySetInnerHTML` for inline SVG rendering

### ToastContainer.jsx
- Global toast system
- `showToast(dispatch, message, type)`
- Adds toast state, auto-dismisses after 3 seconds
- Displays success/error style messages

---

## Question Set Management

### QuestionSetsScreen.jsx
- Uses IndexedDB via db.js
- Shows saved user sets
- Allows:
  - create new set
  - import JSON
  - play a saved set
  - delete a set
- `handlePlay` loads a set as a quiz and starts it

### QuestionSetEditor.jsx
- Edits a specific saved set
- Loads set by `setId`
- Allows:
  - rename set
  - add question
  - edit question text/options/difficulty
  - reorder questions
  - delete questions
  - export set to JSON
- Uses `getSet`, `updateSet` from IndexedDB helpers

### db.js
- IndexedDB wrapper for `questionSets`
- Provides:
  - `getAllSets()`
  - `getSet(id)`
  - `addSet(set)`
  - `updateSet(set)`
  - `deleteSet(id)`

---

## Static / Public Assets

### sw.js
- Simple service worker cache strategy:
  - caches core app assets
  - serves cached response if available
  - falls back to network and caches new GET requests
  - returns 503 on failure
- Cache key: `z-fahm-v1`

### manifest.json
- PWA metadata for installability

### assets
- Images used for UI decoration:
  - `hero.svg`
  - `hero-light.svg`
  - `quiz-decoration.svg`
  - `trophy.svg`

---

## Styling

The app uses plain CSS in:
- theme.css — theme variables and design tokens
- layout.css — overall layout, page grid, main area, footer
- components.css — component-specific styling for cards, buttons, forms
- responsive.css — mobile/tablet responsive breakpoints

---

## Additional Notes

- App.jsx has an accessibility skip link for keyboard navigation.
- The quiz stores intermediate state so users can resume if they leave mid-quiz.
- Sounds are synthesized rather than using audio files.
- The app uses hash-based routing (`HashRouter`) so it can work when served from static hosting without special server config.
- The result export and history export features are implemented entirely on the client side.
- The theme system persists across reloads via `localStorage`.

---

## What This Project Does

This app is essentially a complete quiz platform with:
- local and API question sources
- quiz progress saving
- timer and practice modes
- scoring, streaks, and result analysis
- history tracking with date grouping
- custom user-created quiz sets
- multiple UI themes
- offline caching and PWA support

If you want, I can also generate a detailed file-by-file map with the exact responsibility of every component and utility.