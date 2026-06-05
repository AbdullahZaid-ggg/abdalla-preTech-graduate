# Complete Project Explanation / הסבר מלא על הפרויקט / شرح كامل للمشروع

---

# English

---

## 1. Project Overview

This is a **Quiz Game** built with pure HTML, CSS, and JavaScript — no frameworks, no build tools, no libraries. It runs directly in any modern browser.

**Author:** AbdAlla Zaid  
**GitHub:** https://github.com/AbdullahZaid-ggg/abdalla-preTech-graduate  
**Live:** https://abdullahzaid-ggg.github.io/abdalla-preTech-graduate/

### Features:
- 10 hard-coded web development questions
- 10 dynamic questions from the Open Trivia Database API (category: Computers)
- Quiz progress saved in `localStorage` (survives page refresh)
- Question navigation with previous/next buttons and numbered page dots
- Answer marking: correct = green, wrong = red
- Results screen with animated score circle and per-question analysis
- Fully responsive: works on desktop, tablet, and mobile
- Glass-morphism UI design with dark purple gradient theme

---

## 2. Project Structure

```
abdalla-preTech-graduate/
├── index.html                 # Main HTML file (all screens in one page)
├── logic/
│   ├── globals.js             # Shared state object (QuizApp)
│   ├── storage.js             # localStorage save/load/clear
│   ├── questions.js           # 10 local questions + API fetcher
│   ├── quiz.js                # Quiz engine (start, answer, navigate, results)
│   ├── navigation.js          # Page indicators + nav button state
│   └── main.js                # Screen switching, event wiring, init
├── style/
│   ├── main.css               # CSS reset + body defaults
│   ├── layout.css             # Grid layout (header, sidebar, main, footer)
│   ├── components.css         # All UI components
│   └── responsive.css         # Responsive breakpoints
├── LICENSE                    # Apache 2.0 License
├── README.md                  # This file
└── FULL_EXPLANATION.md        # This comprehensive guide
```

---

## 3. Line-by-Line Code Explanation

### 3.1 `index.html` — The Single Page

```html
<!DOCTYPE html>
<html lang="en">
```
- `<!DOCTYPE html>`: Tells the browser this is an HTML5 document.
- `<html lang="en">`: Root element with language set to English.

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quiz Game</title>
  <link rel="stylesheet" href="style/main.css" />
  <link rel="stylesheet" href="style/layout.css" />
  <link rel="stylesheet" href="style/components.css" />
  <link rel="stylesheet" href="style/responsive.css" />
</head>
```
- **charset="UTF-8"**: Supports all characters including emoji and non-English text.
- **viewport meta**: Makes the page mobile-friendly (responsive design).
- **title**: The browser tab title.
- **4 CSS files**: Each handles a different concern (reset, layout, components, responsiveness).

```html
<body>
  <div class="app-wrapper">
```
- **.app-wrapper**: A flex container that holds the entire page: header, body, footer. It stretches to full height so the footer stays at the bottom.

#### Header
```html
    <header class="site-header">
      <span class="logo">💻 AbdAlla Zaid Random Questions ⌨️</span>
    </header>
```
- Sticky header at the top with the app title. Uses `backdrop-filter: blur()` for a glass effect.

#### Sidebar
```html
    <div class="body-layout">
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <button class="nav-item active" data-action="welcome">🏠 Home</button>
          <div class="nav-divider"></div>
          <button class="nav-item" data-action="local">📚 From Local</button>
          <button class="nav-item" data-action="api">🌍 From API</button>
        </nav>
      </aside>
```
- **data-action**: A custom HTML attribute. In `main.js`, we read `item.dataset.action` to decide what happens when clicked.
- **.nav-divider**: A simple horizontal line separating Home from the question sources.
- **.active class**: The Home button starts active because the page loads on the welcome screen.

#### Main Content Area
```html
      <main class="main-area">
        <div class="main-content">
```

**Screen 1 — Welcome Screen:**
```html
          <div id="welcome-screen" class="screen-main">
            <div class="card" style="text-align:center;">
              <h1 class="game-title">Quiz Game</h1>
              <p class="subtitle">Test your web development & programming knowledge!</p>
              <p style="color:rgba(255,255,255,0.4);font-size:0.9rem;margin-top:8px;">
                🧪 Pick a question source from the sidebar to begin.
              </p>
              <div id="resume-banner" class="hidden" style="...">
                <p style="font-size:0.9rem;color:#a5b4fc;">You have a saved quiz in progress.</p>
                <button class="btn btn-primary" style="margin-top:10px;" onclick="resumeQuiz()">⏯ Continue Quiz</button>
              </div>
            </div>
          </div>
```
- **#welcome-screen**: The landing page. Shows by default (`hidden` is not applied initially).
- **.card**: A glass-morphism container with blur, rounded corners, and a fade-in animation.
- **.game-title**: Uses a gradient background clipped to text (`-webkit-background-clip: text`) — the text itself is transparent and shows the purple-blue gradient behind it.
- **#resume-banner**: Hidden by default. If `localStorage` has saved quiz data, `main.js` removes the `hidden` class so the user sees "Continue Quiz".

**Screen 2 — Source Screen:**
```html
          <div id="source-screen" class="screen-main hidden">
            <div class="card">
              <div class="source-info">
                <h2 id="source-label">📚 Local Questions</h2>
                <p id="source-count">10 questions loaded</p>
              </div>
              <div class="source-actions">
                <button id="start-new-btn" class="btn btn-primary">▶ Start</button>
                <button id="continue-btn" class="btn btn-outline">⏯ Continue</button>
              </div>
            </div>
          </div>
```
- **#source-screen**: Shown after the user picks "Local" or "API" from the sidebar.
- **#source-label**: Dynamically updated to show "Local Questions" or "API Questions".
- **#source-count**: Shows "10 questions loaded".
- **#continue-btn**: Only shown when there's saved progress (checked in `showSourceScreen()`).

**Screen 3 — Quiz Screen:**
```html
          <div id="quiz-screen" class="screen-main hidden">
            <div class="card">
              <div class="quiz-header">
                <div class="progress-container">
                  <div id="progress-bar" class="progress-bar"></div>
                </div>
                <div class="quiz-meta">
                  <span id="question-counter" class="question-counter">Page 1 / 10</span>
                  <span id="score-display" class="score-display">Score: 0</span>
                </div>
              </div>
              <div class="quiz-body">
                <div id="page-indicators" class="page-indicators"></div>
                <div class="quiz-content">
                  <p id="question-text" class="question-text">Loading...</p>
                  <div id="options-container" class="options-container"></div>
                  <div class="nav-buttons">
                    <button id="prev-btn" class="btn-nav" disabled>← Back</button>
                    <button id="next-btn" class="btn btn-primary" style="flex:1;">Next →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
```
- **#progress-bar**: A thin horizontal bar that fills as the user progresses (width set dynamically in JS).
- **#question-counter**: Shows "Page 3 / 10" (1-based index).
- **#score-display**: Shows the current score.
- **#page-indicators**: A vertical column of numbered buttons. Each dot represents a question. Clicking jumps to that question.
- **#question-text**: The current question text (set via `textContent` to prevent XSS).
- **#options-container**: Filled dynamically with 4 option buttons.
- **#prev-btn** / **#next-btn**: Navigation. "Back" is disabled on the first question. "Next" becomes "Finish Quiz" on the last question.

**Screen 4 — Results Screen:**
```html
          <div id="results-screen" class="screen-main hidden">
            <div class="card results-card">
              <h2 class="results-title">Quiz Complete!</h2>
              <div id="score-circle" class="score-circle">
                <span id="final-score" class="final-score">0 / 10</span>
              </div>
              <p id="result-message" class="result-message">Great job!</p>
              <button id="play-again-btn" class="btn btn-primary" style="width:100%;">🏠 Back Home</button>
              <button id="change-source-btn" class="btn btn-outline" style="width:100%;margin-top:10px;">🔄 Choose Different Source</button>
              <div class="analysis-section">
                <h3>Answer Analysis</h3>
                <div id="analysis-list" class="analysis-list"></div>
              </div>
            </div>
          </div>
```
- **.score-circle**: A circular element. It uses a CSS conic gradient (`conic-gradient`) whose angle is set by the `--score-deg` custom property (e.g., 3/10 correct = 108 degrees of purple).
- **#final-score**: Shows "7 / 10" format.
- **#result-message**: A motivational message based on the percentage (≥80%, ≥50%, <50%).
- **#analysis-list**: Dynamically filled with rows showing ✅/❌, the question, and the correct answer.

#### Footer
```html
    <footer class="site-footer">
      <p>&copy; 2026 AbdAlla Zaid. All rights reserved.</p>
    </footer>
```
- Fixed at the bottom. Semi-transparent glass background.

#### Scripts (loaded at bottom)
```html
  <script src="logic/globals.js"></script>
  <script src="logic/storage.js"></script>
  <script src="logic/questions.js"></script>
  <script src="logic/quiz.js"></script>
  <script src="logic/navigation.js"></script>
  <script src="logic/main.js"></script>
```
- **Order matters**: `globals.js` must load first because it defines `QuizApp` that everything else uses. `main.js` must load last because it wires up event listeners and calls the init function.

---

### 3.2 `logic/globals.js` — The Global State

```js
const QuizApp = {
  quizQuestions: [],
  currentQuestionIndex: 0,
  score: 0,
  userAnswers: [],
  isApiMode: false
};
```
- **quizQuestions**: An array of question objects. Each object: `{ question: string, options: string[], correct: number }`. `correct` is the index of the correct option in the `options` array.
- **currentQuestionIndex**: 0-based index of the current question.
- **score**: Number of correctly answered questions.
- **userAnswers**: Parallel array to `quizQuestions`. `-1` means unanswered; otherwise, the index of the option the user selected.
- **isApiMode**: `true` if questions came from the Open Trivia DB API; `false` if from local.

This single object is the **single source of truth** — all other files read and write to `QuizApp`. This avoids scattered global variables.

---

### 3.3 `logic/storage.js` — localStorage Persistence

```js
const STORAGE_KEY = 'quizState';
```
- A constant key used for all localStorage operations. Using a constant avoids typos.

```js
function saveState() {
  const state = {
    quizQuestions: QuizApp.quizQuestions,
    currentQuestionIndex: QuizApp.currentQuestionIndex,
    score: QuizApp.score,
    userAnswers: QuizApp.userAnswers,
    isApiMode: QuizApp.isApiMode
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
```
- **JSON.stringify(state)**: Converts the JavaScript object to a JSON string. `localStorage` can only store strings.
- Called automatically after every answer (in `checkAnswer()`).

```js
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}
```
- **JSON.parse(saved)**: Converts the JSON string back to a JavaScript object.
- **try/catch**: If the stored data is corrupted (invalid JSON), it returns `null` instead of crashing.
- Called on page load to check if there's a saved quiz (shows the "Continue" banner) and when the user clicks "Continue".

```js
function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}
```
- Called when starting a new quiz or finishing one.

**Why localStorage?** Unlike sessionStorage (which clears when the tab closes) or cookies (which are sent to the server with every request), localStorage persists in the browser until explicitly cleared and is only accessible client-side. This means if the user accidentally refreshes the page, their progress is restored.

---

### 3.4 `logic/questions.js` — Question Sources

#### Local Questions Array

```js
const localQuestions = [
  {
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', ...],
    correct: 0
  },
  // ... 9 more questions
];
```
- 10 hard-coded questions about web development (HTML, CSS, JavaScript, DOM, Promises, HTTP, localStorage).
- Each question has exactly 4 options.
- `correct` is the **index** (not the value) of the correct answer in the `options` array. This makes comparison fast: `selectedIndex === q.correct`.

#### HTML Entity Decoder

```js
function decodeHTMLEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}
```
- **Why needed**: The Open Trivia DB API returns encoded HTML entities like `&quot;` (double quote), `&#039;` (apostrophe), `&amp;` (ampersand).
- **How it works**: Creates a temporary `<textarea>` element (never added to the DOM), sets its `innerHTML` to the encoded text, then reads `textarea.value`. The browser's HTML parser automatically decodes the entities. This is a native, library-free approach.
- **Why `textarea` and not `div`?** `textarea.value` gives us the decoded text directly, while `div.innerHTML` or `div.textContent` behaves differently. `textarea` is the simplest trick.

