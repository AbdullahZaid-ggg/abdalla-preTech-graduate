# 💻 Quiz Game — AbdAlla Zaid Random Questions

A fully responsive, modern quiz game built with **Vanilla HTML, CSS, and JavaScript**. Supports both hard-coded local questions and dynamic questions from the Open Trivia Database API, with progress persistence via `localStorage`.

---

## 📁 Project Structure

```
PreTech-endProject/
├── pages/
│   └── index.html              # Single-page HTML — all 4 screens
├── logic/
│   ├── globals.js              # QuizApp — shared state object
│   ├── storage.js              # localStorage save/load/clear
│   ├── questions.js            # 10 local questions + API fetcher
│   ├── quiz.js                 # Quiz engine (start, answer, navigate, results)
│   ├── navigation.js           # Page dot indicators + prev/next button state
│   └── main.js                 # Screen switching, event wiring, init
├── style/
│   ├── main.css                # CSS reset + body defaults
│   ├── layout.css              # Header / sidebar / main / footer grid
│   ├── components.css          # Cards, buttons, page dots, options, results, analysis
│   └── responsive.css          # 768px & 550px breakpoints
└── README.md                   # This file
```

---

## 🧠 Architecture — Logic Layer (`logic/`)

### `globals.js` — The Single Source of Truth

```js
const QuizApp = {
  quizQuestions: [],          // Array of { question, options[], correct } objects
  currentQuestionIndex: 0,    // Which question the user is on (0-based)
  score: 0,                   // Number of correctly answered questions
  userAnswers: [],            // Array parallel to quizQuestions; -1 = unanswered, else selected index
  isApiMode: false            // true if questions came from the API
};
```

All other files read/write `QuizApp`. This avoids scattered global variables and keeps state predictable.

### `storage.js` — Progress Persistence

| Function | What it does |
|----------|-------------|
| `saveState()` | Serializes `QuizApp` into a JSON string and writes it to `localStorage` under the key `"quizState"`. Called automatically after every answer. |
| `loadState()` | Reads `localStorage`, parses the JSON, and returns the saved object (or `null` if nothing is saved / JSON is corrupt). |
| `clearState()` | Removes the `"quizState"` key from `localStorage`. Called when the user starts a new quiz or completes one. |

**Why:** If the user accidentally refreshes the page mid-quiz, their progress (score, current question, all answers) is restored from `localStorage`.

### `questions.js` — Question Sources

#### `localQuestions` — 10 Hard-Coded Questions

Each entry is an object:

```js
{
  question: "What does HTML stand for?",
  options: ["Hyper Text Markup Language", "High Tech Modern Language", ...],
  correct: 0   // index of the correct option in the array
}
```

The 10 questions cover: HTML, CSS, JavaScript arrays/operators/variables, DOM, CSS specificity, Promises, HTTP methods, and localStorage.

#### `decodeHTMLEntities(text)` — Entity Decoder

Creates a temporary `<textarea>` element, sets its `innerHTML` to the encoded text, and reads back `textarea.value`. This converts `&quot;` → `"`, `&#039;` → `'`, `&amp;` → `&`, etc.

**Why a textarea?** It's a native browser API — no libraries needed — and handles all HTML entities correctly in one line.

#### `loadLocalQuestions()` — Load Local

1. Deep-copies the `localQuestions` array via `.map(q => ({ ...q }))`
2. Sets `QuizApp.isApiMode = false`
3. Calls `showSourceScreen()` (defined in `main.js`) to show the "Start New / Continue" screen

#### `loadApiQuestions()` — Load from API (async)

1. Fetches `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple`
2. Checks `response_code === 0` — if the API fails or returns no results, falls back to `loadLocalQuestions()`
3. Maps each API result into the same `{ question, options[], correct }` format:
   - Combines `incorrect_answers` + `correct_answer`
   - **Fisher-Yates shuffle** randomizes the option order so the correct answer isn't always last
   - Both the question text and every option are run through `decodeHTMLEntities()`
   - The `correct` index is found by searching the *decoded* options array for the decoded correct answer
