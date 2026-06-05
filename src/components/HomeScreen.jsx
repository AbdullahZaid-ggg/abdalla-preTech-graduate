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

  const history = (() => {
    try {
      const data = localStorage.getItem('quizHistory')
      return data ? JSON.parse(data) : []
    } catch { return [] }
  })()
  const total = history.length
  const avg = total ? Math.round(history.reduce((s, a) => s + a.percentage, 0) / total) : 0
  const best = total ? Math.max(...history.map(a => a.percentage)) : 0

  return (
    <section className="screen-main">
      <div className="hero-card">
        <div className="hero-card-bg" />
        <div className="hero-card-inner">
          <div className="hero-visual">
            <img className="logo-dark" src="/assets/images/hero.svg" alt="Z-Fahm" />
            <img className="logo-light" src="/assets/images/hero-light.svg" alt="Z-Fahm" />
          </div>
          <div className="hero-text">
            <h1 className="hero-title">Z-Fahm</h1>
            <p className="hero-sub">Test your knowledge. Track your growth.</p>
            {total > 0 ? (
              <div className="hero-pills">
                <span className="hero-pill">
                  <svg viewBox="0 0 16 16" width="14" height="14"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3" fill="none"/><path d="M2 13c0-3 2.5-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/></svg>
                  {total} done
                </span>
                <span className="hero-pill">
                  <svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 2l1 4h4l-3 2 1 4-3-2-3 2 1-4-3-2h4z" fill="currentColor" opacity="0.7"/></svg>
                  {avg}% avg
                </span>
                <span className="hero-pill hero-pill-best">
                  <svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 1l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" fill="currentColor"/></svg>
                  Best {best}%
                </span>
              </div>
            ) : (
              <div className="hero-pills">
                <span className="hero-pill hero-pill-empty">No scores yet — finish a quiz!</span>
              </div>
            )}
            {saved && (
              <div className="resume-banner">
                <span>You have a quiz in progress</span>
                <button className="btn btn-sm btn-secondary" onClick={() => dispatch({ type: 'RESUME_QUIZ', payload: saved })}>
                  <svg viewBox="0 0 18 18" width="18" height="18"><path d="M5 3l10 6-10 6z" fill="currentColor"/></svg>
                  <span>Continue</span>
                </button>
              </div>
            )}
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/category')}>
                <svg viewBox="0 0 18 18" width="18" height="18"><path d="M2 3h6v6H2zm0 8h6v4H2zm8-8h6v6h-6zm0 8h6v4h-6z" fill="currentColor"/></svg>
                <span>Choose Category</span>
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/sets')}>
                <svg viewBox="0 0 18 18" width="18" height="18"><path d="M4 4a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M7 7h4M7 10h4M7 13h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/></svg>
                <span>My Sets</span>
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
          </div>
        </div>
      </div>
    </section>
  )
}

function startLocalFallback(dispatch) {
  const fallback = loadLocalQuestions('All', 'all')
  dispatch({ type: 'LOAD_QUESTIONS', payload: { questions: fallback.questions, isApiMode: false, category: fallback.category, difficulty: fallback.difficulty } })
  dispatch({ type: 'START_QUIZ', payload: fallback.questions })
}