#### loadLocalQuestions()

```js
function loadLocalQuestions() {
  QuizApp.quizQuestions = localQuestions.map(q => ({ ...q }));
  QuizApp.isApiMode = false;
  showSourceScreen();
}
```
- **.map(q => ({ ...q }))**: Creates a **deep copy** of each question object. This is important because if we didn't copy, mutations to `QuizApp.quizQuestions` would modify the original `localQuestions` array (which should remain pristine for future use).
- Sets `isApiMode = false`.
- Calls `showSourceScreen()` (defined in `main.js`) to show the "Start New" / "Continue" screen.

#### loadApiQuestions()

```js
async function loadApiQuestions() {
  try {
    const res = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple');
    const data = await res.json();
    if (data.response_code !== 0 || !data.results.length) {
      alert('API failed. Loading local questions.');
      loadLocalQuestions();
      return;
    }
```
- **async/await**: Allows cleaner asynchronous code instead of `.then()` chains.
- **fetch**: Built-in browser API for making HTTP requests.
- **API URL**: `opentdb.com/api.php` with parameters:
  - `amount=10`: 10 questions
  - `category=18`: Computers category
  - `difficulty=easy`: Easy difficulty
  - `type=multiple`: Multiple choice (not true/false)
- **Error handling**: If `response_code !== 0` (API returned an error) or no results, it falls back to local questions with an alert.

```js
    QuizApp.quizQuestions = data.results.map(q => {
      const options = [...q.incorrect_answers, q.correct_answer];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      const decoded = options.map(decodeHTMLEntities);
      return {
        question: decodeHTMLEntities(q.question),
        options: decoded,
        correct: decoded.indexOf(decodeHTMLEntities(q.correct_answer))
      };
    });
```
- The API returns `incorrect_answers` as an array and `correct_answer` as a string.
- We combine them: `[...q.incorrect_answers, q.correct_answer]`.
- **Fisher-Yates Shuffle**: Randomizes the option order. This is unbiased — every permutation is equally likely. We do this because the API always puts the correct answer last, which would make questions trivially easy.
- After shuffling, we find the new index of the correct answer using `decoded.indexOf(decodeHTMLEntities(q.correct_answer))`.
- Both the question text and all options are decoded through `decodeHTMLEntities`.

```js
    QuizApp.isApiMode = true;
    showSourceScreen();
  } catch {
    alert('Network error. Loading local questions.');
    loadLocalQuestions();
  }
}
```
- **catch**: Handles network errors (e.g., no internet connection, API down). Falls back to local questions with an alert.

---

### 3.5 `logic/quiz.js` — The Quiz Engine

#### startNewQuiz()

```js
function startNewQuiz() {
  clearState();
  QuizApp.currentQuestionIndex = 0;
  QuizApp.score = 0;
  QuizApp.userAnswers = new Array(QuizApp.quizQuestions.length).fill(-1);
  showQuizScreen();
  showQuestion();
}
```
- **clearState()**: Wipes any previous saved progress.
- **new Array(length).fill(-1)**: Creates an array where every slot is `-1` (unanswered). This is cleaner than a loop.
- **showQuizScreen()**: Switches to the quiz screen (hides others).
- **showQuestion()**: Renders the first question.

#### resumeQuiz()

```js
function resumeQuiz() {
  const saved = loadState();
  if (saved) {
    QuizApp.quizQuestions = saved.quizQuestions;
    QuizApp.currentQuestionIndex = saved.currentQuestionIndex;
    QuizApp.score = saved.score;
    QuizApp.userAnswers = saved.userAnswers;
    QuizApp.isApiMode = saved.isApiMode;
  }
  showQuizScreen();
  showQuestion();
}
```
- Loads the saved state from localStorage and overwrites `QuizApp` with the saved values.
- If nothing is saved, `QuizApp` stays as-is (whatever was previously loaded).
- Then shows the quiz screen at the saved position.

#### showQuestion()

```js
function showQuestion() {
  const q = QuizApp.quizQuestions[QuizApp.currentQuestionIndex];
  const total = QuizApp.quizQuestions.length;
```
- Gets the current question object and total count.

```js
  document.getElementById('progress-bar').style.width = (QuizApp.currentQuestionIndex / total) * 100 + '%';
  document.getElementById('question-counter').textContent = `Page ${QuizApp.currentQuestionIndex + 1} / ${total}`;
  document.getElementById('score-display').textContent = `Score: ${QuizApp.score}`;
```
- **Progress bar**: Width is set as a percentage. For question 0/10, width = 0%. For 9/10, width = 90%. CSS transition animates the change.
- **Question counter**: 1-based display (page 3 of 10). The +1 converts from 0-indexed to 1-indexed.
- **Score**: Updated every time the question is shown.

```js
  const qText = document.getElementById('question-text');
  qText.textContent = q.question;
```
- **textContent vs innerHTML**: `textContent` is safe against XSS (Cross-Site Scripting) attacks — it treats the string as plain text, not HTML. If someone somehow injected `<script>` as a question, it wouldn't execute. `innerHTML` would execute it.

```js
  const container = document.getElementById('options-container');
  container.innerHTML = '';

  const answered = QuizApp.userAnswers[QuizApp.currentQuestionIndex];
```
- **innerHTML = ''**: Clears all previous option buttons. We rebuild them fresh every time.

**Unanswered State:**
```js
  if (answered === -1) {
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => checkAnswer(idx, btn));
      container.appendChild(btn);
    });
```
- **-1 means unanswered**: Renders 4 clickable buttons. Each button calls `checkAnswer(idx, btn)` when clicked, passing its index and the button element itself.

**Answered State:**
```js
  } else {
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.disabled = true;
      if (idx === q.correct) btn.classList.add('correct');
      if (idx === answered && answered !== q.correct) btn.classList.add('wrong');
      container.appendChild(btn);
    });
  }
```
- **All buttons disabled**: Prevents changing the answer.
- **Correct answer** (`idx === q.correct`): Gets the `.correct` class (green styling).
- **Wrong answer** (`idx === answered && answered !== q.correct`): Gets `.wrong` class (red styling) — only if the user picked the wrong one.
- If the user picked the correct answer, the button is just `.correct` (not `.wrong`).

```js
  renderPageIndicators();
  updateNavButtons();
}
```
- Updates the page dots and navigation button states after rendering.

#### checkAnswer()

```js
function checkAnswer(selectedIndex, selectedButton) {
  if (QuizApp.userAnswers[QuizApp.currentQuestionIndex] !== -1) return;
```
- **Guard clause**: If the question is already answered, exit immediately. This prevents changing answers by clicking multiple options.

```js
  const q = QuizApp.quizQuestions[QuizApp.currentQuestionIndex];
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(b => b.disabled = true);
  buttons[q.correct].classList.add('correct');
```
- **Disable all buttons**: Prevents double-clicks.
- **Highlight correct answer**: Always shows which was the correct answer, regardless of what the user selected.

```js
  QuizApp.userAnswers[QuizApp.currentQuestionIndex] = selectedIndex;

  if (selectedIndex === q.correct) {
    QuizApp.score++;
    document.getElementById('score-display').textContent = `Score: ${QuizApp.score}`;
  } else {
    selectedButton.classList.add('wrong');
  }
```
- Records the user's answer.
- If correct: increments the score and updates the display.
- If wrong: adds the `.wrong` class to the clicked button (turns it red).

```js
  saveState();
  renderPageIndicators();
  updateNavButtons();
}
```
- **saveState()**: Persists to localStorage immediately after every answer.
- Updates page dots (the answered dot turns green) and nav buttons.

#### nextQuestion()

```js
function nextQuestion() {
  QuizApp.currentQuestionIndex++;
  if (QuizApp.currentQuestionIndex < QuizApp.quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}
```
- Increments the index. If there are more questions, shows them. If we've gone past the end (index === length), show results.

#### prevQuestion()

```js
function prevQuestion() {
  if (QuizApp.currentQuestionIndex > 0) {
    QuizApp.currentQuestionIndex--;
    showQuestion();
  }
}
```
- Decrements the index (only if not on the first question). No guard needed for going past the beginning because the button is disabled at index 0.

#### showResults()

```js
function showResults() {
  clearState();
  document.getElementById('progress-bar').style.width = '100%';
```
- **clearState()**: Quiz is done; no need to keep localStorage data.
- **Progress bar to 100%**: Visually indicates completion.

```js
  const total = QuizApp.quizQuestions.length;
  document.getElementById('final-score').textContent = `${QuizApp.score} / ${total}`;
  const pct = QuizApp.score / total * 100;
  document.getElementById('score-circle').style.setProperty('--score-deg', `${pct / 100 * 360}deg`);
```
- **--score-deg**: A CSS custom property (CSS variable). We calculate degrees based on the percentage: e.g., 70% → 252 degrees. This is used by the conic gradient to fill the circle proportionally.

```js
  let msg;
  if (pct >= 80) msg = 'Excellent! You are a quiz master!';
  else if (pct >= 50) msg = 'Good job! Keep practicing!';
  else msg = "Don't worry, try again and learn more!";
  document.getElementById('result-message').textContent = msg;
```
- Three-tier motivational message.

```js
  const analysis = document.getElementById('analysis-list');
  analysis.innerHTML = '';
  QuizApp.quizQuestions.forEach((q, i) => {
    const row = document.createElement('div');
    row.className = 'analysis-row';
    const icon = QuizApp.userAnswers[i] === q.correct ? '✅' : '❌';
    row.innerHTML = `
      <span class="analysis-icon">${icon}</span>
      <span class="analysis-question">${q.question}</span>
      <span class="analysis-answer">${q.options[q.correct]}</span>
    `;
    analysis.appendChild(row);
  });
```
- **Answer Analysis**: Iterates every question and builds a row showing:
  - ✅ (correct) or ❌ (wrong) icon
  - The question text
  - The correct answer (in green via CSS)
- **Note**: Here we use `innerHTML` for the row, but since the content comes from our own questions (not user input), this is safe. The question text does contain special characters, but we control the source.

