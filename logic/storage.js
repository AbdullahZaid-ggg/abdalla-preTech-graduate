function saveState() {
  const state = {
    quizQuestions: QuizApp.quizQuestions,
    currentQuestionIndex: QuizApp.currentQuestionIndex,
    score: QuizApp.score,
    userAnswers: QuizApp.userAnswers,
    isApiMode: QuizApp.isApiMode,
    localCategory: QuizApp.localCategory,
    localDifficulty: QuizApp.localDifficulty,
  }
  localStorage.setItem(CONFIG.STATE_KEY, JSON.stringify(state))
}

function loadState() {
  try {
    const saved = localStorage.getItem(CONFIG.STATE_KEY)
    if (!saved) return null
    const data = JSON.parse(saved)
    if (data.localCategory) QuizApp.localCategory = data.localCategory
    if (data.localDifficulty) QuizApp.localDifficulty = data.localDifficulty
    return data
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
    category: source === 'api' ? 'API' : (QuizApp.localCategory || 'All'),
    difficulty: QuizApp.localDifficulty || 'all',
    questions: QuizApp.quizQuestions.map(q => ({ ...q })),
    userAnswers: [...QuizApp.userAnswers],
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

function deleteQuizAttempt(id) {
  const history = loadHistory()
  const updated = history.filter(a => a.id !== id)
  localStorage.setItem(CONFIG.HISTORY_KEY, JSON.stringify(updated))
}

function clearAllHistory() {
  localStorage.removeItem(CONFIG.HISTORY_KEY)
}
