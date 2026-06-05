import { useQuiz } from '../context/QuizContext'

export default function ResultsScreen() {
  const { state, dispatch } = useQuiz()
  const total = state.quizQuestions.length
  const pct = total ? Math.round((state.score / total) * 100) : 0

  const msgs = [
    [80, 'Excellent! You are a quiz master!'],
    [50, 'Good job! Keep practicing!'],
    [0, 'Keep trying! You will improve!'],
  ]
  const msg = msgs.find(([t]) => pct >= t)?.[1] ?? msgs[2][1]

  function retryQuiz() {
    dispatch({ type: 'START_QUIZ', payload: state.quizQuestions })
  }

  return (
    <section className="screen-main">
      <canvas id="confetti-canvas" style={{ display: 'none' }} />
      <div className="results-hero">
        <div className="results-trophy"><img src="/assets/images/trophy.svg" alt="Trophy" /></div>
        <h2 className="results-title">Quiz Complete!</h2>
        <div className="results-score-ring" style={{ '--score-deg': `${(pct / 100) * 360}deg` }}>
          <span className="results-score-val">{state.score} / {total}</span>
        </div>
        <p className="results-msg">{msg}</p>
        <div className="results-actions">
          <button className="btn btn-primary btn-lg" onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'home' })}>
            <svg viewBox="0 0 18 18" width="18" height="18"><path d="M2 9l7-6 7 6v7h-5v-5H9v5H4V9z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/></svg>
            <span>Back Home</span>
          </button>
          <button className="btn btn-secondary btn-lg" onClick={retryQuiz}>
            <svg viewBox="0 0 18 18" width="18" height="18"><path d="M2 9a7 7 0 0113.3-3.5M16 9a7 7 0 01-13.3 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M16 2v4h-4M2 16v-4h4" fill="currentColor"/></svg>
            <span>Retry Quiz</span>
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'home' })}>
            <svg viewBox="0 0 18 18" width="18" height="18"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M10 5v4l3 2" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/></svg>
            <span>New Quiz</span>
          </button>
        </div>
      </div>
      <div className="results-analysis">
        <div className="results-analysis-header">
          <h3>Answer Breakdown</h3>
        </div>
        <div className="analysis-list">
          {state.quizQuestions.map((q, i) => {
            const correct = state.userAnswers[i] === q.correct
            return (
              <div key={i} className={`analysis-row${correct ? '' : ' wrong'}`}>
                <span className="analysis-icon">
                  {correct
                    ? '<svg viewBox="0 0 18 18" width="18" height="18"><circle cx="9" cy="9" r="7" fill="rgba(0,230,118,0.15)" stroke="#00e676" strokeWidth="1.5"/><path d="M5 9l3 3 5-5" stroke="#00e676" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>'
                    : '<svg viewBox="0 0 18 18" width="18" height="18"><circle cx="9" cy="9" r="7" fill="rgba(255,68,68,0.15)" stroke="#ff4444" strokeWidth="1.5"/><path d="M6 6l6 6M12 6l-6 6" stroke="#ff4444" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>'}
                </span>
                <span className="analysis-question" dangerouslySetInnerHTML={{ __html: q.question }} />
                <span className="analysis-answer">{q.options[q.correct]}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