```js
  showScreen('results-screen');
  renderPageIndicators();
}
```
- Shows the results screen. `renderPageIndicators()` here doesn't do much visually since the quiz screen is hidden, but it keeps the state consistent.

---

### 3.6 `logic/navigation.js` — Page Dots & Buttons

#### renderPageIndicators()

```js
function renderPageIndicators() {
  const container = document.getElementById('page-indicators');
  container.innerHTML = '';
  const total = QuizApp.quizQuestions.length;
  if (!total) return;
```
- Clears all existing dots and rebuilds them. The `if (!total) return` guard handles the case where no questions are loaded yet.

```js
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'page-dot';
    dot.textContent = i + 1;
    if (i === QuizApp.currentQuestionIndex) dot.classList.add('active');
    if (QuizApp.userAnswers[i] !== -1) dot.classList.add('answered');
    dot.addEventListener('click', () => {
      QuizApp.currentQuestionIndex = i;
      showQuestion();
    });
    container.appendChild(dot);
  }
}
```
- Creates one button per question, numbered 1 through total.
- **.active**: The current question's dot gets a purple glow (scale 1.1, purple border, shadow).
- **.answered**: Questions that the user has answered get a green border. Both classes can coexist (current question that was already answered shows both effects).
- **Click handler**: Clicking any dot jumps directly to that question by setting `currentQuestionIndex` and calling `showQuestion()`. This gives the user free navigation.

#### updateNavButtons()

```js
function updateNavButtons() {
  document.getElementById('prev-btn').disabled = QuizApp.currentQuestionIndex === 0;
  const isLast = QuizApp.currentQuestionIndex === QuizApp.quizQuestions.length - 1;
  document.getElementById('next-btn').textContent = isLast ? 'Finish Quiz' : 'Next →';
}
```
- **Prev button**: Disabled (grayed out, not clickable) when on the first question.
- **Next button**: Changes text to "Finish Quiz" on the last question. This is purely UX — the actual logic of finishing vs next is handled in `main.js`'s click handler.

---

### 3.7 `logic/main.js` — The Orchestrator

#### showScreen() — Core UI Function

```js
function showScreen(id) {
  document.querySelectorAll('.screen-main').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
```
- Hides ALL `.screen-main` elements (by adding the `.hidden` class, which sets `display: none !important`).
- Then shows the targeted one by removing `hidden`.

#### showWelcome()

```js
function showWelcome() {
  showScreen('welcome-screen');
}
```
- Simply shows the welcome screen.

#### showSourceScreen()

```js
function showSourceScreen() {
  const total = QuizApp.quizQuestions.length;
  const source = QuizApp.isApiMode ? '🌐 API Questions' : '📚 Local Questions';
  document.getElementById('source-label').textContent = source;
  document.getElementById('source-count').textContent = `${total} questions loaded`;

  const saved = loadState();
  const continueBtn = document.getElementById('continue-btn');
  const startBtn = document.getElementById('start-new-btn');
  continueBtn.style.display = saved ? '' : 'none';
  startBtn.textContent = saved ? '🔄 Start New' : '▶ Start';

  showScreen('source-screen');
}
```
- Sets the label and count based on whether questions came from the API or local.
- **Saved quiz check**: If there's saved progress, shows the "Continue" button and changes "Start" to "Start New". Otherwise, hides "Continue" and shows "▶ Start".

#### showQuizScreen()

```js
function showQuizScreen() {
  showScreen('quiz-screen');
}
```
- Simply shows the quiz screen.

#### Sidebar Event Listeners

```js
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    const action = item.dataset.action;
    if (action === 'welcome') showWelcome();
    else if (action === 'local') loadLocalQuestions();
    else if (action === 'api') loadApiQuestions();
  });
});
```
- **data-action attribute**: Each sidebar button has a `data-action` attribute: "welcome", "local", or "api".
- When clicked:
  1. Removes `active` class from ALL nav items (so previous selection is cleared).
  2. Adds `active` to the clicked item (highlighting it).
  3. Reads `item.dataset.action` and calls the appropriate function.
- This is **event delegation** on a collection — we iterate and attach individual listeners. A more advanced approach would use a single listener on the parent, but for 3 items this is perfectly fine.

#### Button Wiring

```js
document.getElementById('start-new-btn').addEventListener('click', startNewQuiz);
document.getElementById('continue-btn').addEventListener('click', resumeQuiz);
document.getElementById('play-again-btn').addEventListener('click', showWelcome);
document.getElementById('change-source-btn').addEventListener('click', showWelcome);
```
- Wires up all the buttons by their IDs to their handler functions.

```js
document.getElementById('prev-btn').addEventListener('click', prevQuestion);
document.getElementById('next-btn').addEventListener('click', () => {
  if (QuizApp.currentQuestionIndex === QuizApp.quizQuestions.length - 1) {
    showResults();
  } else {
    nextQuestion();
  }
});
```
- **Prev**: Calls `prevQuestion()` directly.
- **Next**: Checks if we're on the last question — if so, calls `showResults()` (bypassing `nextQuestion()`). Otherwise, calls `nextQuestion()`.

#### On Load — Init (IIFE)

```js
(function init() {
  const saved = loadState();
  if (saved) {
    document.getElementById('resume-banner').classList.remove('hidden');
  }
})();
```
- **IIFE (Immediately Invoked Function Expression)**: Runs automatically when the script loads.
- Checks if there's saved quiz progress in localStorage. If yes, shows the "Continue Quiz" banner on the welcome screen by removing the `hidden` class.

---

## 4. CSS — Styling Layer

### 4.1 `style/main.css` — Reset & Body

```css
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```
- **Universal reset**: Removes default margins and paddings from all elements.
- **box-sizing: border-box**: Makes `width` and `height` include `padding` and `border`. This makes sizing predictable — a 100px wide element with 10px padding stays 100px (instead of becoming 120px).

```css
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  color: #fff;
  display: flex;
  flex-direction: column;
}
```
- **Dark purple gradient**: Three stops creating a deep space-like background.
- **min-height: 100vh**: Ensures the body is at least the full viewport height.
- **display: flex; flex-direction: column**: Enables sticky footer — the main content can push the footer down, and if content is short, the footer stays at the bottom.

### 4.2 `style/layout.css` — Page Structure

**.app-wrapper**: Full-height flex column containing all 3 sections (header, body-layout, footer).

**.site-header**:
- `background: rgba(15, 12, 41, 0.75)` — semi-transparent dark background.
- `backdrop-filter: blur(12px)` — **glassmorphism effect**: blurs whatever is behind the header.
- `position: sticky; top: 0` — stays at top when scrolling.
- `z-index: 100` — ensures it's above other content.

**.body-layout**: `display: flex; flex: 1` — sidebar + main area side by side, filling remaining height.

**.sidebar**:
- `width: 180px` — fixed width.
- `position: sticky; top: 56px` — follows scroll but stays below the header.
- `height: calc(100vh - 56px)` — exactly the remaining viewport height below the header.
- `overflow-y: auto` — scrolls if sidebar content is too long.

**.main-area**: `flex: 1` — fills remaining space. Centers content horizontally. `padding: 32px 24px 80px` — bottom padding of 80px clears the fixed footer.

**.main-content**: `max-width: 680px` — keeps content readable on wide screens.

**.site-footer**:
- `position: fixed; bottom: 0` — always at the bottom of the viewport.
- Same glassmorphism effect as the header.

### 4.3 `style/components.css` — All UI Components

**Sidebar Nav**: Vertical button stack. `.nav-item` transitions background/color on hover. `.active` adds a purple tint (`rgba(99, 102, 241, 0.2)`).

**Card**: The glassmorphism container used across all screens.
- `background: rgba(255, 255, 255, 0.07)` — translucent white.
- `backdrop-filter: blur(20px)` — stronger blur than the header/footer.
- `border: 1px solid rgba(255, 255, 255, 0.12)` — subtle border.
- `border-radius: 20px` — rounded corners.
- `animation: fadeIn 0.4s ease forwards` — slides up and fades in on load.

**@keyframes fadeIn**: `opacity: 0 → 1` and `transform: translateY(16px) → translateY(0)`.

**Game Title**: 
- `font-size: 2.6rem` — large title.
- `background: linear-gradient(135deg, #a855f7, #6366f1, #06b6d4)` — purple → blue → cyan gradient.
- `-webkit-background-clip: text` — clips the gradient to the text shape.
- `-webkit-text-fill-color: transparent` — makes the text itself transparent so the gradient shows through.

**Buttons** (`.btn`):
- `padding: 14px 28px` — comfortable size.
- `border-radius: 12px` — rounded.
- `transition: transform 0.2s, box-shadow 0.2s` — smooth hover effects.
- `.btn-primary`: purple gradient (`#7c3aed → #6366f1`).
- `.btn-outline`: transparent with white border, ghost style.
- On hover: lifts up (translateY(-2px)) with shadow.

**Progress Bar**: 6px tall, gradient fill, `border-radius: 99px` (fully rounded pill shape). Width is set dynamically via JS.

**Page Dots**: 34×34 buttons, squared with `border-radius: 8px`. 
- `.active`: purple background, glow, `scale(1.1)`.
- `.answered`: green border and tint.
- Both can combine for the current question if answered.

**Option Buttons**:
- Full width, `padding: 15px 18px`, `border: 2px solid rgba(255,255,255,0.1)`.
- Hover: slight right shift (`translateX(4px)`), brighter border.
- `.correct`: green background/border, green text.
- `.wrong`: red background/border, red text.
- `!important` is used to override hover styles when disabled.

**Score Circle**:
- 150×150, `border-radius: 50%`.
- `background: conic-gradient(#7c3aed var(--score-deg, 0deg), rgba(255,255,255,0.08) 0deg)` — the conic gradient creates a filled arc.
- `::before` pseudo-element: a smaller circle (120px) in the center with dark background, creating the ring effect.
- `--score-deg`: CSS custom property set by JS (0 to 360 degrees).

**Analysis List**: Scrollable container (`max-height: 300px; overflow-y: auto`) with rows showing icon, question, and correct answer.

### 4.4 `style/responsive.css` — Responsive Design

**768px (Tablet)**:
- Sidebar shrinks to 140px.
- Card padding reduced.
- Game title smaller (2rem).
- `.quiz-body` changes to `flex-direction: column` — page dots go horizontal above the question instead of vertical on the left.
- Page indicators become a horizontal row.

**550px (Mobile)**:
- `.body-layout` becomes `flex-direction: column` — sidebar moves above the main content as a horizontal bar.
- Sidebar nav items go horizontal instead of stacked.
- `.nav-divider` is hidden.
- Score circle shrinks to 120px.
- Analysis rows wrap (flex-wrap).

---

## 5. Complete User Flow

