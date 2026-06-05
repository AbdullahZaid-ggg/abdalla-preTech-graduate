import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { playCorrect, playWrong, playComplete, playClick } from '../utils/sound'
import { launchConfetti } from '../utils/confetti'
import { saveState, saveQuizAttempt, clearState } from '../utils/storage'
import { CONFIG } from '../utils/config'

const RADIUS = 22
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function QuizScreen() {
  const { state, dispatch } = useQuiz()
  const navigate = useNavigate()
  const q = state.quizQuestions[state.currentQuestionIndex]
  const total = state.quizQuestions.length
  const idx = state.currentQuestionIndex
  const answered = state.userAnswers[idx]
  const timeUp = useRef(false)
  const answeredCount = state.userAnswers.filter(a => a !== -1).length
  const [timerFlip, setTimerFlip] = useState(false)

  useEffect(() => {
    timeUp.current = false
  }, [state.quizQuestions])

  useEffect(() => {
    if (state.practiceMode) return
    const timer = setInterval(() => {
      setTimerFlip(true)
      dispatch({ type: 'TICK_TIMER' })
    }, 1000)
    return () => clearInterval(timer)
  }, [state.practiceMode])

  useEffect(() => {
    if (timerFlip) {
      const t = setTimeout(() => setTimerFlip(false), 150)
      return () => clearTimeout(t)
    }
  }, [timerFlip])

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

  useEffect(() => {
    if (answered === -1) return
    const t = setTimeout(() => {
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
        animateTransition('next')
      }
    }, 800)
    return () => clearTimeout(t)
  }, [answered, idx])

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
    setTappedIdx(index)
    setTimeout(() => setTappedIdx(-1), 200)
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
    if (animState.active) return
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
      animateTransition('next')
    }
  }

  function goPrev() {
    if (animState.active) return
    playClick()
    animateTransition('prev')
  }

  const questionRef = useRef(null)
  const [animState, setAnimState] = useState({ active: false, dir: 'next' })
  const [tappedIdx, setTappedIdx] = useState(-1)

  useEffect(() => {
    if (questionRef.current) questionRef.current.focus()
  }, [idx])

  useEffect(() => {
    if (answered !== -1) {
      const nextBtn = document.getElementById('next-btn')
      if (nextBtn && !nextBtn.disabled) setTimeout(() => nextBtn.focus(), 100)
    }
  }, [answered])

  function animateTransition(dir) {
    if (animState.active) return
    setAnimState({ active: 'exit', dir })
    setTimeout(() => {
      if (dir === 'next') {
        dispatch({ type: 'NEXT_QUESTION' })
      } else {
        dispatch({ type: 'PREV_QUESTION' })
      }
      setAnimState({ active: 'enter', dir })
      setTimeout(() => setAnimState({ active: false, dir }), 300)
    }, 200)
  }

  if (!q) return null

  const diffIcons = useMemo(() => ({ easy: '<circle cx="7" cy="7" r="5" fill="#00e676"/>', medium: '<circle cx="7" cy="7" r="5" fill="#ff9800"/>', hard: '<circle cx="7" cy="7" r="5" fill="#ff4444"/>' }), [])

  return (
    <section className="screen-main">
      <div className="quiz-wrapper">
        <div className="quiz-bg-decor"><img src="/assets/images/quiz-decoration.svg" alt="" /></div>
        <div className="quiz-bar">
          <div className="quiz-bar-left">
            <span className="q-counter" aria-live="polite">Q {idx + 1} / {total}</span>
            {q.difficulty && (
              <span className={`diff-badge ${q.difficulty}`} dangerouslySetInnerHTML={{ __html: `${diffIcons[q.difficulty] || ''} ${q.difficulty}` }} />
            )}
            <div className="progress-track" title={`${answeredCount} of ${total} answered`}><div className="progress-fill" style={{ width: `${(answeredCount / total) * 100}%` }} /></div>
          </div>
          <div className="quiz-bar-right">
            {state.practiceMode ? (
              <span className="q-timer" style={{ color: 'var(--md-tertiary)' }}>
                <svg viewBox="0 0 16 16" width="14" height="14"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M7 6v6l5-3z" fill="currentColor"/></svg>
                <span>Practice</span>
              </span>
            ) : (
              <div className="radial-timer" title={`${Math.floor(state.timerRemaining / 60)}:${(state.timerRemaining % 60).toString().padStart(2, '0')} remaining`}>
                <svg viewBox="0 0 54 54" width="36" height="36">
                  <circle cx="27" cy="27" r={RADIUS} fill="none" stroke="var(--md-outline-variant)" strokeWidth="3" />
                  <circle cx="27" cy="27" r={RADIUS} fill="none"
                    stroke={state.timerRemaining <= 10 ? 'var(--md-error)' : 'var(--md-primary)'}
                    strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={CIRCUMFERENCE * (1 - state.timerRemaining / (CONFIG.TIMER_DURATION * total))}
                    transform="rotate(-90 27 27)"
                    style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
                  />
                </svg>
                <span className={`rt-time${timerFlip ? ' flip' : ''}`}>{state.timerRemaining}s</span>
              </div>
            )}
            {state.streak >= 2 && (
              <span className="q-streak">
                <svg viewBox="0 0 16 16" width="16" height="16"><path d="M8 1S4 5 4 9c0 2.2 1.8 4 4 4s4-1.8 4-4c0-4-4-8-4-8z" fill="currentColor" opacity="0.7"/><path d="M8 11c-1.1 0-2-.9-2-2 0-1.5 2-4 2-4s2 2.5 2 4c0 1.1-.9 2-2 2z" fill="currentColor"/></svg>
                <span>{state.streak}</span>
              </span>
            )}
            <span className="q-score">Score: {state.score}</span>
            <button className="btn btn-sm btn-text" onClick={() => navigate('/')} title="Back to Home">
              <svg viewBox="0 0 16 16" width="16" height="16"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
        <div key={animState.active === 'enter' ? `q-enter-${idx}` : `q-${idx}`}
             className={`quiz-stage${animState.active === 'exit' ? animState.dir === 'next' ? ' exit-left' : ' exit-right' : animState.active === 'enter' ? animState.dir === 'next' ? ' enter-right' : ' enter-left' : ''}`}>
          <p className="q-text" tabIndex={-1} ref={questionRef} role="heading" aria-level={2}>{q.question}</p>
          {state.questionMode === 'truefalse' && q.trueFalseStatement && (
            <p className="q-tf-statement" style={{
              padding: '12px 16px', marginBottom: 16, borderRadius: 'var(--shape-sm)',
              background: 'var(--md-surface-variant)', fontSize: '1.05rem',
              borderLeft: '3px solid var(--md-primary)', textAlign: 'center'
            }}>
              "{q.trueFalseStatement}"
            </p>
          )}
          <div className="q-options">
            {q.options.map((opt, i) => {
              let cls = 'option-btn'
              if (answered !== -1) {
                if (i === q.correct) cls += ' correct'
                if (i === answered && answered !== q.correct) cls += ' wrong'
              }
              if (tappedIdx === i) cls += ' tapped'
              return (
                <button key={i} className={cls} onClick={() => checkAnswer(i)} disabled={answered !== -1}
                  aria-label={`Option ${i + 1}: ${opt.replace(/<[^>]*>/g, '')}`}>
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
                  onClick={() => { playClick(); dispatch({ type: 'GO_TO_QUESTION', payload: i }) }}
                  aria-label={`Go to question ${i + 1}`}>
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="q-nav">
              <button className="btn btn-nav" onClick={goPrev} disabled={idx === 0 || animState.active}>
                <svg viewBox="0 0 16 16" width="16" height="16"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg> Back
              </button>
              <button className="btn btn-primary" id="next-btn" onClick={goNext} disabled={animState.active}>
                {idx === total - 1 ? 'Finish Quiz' : 'Next'} <svg viewBox="0 0 16 16" width="16" height="16"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