4. Sets `QuizApp.isApiMode = true`
5. Calls `showSourceScreen()`

### `quiz.js` — The Quiz Engine

#### `startNewQuiz()`

1. `clearState()` — wipes any saved progress from localStorage
2. Resets `currentQuestionIndex → 0`, `score → 0`, `userAnswers → [-1, -1, ..., -1]` (all unanswered)
3. Calls `showQuizScreen()` → `showQuestion()`

#### `resumeQuiz()`

1. `loadState()` — reads localStorage
2. If data exists, overwrites all `QuizApp` properties with the saved values
3. Calls `showQuizScreen()` → `showQuestion()`

#### `showQuestion()` — Renders the Current Page

1. **Progress bar:** `(currentQuestionIndex / total) * 100` — shows how far the user has progressed
2. **Question counter:** `"Page 3 / 10"` — 1-based display
3. **Score:** updates in real-time
4. **Question text:** set via `textContent` (safe against XSS)
5. **Options:** two possible states:
   - **Unanswered** (`userAnswers[i] === -1`): renders 4 clickable buttons
   - **Answered**: renders 4 disabled buttons with `correct` (green) or `wrong` (red) CSS classes applied
6. Calls `renderPageIndicators()` and `updateNavButtons()`

#### `checkAnswer(selectedIndex, selectedButton)`

1. **Guard:** if the question is already answered (`userAnswers[i] !== -1`), exit immediately — prevents changing answers
2. Disables all option buttons to prevent double-clicks
3. Highlights the correct answer in green (`buttons[q.correct].classList.add('correct')`)
4. Records the user's choice: `QuizApp.userAnswers[currentQuestionIndex] = selectedIndex`
5. If correct: increments `score` and updates the score display
6. If wrong: marks the selected button red (`selectedButton.classList.add('wrong')`)
7. Calls `saveState()` to persist progress, then updates indicators and nav buttons

#### `nextQuestion()` / `prevQuestion()`

- `nextQuestion`: increments `currentQuestionIndex`. If there are more questions, calls `showQuestion()`. If done, calls `showResults()`.
- `prevQuestion`: decrements `currentQuestionIndex` (only if > 0) and calls `showQuestion()`.

#### `showResults()` — Quiz Complete Screen

1. `clearState()` — quiz is finished, no need to keep localStorage data
2. Sets progress bar to 100%
3. Calculates percentage and sets the conic gradient on the score circle (`--score-deg` custom property)
4. Picks a motivational message based on score:
   - ≥ 80% → "Excellent! You are a quiz master!"
   - ≥ 50% → "Good job! Keep practicing!"
   - < 50% → "Don't worry, try again and learn more!"
5. **Answer Analysis:** loops through every question and builds a row with:
   - ✅ or ❌ icon
   - The question text
   - The correct answer (in green)
6. Calls `showScreen('results-screen')`

### `navigation.js` — Page Dots & Buttons

#### `renderPageIndicators()`

Called every time the question changes. It:

1. Clears the container
2. Loops through all questions and creates a numbered button (dot) for each:
   - **Active** (current page): purple background + scale(1.1) + shadow
   - **Answered** (user has selected an answer): green border + text
   - Both classes can coexist → green active dot
3. Each dot has a click handler that jumps to that question index

#### `updateNavButtons()`

- Disables "← Back" when on the first question (`currentQuestionIndex === 0`)
- Changes the text of the next button from "Next →" to "Finish Quiz" on the last question

### `main.js` — Orchestrator

#### Screen Switching

```js
function showScreen(id) {
  document.querySelectorAll('.screen-main').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
```

Hides all `.screen-main` elements, then shows the targeted one.

#### `showSourceScreen()`