```
Page Load
  ├── loadState() checks localStorage
  │     └── If saved → show "Continue Quiz" banner on Welcome
  │
  ├── User clicks "📚 From Local" (sidebar)
  │     └── loadLocalQuestions() → showSourceScreen()
  │           ├── "▶ Start" (if no saved progress)
  │           └── "🔄 Start New" + "⏯ Continue" (if saved)
  │
  ├── User clicks "🌍 From API" (sidebar)
  │     └── loadApiQuestions()
  │           ├── Success → showSourceScreen()
  │           └── Failure → alert + fallback to local
  │
  ├── User clicks "▶ Start" or "🔄 Start New"
  │     └── startNewQuiz()
  │           └── Quiz screen → Question 1
  │
  ├── User answers a question
  │     ├── checkAnswer() records answer, shows correct/wrong
  │     └── saveState() → localStorage
  │
  ├── User navigates with "← Back" / "Next →" or page dots
  │     ├── prevQuestion() / nextQuestion()
  │     └── page dot → jump to that question
  │
  ├── On last question, "Next →" becomes "Finish Quiz"
  │     └── showResults()
  │           ├── Progress bar: 100%
  │           ├── Score circle (conic gradient)
  │           ├── Motivational message
  │           └── Answer analysis (✅/❌ per question)
  │
  └── User clicks "🏠 Back Home" or "🔄 Choose Different Source"
        └── showWelcome() → back to start
```

---

## 6. Apache 2.0 License — Explained

The project is licensed under **Apache License, Version 2.0**. Here's what it means in plain language:

### What you CAN do:
- **Commercial use**: Use the code in commercial products.
- **Modification**: Change the code however you want.
- **Distribution**: Share the code with others.
- **Patent use**: The license includes an express grant of patent rights from contributors.
- **Private use**: Use it personally without sharing.

### What you MUST do:
- **License and copyright notice**: Include a copy of the Apache 2.0 license AND retain the original copyright notice (`Copyright [2026] AbdAlla Zaid`).
- **State changes**: If you modify files, you must note that you changed them. This doesn't mean listing every line — a simple statement like "This file was modified from the original" in modified files is sufficient.

### What you CANNOT do:
- **Trademark use**: You cannot use the project's trademarks (e.g., the name "AbdAlla Zaid") to endorse your derivative products without permission.
- **Hold us liable**: The software is provided "as is" without warranty. The author cannot be sued for damages.

### Why Apache 2.0 instead of MIT?
- **Patent protection**: Apache 2.0 has an explicit patent grant clause. If a contributor tries to sue you for patent infringement related to their contribution, their patent license terminates. MIT has no patent language.
- **Change notification**: Requires you to mark modified files, giving users visibility into what was changed.

### Why use any license at all?
Without a license, **all rights are reserved by default** under copyright law. Nobody can legally use, copy, modify, or distribute your code. A license explicitly grants these permissions so others can benefit from and contribute to your work.

---

## 7. Key Technical Concepts

### Vanilla JavaScript (No Frameworks)
The entire app uses plain JavaScript — no React, Vue, Angular, or jQuery. This is intentional: it keeps the project lightweight, dependency-free, and educational. The DOM is manipulated directly via `document.getElementById`, `document.createElement`, `addEventListener`, etc.

### SPA (Single Page Application)
All 4 screens (Welcome, Source, Quiz, Results) are in a single HTML file. Only one screen is visible at a time — the others are hidden via the `.hidden` class (`display: none !important`). The `showScreen()` function manages which screen is visible.

### localStorage for Persistence
- Data survives browser refreshes, tab closures, and computer restarts.
- Only accessible from the same origin (protocol + domain + port).
- Maximum ~5-10MB depending on the browser.
- Data is stored as a JSON string. We use `JSON.stringify()` to save and `JSON.parse()` to load.

### Fisher-Yates Shuffle
An algorithm for randomly shuffling an array. It's **unbiased** — every permutation is equally likely. The algorithm works backwards: start at the last element, pick a random earlier element, swap them, move to the second-to-last, repeat.

### Conic Gradients in CSS
A `conic-gradient()` creates a gradient that rotates around a center point (like a pie chart). We use it to create the score circle — the gradient starts purple at the top, extends clockwise by `--score-deg` degrees, then switches to a translucent white for the remainder.

### Glassmorphism
A design trend characterized by:
- Semi-transparent backgrounds (using `rgba` or translucent colors)
- `backdrop-filter: blur()` — blurs content behind the element, creating a frosted glass effect
- Subtle borders (`1px solid rgba(...)`)
- Soft shadows and rounded corners

### XSS Prevention
User-facing content (question text, options) is set via `textContent` instead of `innerHTML`. `textContent` is safe because it doesn't parse HTML — it treats the string as plain text. `innerHTML` would interpret HTML tags, potentially allowing script injection.

---

---

# Hebrew / עברית

---

## 1. סקירה כללית על הפרויקט

זהו **משחק טריוויה** (Quiz Game) שנבנה עם HTML, CSS ו-JavaScript טהורים — ללא פריימוורקים, ללא כלי בנייה, ללא ספריות חיצוניות. הוא רץ ישירות בכל דפדפן מודרני.

**מחבר:** עבדאללה זאיד  
**GitHub:** https://github.com/AbdullahZaid-ggg/abdalla-preTech-graduate  
**אתר חי:** https://abdullahzaid-ggg.github.io/abdalla-preTech-graduate/

### תכונות עיקריות:
- 10 שאלות קבועות מראש בנושאי פיתוח אתרים
- 10 שאלות דינמיות מ-API של מאגר הטריוויה העולמי (קטגוריה: מחשבים)
- שמירת התקדמות ב-`localStorage` (שורדת רענון דף)
- ניווט עם כפתורי קודם/הבא ונקודות דפים ממוספרות
- סימון תשובות: נכון = ירוק, לא נכון = אדום
- מסך תוצאות עם עיגול ניקוד מונפש וניתוח תשובות לפי שאלה
- מותאם למסכים: עובד בדסקטופ, טאבלט ומובייל
- עיצוב בסגנון "זכוכית" עם גרדיאנט סגול כהה

---

## 2. מבנה הפרויקט

```
abdalla-preTech-graduate/
├── index.html                 # קובץ HTML ראשי (כל המסכים בדף אחד)
├── logic/
│   ├── globals.js             # אובייקט מצב משותף (QuizApp)
│   ├── storage.js             # localStorage שמירה/טעינה/ניקוי
│   ├── questions.js           # 10 שאלות מקומיות + מביא שאלות מה-API
│   ├── quiz.js                # מנוע המשחק (התחלה, תשובה, ניווט, תוצאות)
│   ├── navigation.js          # נקודות דפים + מצב כפתורי ניווט
│   └── main.js                # מעבר מסכים, חיבור אירועים, אתחול
├── style/
│   ├── main.css               # איפוס CSS + ברירות מחדל לגוף הדף
│   ├── layout.css             # מבנה העמוד (כותרת, סרגל צד, תוכן, תחתית)
│   ├── components.css         # כל רכיבי הממשק
│   └── responsive.css         # התאמה למסכים שונים
├── LICENSE                    # רישיון Apache 2.0
├── README.md                  # קובץ תיעוד ראשי
└── FULL_EXPLANATION.md        # המדריך המקיף הזה
```

---

## 3. הסבר שורה-אחר-שורה לכל קובץ

### 3.1 `index.html` — הדף הבודד

**סוג מסמך וראש הדף:**
```html
<!DOCTYPE html>
<html lang="en">
```
- `<!DOCTYPE html>`: אומר לדפדפן שזה מסמך HTML5.
- `<html lang="en">`: אלמנט שורש עם שפה אנגלית.

**ראש הדף (`<head>`):**
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quiz Game</title>
  <link rel="stylesheet" href="style/main.css" />
  <link rel="stylesheet" href="style/layout.css" />
  <link rel="stylesheet" href="style/components.css" />
  <link rel="stylesheet" href="style/responsive.css" />
</head>
```
- **charset="UTF-8"**: תומך בכל התווים כולל אימוג'י ועברית.
- **viewport**: הופך את הדף למותאם למובייל.
- **title**: הכותרת שמופיעה בטאב הדפדפן.
- **4 קבצי CSS**: כל אחד מטפל בהיבט אחר (איפוס, מבנה, רכיבים, רספונסיביות).

**גוף הדף (`<body>`):**
```html
<body>
  <div class="app-wrapper">
```
- **.app-wrapper**: מיכל flex שמחזיק את כל העמוד: כותרת, גוף ותחתית. נמתח לגובה מלא כדי שהתחתית תישאר בתחתית.

**כותרת עליונה:**
```html
    <header class="site-header">
      <span class="logo">💻 AbdAlla Zaid Random Questions ⌨️</span>
    </header>
```
- כותרת דביקה בראש העמוד. משתמשת ב-`backdrop-filter: blur()` לאפקט זכוכית.

**סרגל צד:**
```html
    <div class="body-layout">
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <button class="nav-item active" data-action="welcome">🏠 Home</button>
          <div class="nav-divider"></div>
          <button class="nav-item" data-action="local">📚 From Local</button>
          <button class="nav-item" data-action="api">🌍 From API</button>
        </nav>
      </aside>
```
- **data-action**: תכונת HTML מותאמת אישית. ב-`main.js` אנחנו קוראים `item.dataset.action` כדי להחליט מה קורה בלחיצה.
- **.nav-divider**: קו מפריד אופקי בין Home למקורות השאלות.
- **.active**: כפתור Home מתחיל פעיל כי הדף נטען על מסך הברכה.

**אזור תוכן ראשי:**
```html
      <main class="main-area">
        <div class="main-content">
```

**מסך 1 — מסך הברכה:**
```html
          <div id="welcome-screen" class="screen-main">
            <div class="card" style="text-align:center;">
              <h1 class="game-title">Quiz Game</h1>
              <p class="subtitle">Test your web development & programming knowledge!</p>
              <p style="color:rgba(255,255,255,0.4);font-size:0.9rem;margin-top:8px;">
                🧪 Pick a question source from the sidebar to begin.
              </p>
              <div id="resume-banner" class="hidden" style="...">
                <p>You have a saved quiz in progress.</p>
                <button onclick="resumeQuiz()">⏯ Continue Quiz</button>
              </div>
            </div>
          </div>
```
- **#welcome-screen**: דף הנחיתה. מוצג כברירת מחדל (ללא `hidden`).
- **.card**: מיכל בסגנון זכוכית עם טשטוש, פינות מעוגלות ואנימציית fade-in.
- **.game-title**: משתמש בגרדיאנט שנחתך לטקסט (`-webkit-background-clip: text`) — הטקסט עצמו שקוף ומראה את הגרדיאנט הסגול-כחול מאחוריו.
- **#resume-banner**: מוסתר כברירת מחדל. אם יש נתונים שמורים ב-`localStorage`, `main.js` מסיר את המחלקה `hidden`.

**מסך 2 — מסך מקור השאלות:**
```html
          <div id="source-screen" class="screen-main hidden">
            <div class="card">
              <div class="source-info">
                <h2 id="source-label">📚 Local Questions</h2>
                <p id="source-count">10 questions loaded</p>
              </div>
              <div class="source-actions">
                <button id="start-new-btn" class="btn btn-primary">▶ Start</button>
                <button id="continue-btn" class="btn btn-outline">⏯ Continue</button>
              </div>
            </div>
          </div>
