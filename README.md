# Quiz Arena

<div align="center">

**A modern, feature-rich quiz game built with React + Vite**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vite.dev)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue)](LICENSE)

</div>

---

## Features

- **108 Local Questions** across 13 categories (Science, IT, Math, General, History, Geography, Nature, Sports, Movies & TV, Food & Health, Space, Art & Literature)
- **API Quizzes** — Fetch fresh questions from [Open Trivia Database](https://opentdb.com) with custom settings
- **3 Difficulty Levels** — Easy, Medium, Hard per category
- **Dark / Light Mode** — Theme toggle persisted to localStorage
- **History Tracking** — Every attempt saved with full score breakdown
- **Daily Comparison** — Compare performance day by day
- **Streak Counter** — Track consecutive correct answers
- **Confetti Animation** — Celebratory confetti on 80%+ scores
- **Sound Effects** — Web Audio API tones (correct, wrong, complete, click)
- **Keyboard Shortcuts** — 1-4 to answer, Enter for next, Arrow keys to navigate
- **Timed Questions** — 20-second countdown per question
- **Responsive Design** — Works on desktop, tablet, and mobile
- **PWA Support** — Service worker for offline caching
- **MD3 + Cyber Theme** — Material Design 3 with a cyber aesthetic

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI components and state management |
| **Vite 8** | Build tool and dev server |
| **CSS** | Custom styling with CSS custom properties |
| **Open Trivia DB** | External API for dynamic questions |
| **localStorage** | State persistence and quiz history |
| **Web Audio API** | Sound effects |
| **Canvas API** | Confetti animation |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AbdullahZaid-ggg/abdalla-preTech-graduate.git

# Navigate to the project
cd abdalla-preTech-graduate

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
├── public/                     # Static assets
│   ├── assets/                 # SVG icons and illustrations
│   ├── manifest.json           # PWA manifest
│   └── sw.js                   # Service worker
├── src/
│   ├── components/             # React components
│   │   ├── Navbar.jsx          # Navigation bar with theme toggle
│   │   ├── HomeScreen.jsx      # Welcome / hero page
│   │   ├── CategoryScreen.jsx  # Category and difficulty picker
│   │   ├── QuizScreen.jsx      # Quiz question display
│   │   ├── ResultsScreen.jsx   # Quiz results and analysis
│   │   ├── HistoryScreen.jsx   # Quiz history and daily comparison
│   │   ├── AboutScreen.jsx     # About the project
│   │   ├── ContactScreen.jsx   # Contact information
│   │   ├── ToastContainer.jsx  # Toast notification system
│   │   └── ErrorBoundary.jsx   # Error boundary wrapper
│   ├── context/
│   │   └── QuizContext.jsx     # Global state management
│   ├── utils/
│   │   ├── storage.js          # localStorage CRUD operations
│   │   ├── sound.js            # Web Audio API sound effects
│   │   └── questions.js        # 108 local questions + API fetch
│   ├── test/
│   │   ├── setup.js            # Test environment setup
│   │   ├── questions.test.js   # Questions utility tests
│   │   └── utils.test.js       # General utility tests
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # Entry point
├── style/                      # CSS stylesheets
│   ├── theme.css               # Design tokens, light/dark variables
│   ├── layout.css              # Nav, main, footer layout
│   ├── components.css          # All component styles
│   └── responsive.css          # Responsive breakpoints
├── index.html                  # HTML entry point
├── package.json
└── vite.config.js
```

---

## How to Play

1. **Choose a Category** — Pick from 13 topics or try "All Topics"
2. **Select Difficulty** — Easy, Medium, Hard, or mix them all
3. **Answer Questions** — Select the correct option before time runs out
4. **Review Results** — See your score, streak, and full answer breakdown
5. **Track Progress** — View history and compare daily performance

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1` `2` `3` `4` | Select answer option |
| `Enter` | Next question / Finish quiz |
| `←` `→` | Previous / Next question |

---

## API Mode

Click **"Try API Quiz"** on the home screen to fetch questions from the Open Trivia Database. You can customize:
- Category (General Knowledge, Science, Computers, etc.)
- Difficulty
- Number of questions (5–20)
- Shuffle toggle

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the Apache 2.0 License — see the [LICENSE](LICENSE) file for details.

---

## Developer

**AbdAlla Zaid**

[![Email](https://img.shields.io/badge/Email-abdallazeed3%40gmail.com-red?logo=gmail)](mailto:abdallazeed3@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-abdalla--zaid--81926439b-blue?logo=linkedin)](https://www.linkedin.com/in/abdalla-zaid-81926439b)
[![GitHub](https://img.shields.io/badge/Github-AbdullahZaid--ggg-black?logo=github)](https://github.com/AbdullahZaid-ggg)

---

<div align="center">
  <p>Built with ❤️ by <strong>AbdAlla Zaid</strong></p>
</div>
