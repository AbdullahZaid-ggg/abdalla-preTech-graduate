export default function HistoryScreen() {
  const history = (() => {
    try {
      const data = localStorage.getItem('quizHistory')
      return data ? JSON.parse(data) : []
    } catch { return [] }
  })()

  const totalQuizzes = history.length
  const avgPct = totalQuizzes ? Math.round(history.reduce((s, a) => s + a.percentage, 0) / totalQuizzes) : 0
  const best = totalQuizzes ? Math.max(...history.map(a => a.percentage)) : 0

  const groups = {}
  history.forEach(a => {
    if (!groups[a.date]) groups[a.date] = []
    groups[a.date].push(a)
  })
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
          <div className="stat-row">
            <div className="stat-card"><span className="stat-value">{totalQuizzes}</span><span className="stat-label">Quizzes</span></div>
            <div className="stat-card"><span className="stat-value">{avgPct}%</span><span className="stat-label">Avg Score</span></div>
            <div className="stat-card"><span className="stat-value">{best}%</span><span className="stat-label">Best</span></div>
          </div>

          {totalQuizzes === 0 ? (
            <p className="history-empty" style={{ textAlign: 'center', color: 'var(--md-on-surface-variant)', padding: 32 }}>No quiz attempts yet.</p>
          ) : (
            <div className="history-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div className="history-primary" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--md-outline-variant)', borderRadius: 'var(--shape-lg)', padding: 20 }}>
                <h3 className="section-label">Attempts</h3>
                {sortedDates.map(date => (
                  <div key={date} className="history-day-group" style={{ marginBottom: 16 }}>
                    <div className="history-day-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', marginBottom: 6 }}>
                      <span className="history-day-label" style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--md-primary)' }}>
                        {date === new Date().toISOString().slice(0, 10) ? 'Today' : date}
                      </span>
                    </div>
                    {groups[date].map(a => (
                      <div key={a.id} className="history-row" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', fontSize: '0.83rem', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <span className="history-source" style={{ padding: '2px 6px', borderRadius: 'var(--shape-xs)', background: 'rgba(0,229,255,0.08)', color: 'var(--md-primary)', fontSize: '0.72rem', fontWeight: 600 }}>{a.source === 'api' ? 'API' : 'Local'}</span>
                        <span className="history-cat" style={{ padding: '2px 8px', borderRadius: 'var(--shape-xs)', background: 'rgba(0,229,255,0.06)', color: 'var(--md-primary)', fontSize: '0.72rem', fontWeight: 600 }}>{a.category || 'All'}</span>
                        <span className="history-score" style={{ fontWeight: 700 }}>{a.score}/{a.total}</span>
                        <span className="history-pct" style={{ fontWeight: 600, color: 'var(--md-tertiary)', marginLeft: 'auto' }}>{a.percentage}%</span>
                        <span className="history-time" style={{ color: 'var(--md-on-surface-variant)', fontSize: '0.78rem' }}>
                          {new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="history-secondary" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--md-outline-variant)', borderRadius: 'var(--shape-lg)', padding: 20 }}>
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

function ComparisonContent({ groups, sortedDates }) {
  if (sortedDates.length === 0) return <p style={{ textAlign: 'center', color: 'var(--md-on-surface-variant)', padding: 20, fontSize: '0.88rem' }}>Complete quizzes on multiple days to see comparisons.</p>

  const latest = groups[sortedDates[0]]
  const latestAvg = Math.round(latest.reduce((s, a) => s + a.percentage, 0) / latest.length)

  if (sortedDates.length === 1) {
    const best = Math.max(...latest.map(a => a.percentage))
    return (
      <div className="comparison-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--md-outline-variant)', borderRadius: 'var(--shape-md)', padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--md-tertiary)', marginBottom: 4 }}>Today's Best: {best}%</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--md-on-surface-variant)' }}>{latest.length} quiz{latest.length > 1 ? 'zes' : ''} completed today</div>
      </div>
    )
  }

  const prev = groups[sortedDates[1]]
  const prevAvg = Math.round(prev.reduce((s, a) => s + a.percentage, 0) / prev.length)
  const diff = latestAvg - prevAvg
  const arrow = diff > 0 ? '<path d="M7 2l5 5H9v5H5V7H2z" fill="currentColor"/>' : diff < 0 ? '<path d="M7 12l-5-5h3V2h4v5h3z" fill="currentColor"/>' : '<line x1="2" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>'
  const color = diff > 0 ? 'var(--md-tertiary)' : diff < 0 ? 'var(--md-error)' : 'var(--md-on-surface-variant)'

  return (
    <div className="comparison-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--md-outline-variant)', borderRadius: 'var(--shape-md)', padding: 20, textAlign: 'center' }}>
      <div style={{ fontSize: '0.85rem', color: 'var(--md-on-surface-variant)', marginBottom: 14 }}>{sortedDates[0]} vs {sortedDates[1]}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--md-on-surface-variant)', marginBottom: 4 }}>{sortedDates[0]}</span>
          <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>{latestAvg}%</span>
        </div>
        <div style={{ fontSize: '1.2rem', fontWeight: 700, color }}>
          <svg viewBox="0 0 14 14" width="14" height="14" style={{ verticalAlign: -2 }} dangerouslySetInnerHTML={{ __html: arrow }} /> {Math.abs(diff)}%
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--md-on-surface-variant)', marginBottom: 4 }}>{sortedDates[1]}</span>
          <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>{prevAvg}%</span>
        </div>
      </div>
    </div>
  )
}