```
- **#source-screen**: מוצג אחרי שהמשתמש בוחר "Local" או "API" מהסרגל הצדדי.
- **#source-label**: מתעדכן דינמית להראות "Local Questions" או "API Questions".
- **#continue-btn**: מוצג רק כשיש התקדמות שמורה (נבדק ב-`showSourceScreen()`).

**מסך 3 — מסך השאלות:**
```html
          <div id="quiz-screen" class="screen-main hidden">
            <div class="card">
              <div class="quiz-header">
                <div class="progress-container">
                  <div id="progress-bar" class="progress-bar"></div>
                </div>
                <div class="quiz-meta">
                  <span id="question-counter">Page 1 / 10</span>
                  <span id="score-display">Score: 0</span>
                </div>
              </div>
              <div class="quiz-body">
                <div id="page-indicators" class="page-indicators"></div>
                <div class="quiz-content">
                  <p id="question-text">Loading...</p>
                  <div id="options-container" class="options-container"></div>
                  <div class="nav-buttons">
                    <button id="prev-btn" class="btn-nav" disabled>← Back</button>
                    <button id="next-btn" class="btn btn-primary" style="flex:1;">Next →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
```
- **#progress-bar**: פס אופקי דק שמתמלא ככל שהמשתמש מתקדם (רוחב נקבע דינמית ב-JS).
- **#question-counter**: מראה "Page 3 / 10" (אינדקס שמתחיל מ-1).
- **#page-indicators**: עמודה אנכית של כפתורים ממוספרים. כל נקודה מייצגת שאלה. לחיצה קופצת לשאלה הזו.
- **#question-text**: טקסט השאלה הנוכחית (נקבע דרך `textContent` למניעת XSS).
- **#options-container**: מתמלא דינמית עם 4 כפתורי אפשרויות.

**מסך 4 — מסך התוצאות:**
```html
          <div id="results-screen" class="screen-main hidden">
            <div class="card results-card">
              <h2 class="results-title">Quiz Complete!</h2>
              <div id="score-circle" class="score-circle">
                <span id="final-score">0 / 10</span>
              </div>
              <p id="result-message">Great job!</p>
              <div class="analysis-section">
                <h3>Answer Analysis</h3>
                <div id="analysis-list" class="analysis-list"></div>
              </div>
            </div>
          </div>
```
- **.score-circle**: אלמנט עגול שמשתמש ב-conic gradient של CSS כדי להראות את האחוזים.
- **#analysis-list**: מתמלא דינמית עם שורות ✅/❌, השאלה והתשובה הנכונה.

**תחתית:**
```html
    <footer class="site-footer">
      <p>&copy; 2026 AbdAlla Zaid. All rights reserved.</p>
    </footer>
```
- קבוע בתחתית. רקע זכוכיתי שקוף למחצה.

**סקריפטים (נטענים בתחתית):**
```html
  <script src="logic/globals.js"></script>
  <script src="logic/storage.js"></script>
  <script src="logic/questions.js"></script>
  <script src="logic/quiz.js"></script>
  <script src="logic/navigation.js"></script>
  <script src="logic/main.js"></script>
```
- **סדר הטעינה חשוב**: `globals.js` חייב להיטען ראשון כי הוא מגדיר את `QuizApp`. `main.js` חייב להיטען אחרון כי הוא מחבר את מאזיני האירועים.

---

### 3.2 `logic/globals.js` — המצב הגלובלי

```js
const QuizApp = {
  quizQuestions: [],
  currentQuestionIndex: 0,
  score: 0,
  userAnswers: [],
  isApiMode: false
};
```
- **quizQuestions**: מערך של אובייקטי שאלות. כל אובייקט: `{ question: string, options: string[], correct: number }`.
- **currentQuestionIndex**: אינדקס השאלה הנוכחית (מתחיל מ-0).
- **score**: מספר התשובות הנכונות.
- **userAnswers**: מערך מקביל ל-`quizQuestions`. `-1` = לא נענה, אחרת = האינדקס שבחר המשתמש.
- **isApiMode**: `true` אם השאלות מה-API, `false` אם ממקור מקומי.

זהו **מקור האמת היחיד** — כל הקבצים האחרים קוראים וכותבים ל-`QuizApp`.

---

### 3.3 `logic/storage.js` — שמירה ב-localStorage

```js
const STORAGE_KEY = 'quizState';

function saveState() {
  const state = {
    quizQuestions: QuizApp.quizQuestions,
    currentQuestionIndex: QuizApp.currentQuestionIndex,
    score: QuizApp.score,
    userAnswers: QuizApp.userAnswers,
    isApiMode: QuizApp.isApiMode
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
```
- **JSON.stringify**: ממיר אובייקט JS למחרוזת JSON. `localStorage` יכול לאחסן רק מחרוזות.
- נקרא אוטומטית אחרי כל תשובה (ב-`checkAnswer()`).

```js
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}
```
- **JSON.parse**: ממיר מחרוזת JSON חזרה לאובייקט JS.
- **try/catch**: אם הנתונים פגומים, מחזיר `null` במקום לקרוס.

```js
function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}
```
- נקרא כשמתחילים חידון חדש או מסיימים אחד.

**למה דווקא localStorage?** בניגוד ל-sessionStorage (שנמחק כשהטאב נסגר) או cookies (שנשלחות לשרת), localStorage נשאר בדפדפן עד שמנקים אותו במפורש ונגיש רק מצד הלקוח. המשמעות: אם המשתמש מרענן את הדף בטעות, ההתקדמות נשמרת.

---

### 3.4 `logic/questions.js` — מקורות השאלות

#### מערך השאלות המקומיות

```js
const localQuestions = [
  {
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', ...],
    correct: 0
  },
  // ... עוד 9 שאלות
];
```
- 10 שאלות קבועות מראש בנושאי פיתוח אתרים (HTML, CSS, JavaScript, DOM, Promises, HTTP, localStorage).
- לכל שאלה בדיוק 4 אפשרויות.
- `correct` הוא ה**אינדקס** (לא הערך) של התשובה הנכונה במערך `options`.

#### מפענח ישויות HTML

```js
function decodeHTMLEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}
```
- **למה צריך**: ה-API של Open Trivia DB מחזיר ישויות HTML מקודדות כמו `&quot;`, `&#039;`, `&amp;`.
- **איך זה עובד**: יוצר אלמנט `textarea` זמני, מגדיר את ה-`innerHTML` שלו לטקסט המקודד, ואז קורא `textarea.value`. מנתח ה-HTML של הדפדפן מפענח את הישויות אוטומטית.

#### loadLocalQuestions()

```js
function loadLocalQuestions() {
  QuizApp.quizQuestions = localQuestions.map(q => ({ ...q }));
  QuizApp.isApiMode = false;
  showSourceScreen();
}
```
- **.map(q => ({ ...q }))**: יוצר עותק עמוק של כל אובייקט שאלה. מונע מוטציות לא מכוונות של המערך המקורי.
- קורא ל-`showSourceScreen()` כדי להראות את מסך ההתחלה.

#### loadApiQuestions()

```js
async function loadApiQuestions() {
  try {
    const res = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple');
    const data = await res.json();
    if (data.response_code !== 0 || !data.results.length) {
      alert('API failed. Loading local questions.');
      loadLocalQuestions();
      return;
    }
```
- **async/await**: מאפשר קוד אסינכרוני נקי יותר.
- **fetch**: API מובנה בדפדפן לשליחת בקשות HTTP.
- **טיפול בשגיאות**: אם ה-API נכשל, נופל לשאלות מקומיות עם התראה.

```js
    QuizApp.quizQuestions = data.results.map(q => {
      const options = [...q.incorrect_answers, q.correct_answer];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      const decoded = options.map(decodeHTMLEntities);
      return {
        question: decodeHTMLEntities(q.question),
        options: decoded,
        correct: decoded.indexOf(decodeHTMLEntities(q.correct_answer))
      };
    });
```
- ה-API מחזיר `incorrect_answers` כמערך ו-`correct_answer` כמחרוזת.
- **Fisher-Yates Shuffle**: מערבב את סדר האפשרויות באופן אקראי. מונע שהתשובה הנכונה תהיה תמיד אחרונה.
- אחרי הערבוב, מוצאים את האינדקס החדש של התשובה הנכונה.

```js
    QuizApp.isApiMode = true;
    showSourceScreen();
  } catch {
    alert('Network error. Loading local questions.');
    loadLocalQuestions();
  }
}
```

---

### 3.5 `logic/quiz.js` — מנוע המשחק

#### startNewQuiz()

```js
function startNewQuiz() {
  clearState();
  QuizApp.currentQuestionIndex = 0;
  QuizApp.score = 0;
  QuizApp.userAnswers = new Array(QuizApp.quizQuestions.length).fill(-1);
  showQuizScreen();
  showQuestion();
}
```
- מנקה התקדמות קודמת, מאפס את המצב, מראה את המסך ואת השאלה הראשונה.

#### resumeQuiz()

```js
function resumeQuiz() {
  const saved = loadState();
  if (saved) {
    QuizApp.quizQuestions = saved.quizQuestions;
    QuizApp.currentQuestionIndex = saved.currentQuestionIndex;
    QuizApp.score = saved.score;
    QuizApp.userAnswers = saved.userAnswers;
    QuizApp.isApiMode = saved.isApiMode;
  }
  showQuizScreen();
  showQuestion();
}
```
- טוען מצב שמור מ-localStorage וממשיך מהנקודה שבה הפסיק.

#### showQuestion()

```js
function showQuestion() {
  const q = QuizApp.quizQuestions[QuizApp.currentQuestionIndex];
  const total = QuizApp.quizQuestions.length;

  document.getElementById('progress-bar').style.width = (QuizApp.currentQuestionIndex / total) * 100 + '%';
  document.getElementById('question-counter').textContent = `Page ${QuizApp.currentQuestionIndex + 1} / ${total}`;
  document.getElementById('score-display').textContent = `Score: ${QuizApp.score}`;

  const container = document.getElementById('options-container');
  container.innerHTML = '';

  const answered = QuizApp.userAnswers[QuizApp.currentQuestionIndex];

  if (answered === -1) {
    // מצב לא נענה: 4 כפתורים לחיצים
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => checkAnswer(idx, btn));
      container.appendChild(btn);
    });
  } else {
    // מצב נענה: 4 כפתורים מנוטרלים עם סימון צבע
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.disabled = true;
      if (idx === q.correct) btn.classList.add('correct');
      if (idx === answered && answered !== q.correct) btn.classList.add('wrong');
      container.appendChild(btn);
    });
  }

  renderPageIndicators();
  updateNavButtons();
}
```
- מעדכן פס התקדמות, מונה שאלות, ניקוד.
- בונה כפתורי אפשרויות: לחיצים אם לא נענה, מנוטרלים עם צבעים אם נענה.
- `textContent` בטוח נגד XSS (לעומת `innerHTML`).

#### checkAnswer()

```js
function checkAnswer(selectedIndex, selectedButton) {
  if (QuizApp.userAnswers[QuizApp.currentQuestionIndex] !== -1) return;

  const q = QuizApp.quizQuestions[QuizApp.currentQuestionIndex];
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(b => b.disabled = true);
  buttons[q.correct].classList.add('correct');

  QuizApp.userAnswers[QuizApp.currentQuestionIndex] = selectedIndex;

  if (selectedIndex === q.correct) {
    QuizApp.score++;
    document.getElementById('score-display').textContent = `Score: ${QuizApp.score}`;
  } else {
    selectedButton.classList.add('wrong');
  }

  saveState();
  renderPageIndicators();
  updateNavButtons();
}
```
- **Guard clause**: אם כבר ענה, יוצא מיד (מונע שינוי תשובה).
- מסמן את התשובה הנכונה בירוק.
- אם טעה, מסמן את הבחירה שלו באדום.
- שומר מיד ל-localStorage.