Called after questions are loaded. It:
- Sets the label (e.g., "🌐 API Questions") and count
- Checks if saved progress exists (via `loadState()`)
  - If yes: shows both "🔄 Start New" and "⏯ Continue" buttons
  - If no: shows only "▶ Start"

#### Sidebar Event Listeners

Each `.nav-item` in the sidebar:
1. Removes the `active` class from all nav items
2. Adds `active` to the clicked item
3. Fires the appropriate action: `showWelcome()`, `loadLocalQuestions()`, or `loadApiQuestions()`

#### Button Wiring

| Button | Action |
|--------|--------|
| "▶ Start" / "🔄 Start New" | `startNewQuiz()` |
| "⏯ Continue" | `resumeQuiz()` |
| "← Back" | `prevQuestion()` |
| "Next →" / "Finish Quiz" | Checks if last page → `showResults()`, else `nextQuestion()` |
| "🏠 Back Home" | `showWelcome()` |
| "🔄 Choose Different Source" | `showWelcome()` |

#### On Load (IIFE)

The immediately-invoked function:
1. Calls `loadState()` to check for saved progress
2. If progress exists, shows a "⏯ Continue Quiz" banner on the Welcome screen

---

## 🎨 Style Layer (`style/`)

### `main.css` — Reset & Body

- Universal `box-sizing: border-box`
- Body: dark purple gradient background (`#0f0c29 → #302b63 → #24243e`), white text, flex column for sticky footer

### `layout.css` — Structural Grid

| Class | Role |
|-------|------|
| `.app-wrapper` | Full-height flex column containing header + body + footer |
| `.site-header` | Fixed/sticky top bar with semi-transparent glass background (`backdrop-filter: blur`) |
| `.body-layout` | Horizontal flex: sidebar on left, main area on right |
| `.sidebar` | 180px fixed-width, sticky, bordered right edge, full viewport height |
| `.main-area` | Flex-grows to fill remaining space, centered content, bottom padding for footer clearance |
| `.site-footer` | Fixed bottom bar with glass effect |

### `components.css` — All UI Components

| Section | Key Classes | What They Do |
|---------|-------------|--------------|
| **Sidebar Nav** | `.sidebar-nav`, `.nav-item`, `.active`, `.nav-divider` | Vertical button stack with hover/active states |
| **Card** | `.card` | Glassmorphism card: `backdrop-filter: blur(20px)`, translucent bg, rounded corners, fade-in animation |
| **Welcome** | `.game-title`, `.subtitle` | Gradient text (`purple → blue → cyan`), centered |
| **Source Screen** | `.source-info`, `.source-actions` | Title + count + action buttons |
| **Buttons** | `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline` | Shared button base: rounded, hover lift + shadow. Primary = purple gradient, Outline = ghost style |
| **Quiz Header** | `.progress-container`, `.progress-bar`, `.quiz-meta` | Thin progress bar with gradient fill, question counter + score in a row |
| **Quiz Body** | `.quiz-body`, `.quiz-content` | Horizontal flex: page dots on left, content (question + options + arrows) on right |
| **Page Dots** | `.page-indicators`, `.page-dot`, `.active`, `.answered` | Vertical column of numbered square buttons. Active = purple glow, Answered = green border |
| **Options** | `.options-container`, `.option-btn`, `.correct`, `.wrong` | Full-width buttons. Correct = green background/border, Wrong = red. Disabled state with `cursor: not-allowed` |
| **Nav Buttons** | `.nav-buttons`, `.btn-nav` | Bottom row: Back (ghost, disabled at Q1) + Next (primary, becomes "Finish Quiz" at last Q) |
| **Results** | `.results-card`, `.score-circle`, `.final-score`, `.result-message` | Centered card with conic-gradient score ring (CSS `--score-deg` custom property), motivational message |
| **Analysis** | `.analysis-section`, `.analysis-list`, `.analysis-row` | Scrollable list of ✅/❌ rows showing each question and its correct answer |
| **Utilities** | `.hidden`, `.screen-main` | `.hidden` = `display: none !important`, `.screen-main` = full width |

