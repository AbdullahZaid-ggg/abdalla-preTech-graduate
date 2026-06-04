function saveState() {
  const state = {
    quizQuestions: QuizApp.quizQuestions,
    currentQuestionIndex: QuizApp.currentQuestionIndex,
    score: QuizApp.score,
    userAnswers: QuizApp.userAnswers,
    isApiMode: QuizApp.isApiMode,
  }
  localStorage.setItem(CONFIG.STATE_KEY, JSON.stringify(state))
}

function loadState() {
  try {
    const saved = localStorage.getItem(CONFIG.STATE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

function clearState() {
  localStorage.removeItem(CONFIG.STATE_KEY)
}

function saveQuizAttempt(score, total, source) {
  const history = loadHistory()
  const attempt = {
    id: Date.now().toString(),
    date: getTodayKey(),
    timestamp: Date.now(),
    score,
    total,
    percentage: getPercentage(score, total),
    source,
  }
  history.unshift(attempt)
  localStorage.setItem(CONFIG.HISTORY_KEY, JSON.stringify(history))
  return attempt
}

function loadHistory() {
  try {
    const data = localStorage.getItem(CONFIG.HISTORY_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function clearHistory() {
  localStorage.removeItem(CONFIG.HISTORY_KEY)
}
