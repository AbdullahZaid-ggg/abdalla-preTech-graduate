import { CONFIG } from './config'
import { getTodayKey, getPercentage } from './utils'

export function saveState(state) {
  localStorage.setItem(CONFIG.STATE_KEY, JSON.stringify(state))
}

export function loadState() {
  try {
    const saved = localStorage.getItem(CONFIG.STATE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

export function clearState() {
  localStorage.removeItem(CONFIG.STATE_KEY)
}

export function saveQuizAttempt(score, total, source, quizQuestions, userAnswers, localCategory, localDifficulty) {
  const history = loadHistory()
  const attempt = {
    id: Date.now().toString(),
    date: getTodayKey(),
    timestamp: Date.now(),
    score, total,
    percentage: getPercentage(score, total),
    source,
    category: source === 'api' ? 'API' : (localCategory || 'All'),
    difficulty: localDifficulty || 'all',
    questions: quizQuestions.map(q => ({ ...q })),
    userAnswers: [...userAnswers],
  }
  history.unshift(attempt)
  localStorage.setItem(CONFIG.HISTORY_KEY, JSON.stringify(history))
  return attempt
}

export function loadHistory() {
  try {
    const data = localStorage.getItem(CONFIG.HISTORY_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function deleteQuizAttempt(id) {
  const history = loadHistory()
  const updated = history.filter(a => a.id !== id)
  localStorage.setItem(CONFIG.HISTORY_KEY, JSON.stringify(updated))
}

export function clearAllHistory() {
  localStorage.removeItem(CONFIG.HISTORY_KEY)
}
