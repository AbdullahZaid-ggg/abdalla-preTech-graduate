import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { loadState } from '../utils/storage'
import { loadLocalQuestions, loadApiQuestions } from '../utils/questions'

export default function HomeScreen() {
  const { dispatch } = useQuiz()
  const navigate = useNavigate()
  const saved = loadState()
  const [apiLoading, setApiLoading] = useState(false)

  return (
    <section className="screen-main">
      <div className="hero-section">
        <div className="hero-visual">
          <img className="logo-dark" src="/assets/images/hero.svg" alt="Quiz Arena" />
          <img className="logo-light" src="/assets/images/hero-light.svg" alt="Quiz Arena" />
        </div>
        <div className="hero-text">
          <h1 className="hero-title">Quiz Arena</h1>
          <p className="hero-sub">Test your knowledge. Track your growth.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate('/category')}>
              <svg viewBox="0 0 18 18" width="18" height="18"><path d="M2 3h6v6H2zm0 8h6v4H2zm8-8h6v6h-6zm0 8h6v4h-6z" fill="currentColor"/></svg>
              <span>Choose Category</span>
            </button>
            <button className="btn btn-outline" disabled={apiLoading} onClick={async () => {
              setApiLoading(true)
              try {
                const settings = { amount: 10, category: 18, difficulty: 'medium', shuffle: true }
                const result = await loadApiQuestions(settings)
                if (result && result.questions) {
                  dispatch({ type: 'LOAD_QUESTIONS', payload: { questions: result.questions, isApiMode: true, category: result.category, difficulty: result.difficulty } })
                  dispatch({ type: 'START_QUIZ', payload: result.questions })
                } else {
                  startLocalFallback(dispatch)
                }
              } catch {
                startLocalFallback(dispatch)
              } finally {
                setApiLoading(false)
              }
            }}>
              {apiLoading ? (
                <svg className="btn-spinner" viewBox="0 0 20 20" width="18" height="18">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
                  <path d="M10 2a8 8 0 018 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg viewBox="0 0 18 18" width="18" height="18"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M2 9h14M9 2a11 11 0 000 14 11 11 0 000-14z" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
              )}
              <span>{apiLoading ? 'Loading...' : 'Try API Quiz'}</span>
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

function startLocalFallback(dispatch) {
  const fallback = loadLocalQuestions('All', 'all')
  dispatch({ type: 'LOAD_QUESTIONS', payload: { questions: fallback.questions, isApiMode: false, category: fallback.category, difficulty: fallback.difficulty } })
  dispatch({ type: 'START_QUIZ', payload: fallback.questions })
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
  if (!total) {
    return (
      <div className="home-empty-state">
        <svg className="home-empty-icon" viewBox="0 0 48 48" width="48" height="48">
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
          <path d="M18 24l4 4 8-8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
          <path d="M30 20c-2-2-4-3-6-3s-4 1-6 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
        </svg>
        <p className="home-empty-title">Complete your first quiz!</p>
        <p className="home-empty-sub">Your stats and history will show up here after you finish a quiz.</p>
      </div>
    )
  }
  return (
    <div className="home-stats-section">
      <h2 className="home-stats-title">
        <svg viewBox="0 0 20 20" width="20" height="20"><path d="M10 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" fill="currentColor"/></svg>
        Your Scores
      </h2>
      <div className="home-stats">
        <div className="home-stat">
          <svg className="home-stat-icon" viewBox="0 0 24 24" width="28" height="28">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M4 21c0-4 3-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
          <span className="home-stat-val">{total}</span>
          <span className="home-stat-label">Quizzes Done</span>
        </div>
        <div className="home-stat">
          <svg className="home-stat-icon" viewBox="0 0 24 24" width="28" height="28">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="home-stat-val">{avg}%</span>
          <span className="home-stat-label">Average Score</span>
        </div>
        <div className="home-stat">
          <svg className="home-stat-icon" viewBox="0 0 24 24" width="28" height="28">
            <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" fill="currentColor" opacity="0.9"/>
            <path d="M9 9l3-3 3 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
          </svg>
          <span className="home-stat-val">{best}%</span>
          <span className="home-stat-label">Best Score</span>
        </div>
      </div>
    </div>
  )
}
