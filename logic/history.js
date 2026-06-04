function renderHistory() {
  const history = loadHistory()
  const container = document.getElementById('history-list')
  const statsContainer = document.getElementById('daily-stats')
  if (!container) return

  const totalQuizzes = history.length
  const avgPct = totalQuizzes ? Math.round(history.reduce((s, a) => s + a.percentage, 0) / totalQuizzes) : 0
  const best = totalQuizzes ? Math.max(...history.map(a => a.percentage)) : 0

  if (!totalQuizzes) {
    container.innerHTML = '<p class="history-empty">No quiz attempts yet. Complete a quiz to see your history!</p>'
    if (statsContainer) statsContainer.innerHTML = ''
    return
  }

  if (statsContainer) {
    statsContainer.innerHTML = `
      <div class="stat-card"><span class="stat-value">${totalQuizzes}</span><span class="stat-label">Quizzes</span></div>
      <div class="stat-card"><span class="stat-value">${avgPct}%</span><span class="stat-label">Avg Score</span></div>
      <div class="stat-card"><span class="stat-value">${best}%</span><span class="stat-label">Best</span></div>
    `
  }

  const groups = {}
  history.forEach(a => {
    if (!groups[a.date]) groups[a.date] = []
    groups[a.date].push(a)
  })

  const sortedDates = Object.keys(groups).sort().reverse()
  container.innerHTML = sortedDates.map(date => {
    const attempts = groups[date]
    const dailyBest = Math.max(...attempts.map(a => a.percentage))
    const dailyAvg = Math.round(attempts.reduce((s, a) => s + a.percentage, 0) / attempts.length)
    const isToday = date === getTodayKey()
    return `
      <div class="history-day-group">
        <div class="history-day-header">
          <span class="history-day-label">${isToday ? 'Today' : date}</span>
          <span class="history-day-stats">Best: ${dailyBest}% &middot; Avg: ${dailyAvg}%</span>
        </div>
        ${attempts.map(a => `
          <div class="history-row">
            <span class="history-source">${a.source === 'api' ? 'API' : 'Local'}</span>
            <span class="history-score">${a.score}/${a.total}</span>
            <span class="history-pct">${a.percentage}%</span>
            <span class="history-time">${new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        `).join('')}
      </div>
    `
  }).join('')

  renderComparison(history, groups, sortedDates)
}

function renderComparison(history, groups, sortedDates) {
  const el = document.getElementById('comparison-content')
  if (!el || sortedDates.length < 1) {
    if (el) el.innerHTML = '<p class="comparison-empty">Complete quizzes on multiple days to see comparisons.</p>'
    return
  }

  if (sortedDates.length === 1) {
    const todays = groups[sortedDates[0]]
    const best = Math.max(...todays.map(a => a.percentage))
    el.innerHTML = `
      <div class="comparison-card">
        <div class="comparison-best">Today's Best: ${best}%</div>
        <div class="comparison-count">${todays.length} quiz${todays.length > 1 ? 'zes' : ''} completed today</div>
      </div>
    `
    return
  }

  const latest = groups[sortedDates[0]]
  const prev = groups[sortedDates[1]]
  const latestAvg = Math.round(latest.reduce((s, a) => s + a.percentage, 0) / latest.length)
  const prevAvg = Math.round(prev.reduce((s, a) => s + a.percentage, 0) / prev.length)
  const diff = latestAvg - prevAvg
  const arrow = diff > 0 ? '▲' : diff < 0 ? '▼' : '→'
  const color = diff > 0 ? 'var(--md-tertiary)' : diff < 0 ? 'var(--md-error)' : 'var(--md-on-surface-variant)'

  el.innerHTML = `
    <div class="comparison-card">
      <div class="comparison-header">${sortedDates[0]} vs ${sortedDates[1]}</div>
      <div class="comparison-grid">
        <div class="comparison-col">
          <span class="comparison-label">${sortedDates[0]}</span>
          <span class="comparison-val">${latestAvg}%</span>
        </div>
        <div class="comparison-divider" style="color:${color}">${arrow} ${Math.abs(diff)}%</div>
        <div class="comparison-col">
          <span class="comparison-label">${sortedDates[1]}</span>
          <span class="comparison-val">${prevAvg}%</span>
        </div>
      </div>
    </div>
  `
}