#### nextQuestion() / prevQuestion()

```js
function nextQuestion() {
  QuizApp.currentQuestionIndex++;
  if (QuizApp.currentQuestionIndex < QuizApp.quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  if (QuizApp.currentQuestionIndex > 0) {
    QuizApp.currentQuestionIndex--;
    showQuestion();
  }
}
```
- מעבר קדימה/אחורה בין שאלות.
- ב-last question, `nextQuestion()` קורא ל-`showResults()`.

#### showResults()

```js
function showResults() {
  clearState();
  document.getElementById('progress-bar').style.width = '100%';

  const total = QuizApp.quizQuestions.length;
  document.getElementById('final-score').textContent = `${QuizApp.score} / ${total}`;
  const pct = QuizApp.score / total * 100;
  document.getElementById('score-circle').style.setProperty('--score-deg', `${pct / 100 * 360}deg`);

  let msg;
  if (pct >= 80) msg = 'Excellent! You are a quiz master!';
  else if (pct >= 50) msg = 'Good job! Keep practicing!';
  else msg = "Don't worry, try again and learn more!";
  document.getElementById('result-message').textContent = msg;

  const analysis = document.getElementById('analysis-list');
  analysis.innerHTML = '';
  QuizApp.quizQuestions.forEach((q, i) => {
    const row = document.createElement('div');
    row.className = 'analysis-row';
    const icon = QuizApp.userAnswers[i] === q.correct ? '✅' : '❌';
    row.innerHTML = `
      <span class="analysis-icon">${icon}</span>
      <span class="analysis-question">${q.question}</span>
      <span class="analysis-answer">${q.options[q.correct]}</span>
    `;
    analysis.appendChild(row);
  });

  showScreen('results-screen');
}
```
- מנקה מצב שמור (החידון הסתיים).
- קובע פס התקדמות ל-100%.
- מחשב אחוזים ומעדכן את משתנה ה-CSS `--score-deg` שיקבע את הזווית של עיגול הניקוד.
- בוחר הודעה מוטיבציונית לפי האחוזים.
- בונה רשימת ניתוח: ✅/❌ לכל שאלה, עם התשובה הנכונה.

---

### 3.6 `logic/navigation.js` — נקודות דפים וכפתורים

#### renderPageIndicators()

```js
function renderPageIndicators() {
  const container = document.getElementById('page-indicators');
  container.innerHTML = '';
  const total = QuizApp.quizQuestions.length;
  if (!total) return;

  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'page-dot';
    dot.textContent = i + 1;
    if (i === QuizApp.currentQuestionIndex) dot.classList.add('active');
    if (QuizApp.userAnswers[i] !== -1) dot.classList.add('answered');
    dot.addEventListener('click', () => {
      QuizApp.currentQuestionIndex = i;
      showQuestion();
    });
    container.appendChild(dot);
  }
}
```
- יוצר כפתור ממוספר לכל שאלה.
- **.active**: נקודה סגולה לשאלה הנוכחית.
- **.answered**: גבול ירוק לשאלות שנענו.
- לחיצה על נקודה קופצת ישירות לשאלה.

#### updateNavButtons()

```js
function updateNavButtons() {
  document.getElementById('prev-btn').disabled = QuizApp.currentQuestionIndex === 0;
  const isLast = QuizApp.currentQuestionIndex === QuizApp.quizQuestions.length - 1;
  document.getElementById('next-btn').textContent = isLast ? 'Finish Quiz' : 'Next →';
}
```
- כפתור "קודם" מנוטרל בשאלה הראשונה.
- כפתור "הבא" משנה טקסט ל-"Finish Quiz" בשאלה האחרונה.

---

### 3.7 `logic/main.js` — המנצח

#### showScreen() — פונקציית ליבה

```js
function showScreen(id) {
  document.querySelectorAll('.screen-main').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
```
- מסתיר את כל המסכים ואז מראה את המבוקש.

#### showSourceScreen()

```js
function showSourceScreen() {
  const total = QuizApp.quizQuestions.length;
  const source = QuizApp.isApiMode ? '🌐 API Questions' : '📚 Local Questions';
  document.getElementById('source-label').textContent = source;
  document.getElementById('source-count').textContent = `${total} questions loaded`;

  const saved = loadState();
  const continueBtn = document.getElementById('continue-btn');
  const startBtn = document.getElementById('start-new-btn');
  continueBtn.style.display = saved ? '' : 'none';
  startBtn.textContent = saved ? '🔄 Start New' : '▶ Start';

  showScreen('source-screen');
}
```
- מראה את מקור השאלות והכמות.
- אם יש התקדמות שמורה, מציג גם "המשך" ומשנה "התחל" ל-"התחל מחדש".

#### חיבור כפתורי הסרגל הצדדי

```js
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    const action = item.dataset.action;
    if (action === 'welcome') showWelcome();
    else if (action === 'local') loadLocalQuestions();
    else if (action === 'api') loadApiQuestions();
  });
});
```
- כל כפתור בסרגל הצד מאזין ללחיצה.
- הלחיצה מסירה `active` מכולם, מוסיפה לנלחץ, ומפעילה את הפונקציה המתאימה לפי `data-action`.

#### חיבור כפתורי המשחק

```js
document.getElementById('start-new-btn').addEventListener('click', startNewQuiz);
document.getElementById('continue-btn').addEventListener('click', resumeQuiz);
document.getElementById('play-again-btn').addEventListener('click', showWelcome);
document.getElementById('change-source-btn').addEventListener('click', showWelcome);
document.getElementById('prev-btn').addEventListener('click', prevQuestion);
document.getElementById('next-btn').addEventListener('click', () => {
  if (QuizApp.currentQuestionIndex === QuizApp.quizQuestions.length - 1) {
    showResults();
  } else {
    nextQuestion();
  }
});
```

#### אתחול — IIFE

```js
(function init() {
  const saved = loadState();
  if (saved) {
    document.getElementById('resume-banner').classList.remove('hidden');
  }
})();
```
- רץ אוטומטית כשהדף נטען.
- אם יש חידון שמור, מציג באנר "המשך חידון" במסך הברכה.

---

## 4. רכיבי CSS עיקריים

### עיצוב "זכוכית" (Glassmorphism)
- רקע שקוף למחצה: `rgba(255, 255, 255, 0.07)`
- טשטוש רקע: `backdrop-filter: blur(20px)`
- גבול עדין: `border: 1px solid rgba(255, 255, 255, 0.12)`

### גרדיאנט טקסט לכותרת
```css
.game-title {
  background: linear-gradient(135deg, #a855f7, #6366f1, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```
הטקסט עצמו שקוף — הגרדיאנט מאחוריו נראה דרך האותיות.

### עיגול ניקוד ב-Conic Gradient
```css
.score-circle {
  background: conic-gradient(#7c3aed var(--score-deg, 0deg), rgba(255,255,255,0.08) 0deg);
}
```
יוצר עוגה סגולה שמתמלאת לפי הזווית שנקבעת ע"י `--score-deg`.

### איפוס אוניברסלי
```css
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```
`box-sizing: border-box` גורם לכך ש-`width` ו-`height` כוללים padding ו-border. זה הופך את הגודל לצפוי יותר.

---

## 5. רישיון Apache 2.0 — הסבר

### מה מותר לעשות:
- **שימוש מסחרי**: להשתמש בקוד במוצרים מסחריים.
- **שינוי**: לשנות את הקוד כרצונך.
- **הפצה**: לשתף את הקוד עם אחרים.
- **שימוש בפטנטים**: הרישיון כולל הענקת זכויות פטנט מהתורמים.
- **שימוש פרטי**: להשתמש באופן אישי בלי לשתף.

### מה חייבים לעשות:
- **לצרף את הרישיון**: לכלול עותק של רישיון Apache 2.0 ואת הודעת זכויות היוצרים המקורית.
- **לציין שינויים**: אם שינית קבצים, עליך לציין ששינית אותם.

### מה אסור לעשות:
- **שימוש בסימני מסחר**: אי אפשר להשתמש בשם "AbdAlla Zaid" כדי לשווק מוצרים נגזרים בלי רשות.
- **תביעות אחריות**: התוכנה מסופקת "כמות שהיא" ללא אחריות.

---

## 6. מושגי מפתח טכניים

### Vanilla JavaScript
האפליקציה כולה משתמשת ב-JavaScript טהור — ללא React, Vue, Angular או jQuery. זה שומר על הפרויקט קל, ללא תלויות וחינוכי. המניפולציה על ה-DOM נעשית ישירות דרך `document.getElementById`, `document.createElement`, `addEventListener` וכו'.

### SPA (Single Page Application)
כל 4 המסכים בקובץ HTML אחד. רק מסך אחד נראה בכל רגע — השאר מוסתרים עם `display: none !important`.

### Fisher-Yates Shuffle
אלגוריתם לערבול אקראי של מערך. הוא **ללא הטיה** — כל צירוף אפשרי בהסתברות שווה. האלגוריתם עובד מהסוף להתחלה: מתחיל באלמנט האחרון, בוחר אלמנט אקראי מוקדם יותר, מחליף ביניהם, עובר לשני-מהסוף, חוזר חלילה.

### Conic Gradients
`conic-gradient()` יוצר גרדיאנט שמסתובב סביב נקודה מרכזית (כמו תרשים עוגה). אנחנו משתמשים בו לעיגול הניקוד — הגרדיאנט מתחיל בסגול למעלה, נמשך עם כיוון השעון ב-`--score-deg` מעלות, ואז עובר לשקוף.

### מניעת XSS
תוכן המוצג למשתמש נקבע דרך `textContent` במקום `innerHTML`. `textContent` בטוח כי הוא לא מפרש HTML — הוא מתייחס למחרוזת כטקסט רגיל.

---

---

# Arabic / العربية

---

## 1. نظرة عامة على المشروع

هذه **لعبة اختبارات** (Quiz Game) مبنية بلغة HTML وCSS وJavaScript النقية — بدون أطر عمل، بدون أدوات بناء، بدون مكتبات خارجية. تعمل مباشرة في أي متصفح حديث.

**المؤلف:** عبد الله زايد  
**GitHub:** https://github.com/AbdullahZaid-ggg/abdalla-preTech-graduate  
**الموقع المباشر:** https://abdullahzaid-ggg.github.io/abdalla-preTech-graduate/

### المميزات:
- 10 أسئلة محلية عن تطوير الويب
- 10 أسئلة ديناميكية من API بنك الأسئلة العالمي (تصنيف: حاسوب)
- حفظ التقدم في `localStorage` (يبقى بعد تحديث الصفحة)
- التنقل بين الأسئلة بأزرار السابق/التالي ونقاط الصفحات المرقمة
- تمييز الإجابات: صحيح = أخضر، خطأ = أحمر
- شاشة نتائج مع دائرة درجات متحركة وتحليل لكل سؤال
- متجاوب بالكامل: يعمل على الحاسب، الجهاز اللوحي والجوال
- تصميم زجاجي مع تدرج بنفسجي غامق

