import { useState, useEffect, useRef } from 'react'
import { useQuiz } from '../context/QuizContext'
import { playCorrect, playWrong, playComplete, playClick } from '../utils/sound'
import { launchConfetti } from '../utils/confetti'
import { saveState, saveQuizAttempt, clearState } from '../utils/storage'
import { CONFIG } from '../utils/config'

export default function QuizScreen() {
  const { state, dispatch } = useQuiz()
  const q = state.quizQuestions[state.currentQuestionIndex]
  const total = state.quizQuestions.length
  const idx = state.currentQuestionIndex
  const answered = state.userAnswers[idx]
  const timeUp = useRef(false)

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'TICK_TIMER' })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (state.timerRemaining <= 0 && !timeUp.current) {
      timeUp.current = true
      clearState()
      const pct = Math.round((state.score / total) * 100)
      saveQuizAttempt(state.score, total, state.isApiMode ? 'api' : 'local', state.quizQuestions, state.userAnswers, state.localCategory, state.localDifficulty)
      if (pct >= 80) {
        setTimeout(launchConfetti, 300)
        setTimeout(playComplete, 300)
      }
      dispatch({ type: 'SHOW_RESULTS' })
    }
  }, [state.timerRemaining])

  function saveStateFromQuiz(current) {
    saveState({
      quizQuestions: current.quizQuestions,
      currentQuestionIndex: current.currentQuestionIndex,
      score: current.score,
      userAnswers: current.userAnswers,
      isApiMode: current.isApiMode,
      timestamp: Date.now(),
    })
  }

  function checkAnswer(index) {
    if (answered !== -1) return
    dispatch({ type: 'ANSWER_QUESTION', payload: { index } })
    const isCorrect = index === q.correct
    if (isCorrect) playCorrect()
    else playWrong()
    const newAnswers = [...state.userAnswers]
    newAnswers[idx] = index
    const newScore = isCorrect ? state.score + 1 : state.score
    saveState({
      quizQuestions: state.quizQuestions,
      currentQuestionIndex: idx,
      score: newScore,
      userAnswers: newAnswers,
      isApiMode: state.isApiMode,
      timestamp: Date.now(),
    })
  }

  function goNext() {
    playClick()
    if (idx === total - 1) {
      clearState()
      const pct = Math.round((state.score / total) * 100)
      saveQuizAttempt(state.score, total, state.isApiMode ? 'api' : 'local', state.quizQuestions, state.userAnswers, state.localCategory, state.localDifficulty)
      if (pct >= 80) {
        setTimeout(launchConfetti, 300)
        setTimeout(playComplete, 300)
      }
      dispatch({ type: 'SHOW_RESULTS' })
    } else {
      dispatch({ type: 'NEXT_QUESTION' })
    }
  }

  function goPrev() {
    playClick()
    dispatch({ type: 'PREV_QUESTION' })
  }

  if (!q) return null

  const diffIcons = { easy: '<circle cx="7" cy="7" r="5" fill="#00e676"/>', medium: '<circle cx="7" cy="7" r="5" fill="#ff9800"/>', hard: '<circle cx="7" cy="7" r="5" fill="#ff4444"/>' }

  return (
    <section className="screen-main">
      <div className="quiz-wrapper">
        <div className="quiz-bg-decor"><img src="/assets/images/quiz-decoration.svg" alt="" /></div>
        <div className="quiz-bar">
          <div className="quiz-bar-left">
            <span className="q-counter">Q {idx + 1} / {total}</span>
            {q.difficulty && (
              <span className={`diff-badge ${q.difficulty}`} dangerouslySetInnerHTML={{ __html: `${diffIcons[q.difficulty] || ''} ${q.difficulty}` }} />
            )}
            <div className="progress-track"><div className="progress-fill" style={{ width: `${(idx / total) * 100}%` }} /></div>
          </div>
          <div className="quiz-bar-right">
            <span className="q-timer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.85rem', fontWeight: 700, color: state.timerRemaining <= 10 ? 'var(--md-error)' : 'var(--md-on-surface-variant)' }}>
              <svg viewBox="0 0 16 16" width="14" height="14"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M8 4v4l3 3" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/></svg>
              <span>{Math.floor(state.timerRemaining / 60)}:{(state.timerRemaining % 60).toString().padStart(2, '0')}</span>
            </span>
            {state.streak >= 2 && (
              <span className="q-streak">
                <svg viewBox="0 0 16 16" width="16" height="16"><path d="M8 1S4 5 4 9c0 2.2 1.8 4 4 4s4-1.8 4-4c0-4-4-8-4-8z" fill="currentColor" opacity="0.7"/><path d="M8 11c-1.1 0-2-.9-2-2 0-1.5 2-4 2-4s2 2.5 2 4c0 1.1-.9 2-2 2z" fill="currentColor"/></svg>
                <span>{state.streak}</span>
              </span>
            )}
            <span className="q-score">Score: {state.score}</span>
            <button className="btn btn-sm btn-text" onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'home' })} title="Back to Home">
              <svg viewBox="0 0 16 16" width="16" height="16"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
        <div className="quiz-stage">
          <p className="q-text">{q.question}</p>
          <div className="q-options">
            {q.options.map((opt, i) => {
              let cls = 'option-btn'
              if (answered !== -1) {
                if (i === q.correct) cls += ' correct'
                if (i === answered && answered !== q.correct) cls += ' wrong'
              }
              return (
                <button key={i} className={cls} onClick={() => checkAnswer(i)} disabled={answered !== -1}>
                  {opt}
                </button>
              )
            })}
          </div>
          <div className="q-footer">
            <div className="q-dots">
              {state.quizQuestions.map((_, i) => (
                <button key={i}
                  className={`page-dot${i === idx ? ' active' : ''}${state.userAnswers[i] !== -1 ? ' answered' : ''}`}
                  onClick={() => { playClick(); dispatch({ type: 'GO_TO_QUESTION', payload: i }) }}>
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="q-nav">
              <button className="btn btn-nav" onClick={goPrev} disabled={idx === 0}>
                <svg viewBox="0 0 16 16" width="16" height="16"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg> Back
              </button>
              <button className="btn btn-primary" onClick={goNext}>
                {idx === total - 1 ? 'Finish Quiz' : 'Next'} <svg viewBox="0 0 16 16" width="16" height="16"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
