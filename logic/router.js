function showScreen(id) {
  document.querySelectorAll('.screen-main').forEach(s => s.classList.add('hidden'))
  document.getElementById(id).classList.remove('hidden')
}

function showHome() {
  renderHomeStats()
  showScreen('home-screen')
}

function showSourceScreen() {
  const total = QuizApp.quizQuestions.length
  const isApi = QuizApp.isApiMode
  document.getElementById('source-icon').innerHTML = `<img src="assets/images/start-quiz.svg" alt="" />`
  const diffLabel = QuizApp.localDifficulty === 'all' ? '' : ` (${QuizApp.localDifficulty})`
  document.getElementById('source-label').textContent = isApi ? 'API Questions' : `Local Questions${QuizApp.localCategory !== 'All' ? ' — ' + QuizApp.localCategory : ''}${diffLabel}`
  document.getElementById('source-count').textContent = `${total} questions loaded`

  document.getElementById('api-settings').classList.toggle('hidden', !isApi)
  document.getElementById('refresh-local-btn').classList.toggle('hidden', isApi)
  document.getElementById('refresh-api-btn').classList.toggle('hidden', !isApi)

  const saved = loadState()
  document.getElementById('continue-btn').style.display = saved ? '' : 'none'
  const newLabel = saved ? 'Start New' : 'Start Quiz'
  document.getElementById('start-new-btn').innerHTML = `<svg viewBox="0 0 18 18" width="18" height="18"><path d="M5 3l10 6-10 6z" fill="currentColor"/></svg> ${newLabel}`

  showScreen('source-screen')
}

function showQuizScreen() {
  showScreen('quiz-screen')
}

function showHistoryScreen() {
  showHistory()
}

function showAbout() {
  showScreen('about-screen')
}

function showContact() {
  showScreen('contact-screen')
}

function showCategoryScreen() {
  renderCategoryGrid()
  showScreen('category-screen')
}

function renderCategoryGrid() {
  const grid = document.getElementById('cat-grid')
  grid.innerHTML = CATEGORIES.map(c => {
    const count = getCategoryCount(c.id)
    return `
      <button class="cat-card" onclick="startCategoryQuiz('${c.id}')" style="--cat-color:${c.color}">
        <span class="cat-icon">${c.icon}</span>
        <span class="cat-name">${c.id}</span>
        <span class="cat-count">${count} questions</span>
      </button>
    `
  }).join('') + `
    <button class="cat-card cat-all" onclick="startCategoryQuiz('All')" style="--cat-color:var(--md-primary)">
      <span class="cat-icon"><svg viewBox="0 0 20 20" width="20" height="20"><path d="M2 3h7v7H2zm0 9h7v5H2zm9-9h7v7h-7zm0 9h7v5h-7z" fill="currentColor"/></svg></span>
      <span class="cat-name">All Topics</span>
      <span class="cat-count">${defaultQuestions.length} questions</span>
    </button>
  `
}

let pickedCategory = null

function startCategoryQuiz(cat) {
  pickedCategory = cat
  const picker = document.getElementById('diff-picker')
  const title = document.getElementById('diff-picker-title')
  const sub = document.getElementById('diff-picker-sub')
  const catInfo = CATEGORIES.find(c => c.id === cat) || { icon: '<svg viewBox="0 0 18 18" width="18" height="18"><path d="M2 3h6v6H2zm0 8h6v4H2zm8-8h6v6h-6zm0 8h6v4h-6z" fill="currentColor"/></svg>' }

  title.innerHTML = `${catInfo.icon} ${cat}`
  sub.textContent = cat === 'All' ? 'All topics' : `${getCategoryCount(cat)} questions available`

  document.getElementById('diff-count-easy').textContent = `${getDifficultyCount(cat, 'easy')} questions`
  document.getElementById('diff-count-medium').textContent = `${getDifficultyCount(cat, 'medium')} questions`
  document.getElementById('diff-count-hard').textContent = `${getDifficultyCount(cat, 'hard')} questions`
  document.getElementById('diff-count-all').textContent = cat === 'All' ? `${defaultQuestions.length} questions` : `${getCategoryCount(cat)} questions`

  picker.classList.remove('hidden')
}

function pickDifficulty(diff) {
  loadLocalQuestions(pickedCategory, diff)
  document.getElementById('diff-picker').classList.add('hidden')
  startNewQuiz()
}

function cancelDifficultyPick() {
  document.getElementById('diff-picker').classList.add('hidden')
  pickedCategory = null
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

function setLogoSrc(isDark) {
  const src = isDark ? 'assets/images/hero.svg' : 'assets/images/hero-light.svg'
  const navLogo = document.getElementById('nav-logo')
  const heroLogo = document.getElementById('hero-logo')
  if (navLogo) navLogo.src = src
  if (heroLogo) heroLogo.src = src
}

function toggleTheme() {
  const html = document.documentElement
  const isDark = html.getAttribute('data-theme') !== 'light'
  html.setAttribute('data-theme', isDark ? 'light' : 'dark')
  setLogoSrc(!isDark)
  localStorage.setItem(CONFIG.THEME_KEY, isDark ? 'light' : 'dark')
}

function loadTheme() {
  const saved = localStorage.getItem(CONFIG.THEME_KEY)
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light')
    setLogoSrc(false)
  }
}

function handleContactForm(e) {
  e.preventDefault()
  const name = document.getElementById('contact-name').value
  const email = document.getElementById('contact-email').value
  const message = document.getElementById('contact-message').value
  const feedback = document.getElementById('contact-feedback')

  if (name && email && message) {
    feedback.textContent = `Thanks ${name}! Your message has been sent.`
    feedback.className = 'contact-feedback success'
    document.getElementById('contact-form').reset()
  } else {
    feedback.textContent = 'Please fill in all fields.'
    feedback.className = 'contact-feedback error'
  }
  feedback.classList.remove('hidden')
  return false
}
