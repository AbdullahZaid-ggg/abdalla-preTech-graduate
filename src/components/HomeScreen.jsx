import { useQuiz } from '../context/QuizContext'
import { loadState } from '../utils/storage'

export default function HomeScreen() {
  const { state, dispatch } = useQuiz()
  const saved = loadState()

  return (
    <section className="screen-main">
      <div className="hero-section">
        <div className="hero-visual">
          <img className="logo-dark" src="/assets/images/hero.svg" alt="Quiz Arena" />
          <img className="logo-light" src="/assets/images/hero-light.svg" alt="Quiz Arena" style={{ display: 'none' }} />
        </div>
        <div className="hero-text">
          <h1 className="hero-title">Quiz Arena</h1>
          <p className="hero-sub">Test your knowledge. Track your growth.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'category' })}>
              <svg viewBox="0 0 18 18" width="18" height="18"><path d="M2 3h6v6H2zm0 8h6v4H2zm8-8h6v6h-6zm0 8h6v4h-6z" fill="currentColor"/></svg>
              <span>Choose Category</span>
            </button>
            <button className="btn btn-outline" onClick={async () => {
              dispatch({ type: 'SET_LOADING', payload: true })
              try {
                const { loadApiQuestions } = await import('../utils/questions')
                const settings = { amount: 10, category: 18, difficulty: 'medium', shuffle: true }
                const questions = await loadApiQuestions(settings)
                if (questions) {
                  dispatch({ type: 'LOAD_QUESTIONS', payload: { questions, isApiMode: true } })
                  dispatch({ type: 'START_QUIZ', payload: questions })
                }
              } finally {
                dispatch({ type: 'SET_LOADING', payload: false }
              )
              }
            }}>
              <svg viewBox="0 0 18 18" width="18" height="18"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M2 9h14M9 2a11 11 0 000 14 11 11 0 000-14z" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
              <span>Try API Quiz</span>
            </button>
          </div>
          {saved && (
            <div className="resume-banner">
              <span>You have a quiz in progress</span>
              <button className="btn btn-sm btn-secondary" onClick={() => dispatch({ type: 'RESUME_QUIZ', payload: saved })}>
                <svg viewBox="0 0 18 18" width="18" height="18"><path d="M5 3l10 6-10 6z" fill="currentColor"/></svg>
                <span>Continue</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <HomeStats />
    </section>
  )
}

function HomeStats() {
  const history = (() => {
    try {
      const data = localStorage.getItem('quizHistory')
      return data ? JSON.parse(data) : []
    } catch { return [] }
  })()
  const total = history.length
  const avg = total ? Math.round(history.reduce((s, a) => s + a.percentage, 0) / total) : 0
  const best = total ? Math.max(...history.map(a => a.percentage)) : 0
  if (!total) return null
  return (
    <div className="home-stats">
      <div className="home-stat"><span className="home-stat-val">{total}</span><span className="home-stat-label">Quizzes Done</span></div>
      <div className="home-stat"><span className="home-stat-val">{avg}%</span><span className="home-stat-label">Average Score</span></div>
      <div className="home-stat"><span className="home-stat-val">{best}%</span><span className="home-stat-label">Best Score</span></div>
    </div>
  )
}