### `responsive.css` — Breakpoints

#### 768px (Tablet)
- Sidebar shrinks to 140px
- Card/question padding reduced
- Page dots smaller
- `.quiz-body` switches to column layout (page dots go horizontal above the question)
- Analysis answer max-width reduced

#### 550px (Mobile)
- `.body-layout` becomes column — sidebar moves to top as a horizontal row
- Sidebar nav items go horizontal, divider hidden
- Score circle shrinks
- Analysis rows wrap

---

## 🔄 Complete User Flow

```
[Welcome Screen]
  │
  ├── Click "📄 Local Questions" (sidebar)
  │     └── loadLocalQuestions() → showSourceScreen()
  │
  ├── Click "🌍 API Questions" (sidebar)
  │     └── loadApiQuestions() → fetch API → showSourceScreen()
  │
  └── [Source Screen]
        ├── Click "▶ Start" / "🔄 Start New"
        │     └── startNewQuiz() → showQuizScreen() → showQuestion()
        │
        ├── Click "⏯ Continue" (only if saved progress exists)
        │     └── resumeQuiz() → showQuizScreen() → showQuestion()
        │
        └── [Quiz Screen]
              ├── Answer a question → checkAnswer() → saveState()
              ├── Click page dot → jump to that question
              ├── Click "← Back" → prevQuestion()
              ├── Click "Next →" → nextQuestion()
              ├── Click "Finish Quiz" (on last question) → showResults()
              │
              └── [Results Screen]
                    ├── See score circle + message
                    ├── Scroll answer analysis (✅/❌ per question)
                    ├── Click "🏠 Back Home" → Welcome
                    └── Click "🔄 Choose Different Source" → Welcome
```

---

## ⚡ Key Technical Details

### No Auto-Advance
Unlike the previous version, the user controls navigation entirely via the "← Back" / "Next →" buttons or page dots. Answers are recorded instantly with visual feedback, but the user stays on the question until they choose to move.

### Fisher-Yates Shuffle (API Questions)
```js
for (let i = options.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [options[i], options[j]] = [options[j], options[i]];
}
```
This unbiased shuffle ensures the correct answer isn't always the last option (which is how the API returns it). After shuffling, the code finds the correct answer's new index by searching the decoded options.

### HTML Entity Decoding
```js
function decodeHTMLEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}
```
The Open Trivia DB returns encoded strings like `"Which tag creates a &lt;div&gt;?"`. This function decodes them into readable text. The textarea trick works because the browser's HTML parser does the decoding for us — no regex or library needed.

### Conic Gradient Score Circle
```css
.score-circle {
  background: conic-gradient(#7c3aed var(--score-deg, 0deg), rgba(255,255,255,0.08) 0deg);
}
```
The `--score-deg` custom property is dynamically set in JavaScript:
```js
const degrees = (score / total) * 360;
circle.style.setProperty('--score-deg', `${degrees}deg`);
```
This creates a filled arc proportional to the user's score — 3/10 correct = 108° of purple.

### localStorage Structure
```json
{
  "quizQuestions": [...],
  "currentQuestionIndex": 5,
  "score": 3,
  "userAnswers": [0, 1, -1, 2, 0, -1, -1, -1, -1, -1],
  "isApiMode": false
}
```
- `userAnswers[i] === -1` means question `i` hasn't been answered yet
- Any other value is the index of the option the user selected
- The full `quizQuestions` array is stored so the quiz is fully reconstructable after a page refresh

---

## 🚀 How to Run

Simply open `pages/index.html` in any modern browser (Chrome, Firefox, Edge, Safari).

No build tools, no bundlers, no `npm install` — just pure vanilla HTML/CSS/JS.
