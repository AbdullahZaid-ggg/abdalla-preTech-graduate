let historyDetailId = null

function showHistory() {
  historyDetailId = null
  document.getElementById('history-detail-section').classList.add('hidden')
  document.getElementById('history-body-main').classList.remove('hidden')
  renderHistory()
  showScreen('history-screen')
}

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
        ${attempts.map(a => {
          const dt = new Date(a.timestamp)
          const timeStr = dt.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' +
            dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          return `
            <div class="history-row clickable" onclick="showAttemptDetail('${a.id}')">
              <span class="history-source">${a.source === 'api' ? 'API' : 'Local'}</span>
              <span class="history-cat">${a.category || 'All'}</span>
              <span class="history-diff">${a.difficulty && a.difficulty !== 'all' ? a.difficulty : ''}</span>
              <span class="history-score">${a.score}/${a.total}</span>
              <span class="history-pct">${a.percentage}%</span>
              <span class="history-time">${timeStr}</span>
              <button class="history-del-btn" onclick="event.stopPropagation();deleteAttempt('${a.id}')" title="Delete"><svg viewBox="0 0 12 12" width="12" height="12"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg></button>
            </div>
          `
        }).join('')}
      </div>
    `
  }).join('')

  renderComparison(history, groups, sortedDates)
}

function deleteAttempt(id) {
  if (!confirm('Delete this attempt?')) return
  deleteQuizAttempt(id)
  renderHistory()
  renderHomeStats()
}

function showAttemptDetail(id) {
  const history = loadHistory()
  const attempt = history.find(a => a.id === id)
  if (!attempt) return

  historyDetailId = id
  const questions = attempt.questions
  const userAnswers = attempt.userAnswers
  const dt = new Date(attempt.timestamp)

  const section = document.getElementById('history-detail-section')
  const main = document.getElementById('history-body-main')

  if (!section) return
  if (main) main.classList.add('hidden')
  section.classList.remove('hidden')

  const content = document.getElementById('history-detail-content')
  content.innerHTML = `
    <div class="detail-card">
      <div class="detail-card-header">
        <h3><svg viewBox="0 0 18 18" width="18" height="18" style="vertical-align:-2px"><rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" stroke-width="1.3" fill="none"/><path d="M2 6l7 4 7-4" stroke="currentColor" stroke-width="1.3" fill="none"/></svg> Attempt Details</h3>
        <p>${attempt.source === 'api' ? '<svg viewBox="0 0 14 14" width="14" height="14" style="vertical-align:-2px"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3" fill="none"/><path d="M2 7h10M7 2a9 9 0 000 10 9 9 0 000-10z" stroke="currentColor" stroke-width="1.3" fill="none"/></svg> API' : '<svg viewBox="0 0 14 14" width="14" height="14" style="vertical-align:-2px"><path d="M1 2h5v5H1zm0 7h5v4H1zm7-7h5v5H8zm0 7h5v4H8z" fill="currentColor"/></svg> ' + (attempt.category || 'All')}${attempt.difficulty && attempt.difficulty !== 'all' ? ' (' + attempt.difficulty + ')' : ''} &middot; ${dt.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at ${dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
      <div class="detail-score-bar">
        <span class="detail-score-val">${attempt.score}/${attempt.total}</span>
        <span class="detail-score-pct">${attempt.percentage}%</span>
      </div>
      <div class="detail-actions">
        <button class="btn btn-sm btn-text" onclick="deleteAttempt('${attempt.id}');closeAttemptDetail();" style="color:var(--md-error);"><svg viewBox="0 0 16 16" width="16" height="16"><path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M12 4v9a1 1 0 01-1 1H5a1 1 0 01-1-1V4" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg> Delete</button>
      </div>
      <div class="detail-list">
        ${questions.map((q, i) => {
          const ua = userAnswers[i]
          const correct = ua === q.correct
          return `
            <div class="detail-row${correct ? '' : ' wrong'}">
              <div class="detail-q-header">
                <span class="detail-q-num">Q${i + 1}</span>
                <span class="detail-q-icon">${correct ? '<svg viewBox="0 0 18 18" width="18" height="18"><circle cx="9" cy="9" r="7" fill="rgba(0,230,118,0.15)" stroke="#00e676" stroke-width="1.5"/><path d="M5 9l3 3 5-5" stroke="#00e676" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '<svg viewBox="0 0 18 18" width="18" height="18"><circle cx="9" cy="9" r="7" fill="rgba(255,68,68,0.15)" stroke="#ff4444" stroke-width="1.5"/><path d="M6 6l6 6M12 6l-6 6" stroke="#ff4444" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>'}</span>
              </div>
              <div class="detail-q-text">${q.question}</div>
              <div class="detail-q-opts">${q.options.map((o, oi) => {
                let cls = 'detail-opt'
                if (oi === q.correct) cls += ' correct'
                if (oi === ua && ua !== q.correct) cls += ' wrong'
                return `<span class="${cls}">${oi === ua ? '<svg viewBox="0 0 12 12" width="12" height="12" style="vertical-align:-1px"><path d="M4 3l4 3-4 3" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg> ' : ''}${o}${oi === q.correct ? ' <svg viewBox="0 0 12 12" width="12" height="12" style="vertical-align:-1px"><circle cx="6" cy="6" r="4" fill="none" stroke="#00e676" stroke-width="1.2"/><path d="M3.5 6l2 2 3-3" stroke="#00e676" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}</span>`
              }).join('')}</div>
            </div>
          `
        }).join('')}
      </div>
      <div style="text-align:center;margin-top:16px;">
        <button class="btn btn-sm btn-text" onclick="closeAttemptDetail()"><svg viewBox="0 0 16 16" width="16" height="16"><path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg> Back to History</button>
      </div>
    </div>
  `
}

function closeAttemptDetail() {
  historyDetailId = null
  document.getElementById('history-detail-section').classList.add('hidden')
  const main = document.getElementById('history-body-main')
  if (main) main.classList.remove('hidden')
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
  const arrow = diff > 0 ? '<svg viewBox="0 0 14 14" width="14" height="14" style="vertical-align:-2px"><path d="M7 2l5 5H9v5H5V7H2z" fill="currentColor"/></svg>' : diff < 0 ? '<svg viewBox="0 0 14 14" width="14" height="14" style="vertical-align:-2px"><path d="M7 12l-5-5h3V2h4v5h3z" fill="currentColor"/></svg>' : '<svg viewBox="0 0 14 14" width="14" height="14" style="vertical-align:-2px"><line x1="2" y1="7" x2="12" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
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

function exportHistory() {
  const history = loadHistory()
  if (!history.length) {
    alert('No history to export.')
    return
  }
  const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `quiz-history-${getTodayKey()}.json`
  a.click()
  URL.revokeObjectURL(url)
}
