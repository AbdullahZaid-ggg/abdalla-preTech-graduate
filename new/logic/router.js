function showScreen(id) {
  document.querySelectorAll('.screen-main').forEach(s => s.classList.add('hidden'))
  document.getElementById(id).classList.remove('hidden')
}

function showWelcome() {
  stopTimer()
  renderHomeStats()
  showScreen('welcome-screen')
}

function showSourceScreen() {
  const total = QuizApp.quizQuestions.length
  const label = QuizApp.isApiMode ? 'API Questions' : 'Local Questions'
  const icon = QuizApp.isApiMode ? '🌐' : '📚'
  document.getElementById('source-icon').textContent = icon
  document.getElementById('source-label').textContent = label
  document.getElementById('source-count').textContent = `${total} questions loaded`

  const saved = loadState()
  const contBtn = document.getElementById('continue-btn')
  contBtn.style.display = saved ? '' : 'none'
  document.getElementById('start-new-btn').textContent = saved ? '▶ Start New' : '▶ Start Quiz'

  showScreen('source-screen')
}

function showQuizScreen() {
  showScreen('quiz-screen')
}

function showHistoryScreen() {
  renderHistory()
  showScreen('history-screen')
}

function renderHomeStats() {
  const history = loadHistory()
  const el = document.getElementById('home-stats')
  if (!el) return
  const total = history.length
  const avg = total ? Math.round(history.reduce((s, a) => s + a.percentage, 0) / total) : 0
  const best = total ? Math.max(...history.map(a => a.percentage)) : 0
  el.innerHTML = total ? `
    <div class="home-stat"><span class="home-stat-val">${total}</span><span class="home-stat-label">Quizzes Done</span></div>
    <div class="home-stat"><span class="home-stat-val">${avg}%</span><span class="home-stat-label">Average Score</span></div>
    <div class="home-stat"><span class="home-stat-val">${best}%</span><span class="home-stat-label">Best Score</span></div>
  ` : ''
}
