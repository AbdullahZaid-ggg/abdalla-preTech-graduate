import { useState } from 'react'
import { useQuiz } from '../context/QuizContext'
import { CATEGORIES, getCategoryCount, getDifficultyCount, loadLocalQuestions } from '../utils/questions'

export default function CategoryScreen() {
  const { dispatch } = useQuiz()
  const [pickedCat, setPickedCat] = useState(null)

  function startCategoryQuiz(cat) {
    setPickedCat(cat)
  }

  function pickDifficulty(diff) {
    const { questions, category, difficulty } = loadLocalQuestions(pickedCat, diff)
    dispatch({ type: 'LOAD_QUESTIONS', payload: { questions, isApiMode: false, category, difficulty } })
    dispatch({ type: 'START_QUIZ', payload: questions })
    setPickedCat(null)
  }

  function cancelPick() {
    setPickedCat(null)
  }

  return (
    <section className="screen-main">
      <div className="page-card">
        <div className="page-card-header">
          <h2>
            <svg viewBox="0 0 20 20" width="20" height="20" style={{ verticalAlign: -3 }}><path d="M2 3h7v7H2zm0 9h7v5H2zm9-9h7v7h-7zm0 9h7v5h-7z" fill="currentColor"/></svg>
            <span> Choose a Category</span>
          </h2>
          <p>Pick a topic and test your knowledge</p>
        </div>
        <div className="page-card-body">
          <div className="cat-grid">
            {CATEGORIES.map(c => (
              <button key={c.id} className="cat-card" onClick={() => startCategoryQuiz(c.id)} style={{ '--cat-color': c.color }}
                dangerouslySetInnerHTML={{
                  __html: `<span class="cat-icon">${c.icon}</span><span class="cat-name">${c.id}</span><span class="cat-count">${getCategoryCount(c.id)} questions</span>`
                }}
              />
            ))}
            <button className="cat-card cat-all" onClick={() => startCategoryQuiz('All')} style={{ '--cat-color': 'var(--md-primary)' }}>
              <span className="cat-icon"><svg viewBox="0 0 20 20" width="20" height="20"><path d="M2 3h7v7H2zm0 9h7v5H2zm9-9h7v7h-7zm0 9h7v5h-7z" fill="currentColor"/></svg></span>
              <span className="cat-name">All Topics</span>
              <span className="cat-count">{108} questions</span>
            </button>
          </div>

          {pickedCat && (
            <div className="diff-picker">
              <div className="diff-picker-backdrop" onClick={cancelPick} />
              <div className="diff-picker-card">
                <h3>{pickedCat}</h3>
                <p className="diff-picker-sub">{pickedCat === 'All' ? 'All topics' : `${getCategoryCount(pickedCat)} questions available`}</p>
                <div className="diff-btns">
                  {['easy', 'medium', 'hard', 'all'].map(d => (
                    <button key={d} className={`diff-btn${d === 'all' ? ' diff-all' : ''}`} onClick={() => pickDifficulty(d)}
                      data-diff={d}>
                      {d !== 'all' ? (
                        <span className="diff-icon"><svg viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="6" fill={d === 'easy' ? '#00e676' : d === 'medium' ? '#ff9800' : '#ff4444'}/></svg></span>
                      ) : (
                        <span className="diff-icon"><svg viewBox="0 0 16 16" width="16" height="16"><path d="M1 2h6v6H1zm0 8h6v4H1zm8-8h6v6H9zm0 8h6v4H9z" fill="currentColor"/></svg></span>
                      )}
                      <span className="diff-label">{d === 'all' ? 'All Difficulties' : d.charAt(0).toUpperCase() + d.slice(1)}</span>
                      <span className="diff-count">{d === 'all' ? (pickedCat === 'All' ? 108 : getCategoryCount(pickedCat)) : getDifficultyCount(pickedCat, d)} questions</span>
                    </button>
                  ))}
                </div>
                <button className="btn btn-sm btn-text" onClick={cancelPick} style={{ marginTop: 12 }}>
                  <svg viewBox="0 0 16 16" width="16" height="16"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>Back to Categories</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