---

## 2. هيكل المشروع

```
abdalla-preTech-graduate/
├── index.html                 # ملف HTML الرئيسي (كل الشاشات في صفحة واحدة)
├── logic/
│   ├── globals.js             # كائن الحالة المشتركة (QuizApp)
│   ├── storage.js             # حفظ/تحميل/مسح localStorage
│   ├── questions.js           # 10 أسئلة محلية + جالب الأسئلة من API
│   ├── quiz.js                # محرك الاختبار (بدء، إجابة، تنقل، نتائج)
│   ├── navigation.js          # نقاط الصفحات + حالة أزرار التنقل
│   └── main.js                # تبديل الشاشات، ربط الأحداث، التهيئة
├── style/
│   ├── main.css               # إعادة تعيين CSS + إعدادات الجسم الأساسية
│   ├── layout.css             # هيكل الصفحة (رأس، شريط جانبي، محتوى، تذييل)
│   ├── components.css         # جميع مكونات واجهة المستخدم
│   └── responsive.css         # نقاط التكيف للشاشات المختلفة
├── LICENSE                    # رخصة Apache 2.0
├── README.md                  # ملف التوثيق الرئيسي
└── FULL_EXPLANATION.md        # هذا الدليل الشامل
```

---

## 3. شرح الكود سطراً بسطر لكل ملف

### 3.1 `index.html` — الصفحة الواحدة

```html
<!DOCTYPE html>
<html lang="en">
```
- `<!DOCTYPE html>`: يخبر المتصفح أن هذه وثيقة HTML5.
- `<html lang="en">`: العنصر الجذر مع اللغة الإنجليزية.

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quiz Game</title>
  <link rel="stylesheet" href="style/main.css" />
  <link rel="stylesheet" href="style/layout.css" />
  <link rel="stylesheet" href="style/components.css" />
  <link rel="stylesheet" href="style/responsive.css" />
</head>
```
- **charset="UTF-8"**: يدعم جميع الأحرف بما فيها الرموز التعبيرية والعربية.
- **viewport meta**: يجعل الصفحة متجاوبة مع الجوال.
- **title**: العنوان الذي يظهر في لسان المتصفح.
- **4 ملفات CSS**: كل ملف يعالج جانباً مختلفاً (إعادة تعيين، هيكل، مكونات، استجابة).

```html
<body>
  <div class="app-wrapper">
```
- **.app-wrapper**: حاوية flex تحتوي الصفحة بأكملها: الرأس، الجسم، التذييل. تمتد للارتفاع الكامل ليبقى التذييل في الأسفل.

**الرأس:**
```html
    <header class="site-header">
      <span class="logo">💻 AbdAlla Zaid Random Questions ⌨️</span>
    </header>
```
- رأس لاصق في أعلى الصفحة مع تأثير زجاجي باستخدام `backdrop-filter: blur()`.

**الشريط الجانبي:**
```html
    <div class="body-layout">
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <button class="nav-item active" data-action="welcome">🏠 Home</button>
          <div class="nav-divider"></div>
          <button class="nav-item" data-action="local">📚 From Local</button>
          <button class="nav-item" data-action="api">🌍 From API</button>
        </nav>
      </aside>
```
- **data-action**: سمة HTML مخصصة. في `main.js` نقرأ `item.dataset.action` لنقرر ماذا يحدث عند النقر.

**الشاشة 1 — شاشة الترحيب:**
```html
          <div id="welcome-screen" class="screen-main">
            <div class="card" style="text-align:center;">
              <h1 class="game-title">Quiz Game</h1>
              <p class="subtitle">Test your web development & programming knowledge!</p>
              <div id="resume-banner" class="hidden">
                <p>You have a saved quiz in progress.</p>
                <button onclick="resumeQuiz()">⏯ Continue Quiz</button>
              </div>
            </div>
          </div>
```
- **.card**: حاوية زجاجية مع تعتيم، زوايا مدورة، ورسوم متحركة fade-in.
- **#resume-banner**: مخفي افتراضياً. إذا كان هناك تقدم محفوظ، تظهر رسالة "متابعة الاختبار".

**الشاشة 2 — شاشة المصدر:**
```html
          <div id="source-screen" class="screen-main hidden">
            <div class="card">
              <div class="source-info">
                <h2 id="source-label">📚 Local Questions</h2>
                <p id="source-count">10 questions loaded</p>
              </div>
              <div class="source-actions">
                <button id="start-new-btn" class="btn btn-primary">▶ Start</button>
                <button id="continue-btn" class="btn btn-outline">⏯ Continue</button>
              </div>
            </div>
          </div>
```

**الشاشة 3 — شاشة الاختبار:**
```html
          <div id="quiz-screen" class="screen-main hidden">
            <div class="card">
              <div class="quiz-header">
                <div class="progress-container">
                  <div id="progress-bar" class="progress-bar"></div>
                </div>
                <div class="quiz-meta">
                  <span id="question-counter">Page 1 / 10</span>
                  <span id="score-display">Score: 0</span>
                </div>
              </div>
              <div class="quiz-body">
                <div id="page-indicators" class="page-indicators"></div>
                <div class="quiz-content">
                  <p id="question-text">Loading...</p>
                  <div id="options-container" class="options-container"></div>
                  <div class="nav-buttons">
                    <button id="prev-btn" class="btn-nav" disabled>← Back</button>
                    <button id="next-btn" class="btn btn-primary">Next →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
```

**الشاشة 4 — شاشة النتائج:**
```html
          <div id="results-screen" class="screen-main hidden">
            <div class="card results-card">
              <h2 class="results-title">Quiz Complete!</h2>
              <div id="score-circle" class="score-circle">
                <span id="final-score">0 / 10</span>
              </div>
              <p id="result-message">Great job!</p>
              <div class="analysis-section">
                <h3>Answer Analysis</h3>
                <div id="analysis-list" class="analysis-list"></div>
              </div>
            </div>
          </div>
```

**التذييل:**
```html
    <footer class="site-footer">
      <p>&copy; 2026 AbdAlla Zaid. All rights reserved.</p>
    </footer>
```

**الملفات البرمجية (تُحمَل في الأسفل):**
```html
  <script src="logic/globals.js"></script>
  <script src="logic/storage.js"></script>
  <script src="logic/questions.js"></script>
  <script src="logic/quiz.js"></script>
  <script src="logic/navigation.js"></script>
  <script src="logic/main.js"></script>
```
- **ترتيب التحميل مهم**: `globals.js` يجب أن يُحمّل أولاً لأنه يعرّف `QuizApp`. `main.js` يجب أن يُحمّل أخيراً لأنه يربط مستمعي الأحداث.

---

### 3.2 `logic/globals.js` — الحالة العامة

```js
const QuizApp = {
  quizQuestions: [],
  currentQuestionIndex: 0,
  score: 0,
  userAnswers: [],
  isApiMode: false
};
```
- **quizQuestions**: مصفوفة من كائنات الأسئلة. كل كائن: `{ question: string, options: string[], correct: number }`.
- **currentQuestionIndex**: فهرس السؤال الحالي (يبدأ من 0).
- **score**: عدد الإجابات الصحيحة.
- **userAnswers**: مصفوفة موازية لـ `quizQuestions`. `-1` = لم يُجب، وإلا فهرس الخيار الذي اختاره المستخدم.
- **isApiMode**: `true` إذا كانت الأسئلة من API، `false` إذا من مصدر محلي.

هذا هو **مصدر الحقيقة الوحيد** — كل الملفات الأخرى تقرأ وتكتب في `QuizApp`.

---

### 3.3 `logic/storage.js` — الحفظ في localStorage

```js
const STORAGE_KEY = 'quizState';

function saveState() {
  const state = {
    quizQuestions: QuizApp.quizQuestions,
    currentQuestionIndex: QuizApp.currentQuestionIndex,
    score: QuizApp.score,
    userAnswers: QuizApp.userAnswers,
    isApiMode: QuizApp.isApiMode
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
```
- **JSON.stringify**: يحول كائن JavaScript إلى سلسلة JSON. `localStorage` يمكنه تخزين السلاسل فقط.
- يُستدعى تلقائياً بعد كل إجابة (في `checkAnswer()`).

```js
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}
```

**لماذا localStorage؟** على عكس sessionStorage (الذي يمحو عند إغلاق التبويب) أو cookies (التي ترسل للخادم)، localStorage يبقى في المتصفح حتى يمحى صراحةً ويمكن الوصول إليه فقط من جانب العميل. هذا يعني أن تحديث الصفحة عن طريق الخطأ لا يفقد التقدم.

---

### 3.4 `logic/questions.js` — مصادر الأسئلة

#### الأسئلة المحلية

```js
const localQuestions = [
  {
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', ...],
    correct: 0
  },
  // ... 9 أسئلة أخرى
];
```
- 10 أسئلة ثابتة عن تطوير الويب.
- `correct` هو **الفهرس** (وليس القيمة) للإجابة الصحيحة في مصفوفة `options`.

#### مفكك كيانات HTML

```js
function decodeHTMLEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}
```
- **لماذا نحتاجه**: API بنك الأسئلة يُرجع كيانات HTML مشفرة مثل `&quot;`, `&#039;`, `&amp;`.
- **كيف يعمل**: ينشئ عنصر `textarea` مؤقتاً، يضع النص المشفر في `innerHTML`، ثم يقرأ `textarea.value`. محلل HTML في المتصفح يفك تشفير الكيانات تلقائياً.

#### loadLocalQuestions()

```js
function loadLocalQuestions() {
  QuizApp.quizQuestions = localQuestions.map(q => ({ ...q }));
  QuizApp.isApiMode = false;
  showSourceScreen();
}
```
- **.map(q => ({ ...q }))**: ينشئ نسخة عميقة من كل كائن سؤال. يمنع التعديل غير المقصود للمصفوفة الأصلية.

#### loadApiQuestions()

```js
async function loadApiQuestions() {
  try {
    const res = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple');
    const data = await res.json();
    if (data.response_code !== 0 || !data.results.length) {
      alert('API failed. Loading local questions.');
      loadLocalQuestions();
      return;
    }
```
- **async/await**: يسمح بكتابة كود غير متزامن بشكل أنظف.
- **fetch**: API مدمج في المتصفح لإرسال طلبات HTTP.
- **معالجة الأخطاء**: إذا فشل API، يتراجع إلى الأسئلة المحلية مع رسالة تنبيه.

```js
    QuizApp.quizQuestions = data.results.map(q => {
      const options = [...q.incorrect_answers, q.correct_answer];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      const decoded = options.map(decodeHTMLEntities);
      return {
        question: decodeHTMLEntities(q.question),
        options: decoded,
        correct: decoded.indexOf(decodeHTMLEntities(q.correct_answer))
      };
    });
```
- **Fisher-Yates Shuffle**: يخلط ترتيب الخيارات عشوائياً. يمنع أن تكون الإجابة الصحيحة دائماً في النهاية.

```js
    QuizApp.isApiMode = true;
    showSourceScreen();
  } catch {
    alert('Network error. Loading local questions.');
    loadLocalQuestions();
  }
}
```

---

