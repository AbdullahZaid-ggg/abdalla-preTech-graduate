import { useState, useEffect, useMemo, memo } from 'react'
import { useQuiz } from '../context/QuizContext'
import { loadHistory, deleteQuizAttempt, clearAllHistory } from '../utils/storage'
import { showToast } from './ToastContainer'

export default function HistoryScreen() {
  const { dispatch } = useQuiz()
  const [history, setHistory] = useState([])
  const [confirmClear, setConfirmClear] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')

  useEffect(() => { setHistory(loadHistory()) }, [])

  function refresh() { setHistory(loadHistory()) }

  function handleDelete(id) {
    deleteQuizAttempt(id)
    showToast(dispatch, 'Entry deleted', 'success')
    refresh()
  }

  function handleClearAll() {
    clearAllHistory()
    setConfirmClear(false)
    showToast(dispatch, 'All history cleared', 'success')
    refresh()
  }

  const categories = useMemo(() => [...new Set(history.map(a => a.category))], [history])
  const filtered = useMemo(() => history.filter(a => {
    const matchCategory = filterCategory === 'All' || a.category === filterCategory
    const q = searchQuery.toLowerCase()
    const matchSearch = !q || a.category?.toLowerCase().includes(q) || a.date?.includes(q) || a.source?.toLowerCase().includes(q)
    return matchCategory && matchSearch
  }), [history, filterCategory, searchQuery])

  const totalQuizzes = filtered.length
  const avgPct = totalQuizzes ? Math.round(filtered.reduce((s, a) => s + a.percentage, 0) / totalQuizzes) : 0
  const best = totalQuizzes ? Math.max(...filtered.map(a => a.percentage)) : 0

  const groups = useMemo(() => {
    const g = {}
    filtered.forEach(a => {
      if (!g[a.date]) g[a.date] = []
      g[a.date].push(a)
    })
    return g
  }, [filtered])
  const sortedDates = Object.keys(groups).sort().reverse()

  return (
    <section className="screen-main">
      <div className="page-card">
        <div className="page-card-header">
          <h2>
            <svg viewBox="0 0 20 20" width="20" height="20" style={{ verticalAlign: -3 }}><path d="M3 3h3v14H3zm5 4h3v10H8zm5-2h3v12h-3z" fill="currentColor"/></svg>
            <span> Quiz History</span>
          </h2>
          <p>Every attempt, every improvement</p>
        </div>
        <div className="page-card-body">
          <div className="history-filters" style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <input
              type="text"
              className="history-search-input"
              placeholder="Search history..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search quiz history"
              style={{
                flex: 1, minWidth: 160, padding: '8px 12px', borderRadius: 'var(--shape-sm)',
                border: '1px solid var(--md-outline-variant)', background: 'var(--md-surface-variant)',
                color: 'var(--md-on-surface)', fontSize: '0.85rem'
              }}
            />
            <select
              className="history-cat-filter"
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              aria-label="Filter by category"
              style={{
                padding: '8px 12px', borderRadius: 'var(--shape-sm)',
                border: '1px solid var(--md-outline-variant)', background: 'var(--md-surface-variant)',
                color: 'var(--md-on-surface)', fontSize: '0.85rem'
              }}
            >
              <option value="All">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="stat-row">
            <div className="stat-card"><span className="stat-value">{totalQuizzes}</span><span className="stat-label">Quizzes</span></div>
            <div className="stat-card"><span className="stat-value">{avgPct}%</span><span className="stat-label">Avg Score</span></div>
            <div className="stat-card"><span className="stat-value">{best}%</span><span className="stat-label">Best</span></div>
          </div>

          {totalQuizzes > 0 && (
            <div style={{ textAlign: 'right', marginBottom: 16, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="btn btn-sm btn-text" onClick={() => {
                const data = JSON.stringify(history, null, 2)
                const blob = new Blob([data], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url; a.download = `quiz-history-${new Date().toISOString().slice(0, 10)}.json`
                a.click(); URL.revokeObjectURL(url)
                showToast(dispatch, 'History exported', 'success')
              }}>
                <svg viewBox="0 0 16 16" width="14" height="14" style={{ verticalAlign: -2 }}><path d="M8 2v8M5 7l3 3 3-3M2 11v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Export JSON
              </button>
              <button className="btn btn-sm btn-text" onClick={() => setConfirmClear(true)} style={{ color: 'var(--md-error)' }}>
                <svg viewBox="0 0 16 16" width="14" height="14" style={{ verticalAlign: -2 }}><path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M13 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V4" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/></svg>
                Clear All
              </button>
            </div>
          )}

          {confirmClear && (
            <div className="diff-picker">
              <div className="diff-picker-backdrop" onClick={() => setConfirmClear(false)} />
              <div className="diff-picker-card" style={{ maxWidth: 320 }}>
                <h3>Clear All History?</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--md-on-surface-variant)', margin: '12px 0 20px' }}>This action cannot be undone.</p>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                  <button className="btn btn-sm btn-text" onClick={() => setConfirmClear(false)}>Cancel</button>
                  <button className="btn btn-sm btn-primary" onClick={handleClearAll} style={{ background: 'var(--md-error)', boxShadow: 'var(--glow-error)' }}>Delete All</button>
                </div>
              </div>
            </div>
          )}

          {totalQuizzes === 0 ? (
            <p className="history-empty">No quiz attempts yet.</p>
          ) : (
            <div className="history-body">
              <div className="history-primary">
                <h3 className="section-label">Attempts</h3>
                {sortedDates.map(date => (
                  <div key={date} className="history-day-group">
                    <div className="history-day-header">
                      <span className="history-day-label">
                        {date === new Date().toISOString().slice(0, 10) ? 'Today' : date}
                      </span>
                    </div>
                    {groups[date].map(a => (
                      <div key={a.id} className="history-row">
                        <span className="history-source">{a.source === 'api' ? 'API' : 'Local'}</span>
                        <span className="history-cat">{a.category || 'All'}</span>
                        <span className="history-score">{a.score}/{a.total}</span>
                        <span className="history-pct">{a.percentage}%</span>
                        <span className="history-time">
                          {new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <button className="history-del-btn" onClick={() => handleDelete(a.id)} title="Delete entry">
                          <svg viewBox="0 0 14 14" width="12" height="12"><path d="M2 4h10M4.5 4V3a1 1 0 011-1h3a1 1 0 011 1v1M11 4v7a1 1 0 01-1 1H4a1 1 0 01-1-1V4" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="history-secondary">
                <h3 className="section-label">
                  <svg viewBox="0 0 16 16" width="16" height="16" style={{ verticalAlign: -2 }}><path d="M1 14h14M3 10l3-4 3 2 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span> Day Comparison</span>
                </h3>
                <ComparisonContent groups={groups} sortedDates={sortedDates} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

const ComparisonContent = memo(function ComparisonContent({ groups, sortedDates }) {
  if (sortedDates.length === 0) return <p className="comparison-empty">Complete quizzes on multiple days to see comparisons.</p>

  const latest = groups[sortedDates[0]]
  const latestAvg = Math.round(latest.reduce((s, a) => s + a.percentage, 0) / latest.length)

  if (sortedDates.length === 1) {
    const best = Math.max(...latest.map(a => a.percentage))
    return (
      <div className="comparison-card">
        <div className="comparison-best">Today's Best: {best}%</div>
        <div className="comparison-count">{latest.length} quiz{latest.length > 1 ? 'zes' : ''} completed today</div>
      </div>
    )
  }

  const prev = groups[sortedDates[1]]
  const prevAvg = Math.round(prev.reduce((s, a) => s + a.percentage, 0) / prev.length)
  const diff = latestAvg - prevAvg
  const arrow = diff > 0 ? '<path d="M7 2l5 5H9v5H5V7H2z" fill="currentColor"/>' : diff < 0 ? '<path d="M7 12l-5-5h3V2h4v5h3z" fill="currentColor"/>' : '<line x1="2" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>'
  const color = diff > 0 ? 'var(--md-tertiary)' : diff < 0 ? 'var(--md-error)' : 'var(--md-on-surface-variant)'

  return (
    <div className="comparison-card">
      <div className="comparison-header">{sortedDates[0]} vs {sortedDates[1]}</div>
      <div className="comparison-grid">
        <div className="comparison-col">
          <span className="comparison-label">{sortedDates[0]}</span>
          <span className="comparison-val">{latestAvg}%</span>
        </div>
        <div className="comparison-divider" style={{ color }}>
          <svg viewBox="0 0 14 14" width="14" height="14" style={{ verticalAlign: -2 }} dangerouslySetInnerHTML={{ __html: arrow }} /> {Math.abs(diff)}%
        </div>
        <div className="comparison-col">
          <span className="comparison-label">{sortedDates[1]}</span>
          <span className="comparison-val">{prevAvg}%</span>
        </div>
      </div>
    </div>
  )
})