### 3.5 `logic/quiz.js` — محرك الاختبار

#### startNewQuiz()

```js
function startNewQuiz() {
  clearState();
  QuizApp.currentQuestionIndex = 0;
  QuizApp.score = 0;
  QuizApp.userAnswers = new Array(QuizApp.quizQuestions.length).fill(-1);
  showQuizScreen();
  showQuestion();
}
```

#### resumeQuiz()

```js
function resumeQuiz() {
  const saved = loadState();
  if (saved) {
    QuizApp.quizQuestions = saved.quizQuestions;
    QuizApp.currentQuestionIndex = saved.currentQuestionIndex;
    QuizApp.score = saved.score;
    QuizApp.userAnswers = saved.userAnswers;
    QuizApp.isApiMode = saved.isApiMode;
  }
  showQuizScreen();
  showQuestion();
}
```

#### showQuestion()

```js
function showQuestion() {
  const q = QuizApp.quizQuestions[QuizApp.currentQuestionIndex];
  const total = QuizApp.quizQuestions.length;

  document.getElementById('progress-bar').style.width = (QuizApp.currentQuestionIndex / total) * 100 + '%';
  document.getElementById('question-counter').textContent = `Page ${QuizApp.currentQuestionIndex + 1} / ${total}`;
  document.getElementById('score-display').textContent = `Score: ${QuizApp.score}`;

  const container = document.getElementById('options-container');
  container.innerHTML = '';

  const answered = QuizApp.userAnswers[QuizApp.currentQuestionIndex];

  if (answered === -1) {
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => checkAnswer(idx, btn));
      container.appendChild(btn);
    });
  } else {
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.disabled = true;
      if (idx === q.correct) btn.classList.add('correct');
      if (idx === answered && answered !== q.correct) btn.classList.add('wrong');
      container.appendChild(btn);
    });
  }

  renderPageIndicators();
  updateNavButtons();
}
```

#### checkAnswer()

```js
function checkAnswer(selectedIndex, selectedButton) {
  if (QuizApp.userAnswers[QuizApp.currentQuestionIndex] !== -1) return;

  const q = QuizApp.quizQuestions[QuizApp.currentQuestionIndex];
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(b => b.disabled = true);
  buttons[q.correct].classList.add('correct');

  QuizApp.userAnswers[QuizApp.currentQuestionIndex] = selectedIndex;

  if (selectedIndex === q.correct) {
    QuizApp.score++;
    document.getElementById('score-display').textContent = `Score: ${QuizApp.score}`;
  } else {
    selectedButton.classList.add('wrong');
  }

  saveState();
  renderPageIndicators();
  updateNavButtons();
}
```

#### nextQuestion() / prevQuestion()

```js
function nextQuestion() {
  QuizApp.currentQuestionIndex++;
  if (QuizApp.currentQuestionIndex < QuizApp.quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  if (QuizApp.currentQuestionIndex > 0) {
    QuizApp.currentQuestionIndex--;
    showQuestion();
  }
}
```

#### showResults()

```js
function showResults() {
  clearState();
  document.getElementById('progress-bar').style.width = '100%';

  const total = QuizApp.quizQuestions.length;
  document.getElementById('final-score').textContent = `${QuizApp.score} / ${total}`;
  const pct = QuizApp.score / total * 100;
  document.getElementById('score-circle').style.setProperty('--score-deg', `${pct / 100 * 360}deg`);

  let msg;
  if (pct >= 80) msg = 'Excellent! You are a quiz master!';
  else if (pct >= 50) msg = 'Good job! Keep practicing!';
  else msg = "Don't worry, try again and learn more!";
  document.getElementById('result-message').textContent = msg;

  const analysis = document.getElementById('analysis-list');
  analysis.innerHTML = '';
  QuizApp.quizQuestions.forEach((q, i) => {
    const row = document.createElement('div');
    row.className = 'analysis-row';
    const icon = QuizApp.userAnswers[i] === q.correct ? '✅' : '❌';
    row.innerHTML = `
      <span class="analysis-icon">${icon}</span>
      <span class="analysis-question">${q.question}</span>
      <span class="analysis-answer">${q.options[q.correct]}</span>
    `;
    analysis.appendChild(row);
  });

  showScreen('results-screen');
}
```

---

### 3.6 `logic/navigation.js` — نقاط الصفحات والأزرار

#### renderPageIndicators()

```js
function renderPageIndicators() {
  const container = document.getElementById('page-indicators');
  container.innerHTML = '';
  const total = QuizApp.quizQuestions.length;
  if (!total) return;

  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'page-dot';
    dot.textContent = i + 1;
    if (i === QuizApp.currentQuestionIndex) dot.classList.add('active');
    if (QuizApp.userAnswers[i] !== -1) dot.classList.add('answered');
    dot.addEventListener('click', () => {
      QuizApp.currentQuestionIndex = i;
      showQuestion();
    });
    container.appendChild(dot);
  }
}
```

#### updateNavButtons()

```js
function updateNavButtons() {
  document.getElementById('prev-btn').disabled = QuizApp.currentQuestionIndex === 0;
  const isLast = QuizApp.currentQuestionIndex === QuizApp.quizQuestions.length - 1;
  document.getElementById('next-btn').textContent = isLast ? 'Finish Quiz' : 'Next →';
}
```

---

### 3.7 `logic/main.js` — المنسق

#### showScreen()

```js
function showScreen(id) {
  document.querySelectorAll('.screen-main').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
```

#### showSourceScreen()

```js
function showSourceScreen() {
  const total = QuizApp.quizQuestions.length;
  const source = QuizApp.isApiMode ? '🌐 API Questions' : '📚 Local Questions';
  document.getElementById('source-label').textContent = source;
  document.getElementById('source-count').textContent = `${total} questions loaded`;

  const saved = loadState();
  const continueBtn = document.getElementById('continue-btn');
  const startBtn = document.getElementById('start-new-btn');
  continueBtn.style.display = saved ? '' : 'none';
  startBtn.textContent = saved ? '🔄 Start New' : '▶ Start';

  showScreen('source-screen');
}
```

#### ربط أزرار الشريط الجانبي

```js
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    const action = item.dataset.action;
    if (action === 'welcome') showWelcome();
    else if (action === 'local') loadLocalQuestions();
    else if (action === 'api') loadApiQuestions();
  });
});
```

#### ربط أزرار اللعبة

```js
document.getElementById('start-new-btn').addEventListener('click', startNewQuiz);
document.getElementById('continue-btn').addEventListener('click', resumeQuiz);
document.getElementById('play-again-btn').addEventListener('click', showWelcome);
document.getElementById('change-source-btn').addEventListener('click', showWelcome);
document.getElementById('prev-btn').addEventListener('click', prevQuestion);
document.getElementById('next-btn').addEventListener('click', () => {
  if (QuizApp.currentQuestionIndex === QuizApp.quizQuestions.length - 1) {
    showResults();
  } else {
    nextQuestion();
  }
});
```

#### التهيئة — IIFE

```js
(function init() {
  const saved = loadState();
  if (saved) {
    document.getElementById('resume-banner').classList.remove('hidden');
  }
})();
```

---

## 4. مكونات CSS الرئيسية

### التصميم الزجاجي (Glassmorphism)
- خلفية شبه شفافة: `rgba(255, 255, 255, 0.07)`
- تعتيم الخلفية: `backdrop-filter: blur(20px)`
- حد خفيف: `border: 1px solid rgba(255, 255, 255, 0.12)`

### تدرج النص للعنوان
```css
.game-title {
  background: linear-gradient(135deg, #a855f7, #6366f1, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```
النص نفسه شفاف — التدرج خلفه يظهر من خلال الحروف.

### دائرة الدرجات بـ Conic Gradient
```css
.score-circle {
  background: conic-gradient(#7c3aed var(--score-deg, 0deg), rgba(255,255,255,0.08) 0deg);
}
```
تنشئ فطيرة بنفسجية تمتلئ حسب الزاوية المحددة بواسطة `--score-deg`.

### إعادة التعيين الشامل
```css
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```
`box-sizing: border-box` يجعل `width` و `height` يشملان `padding` و `border`. هذا يجعل تحديد الأحجام أكثر توقعاً.

---

## 5. رخصة Apache 2.0 — شرح

### ما يمكنك فعله:
- **الاستخدام التجاري**: استخدام الكود في منتجات تجارية.
- **التعديل**: تغيير الكود كما تريد.
- **التوزيع**: مشاركة الكود مع الآخرين.
- **استخدام براءات الاختراع**: تتضمن الرخصة منحاً صريحاً لحقوق براءات الاختراع من المساهمين.
- **الاستخدام الخاص**: استخدامه شخصياً دون مشاركة.

### ما يجب عليك فعله:
- **إرفاق الرخصة**: تضمين نسخة من رخصة Apache 2.0 وإشعار حقوق النشر الأصلي.
- **ذكر التغييرات**: إذا قمت بتعديل الملفات، يجب أن تذكر أنك غيرتها.

### ما لا يمكنك فعله:
- **استخدام العلامات التجارية**: لا يمكنك استخدام اسم "AbdAlla Zaid" لتسويق منتجات مشتقة دون إذن.
- **تحميلنا المسؤولية**: البرنامج مقدم "كما هو" دون ضمان.

### لماذا Apache 2.0 بدلاً من MIT؟
- **حماية براءات الاختراع**: Apache 2.0 تحتوي على بند صريح لمنح حقوق براءات الاختراع.
- **إشعار التغييرات**: تطلب منك وضع علامة على الملفات المعدلة.

---

## 6. مفاهيم تقنية رئيسية

### Vanilla JavaScript (جافا سكريبت النقية)
التطبيق بأكمله يستخدم JavaScript النقي — بدون React أو Vue أو Angular أو jQuery. هذا يحافظ على المشروع خفيفاً، بدون تبعيات، وتعليمياً. يتم التلاعب بـ DOM مباشرة عبر `document.getElementById`, `document.createElement`, `addEventListener`، إلخ.

### SPA (تطبيق صفحة واحدة)
جميع الشاشات الأربع في ملف HTML واحد. شاشة واحدة فقط مرئية في كل مرة — الباقي مخفي بـ `display: none !important`.

### خلط Fisher-Yates
خوارزمية لخلط مصفوفة عشوائياً. إنها **غير منحازة** — كل ترتيب ممكن له نفس الاحتمال. تعمل الخوارزمية من النهاية إلى البداية: تبدأ بالعنصر الأخير، تختار عنصراً عشوائياً قبله، تبادلهما، تنتقل للعنصر قبل الأخير، وتكرر.

### التدرجات المخروطية في CSS
`conic-gradient()` ينشئ تدرجاً يدور حول نقطة مركزية (مثل مخطط دائري). نستخدمه لدائرة الدرجات — يبدأ التدرج بنفسجي من الأعلى، يمتد في اتجاه عقارب الساعة بمقدار `--score-deg` درجة، ثم يتحول إلى شفاف للباقي.

### منع XSS (هجمات البرمجة عبر المواقع)
المحتوى المعروض للمستخدم يُحدد عبر `textContent` بدلاً من `innerHTML`. `textContent` آمن لأنه لا يفسر HTML — إنه يعامل السلسلة كنص عادي.
